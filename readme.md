<b>Note: Inspired by NestJS</b>

<p align="center">A simple <a href="http://nodejs.org" target="_blank">Node.js</a> OOP framework for building apps in the way you like.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/invierno.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/invierno.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/invierno.svg" alt="NPM Downloads" /></a>

## Description

Invierno is a simple framework for building just API applications with minimal configuration, following best practices and patterns, is built with <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> (preserves compatibility with pure JavaScript) and combines the best of AOP & OOP

<p>You can use whatever you want with Invierno, Express, Serverless, Fastify... It doesn't matter, you are in control to use what you want.</p>

## Getting started

Configure your starting point as follow (index.ts)

```
import { Main, IConfiguration } from 'invierno';
import { HttpServer } from 'invierno-fastify';
import './controllers';

@Main({
  logger: true, // Or provide any logger instance you want like console
})
@HttpServer(3000) // Enable fastify to serve as http server
export class Application implements IMain {
  // onLoad?(configuration: IAppConfiguration): IAppConfiguration | Promise<IAppConfiguration>;
  // onLoaded?(configuration: IAppConfiguration): void;
}
```

Now configure your controller (controllers/index.ts)

```
import { Controller, Get } from 'invierno';

@Controller('api/v1/status')
export class ControllerTest {
  @Get()
  public status() {
    return 'ok';
  }
}
```

## Looking for docs?

Go <a href="https://blesfia.github.io/invierno/module-Getting%2520started.html" target="_blank">here</a>
