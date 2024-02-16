<p align="center">
  <a href="https://pacodofrevo.org.br/" target="blank"><img src="https://pacodofrevo.org.br/wp-content/uploads/2021/10/logo-paco.jpg" width="200" alt="Paço do Frevo Logo" /></a>
</p>

<h1 align="center"> PAÇO DO FREVO - API </h1>

<br></br>

<p align="justify">
Our software is like a trusted friend for frevo, the heartbeat of Pernambuco's culture and an intangible heritage of humanity. It's here to preserve all the magic of frevo, from its colorful history to the vibrant community that keeps it alive and kicking.

Imagine it as a digital treasure chest, holding onto every little detail about frevo associations and the fantastic folks who make them tick. We're talking about everything from the stories behind each group to the nuts and bolts of how they run, even the nitty-gritty place of frevo in their finances. Our mission? To make sure that all this cultural richness is not only kept safe but also super easy to explore and enjoy.

But it's not just about looking back. By lending a digital hand to the iconic Paço do Frevo institution, we're helping frevo stay as fresh and exciting as ever. Because traditions like these aren't just about the past, they're the heartbeat of our future.
</p>

---

## Technical Decisions:

### Architecture:
> ---
> #### Clean Architecture:
>Our software adopts the Clean Architecture paradigm, which provides a robust level of abstraction and decoupling across its implementation and various layers. This approach ensures a clear separation of concerns, delineating distinct realms for business rules, application logic, and infrastructure within the API.
> #### Aggregates:
>To enhance organization and clarity, our architecture employs the concept of Aggregates, which clusters related entities into cohesive units. For instance, entities like Association and User are encapsulated within separate Aggregates, facilitating streamlined management and maintenance of business rules.
>
> ---

### Databases:
> ---
>> <img src="https://assets.stickpng.com/images/584815fdcef1014c0b5e497a.png" height="30" alt="PostgreSQL Logo" /></img>
> - <h5>PostgreSQL</h5> → For storing the associations, the frevo entities and its related data.
>
>> <img src="https://seeklogo.com/images/M/mongodb-logo-655F7D542D-seeklogo.com.png" height="30" alt="MongoDB Logo" /></img>
> - <h5>MongoDB</h5> → For storing the users data, since it is a little bit more volatile on its rules.
>
>> <img src="https://static-00.iconduck.com/assets.00/redis-plain-icon-2048x1748-fmvimw1g.png" width="30" alt="Redis Logo" /></img>
> - <h5>Redis</h5> → For caching data for a defined span of time give more performance.
> <hr></hr>


### Key Tools and dependencies:
> ---
> - **Typescript**: We leverage Typescript to bring strong typing, good use of design patterns and enhanced tooling support to our development process, enhancing code quality and developer productivity.
> - **NestJS**: By utilizing NestJS, a powerful Node.js framework, we ensure scalable and maintainable server-side applications with its modular architecture and dependency injection system.
> - **TypeORM**: TypeORM simplifies database interactions by providing a flexible and intuitive ORM for TypeScript and JavaScript, streamlining database operations and reducing development time but also giving strong relations on the database and speedy queries.
> - **Mongoose**: Mongoose offers elegant MongoDB object modeling for Node.js applications, allowing us to work seamlessly with MongoDB databases and leverage its schema-based solution for data validation and manipulation.
> - **NestJS/JWT**: With NestJS/JWT, we can easily integrate JSON Web Tokens (JWT) authentication into our NestJS applications, ensuring secure access control and user authentication.
> - **NestJS/CacheManager**: The NestJS/CacheManager module enables efficient caching mechanisms in our NestJS applications, improving performance and scalability by reducing database load and response times.
> - **Automapper**: Automapper automates object-to-object mapping, simplifying data transformations and reducing boilerplate code, thus enhancing maintainability and readability of our codebase.
> - **bcrypt**: By utilizing bcrypt for password hashing and encryption, we enhance the security of user credentials, protecting sensitive data from unauthorized access and potential breaches.
> - **class-validator**: Class-validator provides a straightforward and declarative way to implement input validation and data transformation in our application, ensuring data integrity and consistency across the system.
> ---

---
<br></br>
<h2 align="center"> About the Framework we use: </h2>
<br></br>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
