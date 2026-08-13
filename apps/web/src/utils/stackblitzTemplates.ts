export interface StackBlitzProject {
  files: Record<string, string>;
  template: 'node' | 'javascript' | 'typescript' | 'angular' | 'create-react-app' | 'nextjs' | 'nest' | 'django' | 'spring-boot';
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  startScript?: string;
}

export type FrameworkSlug = 'nextjs' | 'nodejs' | 'nestjs' | 'django' | 'laravel' | 'spring' | 'angular';

export const FRAMEWORK_LABELS: Record<FrameworkSlug, string> = {
  nextjs: 'Next.js',
  nodejs: 'Node.js',
  nestjs: 'NestJS',
  django: 'Django',
  laravel: 'Laravel',
  spring: 'Spring Boot',
  angular: 'Angular',
};

export const FRAMEWORK_LANGUAGES: Record<FrameworkSlug, string> = {
  nextjs: 'typescript',
  nodejs: 'javascript',
  nestjs: 'typescript',
  django: 'python',
  laravel: 'php',
  spring: 'java',
  angular: 'typescript',
};

export const FRAMEWORK_MAIN_FILES: Record<FrameworkSlug, string> = {
  nextjs: 'app/page.tsx',
  nodejs: 'index.js',
  nestjs: 'src/app.controller.ts',
  django: 'app/views.py',
  laravel: 'routes/web.php',
  spring: 'src/main/java/com/example/demo/DemoController.java',
  angular: 'src/app/app.component.ts',
};

// ---------------------------------------------------------------------------
// Next.js
// ---------------------------------------------------------------------------
export function buildNextJsProject(code: string): StackBlitzProject {
  return {
    template: 'nextjs',
    files: {
      'app/page.tsx': code,
      'app/layout.tsx': `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
      'app/globals.css': `body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; }`,
      'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;`,
      'tsconfig.json': JSON.stringify({
        compilerOptions: {
          target: 'es5',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [{ name: 'next' }],
          paths: { '@/*': ['./*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      }, null, 2),
      'package.json': JSON.stringify({
        name: 'tryngo-nextjs',
        version: '0.1.0',
        private: true,
        scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
        dependencies: {
          next: '^14.0.0',
          react: '^18.0.0',
          'react-dom': '^18.0.0',
        },
      }, null, 2),
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
  };
}

// ---------------------------------------------------------------------------
// Node.js
// ---------------------------------------------------------------------------
export function buildNodeProject(code: string): StackBlitzProject {
  return {
    template: 'node',
    files: {
      'index.js': code,
      'package.json': JSON.stringify({
        name: 'tryngo-node',
        version: '1.0.0',
        main: 'index.js',
        scripts: { start: 'node index.js' },
        dependencies: {},
      }, null, 2),
    },
  };
}

// ---------------------------------------------------------------------------
// NestJS
// ---------------------------------------------------------------------------
export function buildNestJsProject(code: string): StackBlitzProject {
  return {
    template: 'nest',
    files: {
      'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();`,
      'src/app.module.ts': `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}`,
      'src/app.controller.ts': code,
      'tsconfig.json': JSON.stringify({
        compilerOptions: {
          module: 'commonjs',
          declaration: true,
          removeComments: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          target: 'es2017',
          sourceMap: true,
          outDir: './dist',
          baseUrl: './',
          incremental: true,
          skipLibCheck: true,
          strictNullChecks: false,
          noImplicitAny: false,
          strictBindCallApply: false,
          forceConsistentCasingInFileNames: false,
          noFallthroughCasesInSwitch: false,
        },
      }, null, 2),
      'nest-cli.json': JSON.stringify({
        collection: '@nestjs/schematics',
        sourceRoot: 'src',
        compilerOptions: { deleteOutDir: true },
      }, null, 2),
      'package.json': JSON.stringify({
        name: 'tryngo-nest',
        version: '1.0.0',
        scripts: {
          build: 'nest build',
          start: 'nest start',
          'start:dev': 'nest start --watch',
          'start:prod': 'node dist/main',
        },
        dependencies: {
          '@nestjs/common': '^10.0.0',
          '@nestjs/core': '^10.0.0',
          '@nestjs/platform-express': '^10.0.0',
          'reflect-metadata': '^0.1.13',
          rxjs: '^7.8.1',
        },
        devDependencies: {
          '@nestjs/cli': '^10.0.0',
          '@nestjs/schematics': '^10.0.0',
          typescript: '^5.1.3',
        },
      }, null, 2),
    },
    dependencies: {
      '@nestjs/common': '^10.0.0',
      '@nestjs/core': '^10.0.0',
      '@nestjs/platform-express': '^10.0.0',
      'reflect-metadata': '^0.1.13',
      rxjs: '^7.8.1',
    },
  };
}

// ---------------------------------------------------------------------------
// Django
// ---------------------------------------------------------------------------
export function buildDjangoProject(code: string): StackBlitzProject {
  return {
    template: 'django',
    files: {
      'manage.py': `#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tryngo.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Couldn't import Django.") from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()`,
      'tryngo/__init__.py': '',
      'tryngo/settings.py': `import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = 'tryngo-secret-key-for-education'
DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = ['django.contrib.contenttypes', 'django.contrib.auth', 'app']
MIDDLEWARE = ['django.middleware.common.CommonMiddleware']
ROOT_URLCONF = 'tryngo.urls'
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': os.path.join(BASE_DIR, 'db.sqlite3')}}
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'`,
      'tryngo/urls.py': `from django.urls import path
from app.views import index

urlpatterns = [
    path('', index),
]`,
      'app/__init__.py': '',
      'app/views.py': code,
      'app/apps.py': `from django.apps import AppConfig

class AppConfig(AppConfig):
    name = 'app'`,
      'requirements.txt': 'Django>=4.2',
    },
    startScript: 'python manage.py runserver 0.0.0.0:8000',
  };
}

// ---------------------------------------------------------------------------
// Laravel
// ---------------------------------------------------------------------------
export function buildLaravelProject(code: string): StackBlitzProject {
  return {
    template: 'node',
    files: {
      'routes/web.php': code,
      'app/Http/Controllers/UserController.php': `<?php

namespace App\\Http\\Controllers;

class UserController
{
    public function index()
    {
        return 'Hello from UserController!';
    }
}`,
      'composer.json': JSON.stringify({
        name: 'tryngo/laravel',
        type: 'project',
        require: { 'php': '^8.1' },
        scripts: {
          'post-root-package-install': ["@php -r \"file_exists('env') || copy('env.example', '.env');\""],
        },
      }, null, 2),
      'artisan': `#!/usr/bin/env php
<?php
echo "Laravel CLI - Tryngo Education\\n";
echo "This is a simulated artisan command.\\n";`,
    },
  };
}

// ---------------------------------------------------------------------------
// Spring Boot
// ---------------------------------------------------------------------------
export function buildSpringProject(code: string): StackBlitzProject {
  return {
    template: 'spring-boot',
    files: {
      'src/main/java/com/example/demo/DemoApplication.java': `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/")
    public String hello() {
        return "Hello Spring Boot! 🚀";
    }
}`,
      'src/main/java/com/example/demo/DemoController.java': code,
      'src/main/resources/application.properties': `server.port=8080
spring.application.name=demo`,
      'pom.xml': `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Tryngo Spring Boot Project</description>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`,
    },
  };
}

// ---------------------------------------------------------------------------
// Angular
// ---------------------------------------------------------------------------
export function buildAngularProject(code: string): StackBlitzProject {
  return {
    template: 'angular',
    files: {
      'src/app/app.component.ts': code,
      'src/app/app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}`,
      'src/main.ts': `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`,
      'src/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Tryngo Angular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
      'src/styles.css': `body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; }`,
      'angular.json': JSON.stringify({
        version: 1,
        newProjectRoot: 'projects',
        projects: {
          demo: {
            projectType: 'application',
            root: '',
            sourceRoot: 'src',
            prefix: 'app',
            architect: {
              build: {
                builder: '@angular-devkit/build-angular:browser',
                options: {
                  outputPath: 'dist/demo',
                  index: 'src/index.html',
                  main: 'src/main.ts',
                  polyfills: ['zone.js'],
                  tsConfig: 'tsconfig.app.json',
                  assets: ['src/favicon.ico', 'src/assets'],
                  styles: ['src/styles.css'],
                },
              },
              serve: {
                builder: '@angular-devkit/build-angular:devserver',
                options: { buildTarget: 'demo:build' },
              },
            },
          },
        },
      }, null, 2),
      'tsconfig.json': JSON.stringify({
        compileOnSave: false,
        compilerOptions: {
          baseUrl: './',
          outDir: './dist/out-tsc',
          forceConsistentCasingInFileNames: true,
          strict: true,
          noImplicitOverride: true,
          noPropertyAccessFromIndexSignature: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
          sourceMap: true,
          declaration: false,
          downlevelIteration: true,
          experimentalDecorators: true,
          moduleResolution: 'node',
          importHelpers: true,
          target: 'ES2022',
          module: 'ES2022',
          useDefineForClassFields: false,
          lib: ['ES2022', 'dom'],
        },
      }, null, 2),
      'tsconfig.app.json': JSON.stringify({
        extends: './tsconfig.json',
        compilerOptions: { outDir: './out-tsc/app' },
        files: ['src/main.ts'],
        include: ['src/**/*.d.ts'],
      }, null, 2),
      'package.json': JSON.stringify({
        name: 'tryngo-angular',
        version: '0.0.0',
        scripts: {
          ng: 'ng',
          start: 'ng serve',
          build: 'ng build',
        },
        dependencies: {
          '@angular/animations': '^17.0.0',
          '@angular/common': '^17.0.0',
          '@angular/compiler': '^17.0.0',
          '@angular/core': '^17.0.0',
          '@angular/forms': '^17.0.0',
          '@angular/platform-browser': '^17.0.0',
          '@angular/platform-browser-dynamic': '^17.0.0',
          '@angular/router': '^17.0.0',
          rxjs: '~7.8.0',
          'tslib': '^2.3.0',
          'zone.js': '~0.14.0',
        },
        devDependencies: {
          '@angular-devkit/build-angular': '^17.0.0',
          '@angular/cli': '^17.0.0',
          '@angular/compiler-cli': '^17.0.0',
          typescript: '~5.2.0',
        },
      }, null, 2),
    },
    dependencies: {
      '@angular/animations': '^17.0.0',
      '@angular/common': '^17.0.0',
      '@angular/compiler': '^17.0.0',
      '@angular/core': '^17.0.0',
      '@angular/forms': '^17.0.0',
      '@angular/platform-browser': '^17.0.0',
      '@angular/platform-browser-dynamic': '^17.0.0',
      '@angular/router': '^17.0.0',
      rxjs: '~7.8.0',
      'tslib': '^2.3.0',
      'zone.js': '~0.14.0',
    },
  };
}

// ---------------------------------------------------------------------------
// Unified builder
// ---------------------------------------------------------------------------
export function buildProject(slug: FrameworkSlug, code: string): StackBlitzProject {
  switch (slug) {
    case 'nextjs': return buildNextJsProject(code);
    case 'nodejs': return buildNodeProject(code);
    case 'nestjs': return buildNestJsProject(code);
    case 'django': return buildDjangoProject(code);
    case 'laravel': return buildLaravelProject(code);
    case 'spring': return buildSpringProject(code);
    case 'angular': return buildAngularProject(code);
  }
}

// ---------------------------------------------------------------------------
// Default code per framework
// ---------------------------------------------------------------------------
export const DEFAULT_CODE: Record<FrameworkSlug, string> = {
  nextjs: `export default function Home() {
  return <h1>Hello Next.js! 🚀</h1>;
}`,
  nodejs: `console.log("Hello Node.js! 🚀");
const greeting = (name) => \`Hello, \${name}!\`;
console.log(greeting("World"));`,
  nestjs: `import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello NestJS! 🚀';
  }
}`,
  django: `from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello Django! 🚀")`,
  laravel: `<?php
Route::get('/', function () {
    return 'Hello Laravel! 🚀';
});`,
  spring: `@RestController
public class DemoController {
    @GetMapping("/")
    public String hello() {
        return "Hello Spring Boot! 🚀";
    }
}`,
  angular: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`<h1>Hello Angular! 🚀</h1>\`
})
export class AppComponent {}`,
};

// ---------------------------------------------------------------------------
// Simulated execution output
// ---------------------------------------------------------------------------
// Safe Node.js simulation: run user code inside a Web Worker (no DOM/window
// access), capturing console output — no execution in the page context.
export function simulateNode(code: string): Promise<{ output: string; error: string | null }> {
  const capture = `
    self.onmessage = function(ev) {
      const code = ev.data;
      const logs = [];
      const stringify = (a) => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a);
      const consoleObj = {
        log: function() { logs.push(Array.prototype.map.call(arguments, stringify).join(' ')); },
        error: function() { logs.push('Error: ' + Array.prototype.map.call(arguments, stringify).join(' ')); },
        warn: function() { logs.push('Warning: ' + Array.prototype.map.call(arguments, stringify).join(' ')); },
        info: function() { logs.push(Array.prototype.map.call(arguments, stringify).join(' ')); }
      };
      try {
        var fn = new Function('console', code);
        fn(consoleObj);
      } catch (e) {
        logs.push('Error: ' + (e && e.message ? e.message : String(e)));
      }
      self.postMessage({ logs: logs });
    };
  `;
  const blob = new Blob([capture], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  return new Promise((resolve) => {
    let settled = false;
    try {
      const worker = new Worker(url);
      const timeout = setTimeout(() => {
        if (settled) return;
        settled = true;
        worker.terminate();
        URL.revokeObjectURL(url);
        resolve({ output: '', error: 'Execution timed out (infinite loop? Max 2s).' });
      }, 2000);
      worker.onmessage = (e: MessageEvent) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        const logs: string[] = e.data?.logs || [];
        worker.terminate();
        URL.revokeObjectURL(url);
        resolve({
          output: logs.join('\n') || '(no output — code executed successfully)',
          error: null,
        });
      };
      worker.onerror = (e) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        worker.terminate();
        URL.revokeObjectURL(url);
        resolve({ output: '', error: 'Worker error: ' + e.message });
      };
      worker.postMessage(code);
    } catch (err) {
      settled = true;
      URL.revokeObjectURL(url);
      resolve({
        output: '',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  });
}

export function simulateOutput(slug: FrameworkSlug, code: string): { output: string; error: string | null } {
  const lines: string[] = [];
  let error: string | null = null;

  switch (slug) {
    case 'nodejs': {
      // Executed asynchronously in a Web Worker via simulateNode() from the
      // playground component; sync path never runs user code in page context.
      lines.push('(executing in sandboxed worker...)');
      break;
    }
    case 'nextjs':
      lines.push(
        '▲ Next.js 14.0.0 (Tryngo Simulation)',
        '  Local:        http://localhost:3000',
        '  Ready in 1.2s',
        '',
        '○ Compiling / ...',
        '✓ Compiled / in 0.8s',
        '  GET / 200 in 12ms',
        '',
        '--- Page Output ---',
        extractTsxContent(code),
      );
      break;
    case 'nestjs':
      lines.push(
        '[Nest] 12345  - 01/01/2026, 12:00:00 AM   [NestFactory] Starting Nest application...',
        '[Nest] 12345  - 01/01/2026, 12:00:00 AM   [InstanceLoader] AppModule dependencies initialized',
        '[Nest] 12345  - 01/01/2026, 12:00:00 AM   [RoutesResolver] AppController {/}',
        '[Nest] 12345  - 01/01/2026, 12:00:00 AM   [NestApplication] Nest application successfully started',
        '',
        'Application is running on: http://localhost:3000',
        '',
        '--- GET / ---',
        extractReturnString(code) || 'Hello NestJS! 🚀',
      );
      break;
    case 'django':
      lines.push(
        'Watching for file changes with StatReloader',
        'Performing system checks...',
        'System check identified no issues.',
        'January 01, 2026 - 12:00:00',
        "Django version 4.2, using settings 'tryngo.settings'",
        'Starting development server at http://0.0.0.0:8000/',
        'Quit the server with CONTROL-C.',
        '',
        '--- GET / ---',
        'HTTP 200 OK',
        extractHttpResponse(code) || 'Hello Django! 🚀',
      );
      break;
    case 'laravel':
      lines.push(
        'Laravel development server started: http://0.0.0.0:8000',
        '[Sat Jan  1 12:00:00 2026] PHP 8.1.0 Development Server started',
        '',
        '--- GET / ---',
        'HTTP/1.1 200 OK',
        'Content-Type: text/html',
        '',
        extractLaravelReturn(code) || 'Hello Laravel! 🚀',
      );
      break;
    case 'spring':
      lines.push(
        '  .   ____          _            __ _ _',
        " / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\",
        "( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\",
        '\\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )',
        "  ' |____| .__|_| |_|_| |_\\__, | / / / /",
        ' =========|_|==============|___/=/_/_/_/',
        ' :: Spring Boot ::                (v3.2.0)',
        '',
        'Started DemoApplication in 1.234 seconds',
        '--- GET / ---',
        'HTTP/1.1 200',
        'Content-Type: text/plain',
        '',
        extractSpringReturn(code) || 'Hello Spring Boot! 🚀',
      );
      break;
    case 'angular':
      lines.push(
        '✔ Browser application bundle generation complete.',
        '',
        'Initial Chunk Files   | Names         |  Raw Size',
        'main.js               | main          |   1.23 MB',
        'styles.css            | styles        |  12.45 kB',
        '',
        'Build at: 2026-01-01T12:00:00.000Z - Hash: abc123def456 - Time: 2345ms',
        '',
        'Angular Live Development Server is listening on localhost:4200',
        '',
        '--- AppComponent ---',
        extractAngularTemplate(code) || '<h1>Hello Angular! 🚀</h1>',
      );
      break;
  }

  return { output: lines.join('\n'), error };
}

function extractTsxContent(code: string): string {
  const match = code.match(/return\s*\(?\s*(<[\s\S]*?>[\s\S]*?<\/[\s\S]*?>)/);
  return match ? match[1].replace(/\s+/g, ' ').trim() : '(JSX rendered)';
}

function extractReturnString(code: string): string | null {
  const match = code.match(/return\s+['"`](.+?)['"`]/);
  return match ? match[1] : null;
}

function extractHttpResponse(code: string): string | null {
  const match = code.match(/HttpResponse\(["'](.+?)["']/);
  return match ? match[1] : null;
}

function extractLaravelReturn(code: string): string | null {
  const match = code.match(/return\s+['"](.+?)['"]/);
  return match ? match[1] : null;
}

function extractSpringReturn(code: string): string | null {
  const match = code.match(/return\s+["'](.+?)["']/);
  return match ? match[1] : null;
}

function extractAngularTemplate(code: string): string | null {
  const match = code.match(/template:\s*`([\s\S]*?)`/);
  return match ? match[1].replace(/\s+/g, ' ').trim() : null;
}
