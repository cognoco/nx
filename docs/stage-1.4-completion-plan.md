# Stage 1.4 Completion Plan

**Date**: 2025-10-06
**Status**: Ready for Execution
**Estimated Effort**: 3-4 hours

---

## Executive Summary

Stage 1.4 ("Add Placeholder Files") is currently **~70% complete**. The backend infrastructure (database, schemas, API client, Supabase client, server) has been fully implemented with production-ready code. However, the **web application** is missing 3 critical placeholder files needed to complete this stage.

### What's Missing

1. `apps/web/src/lib/supabase.ts` - Supabase client initialization
2. `apps/web/src/app/todos/page.tsx` - Todos page placeholder
3. `apps/web/src/app/page.tsx` - Homepage (update from boilerplate)

### Success Criteria

- ✅ All Stage 1.4 files exist and contain functional placeholder code
- ✅ `pnpm dev` starts the dev server without errors
- ✅ Homepage (`/`) renders and is accessible
- ✅ Todos page (`/todos`) renders and is accessible
- ✅ Workspace packages (`@nx-test/supabase-client`, `@nx-test/schemas`) import successfully

---

## Current State Analysis

### Completed Components ✅

**Backend Packages (Production-Ready):**
- **Database** (`packages/database`)
  - ✅ `prisma/schema.prisma` - Complete Todo model with Supabase config
  - ✅ `src/lib/database.ts` - Prisma client singleton with logging

- **Schemas** (`packages/schemas`)
  - ✅ `src/lib/todo.ts` - Comprehensive Zod schemas for CRUD operations
  - ✅ `src/index.ts` - Re-exports all schemas

- **API Client** (`packages/api-client`)
  - ✅ `src/lib/api-client.ts` - oRPC client factory with web/native support
  - ⚠️ Types defined inline (not in separate `types.ts`, but functional)

- **Supabase Client** (`packages/supabase-client`)
  - ✅ `src/lib/supabase-client.ts` - Full factory with browser/React Native support
  - ✅ `src/lib/database.types.ts` - Generated type stubs

- **Server** (`apps/server`)
  - ✅ `src/main.ts` - Express + oRPC server with CORS and health check
  - ✅ `src/router.ts` - Complete oRPC router with CRUD operations

### Incomplete Components ❌

**Web App** (`apps/web`) - **30% Complete**:
- ✅ `src/app/layout.tsx` - Root layout exists
- ⚠️ `src/app/page.tsx` - Exists but contains 468 lines of Nx boilerplate
- ❌ `src/app/todos/page.tsx` - Not created
- ❌ `src/lib/supabase.ts` - Not created (no `lib/` directory)

### Technical Context

**Framework & Versions:**
- Next.js: 15.2.4 (App Router)
- React: 19.0.0
- TypeScript: Strict mode enabled
- Styling: Tailwind CSS 3+
- Nx: Monorepo with inferred tasks

**Environment:**
- Path alias: `@/*` → `apps/web/src/*`
- Workspace packages available via tsconfig paths
- No UI component libraries installed (using base React + Tailwind)

---

## Implementation Plan

### Phase 1: Analysis & Setup

**Objective**: Verify dependencies and configuration before implementation

**Sub-Agent Task 1: Dependency Analysis**

```yaml
Task: Analyze workspace package dependencies for web app
Tools: Read, Grep, Glob, sequential-thinking-mcp
Duration: 15-20 minutes

Steps:
  1. Read apps/web/package.json
  2. Check if @nx-test/supabase-client is listed as dependency
  3. Check if @nx-test/schemas is listed as dependency
  4. Read tsconfig.base.json to verify path mappings
  5. Read apps/web/tsconfig.json for local configuration
  6. Determine if package.json needs updates

Deliverable:
  - List of packages that need to be added
  - Confirmation of tsconfig path mappings
  - Any configuration changes required
```

**Expected Outcome:**
- Likely need to add workspace packages to `apps/web/package.json`:
  ```json
  "dependencies": {
    "@nx-test/supabase-client": "workspace:*",
    "@nx-test/schemas": "workspace:*"
  }
  ```

---

### Phase 2: Implementation (Parallel Execution)

**Objective**: Create the 3 missing files in parallel using sub-agents

#### Sub-Agent Task 2A: Create `src/lib/supabase.ts`

```yaml
Task: Implement Supabase client initialization for web app
Tools: Read, Write, sequential-thinking-mcp, context7-mcp
Duration: 20-30 minutes

Context:
  - Use @nx-test/supabase-client package (already created)
  - This is a placeholder - full SSR implementation in Phase 2
  - Must handle missing environment variables gracefully
  - Export client instance for use in components

Steps:
  1. Create apps/web/src/lib/ directory
  2. Review @nx-test/supabase-client implementation (packages/supabase-client/src/lib/supabase-client.ts)
  3. Use sequential thinking to decide on client creation pattern
  4. Create supabase.ts with:
     - Import createSupabaseClient, getSupabaseUrl, getSupabaseAnonKey
     - Create client instance with env vars
     - Export typed client
     - Add JSDoc comments noting this is a placeholder
  5. Handle edge cases (missing env vars)

Implementation Pattern:
  - Import from workspace package: '@nx-test/supabase-client'
  - Use helper functions for env vars
  - Export a singleton instance OR factory function
  - Add type exports for Database type

Example Structure:
  ```typescript
  import { createSupabaseClient, getSupabaseUrl, getSupabaseAnonKey } from '@nx-test/supabase-client';

  /**
   * Supabase client for web app
   *
   * @remarks
   * This is a placeholder implementation for Stage 1.4.
   * In Phase 2, this will be enhanced with:
   * - Server-side client using @supabase/ssr
   * - Client-side client for browser components
   * - Proper authentication handling
   */
  export const supabase = createSupabaseClient({
    url: getSupabaseUrl(),
    anonKey: getSupabaseAnonKey(),
  });

  export type { Database } from '@nx-test/supabase-client';
  ```

Verification:
  - TypeScript compiles without errors
  - Imports resolve correctly
  - File is ~20-40 lines (concise)
```

#### Sub-Agent Task 2B: Update `src/app/page.tsx`

```yaml
Task: Replace Nx boilerplate with clean homepage placeholder
Tools: Read, Edit, sequential-thinking-mcp, context7-mcp
Duration: 20-30 minutes

Context:
  - Current file has 468 lines of Nx welcome boilerplate
  - Should be a Server Component (default in Next.js 15 App Router)
  - Use Tailwind CSS for styling
  - Include link to /todos page
  - Keep it minimal but polished

Steps:
  1. Read current apps/web/src/app/page.tsx
  2. Review Next.js 15 patterns using context7-mcp if needed
  3. Use sequential thinking to design minimal homepage
  4. Replace entire file with new implementation
  5. Ensure TypeScript types are correct
  6. Add metadata export for SEO

Implementation Pattern:
  - Server Component (no 'use client' directive)
  - Export metadata object
  - Use next/link for navigation
  - Tailwind classes for styling
  - Clean, professional design

Example Structure:
  ```typescript
  import Link from 'next/link';
  import type { Metadata } from 'next';

  export const metadata: Metadata = {
    title: 'NX Test App',
    description: 'A Next.js application with Nx monorepo',
  };

  export default function HomePage() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-8 p-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to NX Test
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            A modern full-stack application built with Next.js 15, React 19, and Nx
          </p>
          <div className="pt-4">
            <Link
              href="/todos"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View Todos
            </Link>
          </div>
        </div>
      </main>
    );
  }
  ```

Verification:
  - TypeScript compiles without errors
  - Tailwind classes are valid
  - Link component used correctly
  - File is concise (~30-50 lines)
```

#### Sub-Agent Task 2C: Create `src/app/todos/page.tsx`

```yaml
Task: Create placeholder todos page with hardcoded data
Tools: Read, Write, sequential-thinking-mcp, context7-mcp
Duration: 25-35 minutes

Context:
  - Create new todos directory under app/
  - Should be a Server Component
  - Use types from @nx-test/schemas to demonstrate integration
  - Display hardcoded todos (no database/API calls yet)
  - Use Tailwind CSS for styling

Steps:
  1. Create apps/web/src/app/todos/ directory
  2. Review @nx-test/schemas types (packages/schemas/src/lib/todo.ts)
  3. Use sequential thinking to design todo list UI
  4. Create page.tsx with:
     - Import types from @nx-test/schemas
     - Hardcoded placeholder data
     - Simple list UI with Tailwind
     - Metadata export
  5. Ensure proper TypeScript typing

Implementation Pattern:
  - Server Component (no 'use client' directive)
  - Import types from workspace package: '@nx-test/schemas'
  - Create mock data matching Todo schema
  - Display in a clean list layout
  - Add back navigation to homepage

Example Structure:
  ```typescript
  import Link from 'next/link';
  import type { Metadata } from 'next';
  import type { Todo } from '@nx-test/schemas';

  export const metadata: Metadata = {
    title: 'Todos - NX Test App',
    description: 'Manage your todos',
  };

  // Placeholder data - will be replaced with API calls in Phase 2
  const PLACEHOLDER_TODOS: Todo[] = [
    {
      id: '1',
      title: 'Set up Supabase authentication',
      completed: false,
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
    },
    {
      id: '2',
      title: 'Implement CRUD operations',
      completed: false,
      createdAt: new Date('2025-10-02'),
      updatedAt: new Date('2025-10-02'),
    },
    {
      id: '3',
      title: 'Deploy to production',
      completed: false,
      createdAt: new Date('2025-10-03'),
      updatedAt: new Date('2025-10-03'),
    },
  ];

  export default function TodosPage() {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Todos</h1>
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-700"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow">
            <ul className="divide-y divide-gray-200">
              {PLACEHOLDER_TODOS.map((todo) => (
                <li key={todo.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        readOnly
                        className="h-4 w-4 text-indigo-600 rounded"
                      />
                      <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {todo.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-sm text-gray-500 text-center">
            📝 Placeholder data - CRUD operations will be implemented in Phase 2
          </div>
        </div>
      </main>
    );
  }
  ```

Verification:
  - TypeScript compiles without errors
  - Todo type imports from @nx-test/schemas
  - Tailwind styling works correctly
  - File is well-structured (~70-100 lines)
```

**Parallel Execution Strategy:**
- Launch all 3 sub-agents (2A, 2B, 2C) in a single message
- Each works independently on their file
- No dependencies between tasks
- Estimated total time: 25-35 minutes (not 60-90 if sequential)

---

### Phase 3: Verification & Testing

**Objective**: Confirm all implementations work correctly

**Sub-Agent Task 3: Integration Verification**

```yaml
Task: Verify Stage 1.4 completion and test functionality
Tools: Bash, Read, sequential-thinking-mcp
Duration: 15-20 minutes

Steps:
  1. Verify all 3 files exist:
     - apps/web/src/lib/supabase.ts
     - apps/web/src/app/page.tsx
     - apps/web/src/app/todos/page.tsx

  2. Check package.json was updated (if needed)

  3. Run TypeScript type checking:
     ```bash
     npx nx run @nx-test/web:typecheck
     ```

  4. Run linter:
     ```bash
     npx nx run @nx-test/web:lint
     ```

  5. Start dev server:
     ```bash
     npx nx run @nx-test/web:dev
     ```

  6. Monitor console output for:
     - Compilation errors
     - Runtime errors
     - Successful startup message
     - Port number (should be 3000)

  7. Test manual verification (if possible):
     - Visit http://localhost:3000
     - Check homepage renders
     - Click "View Todos" link
     - Verify todos page renders with placeholder data

  8. Stop dev server (Ctrl+C)

  9. Check if server app also needs environment variables set

Deliverable:
  - Status report on each verification step
  - List of any errors encountered
  - Confirmation that manual checkpoint is met:
    "pnpm dev starts all apps (even if they don't do anything yet)"
```

**Expected Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Missing environment variables | Note in report - will be set up in Phase 2 |
| Workspace package import errors | Verify tsconfig paths and package.json |
| Tailwind classes not working | Check global.css imports |
| TypeScript errors | Review type imports from workspace packages |

---

## Sub-Agent Instructions Template

**For ALL sub-agents working on this plan:**

### General Guidelines

1. **Use Sequential Thinking** for complex decisions:
   - Use `mcp__sequential-thinking-mcp__sequentialthinking` when:
     - Deciding on implementation patterns
     - Resolving ambiguities
     - Making architectural choices

2. **Use Context7** for library documentation:
   - Use `mcp__context7-mcp__resolve-library-id` and `mcp__context7-mcp__get-library-docs` when:
     - Unfamiliar with Next.js 15 patterns
     - Need Supabase integration examples
     - Clarifying React 19 APIs

3. **Follow Project Standards**:
   - TypeScript strict mode
   - No `any` types without JSDoc explanation
   - Functional components only
   - Tailwind for all styling
   - Follow Nx workspace conventions

4. **Report Back Clearly**:
   - Status: Success/Partial/Failed
   - What was created/modified
   - Any issues encountered
   - Verification results

### Example Sub-Agent Prompt

```
You are working on Stage 1.4 completion for the nx-test project.

Your specific task: [TASK FROM PLAN]

Context:
- This is a Next.js 15 + React 19 application
- Using Nx monorepo with workspace packages
- TypeScript strict mode enabled
- Tailwind CSS for styling

Available tools:
- sequential-thinking-mcp: Use for complex decisions
- context7-mcp: Use for library documentation
- Standard tools: Read, Write, Edit, Bash, etc.

Instructions:
[SPECIFIC STEPS FROM TASK YAML]

Success criteria:
[FROM TASK YAML]

Please:
1. Use sequential thinking when making architectural choices
2. Consult Context7 if you encounter unfamiliar patterns
3. Follow the existing code style in the project
4. Report back with clear status and any issues

Begin your work now.
```

---

## Verification Checklist

### Pre-Implementation ✓

- [ ] Reviewed current web app structure
- [ ] Confirmed workspace package availability
- [ ] Verified tsconfig path mappings
- [ ] Identified dependency requirements

### File Creation ✓

- [ ] Created `apps/web/src/lib/supabase.ts`
  - [ ] Imports from @nx-test/supabase-client work
  - [ ] Client instance exported
  - [ ] TypeScript types correct
  - [ ] JSDoc comments included

- [ ] Updated `apps/web/src/app/page.tsx`
  - [ ] Nx boilerplate removed
  - [ ] Clean, minimal homepage
  - [ ] Link to /todos works
  - [ ] Tailwind styling applied
  - [ ] Metadata exported

- [ ] Created `apps/web/src/app/todos/page.tsx`
  - [ ] Directory created
  - [ ] Imports from @nx-test/schemas work
  - [ ] Placeholder data defined
  - [ ] List UI implemented
  - [ ] Tailwind styling applied
  - [ ] Metadata exported

### Dependencies ✓

- [ ] Added @nx-test/supabase-client to package.json (if needed)
- [ ] Added @nx-test/schemas to package.json (if needed)
- [ ] Ran `pnpm install` (if package.json updated)

### Testing ✓

- [ ] TypeScript compilation succeeds
- [ ] ESLint passes
- [ ] Dev server starts without errors
- [ ] Homepage accessible at http://localhost:3000
- [ ] Todos page accessible at http://localhost:3000/todos
- [ ] No console errors in browser
- [ ] Navigation between pages works

### Documentation ✓

- [ ] Code includes JSDoc comments
- [ ] Placeholder notes added where appropriate
- [ ] Commit message prepared
- [ ] Stage 1.4 marked as complete in poc-plan.md

---

## Risk Assessment

### Low Risk ✅

- **File creation** - Straightforward, well-defined
- **Tailwind styling** - Already configured
- **TypeScript compilation** - Strong type checking will catch issues

### Medium Risk ⚠️

- **Workspace package imports** - May need tsconfig adjustments
- **Environment variables** - May not be set, needs graceful handling
- **Next.js 15 patterns** - Relatively new version, some patterns may differ

### High Risk ❌

None identified for this phase.

### Mitigation Strategies

1. **Import Issues**:
   - Verify tsconfig paths first (Phase 1)
   - Test imports in isolation
   - Fall back to relative paths if needed

2. **Missing Env Vars**:
   - Code should handle undefined gracefully
   - Add clear error messages
   - Document in comments

3. **Next.js 15 Patterns**:
   - Use Context7 for up-to-date docs
   - Follow official Next.js examples
   - Leverage sequential thinking for decisions

---

## Success Metrics

### Quantitative

- ✅ 3 files created/updated
- ✅ 0 TypeScript errors
- ✅ 0 ESLint errors
- ✅ Dev server starts in < 30 seconds
- ✅ 2 pages accessible (/, /todos)

### Qualitative

- ✅ Code follows project conventions
- ✅ Placeholder comments explain future enhancements
- ✅ UI is clean and professional (even as placeholder)
- ✅ Workspace package integration demonstrated
- ✅ Ready for Phase 2 (CRUD implementation)

### Completion Criteria

Stage 1.4 is **100% complete** when:

1. All files from Stage 1.4 specification exist
2. Manual checkpoint passes: "pnpm dev starts all apps"
3. Both web app pages render without errors
4. Workspace packages successfully imported
5. No blocking TypeScript/ESLint errors
6. Code quality meets project standards

---

## Post-Completion Steps

### Immediate

1. **Run full test suite**:
   ```bash
   npx nx affected -t test
   ```

2. **Update poc-plan.md**:
   - Mark Stage 1.4 as ✅ Complete
   - Note completion date
   - Update progress metrics

### Planning

1. **Review Stage 1.5**: Understand next requirements
2. **Identify blockers**: Any issues that might affect Stage 1.5?
3. **Environment setup**: Do we need to configure Supabase project?

---

## Appendix A: File Specifications

### `apps/web/src/lib/supabase.ts`

**Purpose**: Initialize Supabase client for web application
**Type**: Utility module
**Exports**: `supabase` (client instance), `Database` (type)
**Dependencies**: `@nx-test/supabase-client`
**Estimated LOC**: 20-40

**Key Features**:
- Uses workspace package for client creation
- Handles environment variables
- Exports typed client
- Includes placeholder comments
- Graceful error handling for missing config

### `apps/web/src/app/page.tsx`

**Purpose**: Homepage for web application
**Type**: Next.js Server Component
**Exports**: `default` (HomePage component), `metadata`
**Dependencies**: `next/link`, `next`
**Estimated LOC**: 30-50

**Key Features**:
- Clean, minimal design
- Tailwind CSS styling
- Link to todos page
- SEO metadata
- Professional appearance

### `apps/web/src/app/todos/page.tsx`

**Purpose**: Todos page with placeholder data
**Type**: Next.js Server Component
**Exports**: `default` (TodosPage component), `metadata`
**Dependencies**: `next/link`, `next`, `@nx-test/schemas`
**Estimated LOC**: 70-100

**Key Features**:
- Imports Todo type from schemas package
- Hardcoded placeholder data
- List UI with Tailwind
- Back navigation
- Clear placeholder notes

---

## Appendix B: Environment Variables

### Required (Not for Stage 1.4, but for Phase 2)

```env
# apps/web/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# apps/server/.env
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Handling Missing Vars in Stage 1.4

Code should check for undefined and either:
1. Use empty string fallback
2. Skip client initialization
3. Log warning message

Example:
```typescript
const url = getSupabaseUrl();
const key = getSupabaseAnonKey();

if (!url || !key) {
  console.warn('[Supabase] Missing environment variables - client not initialized');
  // Export mock client or handle gracefully
}
```

---

## Appendix C: Nx Commands Reference

```bash
# Development
npx nx run @nx-test/web:dev              # Start web dev server
npx nx run @nx-test/server:dev           # Start server dev server
npx nx run-many -t dev                   # Start all dev servers

# Building
npx nx run @nx-test/web:build            # Build web app
npx nx run @nx-test/server:build         # Build server

# Testing
npx nx run @nx-test/web:test             # Run web tests
npx nx run @nx-test/web:test --watch     # Run tests in watch mode
npx nx affected -t test                  # Test affected projects

# Linting & Type Checking
npx nx run @nx-test/web:lint             # Lint web app
npx nx run @nx-test/web:typecheck        # Type check web app
npx nx format:write                      # Format with Prettier

# Workspace
npx nx graph                             # View dependency graph
npx nx show project @nx-test/web         # Show web project details
```

---

**End of Plan Document**

This plan is ready for execution. All sub-agents should reference this document for context, specifications, and guidelines.
