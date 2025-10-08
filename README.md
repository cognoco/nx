# Nx Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A modern full-stack monorepo powered by [Nx](https://nx.dev), featuring web frontend, mobile app, backend services, and a type-safe API layer.

## Project Status

🚧 **In Development** - This project is currently being scaffolded with the following structure:

### Applications (`apps/`)

- **web** - Next.js 15 web application (React 19) - \*PoC scaffolding - not yet functioning app\*\*
- **web-e2e** - Playwright E2E tests for web
- **server** - Node.js backend server (esbuild) - \*PoC scaffolding - not yet functioning app\*\*
- **server-e2e** - E2E tests for server

### Packages (`packages/`)

- **api** - oRPC API layer with Zod validation
- **api-client** - Client for consuming the oRPC API
- **database** - Prisma database client
- **schemas** - Shared Zod schemas
- **supabase-client** - Supabase client library

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
# Start all dev servers (web + server) in one terminal
pnpm dev

# Or run individually:
pnpm nx dev web           # Web dev server (Next.js)
pnpm nx serve server      # Server in development mode
```

### Building

```bash
# Build a specific app
pnpm nx build web
pnpm nx build server

# Build all apps
pnpm nx run-many -t build

# Build only what changed
pnpm nx affected -t build
```

### Testing

```bash
# Run unit tests
pnpm nx test web
pnpm nx test server

# Run E2E tests
pnpm nx e2e web-e2e
pnpm nx e2e server-e2e

# Run tests for all projects
pnpm nx run-many -t test

# Run tests for affected projects only
pnpm nx affected -t test
```

### Linting & Formatting

```bash
# Lint a project
pnpm nx lint web
pnpm nx lint server

# Format all files
pnpm nx format:write

# Check formatting without changes
pnpm nx format:check
```

## Adding New Projects

### Generate a New App

```bash
# Next.js app
pnpm nx g @nx/next:app my-app

# React Native app
pnpm nx g @nx/react-native:app mobile-app

# NestJS backend
pnpm nx g @nx/nest:app backend

# Node.js app
pnpm nx g @nx/node:app my-service
```

### Generate a New Library

```bash
# Shared library in packages/
pnpm nx g @nx/node:lib my-lib --directory=packages/my-lib

# React component library
pnpm nx g @nx/react:lib ui --directory=packages/ui

# TypeScript library
pnpm nx g @nx/js:lib types --directory=packages/types
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

Run `pnpm nx list` to see all installed plugins.

## Project Graph

Visualize your workspace structure and dependencies:

```bash
# Interactive project graph
pnpm nx graph

# See what's affected by your changes
pnpm nx graph --affected
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
pnpm nx connect
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
pnpm nx show project web

# Run affected tasks
pnpm nx affected -t lint,test,build

# Type check (server only)
pnpm nx typecheck server

# Clear Nx cache
pnpm nx reset

# List available generators
pnpm nx list @nx/next

# Show help for a generator
pnpm nx g @nx/next:app --help
```

## Resources

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [oRPC Documentation](https://orpc.dev)
- [Nx Community Discord](https://go.nx.dev/community)

## Contributing

See [CLAUDE.md](./CLAUDE.md) or [AGENTS.md](./AGENTS.md) for development guidelines and project conventions.

## License

MIT
