# Overview

This project is a web application developed using SvelteKit as part of the Web Applications module. The application simulates a real-world service-based business (a beauty salon) and allows users to explore services, view stylists, and interact with a modern, responsive user interface.

The software demonstrates core front-end and web application concepts such as component-based architecture, reactivity, routing, state management, responsive design, and user interaction patterns. It also applies modern UI/UX practices to create a clean and professional user experience.

The purpose of creating this software was to strengthen my understanding of Svelte and SvelteKit, practice building interactive web interfaces, and apply web development principles that are commonly used in real production projects.

Video for module 1:
[Software Demo Video](https://youtu.be/y4Pbc4CoYT4)

Video for module 2
[Software Demo Video](https://youtu.be/Ospjq77kkuI)



# Module 1: Web Application Development (SvelteKit)

## Development Environment

This project was developed using the following tools and technologies:

- Visual Studio Code as the primary code editor

- Node.js to run the development server and manage dependencies

- pnpm for package management

- SvelteKit as the application framework

- HTML, CSS, and JavaScript (TypeScript-ready) for building the UI and logic

- Git & GitHub for version control and project hosting

The application was tested locally using the SvelteKit development server and viewed in modern web browsers.

## Tech Stack
- SvelteKit 2 / Svelte 5
- Vite 7
- Tailwind CSS v4
- Drizzle ORM + drizzle‑kit
- PostgreSQL (via Docker Compose for local dev)
- Lucide icons, Bits UI, utilities

## Technologies and Concepts Learned

During the development of this project, the following concepts and skills were practiced:

Svelte component structure and reusable components

Reactive variables and state management in Svelte

Page routing and layouts using SvelteKit

Handling user interactions (clicks, hover states, mobile behavior)

Responsive design for desktop and mobile devices

Styling components with modern CSS

Organizing a scalable project structure

Debugging and problem-solving in a real web application


# Useful Websites

* [https://kit.svelte.dev](https://kit.svelte.dev/docs)
* [https://svelte.dev](https://svelte.dev/docs)
* [https://tailwindcss.com](https://tailwindcss.com/docs)
* [https://developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [https://vitejs.dev](https://vitejs.dev/guide)
* [https://www.youtube.com](https://www.youtube.com/watch?v=4h8B080Mv4U)
* [https://stackoverflow.com](https://stackoverflow.com/questions/tagged/svelte)



# Module 2: Relational Database Layer (PostgreSQL & Drizzle ORM)

## Development Environment

This module was developed using the following tools and technologies:

- Visual Studio Code as the primary code editor
- Node.js to run migrations and database scripts
- pnpm for package management
- PostgreSQL as the relational database
- Drizzle ORM for type-safe database queries and schema management
- Drizzle Kit for migrations and database studio
- Git & GitHub for version control and project hosting

The database was tested locally using Drizzle Studio.

### Tech Stack
- PostgreSQL (relational database)
- Drizzle ORM 0.45.0
- Drizzle Kit 0.31.8
- postgres.js (PostgreSQL client)
- TypeScript for type-safe queries

## Technologies and Concepts Learned

During the development of this module, the following concepts and skills were practiced:

- Designing relational database schemas with proper normalization
- Creating table relationships (one-to-many, many-to-many)
- Using PostgreSQL enums for restricted value types
- Implementing foreign keys and constraints for data integrity
- Writing type-safe database queries with Drizzle ORM
- Managing database migrations with Drizzle Kit
- Building CRUD operations for all database entities
- Implementing complex business logic (availability calculation, conflict detection)
- Working with timestamps and date/time operations
- Preserving historical data with snapshots (price_snapshot)
- Testing database relationships and constraints

## Useful Websites

* [https://www.youtube.com/watch?v=7-NZ0MlPpJA](https://www.youtube.com/watch?v=7-NZ0MlPpJA)
* [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
* [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
* [Database Design Best Practices Video](https://www.youtube.com/watch?v=QpdhBUYk7Kk)