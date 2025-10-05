# CLAUDE.md

This file provides guidance to agents when working with code in this repository.

# Project Structure

This is an Nx monorepo workspace with the following setup:
- **Framework**: Next.js 15.2.4 with React 19
- **Testing**: Jest for unit tests, Playwright for E2E tests
- **Styling**: Tailwind CSS with PostCSS
- **Linting**: ESLint 9 with TypeScript ESLint
- **TypeScript**: Strict mode enabled with composite builds

**Project Status:** The project was recently scaffolded using NX. It currently has no actual applications or functionality!

## Applications

### nx-test (`apps/nx-test`)
Next.js 15 application with React 19:
- **Source code**: `apps/nx-test/src/app/` (Next.js App Router)
- **Public assets**: `apps/nx-test/public/`
- **Unit/component tests**: `apps/nx-test/specs/*.spec.tsx` (Jest + Testing Library)
- **Configuration files**: `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `jest.config.ts`
- **Coverage output**: `coverage/apps/nx-test/`
- **Dev server**: http://localhost:3000

### nx-test-e2e (`apps/nx-test-e2e`)
Playwright E2E test suite:
- **Test files**: `apps/nx-test-e2e/src/*.spec.ts`
- **Configuration**: `playwright.config.ts`
- Tests run against chromium, firefox, and webkit
- Automatically starts dev server before running tests

# Common Commands

## Development
```bash
npx nx run @nx-test/nx-test:dev     # Start dev server at http://localhost:3000
npx nx run @nx-test/nx-test:start   # Serve production build
```

## Building
```bash
npx nx run @nx-test/nx-test:build   # Production build
```

## Testing
```bash
npx nx run @nx-test/nx-test:test              # Run unit tests (Jest)
npx nx run @nx-test/nx-test:test --watch      # Run tests in watch mode
npx nx run @nx-test/nx-test-e2e:e2e           # Run E2E tests (Playwright)
npx nx run-many -t test                       # Run tests for multiple projects
```

## Linting & Formatting
```bash
npx nx run @nx-test/nx-test:lint    # Lint with ESLint (includes @nx/enforce-module-boundaries)
npx nx format:write                 # Format code with Prettier
npx nx format:check                 # Check formatting without changes
```

## Type Checking
```bash
npx nx run @nx-test/nx-test:typecheck   # Run TypeScript type checking
```

## Affected Commands
```bash
npx nx affected -t test             # Test only affected projects
npx nx affected -t build            # Build only affected projects
npx nx affected -t lint,test,build  # Run multiple targets on affected projects
npx nx affected:graph               # Visualize affected projects
```

## Project Management
```bash
npx nx graph                        # View interactive project graph
npx nx show project @nx-test/nx-test  # Show project details
npx nx list                         # List installed plugins
```

# Architecture Notes

## Nx Configuration
- Uses Nx plugins for TypeScript, Next.js, Playwright, ESLint, and Jest
- Tasks are inferred automatically from plugins and configured in `nx.json`
- Named inputs define what files are considered for caching: `default`, `production`, and `sharedGlobals`
- Nx Cloud is configured with ID `68e13322b3d9b2316c1ef7ac`

## TypeScript Configuration
- Base configuration uses strict mode with composite builds enabled
- Module resolution set to `bundler` with ES2022 target
- Declaration maps and emit declaration only are enabled for better IDE support

## Testing Strategy
- Unit tests: Jest with jsdom environment via `@testing-library/react`
- E2E tests: Playwright running against multiple browsers
- Test target depends on build completion (`dependsOn: ["^build"]`)

## Coding Conventions
- **TypeScript everywhere**: All source files use TypeScript
- **Naming conventions**:
  - React components: `PascalCase` files (e.g., `Button.tsx`)
  - Hooks and utilities: `camelCase` files (e.g., `useAuth.ts`, `formatDate.ts`)
- **Next.js App Router structure**:
  - Pages: `src/app/page.tsx`, `src/app/about/page.tsx`
  - API routes: `src/app/api/*/route.ts`
- **Test files**: `*.spec.ts` or `*.spec.tsx` pattern
- **ESLint**: Enforced via `eslint.config.mjs`, includes `@nx/enforce-module-boundaries`
- **Prettier**: Format with `npx nx format:write`

## Commit Conventions
- Follow Conventional Commits format:
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `docs:` - Documentation changes
  - `refactor:` - Code refactoring
  - `test:` - Test updates
  - `chore:` - Build/tooling changes
- Run relevant Nx targets before committing: `lint`, `test`, and E2E when applicable
- For broader changes, consider `npx nx affected -t lint,test,build`

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

# CI Error Guidelines

If the user wants help with fixing an error in their CI pipeline, use the following flow:
- Retrieve the list of current CI Pipeline Executions (CIPEs) using the `nx_cloud_cipe_details` tool
- If there are any errors, use the `nx_cloud_fix_cipe_failure` tool to retrieve the logs for a specific task
- Use the task logs to see what's wrong and help the user fix their problem. Use the appropriate tools if necessary
- Make sure that the problem is fixed by running the task that you passed into the `nx_cloud_fix_cipe_failure` tool


<!-- nx configuration end-->

