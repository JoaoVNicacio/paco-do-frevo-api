<p align="center">
  <a href="https://pacodofrevo.org.br/" target="blank">
    <img src="https://pacodofrevo.org.br/wp-content/uploads/2021/10/logo-paco.jpg" width="200" alt="Paço do Frevo Logo" />
  </a>
</p>

<h1 align="center">PAÇO DO FREVO — API</h1>

<br>

<p align="justify">

This repository contains the source code of a proof of concept developed in partnership with Paço do Frevo, a cultural institution dedicated to the preservation, documentation, and promotion of Frevo.

The project explores a software-based approach to mapping and documenting Frevo associations and the people involved in their activities, covering information about their history, organization, operations, and related data.

The solution was developed as part of a university research project, exploring architectural decisions, data modeling, persistence strategies, and communication between application layers.

</p>

---

## Project Status

This repository contains a proof of concept developed as part of a university research project in partnership with Paço do Frevo.

The proposed solution was presented to researchers and stakeholders and validated as a feasible approach. It was not intended as a production-ready system.

---

## Technical Decisions

### Architecture

> ---

#### Clean Architecture

The solution adopts the Clean Architecture approach to establish clear boundaries between the different layers of the application.

This structure promotes separation of concerns and decouples business rules and application logic from infrastructure and external frameworks, making the system easier to understand, maintain, and evolve.

#### Aggregates

The architecture also applies the concept of Aggregates to organize related domain entities into cohesive units and establish clear boundaries for business rules.

For example, entities related to associations and users are organized into separate Aggregates, providing a structured approach to managing their respective responsibilities.

> ---

### Layer Communication

The application was designed around a layered structure, with each layer having a specific responsibility and communicating with the others through defined boundaries.

This approach helps keep business rules independent from infrastructure concerns while providing a clear flow for requests and data throughout the application.

---

## Key Tools and Dependencies

> ---

* **TypeScript** — Used as the primary programming language, providing static typing and improved tooling for building and maintaining the application.

* **NestJS** — A Node.js framework used to structure the API through modular architecture, dependency injection, and separation of responsibilities.

* **TypeORM** — Used to handle object-relational mapping and interactions with relational data.

* **Mongoose** — Used for object modeling and interaction with MongoDB.

* **NestJS JWT** — Used to implement JWT-based authentication and access control.

* **NestJS Cache Manager** — Used to implement application-level caching and reduce unnecessary data access.

* **AutoMapper** — Used to handle object-to-object mappings between application models and domain-related representations, reducing repetitive mapping code.

* **bcrypt** — Used for securely hashing user passwords before persistence.

* **class-validator** — Used for declarative validation of incoming data and request objects.

> ---

## Project Outcome

The proof of concept demonstrated the feasibility of the proposed architecture and provided a technical foundation for discussing the digitization and organization of information related to Frevo associations.

The project was subsequently submitted to the VI Encontro de Pesquisadores do Frevo.

---

## Running the Project

### Installation

```bash
npm install
```

### Running the application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

### Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

## Technologies

* TypeScript
* Node.js
* NestJS
* TypeORM
* Mongoose
* JWT
* Redis
* AutoMapper
* bcrypt
* class-validator

---

## License

This project is part of an academic research initiative developed in partnership with Paço do Frevo.
