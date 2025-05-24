# SOLID Principle Tutorial

SOLID is an acronym for five design principles used in OOP for designing a software. The benefit of following these principles involves:

- Makes your software easy to maintain
- Easy to scale (Scalability)
- Easy to understand (Comprehensible)
- Resilient to change

#### S - Single Responsibility Principle

A class should do only one thing or have only one responsibility, ergo have only one reason to change or be modified. an example is a class that handles user should not also handle logging of users, because if it does, it now has two reasons to change "User" and "logging". **Note:** that in a more complex app where the user logic becomes more complex you can further split into "UserQueryService" and "UserCommandService" (Command Query Responsibility Segregation).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
