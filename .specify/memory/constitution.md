# NX-Test POC Constitution

<!--
Sync Impact Report
Version change: 1.0.0 -> 1.1.0
Modified principles:
- XIII: Renamed to "Nx Monorepo Conventions & Documentation" - added documentation requirements and explicit E2E deferral
- XIV: Updated mobile to note Phase 3 deferral, clarified Playwright as "E2E deferred"
- XV: Softened from "MUST support both platforms" to "should be designed to support" (mobile deferred)
- XVI: Completely replaced "POC Comparison Requirements" with "Nx Best Practices & Team Knowledge Base" (Turborepo comparison removed)
- XVIII: Updated from "CLAUDE.md" to "AGENTS.md" reference (using Ruler)
- XIX: Updated from "POC work" to "POC/template work" for clarity
Added sections:
- XVII: New principle "POC Validation & Template Requirements" (split from old XVI, focuses on template nature)
Removed sections:
- Old XVI: "POC Comparison Requirements" (Turborepo comparison removed)
Renumbered:
- Governance sections now XVIII-XIX (was XVII-XVIII)
Templates requiring updates:
- ✅ Reviewed .specify/templates/plan-template.md (no changes needed - Constitution Check generic)
- ✅ Reviewed .specify/templates/spec-template.md (no changes needed)
- ✅ Reviewed .specify/templates/tasks-template.md (no changes needed)
Related documentation updates:
- ✅ Updated docs/poc-plan.md to reflect new scope (Nx Architecture Foundation, not comparison)
- ✅ Updated .ruler/AGENTS.md with project status, apps, packages, and quality gate clarifications
Follow-up TODOs:
- None
-->

## Core Principles

### I. Test-Driven Development (TDD)
- Begin every code change by writing failing tests that express the desired behaviour before implementation starts.
- Maintain the Red -> Green -> Refactor loop with visible failure evidence captured ahead of production code.
- Scope tests to user-facing requirements, covering contracts, integration paths, and critical unit logic tied to acceptance criteria.
- Follow the strict sequence: write failing tests -> implement the minimal code to pass -> run quality gates -> verify against requirements -> declare completion.

### II. Quality Gates (NON-NEGOTIABLE)
- Run the full quality-gates suite before any commit or pull request and attach the command outputs to delivery notes.
- The suite must at minimum cover lint, formatting verification, type checking, unit coverage, integration flows, and E2E smoke tests using project thresholds.
- Bypassing, deferring, or silently retrying failed gates is prohibited; surface blockers immediately for remediation.

### III. Evidence-Based Completion (NON-NEGOTIABLE)
- Produce verification notes that document executed commands, success and failure scenarios, and the resulting outputs.
- Use factual language only, highlight residual risks when full verification is impossible, and escalate unresolved gates immediately.
- Attempt at least four remediation cycles (identify blocker -> attempt fix -> rerun gates -> re-verify) before declaring failure, then report outstanding blockers.
- ADMIT FAILURE RATHER THAN PREMATURELY CLAIMING SUCCESS; never claim 100% certainty without comprehensive verification!

### IV. Documentation Alignment & Completion Outlines
- Completion reports must list each documentation asset requiring updates and outline the specific edits needed.
- Do not modify documentation unless explicitly tasked; instead, provide actionable guidance referencing product docs, architecture artifacts, plans, tasks, agent guides, and Spec Kit outputs.
- Include documentation outlines in final status updates so reviewers can trigger follow-up work without rediscovery.

## Change Scope & Architecture Standards

### Scope of Application
- **Code changes** trigger TDD, quality gates, and evidence protocols, and include runtime-impacting source files, configuration, dependency updates, build settings, test suites, and schema changes.
- **Non-code changes** require content verification only and include documentation, comment-only updates, Spec Kit artifacts, agent guidance files, and architectural decision records.
- **Hybrid changes** follow code-change protocols whenever code and documentation modifications are intertwined.

### V. SAFe Architectural Runway Stewardship
- Provide just enough architectural groundwork to unlock upcoming committed features while avoiding speculative over-engineering.
- Capture current implementation, documented extension points, and intended evolution paths inside shared architecture artifacts and ADRs.
- Route major architectural shifts through the ADR process and update shared documentation promptly.

### VI. Buildable Package Pattern (NON-NEGOTIABLE)
- Start every feature as a standalone package that is independently testable, documented, and backed by clear purpose statements.
- Expose each package via proper TypeScript exports with clear public API surface.
- Mark packages as buildable in project.json to enable independent compilation and caching.
- Support both web and mobile platforms from shared packages; no platform-specific code without explicit documentation.

### VII. Layered Modularity & Domain Boundaries (NON-NEGOTIABLE)
- Preserve separation between presentation, feature, service, and configuration layers to support incremental scaling.
- Design domain modules to be independently testable, versioned, and publishable as needed, with shared utilities centralized instead of duplicated.

### VIII. API-First & Integration Readiness (NON-NEGOTIABLE)
- Define internal and external interfaces before implementation to avoid monolithic coupling and guarantee discoverable entry points.
- Maintain contract definitions (OpenAPI, GraphQL schemas, oRPC schemas, or equivalent) with usage guidance, guard each touchpoint with contract tests, and track changes for backwards compatibility.
- Ensure libraries expose functionality through those contracts rather than tight coupling to application code, and document integration touchpoints in the contracts directory.

## Coding Standards & Maintainability

### IX. Versioning Standards
- Apply the MAJOR.MINOR.BUILD format to every library: increment BUILD for all changes, MINOR for backwards-compatible additions, and MAJOR for breaking changes.

### X. Lean Files & Cohesive Modules
- Keep files <=300 logical lines, prefer composition over inheritance, and rely on path aliases instead of deep relative imports.
- Co-locate feature logic for discoverability and justify any deviations from lean layering.

### XI. Business-Accessible Code Communication
- Write self-documenting code so product managers can trace business logic without reverse-engineering internals.
- Add explanatory comments describing business purpose and trade-offs, and update human-readable narratives or inline READMEs when behaviour changes.

### XII. Continuous Knowledge Capture
- Maintain Spec Kit artifacts (specs, plans, research, quickstarts, tasks) as the living knowledge base for each feature.
- Link runtime guides (e.g., CLAUDE.md, AGENTS.md) to new technologies or patterns introduced in plan.md outputs.
- Ensure feature folders include quickstart instructions and troubleshooting notes derived from testing outcomes.

## Project-Specific Mandates — NX-Test POC

### XIII. Nx Monorepo Conventions & Documentation
- Use Nx generators exclusively for creating new applications and packages (nx g @nx/next:app, nx g @nx/node:lib, etc.).
- Respect @nx/enforce-module-boundaries rules configured in ESLint; packages must not import from apps.
- Leverage affected commands (nx affected -t test,build,lint) for efficient CI/CD execution.
- Follow buildable library pattern for all packages/ to enable independent compilation and Nx caching.
- Document all Nx commands, patterns, and workflows in docs/ for team wiki and knowledge base.
- Capture Nx-specific learnings, best practices, and conventions as they emerge during development.
- Quality gates: lint and typecheck must pass; unit tests required for packages/; E2E tests DEFERRED until POC validated (not in local workflow or CI).

### XIV. Tech Stack Non-Negotiables
- **Web**: Next.js 15 with React 19, App Router pattern, server components where applicable.
- **Mobile**: Expo with Expo Router (decision deferred to Phase 3 per poc-plan.md); React Native best practices when implemented.
- **Database**: Supabase for PostgreSQL database and authentication services.
- **ORM**: Prisma configured for Supabase, with migrations tracked in packages/database.
- **API**: oRPC with Zod validation for type-safe contracts between server and clients.
- **Styling**: Tailwind CSS with PostCSS; ShadCN components where applicable.
- **Package Manager**: pnpm (v9+); use workspace protocol for internal dependencies.
- **Tooling**: ESLint 9, Prettier, TypeScript strict mode, Jest (unit), Playwright (E2E deferred).
- Follow versions and dependency specifications from docs/poc-plan.md; seek explicit approval for deviations.

### XV. Multi-Platform Package Design
- Shared packages (database, schemas, api-client, supabase-client) should be designed to support both web (Next.js) and potential future mobile (Expo) environments.
- Avoid platform-specific APIs in shared packages; use runtime detection or factory patterns when platform differences are unavoidable.
- Test cross-platform compatibility before marking package features complete; validate on web app (mobile validation if Phase 3 approved).
- Document platform-specific workarounds, limitations, or configuration requirements in package README files.

### XVI. Nx Best Practices & Team Knowledge Base
- Document all Nx commands, generator invocations, and workflow patterns in docs/ (e.g., docs/nx-patterns.md).
- Capture development learnings: caching behavior, affected command usage, module boundary configurations, build optimizations.
- Record team conventions: naming patterns, library organization, dependency management approaches.
- Log quantitative metrics for reference: build times, cache hit rates, affected command efficiency, graph computation time.
- Maintain this documentation as a living knowledge base for current team and future projects using this template.

### XVII. POC Validation & Template Requirements
- Keep implementation generic and minimal - this is infrastructure scaffolding, not product development.
- Validate integration points: web-server communication (oRPC), server-database (Prisma), authentication (Supabase Auth).
- Prove quality gates work: lint, typecheck, unit tests for packages, CI pipeline execution.
- Document architectural decisions and template usage patterns for reuse across future SaaS projects.
- Once POC validated, sample application will be removed and replaced with actual product features.

## Governance

### XVIII. Constitution Change Control
- Update .specify/memory/constitution.md and validate dependent templates (plan-template.md, spec-template.md, tasks-template.md) whenever amendments are made.
- Run a representative /speckit.specify -> /speckit.plan -> /speckit.tasks cycle after amendments to confirm new rules propagate without contradiction.
- Track version using semantic versioning (MAJOR.MINOR.PATCH), ratification date, and amendment dates at bottom of this document.
- Reflect constitutional changes across AGENTS.md and any feature-specific guidance documents.

### XIX. Adoption & Compliance Oversight
- Reviewers enforce this constitution during code review, verifying TDD evidence, quality gate outputs, documentation outlines, and Nx convention adherence.
- Escalate violations through corrective tasks, PR feedback, and training updates as needed.
- Capture friction points, recurring issues, or constitution conflicts in retrospectives and agent guidance files to inform future amendments and ADRs.
- For POC/template work, balance rigor with velocity; prioritize strict adherence in packages/, allow pragmatic flexibility in apps/ with documented justification.

**Version**: 1.1.0 | **Ratified**: 2025-10-16 | **Last Amended**: 2025-10-16
