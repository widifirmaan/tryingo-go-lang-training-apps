# Docker & CI/CD

> Laravel | Testing & Production | Lesson 19

## Learning Objectives

- Build a multi-stage Laravel image with a Dockerfile
- Orchestrate app + MySQL with docker-compose
- Write a CI pipeline: automated tests on every push
- Keep secrets: environment variables, not hardcoded files

---

## Program: Docker & CI/CD

```php
FROM composer:2 AS build

WORKDIR /app

COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-interaction --prefer-dist

FROM php:8.3-cli

RUN apt-get update && apt-get install -y libzip-dev unzip     && docker-php-ext-install pdo pdo_mysql zip bcmath

COPY --from=build /app/vendor /var/www/html/vendor
COPY . /var/www/html

WORKDIR /var/www/html

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

```

---

## Explanation

## Dockerfile: A Reproducible Image
An image = an environment recipe identical on laptops, CI, and servers. Stage 1 'build': Composer installs vendor (with the composer:2 image). Stage 2 'runtime': PHP CLI + extensions (pdo_mysql for MySQL), then COPY vendor from stage 1 - result: a small image, optimal layer caching, no SSH keys baked in.
## docker-compose: One Command, Many Services
compose defines app (built from the Dockerfile) + db (mysql:8.4). The app service reads ${APP_KEY} from the HOST .env file - secrets never enter the project files. Volumes: ./storage is mounted from the host (persistent data). depends_on: app waits for db.
## CI: An Automatic Gate
The GitHub Actions workflow: checkout -> setup php -> composer install -> migrate -> phpunit. Re-run on every push/pull request. A failing pipeline = the code must not enter main. This is a quality gate you can rely on - not manual promises.
## The 12-Factor Mindset
Configuration = the environment (env), not code: APP_DEBUG=false + APP_KEY in the production env. The same code runs in development (sqlite, debug on) and production (mysql, debug off) - only the variables differ. CI/CD + containers = safe repeatable deployments.

---

## Experiments

1. **Dockerfile: A Reproducible Image**
2. **docker-compose: One Command, Many Services**
3. **CI: An Automatic Gate**
4. **The 12-Factor Mindset**

---

## Challenge

Level up production: (1) add a redis service to docker-compose and set CACHE_STORE=redis, QUEUE_CONNECTION=redis on the app, (2) add a healthcheck to the db service (mysqladmin ping) and depends_on with condition: service_healthy, (3) write a second deploy job in ci.yml (needs: test) that builds the image and pushes to the GitHub Container Registry, (4) restrict ports: run artisan serve only on 127.0.0.1 and put nginx as a reverse proxy (add an nginx service) - explain why.

---

## Summary

Dockerfile = reproducible environments. Compose = many services. CI = the automatic gate. Env = configuration. Next: deployment & capstone.
