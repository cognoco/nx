# PoC Plan: Nx Monorepo with Functional Parity to bts-test

## Overview

This plan outlines building a proof-of-concept (PoC) Nx monorepo that achieves **functional parity** with the bts-test Turborepo project, but using **Nx-native patterns and conventions**. The goal is to compare developer experience, build performance, and scalability between the two monorepo solutions.

### Key Principle
We are **NOT** recreating bts-test's architecture. We are recreating its **functionality** using the Nx way of doing things.

### Technology Stack

**Differences from bts-test**:
- **Database & Auth**: Supabase (instead of Neon + Better-Auth)
- **Mobile Routing**: Expo Router (instead of React Navigation)
- **Monorepo**: Nx (instead of Turborepo)
- **Linting and formatting**: ESLint+Prettier with Nx (instead of Ultracite)

**Same as bts-test**:
- **Web Framework**: Next.js 15 with React 19
- **Mobile Framework**: React Native with Expo
- **API Layer**: oRPC with Zod validation
- **ORM**: Prisma (configured for Supabase)
- **Styling**: Tailwind CSS and ShadCN
- **Package Manager**: pnpm

## Phase 0: Functional Inventory (1 hour)

**Goal**: Understand what bts-test *does*, not how it's built.

### Deliverables

#### Functional Checklist
- ✅ Todo CRUD operations
- ✅ User authentication (Supabase Auth instead of Better-Auth)
- ✅ Database operations (Prisma with Supabase)
- ✅ Type-safe API (oRPC)
- ✅ Web UI (Next.js)
- ✅ Mobile UI (React Native/Expo with Expo Router)
- ✅ Shared validation (Zod schemas)
- ✅ Shared database client (Prisma)
- ✅ Shared API client (oRPC client factory)

#### Testing Checklist
Manual tests that prove each function works:
1. Database connection and migrations work
2. API endpoints respond correctly
3. Web UI performs CRUD operations
4. User can sign up and log in (web)
5. Protected routes require authentication
6. Mobile app performs CRUD operations
7. User can sign up and log in (mobile)
8. Data syncs between web and mobile

#### Out of Scope
- Exact file structure matching bts-test
- Naming conventions matching bts-test
- Package organization matching bts-test

## Phase 1: Nx-Native Scaffolding (2-3 hours)

**Goal**: Generate Nx-idiomatic structure that *can* support bts-test functionality.

**Approach**: Use Nx generators exclusively where possible.

### Step 1.1: Generate Applications

```bash
# Backend API (Node.js with Express)
npx nx g @nx/node:app server --directory=apps/server --framework=express

# Web frontend
npx nx g @nx/next:app web --directory=apps/web

# Mobile app with Expo Router
npx nx g @nx/expo:app mobile --directory=apps/mobile

# Remove boilerplate apps
rm -rf apps/nx-test apps/nx-test-e2e apps/frontend apps/frontend-e2e
```

**Manual checkpoint**: `npx nx run-many -t build` succeeds for all apps

### Step 1.2: Generate Shared Libraries (The Nx Way)

Nx has strong opinions about library types. Follow them:

```bash
# Database library (buildable, publishable to other apps)
npx nx g @nx/node:lib database --directory=packages/database --buildable

# Schemas library (buildable, pure TypeScript)
npx nx g @nx/js:lib schemas --directory=packages/schemas --buildable

# API client library (buildable)
npx nx g @nx/node:lib api-client --directory=packages/api-client --buildable
```

**Note**: Nx may encourage MORE granular libraries than Turborepo. Consider adding:
- `packages/supabase-client` - Shared Supabase client configuration
- `packages/ui` - Shared UI components (if needed)
- Feature-specific libraries as needed

**Manual checkpoint**: `npx nx graph` shows clean dependency graph

### Step 1.3: Configure Tooling (Nx Defaults + Supabase)

**Keep Nx defaults**:
- ESLint setup (Nx way, not Ultracite)
- Jest configuration
- Build caching
- Playwright for E2E

**Add project-specific tooling**:
- Prisma to `packages/database` (configured for Supabase)
- Supabase CLI and client libraries
- oRPC to `apps/server`
- Expo Router to `apps/mobile`

**Manual checkpoint**: `pnpm lint:check` and `pnpm test` pass (even with empty implementations)

### Step 1.4: Add Placeholder Files

Minimal setup to prove structure works:

**Database Package** (`packages/database`):
- `prisma/schema.prisma` - Prisma schema pointing to Supabase
- `src/index.ts` - Export Prisma client singleton

**Schemas Package** (`packages/schemas`):
- `src/todo.ts` - Placeholder Zod schemas for todo operations
- `src/auth.ts` - Placeholder Zod schemas for auth (if needed)
- `src/index.ts` - Re-export all schemas

**API Client Package** (`packages/api-client`):
- `src/index.ts` - Placeholder oRPC client factory
- `src/types.ts` - Shared TypeScript types

**Server App** (`apps/server`):
- `src/main.ts` - Placeholder Express + oRPC server setup
- `src/routes/` - Placeholder route structure

**Web App** (`apps/web`):
- `src/app/page.tsx` - Placeholder homepage
- `src/app/todos/page.tsx` - Placeholder todos page
- `src/lib/supabase.ts` - Supabase client configuration

**Mobile App** (`apps/mobile`):
- `app/_layout.tsx` - Expo Router root layout
- `app/index.tsx` - Placeholder home screen
- `app/todos.tsx` - Placeholder todos screen
- `lib/supabase.ts` - Supabase client configuration for React Native

**Manual checkpoint**: `pnpm dev` starts all apps (even if they don't do anything yet)

## Phase 2: Vertical Slice Implementation

Build functionality incrementally using vertical slices.

### Slice 1: Database + Schemas (2 hours)

**Goal**: Shared packages work correctly.

**Why this order**: Nx emphasizes library dependencies. Prove they work first.

#### Tasks
1. Set up Supabase project and get connection string
2. Complete Prisma schema in `packages/database/prisma/schema.prisma`:
   - Todo model (id, text, completed, userId, createdAt, updatedAt)
   - Use Supabase's built-in auth.users table for user references
3. Configure Prisma client export in `packages/database/src/index.ts`
4. Create initial migration and push to Supabase
5. Complete Zod schemas in `packages/schemas/src/todo.ts`:
   - `todoCreateSchema` - For creating todos
   - `todoUpdateSchema` - For updating todos
   - `todoDeleteSchema` - For deleting todos
6. Add unit tests for schema validation
7. Configure Nx dependency graph

#### Manual Checkpoints
- [ ] `pnpm --filter @nx-test/database db:push` works
- [ ] Supabase dashboard shows `Todo` table
- [ ] `pnpm --filter @nx-test/schemas test` passes
- [ ] `npx nx graph` shows correct dependencies

#### Completion Criteria
- Prisma client can be imported from `@nx-test/database`
- Zod schemas can be imported from `@nx-test/schemas`
- All tests pass

### Slice 2: Server API (3-4 hours)

**Goal**: Backend works with type-safe oRPC.

#### Tasks
1. Set up oRPC server in `apps/server/src/main.ts`
2. Create todo service in `apps/server/src/services/todo.service.ts`:
   - `createTodo(input)` - Create new todo
   - `getTodos()` - Get all todos for authenticated user
   - `updateTodo(id, input)` - Update todo
   - `deleteTodo(id)` - Delete todo
3. Connect to Prisma client from `@nx-test/database`
4. Use Zod schemas from `@nx-test/schemas` for validation
5. Add authentication middleware using Supabase JWT validation
6. Create oRPC router and export type
7. Add unit tests for todo service
8. Add integration tests for API endpoints

#### Manual Checkpoints
- [ ] `pnpm --filter server dev` starts server on expected port
- [ ] Curl/Postman can hit health check endpoint
- [ ] Can create todo via API (with auth token)
- [ ] Can list todos via API (with auth token)
- [ ] Unauthenticated requests are rejected
- [ ] `pnpm --filter server test` passes
- [ ] `npx nx affected:graph` shows server depends on database & schemas

#### Completion Criteria
- Server exposes working oRPC endpoints
- Authentication is required for protected routes
- All CRUD operations work
- All tests pass

### Slice 3: API Client Package (1-2 hours)

**Goal**: Shared oRPC client works for both web and mobile.

#### Tasks
1. Create oRPC client factory in `packages/api-client/src/index.ts`
2. Support both web (Next.js) and native (Expo) configurations:
   - Web: Use fetch with credentials
   - Native: Use fetch with manual cookie handling
3. Export AppRouter type from server
4. Add TanStack Query integration helpers
5. Add tests for client initialization

#### Manual Checkpoints
- [ ] Client can be initialized with web config
- [ ] Client can be initialized with native config
- [ ] TypeScript autocomplete works for all endpoints
- [ ] `pnpm --filter @nx-test/api-client test` passes

#### Completion Criteria
- API client package exports working factory function
- Type safety is enforced across client and server
- All tests pass

### Slice 4: Web Frontend (3-4 hours)

**Goal**: User-facing web application works.

#### Tasks
1. Set up Supabase client in `apps/web/src/lib/supabase.ts`
2. Create API client instance in `apps/web/src/lib/api.ts` using `@nx-test/api-client`
3. Implement todo UI in `apps/web/src/app/todos/page.tsx`:
   - Display list of todos
   - Create new todo form
   - Toggle todo completion
   - Delete todo button
4. Add authentication pages:
   - `apps/web/src/app/login/page.tsx`
   - `apps/web/src/app/signup/page.tsx`
5. Implement auth flow with Supabase Auth
6. Add protected route middleware
7. Add Playwright E2E tests:
   - Sign up flow
   - Login flow
   - Todo CRUD operations

#### Manual Checkpoints
- [ ] `pnpm dev` runs both server and web concurrently
- [ ] Can access login page
- [ ] Can create account via signup page
- [ ] Can log in with created account
- [ ] Unauthenticated users are redirected to login
- [ ] Can create todo via web UI
- [ ] Can mark todo as complete via web UI
- [ ] Can delete todo via web UI
- [ ] Changes are persisted to database
- [ ] `pnpm --filter web-e2e e2e` passes

#### Completion Criteria
- Full authentication flow works
- Full todo CRUD works in browser
- E2E tests pass
- UI is responsive and styled with Tailwind

### Slice 5: Mobile App (4-5 hours)

**Goal**: Prove cross-platform works with Expo Router.

#### Tasks
1. Set up Supabase client for React Native in `apps/mobile/lib/supabase.ts`
2. Create API client instance in `apps/mobile/lib/api.ts` using `@nx-test/api-client`
3. Configure Expo Router layout in `apps/mobile/app/_layout.tsx`:
   - Set up navigation structure
   - Add authentication context provider
4. Implement authentication screens:
   - `apps/mobile/app/login.tsx`
   - `apps/mobile/app/signup.tsx`
5. Implement todo screens using Expo Router:
   - `apps/mobile/app/(tabs)/_layout.tsx` - Tab navigation
   - `apps/mobile/app/(tabs)/index.tsx` - Todo list screen
   - `apps/mobile/app/(tabs)/profile.tsx` - User profile (optional)
6. Add todo UI components:
   - Todo list with pull-to-refresh
   - Create todo input
   - Todo item with checkbox and delete
7. Test auth flow on Expo Go
8. Test data sync between web and mobile

#### Manual Checkpoints
- [ ] `pnpm --filter mobile dev` starts Expo dev server
- [ ] Expo Go loads mobile app
- [ ] Can navigate between screens using Expo Router
- [ ] Can create account via mobile signup
- [ ] Can log in via mobile login
- [ ] Unauthenticated users see login screen
- [ ] Can create todo via mobile UI
- [ ] Can mark todo as complete via mobile UI
- [ ] Can delete todo via mobile UI
- [ ] Changes made on web appear on mobile after refresh
- [ ] Changes made on mobile appear on web after refresh

#### Completion Criteria
- Full authentication flow works on mobile
- Full todo CRUD works on mobile
- Expo Router navigation works correctly
- Data syncs between web and mobile platforms
- UI follows mobile design patterns

## Success Criteria

### Functional Parity Achieved When:
1. ✅ Users can sign up and log in (web and mobile) via Supabase Auth
2. ✅ Authenticated users can create, read, update, delete todos
3. ✅ Data is persisted to Supabase database via Prisma
4. ✅ API is type-safe using oRPC and Zod
5. ✅ Shared packages work correctly across apps
6. ✅ All tests pass (unit, integration, E2E)
7. ✅ Both web and mobile apps are functional

### Nx vs Turborepo Comparison Points:
- **Developer Experience**: Code generation, conventions, error messages
- **Build Performance**: Caching, affected commands, incremental builds
- **Dependency Management**: How libraries reference each other
- **Tooling Integration**: ESLint, Jest, Playwright setup complexity
- **Scalability**: How easy to add new apps/packages
- **Documentation**: Quality of official docs and community support

## Estimated Timeline

| Phase | Estimated Time | Cumulative |
|-------|---------------|------------|
| Phase 0: Functional Inventory | 1 hour | 1 hour |
| Phase 1: Scaffolding | 2-3 hours | 3-4 hours |
| Slice 1: Database + Schemas | 2 hours | 5-6 hours |
| Slice 2: Server API | 3-4 hours | 8-10 hours |
| Slice 3: API Client | 1-2 hours | 9-12 hours |
| Slice 4: Web Frontend | 3-4 hours | 12-16 hours |
| Slice 5: Mobile App | 4-5 hours | 16-21 hours |
| **Total** | **16-21 hours** | **~2-3 days** |

## Notes

- **Manual testing is required** at each checkpoint to verify functionality
- **Deviations from plan are expected** as we discover Nx patterns
- **Documentation as we go** - Update this plan with learnings
- **Tech stack choices** are intentional for comparison purposes
