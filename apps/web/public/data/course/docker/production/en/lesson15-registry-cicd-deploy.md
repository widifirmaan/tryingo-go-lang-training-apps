# Registry, CI/CD & Deployment

> Docker | Production | Lesson 15

## Learning Objectives

- Explain the role of image registries (Docker Hub, GHCR, ECR)
- Login and push images to a registry
- Map a CI/CD pipeline to Docker commands
- Design a versioning and rollback strategy

---

## Program: Registry, CI/CD & Deployment

```docker
# Login ke registry
docker login

# Tag image dengan namespace repo
docker tag tryngo/shop-web:2.0 tryngo/tryngo/shop-web:2.0
docker push tryngo/tryngo/shop-web:2.0

# Logout
docker logout
docker images
```

---

## Explanation

## Registry: The Image Warehouse
A registry is an image storage server (Docker Hub by default, GHCR for GitHub, ECR on AWS, ACR on Azure). An image name = registry + namespace + name + tag. Pushing an image uploads it to the registry; pulling downloads it. Without a registry, deploying to another server is impossible - the image exists only on your local machine.
## CI/CD Pipelines in Docker Commands
CI/CD automates what you type manually: CI (Continuous Integration) = every push to git triggers build + test; CD (Continuous Delivery) = images that pass get deployed to servers. Ideal pipeline: build (docker build) -> test (run the image, check the healthcheck) -> push (docker push with a unique tag) -> deploy (pull + run on the server). One image per commit, tag = the version you can refer back to.
## Tagging Strategy
Do not overwrite :latest in production. Common practice: tag = commit sha or semver + timestamp, keeping :latest only as a conventional marker. Benefits: audit trail (which image is running on the server?) and instant rollback (pull the old tag).
## Deploy and Rollback
Deploy = run the new image on the server (pull tag X, restart the container). Rollback = run the previous tag again. Because images are immutable and versions are recorded, rollback is a pull+run command, not "revert the code". This is why Docker changed deployment: artifacts (images) and code are separate.

---

## Experiments

1. **Registry: The Image Warehouse**
2. **CI/CD Pipelines in Docker Commands**
3. **Tagging Strategy**
4. **Deploy and Rollback**

---

## Challenge

Design a CI/CD pipeline for tryngo/shop-web: write its stages as a list of Docker commands that CI would run automatically (from code checkout to the image deployed on a server). State the tags you use at each stage and how you roll back.

---

## Summary

A registry = image warehouse. CI/CD = automated build, test, push, deploy. Tags = referable versions, never overwrite :latest. Rollback = pull the old tag. Next: orchestration and the capstone.
