# Nx Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A modern full-stack monorepo powered by [Nx](https://nx.dev), featuring web frontend, mobile app, backend services, and a type-safe API layer.

## Project Status

🚧 **In Development** - This project is currently being scaffolded with the following structure:

### Applications (`apps/`)
- **frontend** - Next.js 15 web application (React 19) - *boilerplate*
- **frontend-e2e** - Playwright E2E tests for frontend - *boilerplate*
- **nx-test** - Original scaffold app - *to be removed*
- **nx-test-e2e** - Original scaffold E2E tests - *to be removed*

### Packages (`packages/`)
- **api** - oRPC API layer with Zod validation - *starter configured*

### Planned Structure (example)
- **apps/web** - Production web frontend
- **apps/mobile** - React Native mobile application
- **apps/backend** - Node.js/NestJS backend server
- **packages/types** - Shared TypeScript types
- **packages/ui** - Shared UI components

## Package Manager

This project uses **pnpm** as its package manager.

```bash
# Install dependencies
pnpm install

# Add a dependency to workspace root
pnpm add -w <package>

# Add a dependency to a specific package
pnpm add <package> --filter @nx-test/<package-name>
```

## Quick Start

### Development

```bash
# Run the frontend dev server
npx nx dev frontend

# Run the API in development mode
npx nx serve api
```

### Building

```bash
# Build a specific app
npx nx build frontend

# Build all apps
npx nx run-many -t build

# Build only what changed
npx nx affected -t build
```

### Testing

```bash
# Run unit tests
npx nx test frontend

# Run E2E tests
npx nx e2e frontend-e2e

# Run tests for all projects
npx nx run-many -t test

# Run tests for affected projects only
npx nx affected -t test
```

### Linting & Formatting

```bash
# Lint a project
npx nx lint frontend

# Format all files
npx nx format:write

# Check formatting without changes
npx nx format:check
```

## Adding New Projects

### Generate a New App

```bash
# Next.js app
npx nx g @nx/next:app my-app

# React Native app
npx nx g @nx/react-native:app mobile-app

# NestJS backend
npx nx g @nx/nest:app backend

# Node.js app
npx nx g @nx/node:app my-service
```

### Generate a New Library

```bash
# Shared library in packages/
npx nx g @nx/node:lib my-lib --directory=packages/my-lib

# React component library
npx nx g @nx/react:lib ui --directory=packages/ui

# TypeScript library
npx nx g @nx/js:lib types --directory=packages/types
```

## Installed Nx Plugins

- `@nx/next` - Next.js applications
- `@nx/react` - React libraries and components
- `@nx/react-native` - React Native mobile apps
- `@nx/node` - Node.js applications and libraries
- `@nx/nest` - NestJS applications
- `@nx/jest` - Unit testing with Jest
- `@nx/playwright` - E2E testing with Playwright
- `@nx/eslint` - Linting with ESLint

Run `npx nx list` to see all installed plugins.

## Project Graph

Visualize your workspace structure and dependencies:

```bash
# Interactive project graph
npx nx graph

# See what's affected by your changes
npx nx affected:graph
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Mobile**: React Native (planned)
- **Backend**: Node.js/NestJS (planned)
- **API Layer**: oRPC with Zod validation
- **Testing**: Jest, Playwright, Testing Library
- **Linting**: ESLint 9, Prettier
- **Type Checking**: TypeScript (strict mode)
- **Build System**: Nx with caching and task orchestration

## Nx Cloud

This workspace is connected to Nx Cloud for distributed caching and task execution.

```bash
# Connect to Nx Cloud
npx nx connect
```

[Learn more about Nx Cloud](https://nx.app/?utm_source=nx_project)

## Development Tools

### Nx Console

Install the Nx Console extension for your IDE to get a visual interface for running tasks and generating code:

- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- [JetBrains Plugin](https://plugins.jetbrains.com/plugin/21060-nx-console)

## Useful Commands

```bash
# Show project details
npx nx show project frontend

# Run affected tasks
npx nx affected -t lint,test,build

# Clear Nx cache
npx nx reset

# List available generators
npx nx list @nx/next

# Show help for a generator
npx nx g @nx/next:app --help
```

## Resources

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [oRPC Documentation](https://orpc.dev)
- [Nx Community Discord](https://go.nx.dev/community)

## Contributing

See [CLAUDE.md](./CLAUDE.md) or [AGENTS.md](./AGENTS.md)for development guidelines and project conventions.

## License

MIT
