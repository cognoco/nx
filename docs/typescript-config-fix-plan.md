# TypeScript Configuration Fix - Implementation Plan

**Project:** nx-test monorepo
**Date:** 2025-10-07
**Status:** Ready for execution
**Estimated Time:** 55-75 minutes

---

## Executive Summary

### Problem Statement

The server build is failing with TypeScript errors:
- **TS5090:** "Non-relative paths are not allowed when 'baseUrl' is not set"
- **TS6307:** "File '...' is not listed within the file list of project"

### Root Causes

1. `tsconfig.base.json` defines `paths` without `baseUrl`
2. Module resolution mismatch: base uses `"bundler"`, packages use `"nodenext"`
3. Server config inherits `"bundler"` but is a Node.js app (should use `"nodenext"`)

### Solution Strategy

**Future-Proof Approach (Recommended):**
- Add `baseUrl: "."` to fix TS5090
- Change base to `moduleResolution: "nodenext"` for maximum compatibility
- Align with Nx 2024-2025 best practices
- Ensure packages use `.js` extensions (ESM requirement)

**Alternative (Quick Fix):**
- Just add `baseUrl: "."` to `tsconfig.base.json`
- Keep everything else as-is
- Faster but doesn't address architectural mismatch

---

## Research Summary

### Key Findings from Research

1. **Nx Official Guidance (2024-2025):**
   - Recommends `moduleResolution: "nodenext"` for monorepos
   - Moving from path aliases to package manager workspaces
   - Project references are the modern approach

2. **TypeScript Team Guidance:**
   - `"bundler"` is "infectious" - allows bundler-only code
   - `"nodenext"` ensures maximum compatibility (Node.js + bundlers)
   - Quote: "nodenext is the right option for authoring libraries"

3. **Next.js 15 Compatibility:**
   - Default: `"bundler"` but works fine with `"nodenext"`
   - Modern bundlers handle `nodenext` output seamlessly

4. **Prisma Compatibility:**
   - Works with ALL module resolution strategies
   - No specific requirements

### Current State Analysis

**What's Correct:**
- ✅ Packages using `"nodenext"` (database, schemas, etc.)
- ✅ Packages already use `.js` extensions in exports
- ✅ Project references configured

**What's Incorrect:**
- ❌ Base config using `"bundler"` (should be `"nodenext"`)
- ❌ Missing `baseUrl` in base config
- ❌ Server using `"bundler"` (it's a Node.js app!)

---

## Implementation Plan

### Phase 0: Pre-Implementation Verification (10-15 min)

**Sub-Agent Task:**
Read and document current state of all TypeScript configurations.

**Files to Read:**
- `tsconfig.base.json`
- `apps/server/tsconfig.json`
- `apps/server/tsconfig.app.json`
- `apps/web/tsconfig.json`
- `packages/database/tsconfig.lib.json`
- `packages/schemas/tsconfig.lib.json`
- `packages/supabase-client/tsconfig.lib.json`
- `packages/api-client/tsconfig.lib.json`
- `packages/database/src/index.ts`
- `packages/schemas/src/index.ts`
- `packages/supabase-client/src/index.ts`

**Deliverable:**
- Inventory of all current settings
- List of files with/without `.js` extensions
- Baseline for comparison

---

### Phase 1: Core Configuration Changes (5 min)

#### 1.1 Update `tsconfig.base.json`

**Location:** `C:\Dev\Projects\Products\Apps\Sandbox\nx-test\tsconfig.base.json`

**Current State:**
```json
{
  "compilerOptions": {
    "composite": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "importHelpers": true,
    "isolatedModules": true,
    "lib": ["es2022"],
    "module": "esnext",                    // ← CHANGE THIS
    "moduleResolution": "bundler",         // ← CHANGE THIS
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "es2022",
    "customConditions": ["@nx-test/source"],
    // NO baseUrl!                         // ← ADD THIS
    "paths": {
      "@nx-test/database": ["packages/database/src/index.ts"],
      "@nx-test/schemas": ["packages/schemas/src/index.ts"],
      "@nx-test/supabase-client": ["packages/supabase-client/src/index.ts"]
    }
  }
}
```

**Required Changes:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",                        // ADD THIS LINE
    "composite": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "importHelpers": true,
    "isolatedModules": true,
    "lib": ["es2022"],
    "module": "nodenext",                  // CHANGE: esnext → nodenext
    "moduleResolution": "nodenext",        // CHANGE: bundler → nodenext
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "es2022",
    "customConditions": ["@nx-test/source"],
    "paths": {
      "@nx-test/database": ["packages/database/src/index.ts"],
      "@nx-test/schemas": ["packages/schemas/src/index.ts"],
      "@nx-test/supabase-client": ["packages/supabase-client/src/index.ts"]
    }
  }
}
```

#### 1.2 Update `apps/server/tsconfig.app.json`

**Location:** `C:\Dev\Projects\Products\Apps\Sandbox\nx-test\apps\server\tsconfig.app.json`

**Current State:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "module": "esnext",                    // ← REMOVE (inherit from base)
    "types": ["node"],
    "rootDir": "src",
    "moduleResolution": "bundler",         // ← REMOVE (inherit from base)
    "tsBuildInfoFile": "dist/tsconfig.app.tsbuildinfo"
    // Missing emitDeclarationOnly: false  // ← ADD THIS
  },
  "include": ["src/**/*.ts"],
  "exclude": [
    "out-tsc",
    "dist",
    "jest.config.ts",
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "eslint.config.js",
    "eslint.config.cjs",
    "eslint.config.mjs"
  ],
  "references": [
    {
      "path": "../../packages/schemas/tsconfig.lib.json"
    },
    {
      "path": "../../packages/database/tsconfig.lib.json"
    }
  ]
}
```

**Required Changes:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "types": ["node"],
    "rootDir": "src",
    "tsBuildInfoFile": "dist/tsconfig.app.tsbuildinfo",
    "emitDeclarationOnly": false           // ADD THIS LINE
    // REMOVED: module, moduleResolution (now inherit from base)
  },
  "include": ["src/**/*.ts"],
  "exclude": [
    "out-tsc",
    "dist",
    "jest.config.ts",
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "eslint.config.js",
    "eslint.config.cjs",
    "eslint.config.mjs"
  ],
  "references": [
    {
      "path": "../../packages/schemas/tsconfig.lib.json"
    },
    {
      "path": "../../packages/database/tsconfig.lib.json"
    }
  ]
}
```

---

### Phase 2: Package Export Verification (5-10 min)

**Sub-Agent Task:**
Verify all packages use `.js` extensions in their exports.

**Files to Check:**

1. **`packages/database/src/index.ts`**
   - Expected: `export * from './lib/database.js';`
   - Status: ✅ Already correct (verified in earlier stages)

2. **`packages/schemas/src/index.ts`**
   - Expected: `export * from './lib/todo.js';`
   - Status: ✅ Already correct (verified in earlier stages)

3. **`packages/supabase-client/src/index.ts`**
   - Expected: Exports with `.js` extensions
   - Status: ⚠️ Need to verify

4. **`packages/api-client/src/index.ts`**
   - Expected: Exports with `.js` extensions
   - Status: ⚠️ Need to verify

**If Missing `.js` Extensions:**

Change:
```typescript
export * from './lib/filename';
```

To:
```typescript
export * from './lib/filename.js';
```

**Why `.js` for `.ts` files?**
- ESM standard: import specifiers reference the OUTPUT file
- TypeScript doesn't rewrite imports
- Required by `moduleResolution: "nodenext"`

---

### Phase 3: Build Verification (10-15 min, PARALLEL)

**Launch 3 Sub-Agents in Parallel:**

#### Sub-Agent A: Web App Build Test

**Command:**
```bash
npx nx run @nx-test/web:build
```

**What to Check:**
- Does build succeed?
- Any TypeScript errors?
- Any Next.js compatibility issues?

**Expected Outcome:**
- ✅ Should work (Next.js handles nodenext)
- ⚠️ If fails: May need to add bundler override (see Phase 4)

#### Sub-Agent B: Server Build Test

**Command:**
```bash
npx nx run @nx-test/server:build:production
```

**What to Check:**
- TS5090 resolved? (baseUrl fix)
- TS6307 resolved? (project references + nodenext)
- Build completes successfully?

**Expected Outcome:**
- ✅ Should succeed - THIS IS THE PRIMARY GOAL!

#### Sub-Agent C: Package Builds

**Command:**
```bash
npx nx run-many -t build --projects=@nx-test/database,@nx-test/schemas,@nx-test/supabase-client
```

**What to Check:**
- All packages build?
- No TypeScript errors?
- Declaration files generated?

**Expected Outcome:**
- ✅ Should work (packages already use nodenext)

**Success Criteria for Phase 3:**
- Server build passes (errors fixed!)
- Packages build successfully
- Web either passes OR we identify specific fix

---

### Phase 4: Compatibility Adjustments (5-10 min, CONDITIONAL)

**Only execute if Phase 3 identifies issues.**

#### If Web App Build Fails:

**Option A: Add Bundler Override**

Edit `apps/web/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "moduleResolution": "bundler",  // Override base config
    "module": "esnext",              // Override base config
    // ... rest of config
  }
}
```

**Option B: Investigate Specific Error**
- Read error messages carefully
- May be unrelated to module resolution
- Fix specific issue

#### If Server Build Still Fails:

**Troubleshooting Steps:**
1. Check for missing `.js` extensions in package exports
2. Verify project references point to correct files
3. Ensure Prisma client is generated
4. Check for import path issues

#### If Packages Fail:

**Common Fixes:**
- Add missing `.js` extensions
- Verify `tsconfig.lib.json` settings
- Check for circular dependencies

---

### Phase 5: Runtime Verification (10 min)

**Test dev servers start and function correctly.**

#### 5.1 Web App Dev Server

**Command:**
```bash
npx nx run @nx-test/web:dev
```

**Verify:**
- ✅ Server starts without errors
- ✅ Accessible at http://localhost:3000
- ✅ Hot reload works
- ✅ No runtime module resolution errors

#### 5.2 Server Dev Server

**Command:**
```bash
npx nx run @nx-test/server:serve
```

**Verify:**
- ✅ Server starts without errors (CURRENTLY BROKEN!)
- ✅ No runtime errors
- ✅ API endpoints respond correctly
- ✅ Prisma client works

**Success Criteria:**
- Both dev servers functional
- No console errors
- Applications work as expected

---

### Phase 6: Final Validation (10 min)

**Sub-Agent Task: Comprehensive Testing**

#### 6.1 Linting

**Command:**
```bash
npx nx run-many -t lint
```

**Expected:** All projects pass linting

#### 6.2 Type Checking

**Command:**
```bash
npx nx run @nx-test/server:typecheck
npx nx run @nx-test/web:typecheck
```

**Expected:** No type errors

#### 6.3 Affected Projects Graph

**Command:**
```bash
npx nx affected:graph
```

**Verify:** Dependency graph is valid

#### 6.4 Summary Report

**Create a report documenting:**
- All changes made
- Any overrides added (e.g., web using bundler)
- Test results from all phases
- Confirmation of alignment with best practices
- Any future improvements recommended

---

## Risk Mitigation & Rollback

### Git Safety

All files are tracked by git. To rollback:

```bash
# Rollback everything
git checkout tsconfig.base.json apps/server/tsconfig.app.json

# Or rollback individual files
git checkout tsconfig.base.json
```

### Rollback Scenarios

**If Everything Breaks:**
- Revert all changes via git
- Consider minimal fix (just add baseUrl, keep bundler)

**If Only Web App Breaks:**
- Add bundler override to `apps/web/tsconfig.json` (see Phase 4)
- This is expected and acceptable

**If Only Server Breaks:**
- Investigate specific errors
- Check `.js` extensions
- Verify Prisma client generation
- May need to debug specific import issues

**If Packages Break:**
- Add missing `.js` extensions
- Check `tsconfig.lib.json` settings

### Safety Measures

1. **Incremental approach:** Test after each phase
2. **Parallel verification:** Use sub-agents for comprehensive testing
3. **Clear fallbacks:** Documented override options
4. **Git tracked:** Easy rollback at any point

---

## Expected Outcomes

### Immediate Wins ✅

- **Server build works:** TS5090 and TS6307 resolved!
- **Aligned with best practices:** Nx 2024-2025 guidance
- **Maximum compatibility:** Code works in Node.js AND bundlers
- **Future-proof:** Prevents bundler-only code issues

### Long-Term Benefits ✅

- **Consistent architecture:** Single module resolution strategy
- **Better portability:** Code runs in multiple runtimes
- **Easier maintenance:** Clear, modern configuration
- **Industry alignment:** Follows TypeScript team recommendations

### Potential Trade-offs ⚠️

- **`.js` extensions required:** Already in use, so minimal impact
- **Web might need override:** Acceptable for bundler-based apps
- **Slightly more verbose:** Standard for ESM modules

---

## Alternative: Minimal Fix

If the future-proof approach seems too complex, here's the minimal fix:

### Just Add baseUrl

**Edit `tsconfig.base.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",  // ADD ONLY THIS LINE
    // ... everything else stays the same
  }
}
```

**Pros:**
- ✅ Fixes TS5090 immediately
- ✅ Minimal changes
- ✅ Low risk

**Cons:**
- ❌ Doesn't fix architectural mismatch
- ❌ Not aligned with Nx best practices
- ❌ May need revisiting later

---

## Context for Next Session

### Key Files Modified

1. `tsconfig.base.json` - Add baseUrl, change to nodenext
2. `apps/server/tsconfig.app.json` - Simplify, inherit from base
3. Potentially: Package index files (add .js extensions)
4. Potentially: `apps/web/tsconfig.json` (add bundler override)

### Research Sources Used

- Nx Official Blog: "Managing TypeScript Packages in Monorepos" (2024)
- TypeScript Handbook: Module Resolution
- Next.js 15 Documentation
- Prisma Monorepo Documentation
- Context7: TypeScript, Next.js, Nx libraries
- Andrew Branch (TypeScript team): Module resolution guidance

### Current Project State

- **Web app:** Working (Stage 1.4 complete)
- **Server app:** Broken (TS5090, TS6307 errors)
- **Packages:** Correctly configured with nodenext
- **Git status:** Clean working directory

### Decision Points

1. **After Phase 3:** Assess if web needs bundler override
2. **After Phase 5:** Confirm all dev servers functional
3. **Final:** Choose to commit or rollback

---

## Execution Checklist

- [ ] Phase 0: Pre-verification complete
- [ ] Phase 1: Core configs updated
- [ ] Phase 2: Package exports verified
- [ ] Phase 3: All builds tested
- [ ] Phase 4: Compatibility issues resolved
- [ ] Phase 5: Dev servers verified
- [ ] Phase 6: Final validation passed
- [ ] Git commit created
- [ ] Documentation updated

---

## Commit Message Template

```
fix(typescript): align module resolution with Nx best practices

- Add baseUrl to tsconfig.base.json (fixes TS5090)
- Change to moduleResolution: "nodenext" for maximum compatibility
- Simplify server config to inherit from base
- Fixes TS6307 project reference errors
- Aligns with Nx 2024-2025 recommendations

Resolves server build failures while future-proofing the monorepo
architecture for better compatibility across all runtimes.

References:
- Nx: Managing TypeScript Packages in Monorepos (2024)
- TypeScript: Module Resolution Documentation
- Research-backed approach ensuring Next.js 15 & Prisma compatibility
```

---

## Contact Points / Questions

If issues arise during execution:

1. **Web app breaks:** Try bundler override first (Phase 4, Option A)
2. **Server still broken:** Check for missing .js extensions
3. **Packages fail:** Verify tsconfig.lib.json settings
4. **Unknown errors:** Rollback and use minimal fix approach

---

**Document Version:** 1.0
**Last Updated:** 2025-10-07
**Prepared By:** Claude Code (Sonnet 4.5)
**Ready For:** Execution by new agent session