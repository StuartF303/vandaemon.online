# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Specify** repository - a feature-driven development workflow system that uses AI-assisted specification, planning, task generation, and implementation. The workflow is organized around numbered feature branches (e.g., `001-feature-name`) with comprehensive documentation in `specs/###-feature-name/` directories.

## Development Commands

All workflow commands are PowerShell scripts that work across platforms (Windows/Linux/macOS). Scripts support both human-readable and JSON output via the `-Json` flag.

### Feature Workflow Commands

Execute these slash commands in order for a complete feature implementation:

1. **`/speckit.specify "<feature description>"`** - Create feature specification
   - Generates short-name from description (2-4 words)
   - Creates feature branch `###-feature-name` (auto-increments number)
   - Creates `specs/###-feature-name/spec.md` with user stories, requirements, success criteria
   - Validates specification quality with checklist
   - Resolves clarifications interactively (max 3 questions)

2. **`/speckit.plan`** - Create implementation plan
   - Generates `plan.md` with tech stack, project structure, dependencies
   - Creates Phase 0 `research.md` (resolves technical unknowns)
   - Creates Phase 1 design: `data-model.md`, `contracts/`, `quickstart.md`
   - Validates against project constitution
   - Updates agent context files

3. **`/speckit.tasks`** - Generate actionable task list
   - Creates `tasks.md` organized by user story priority (P1, P2, P3...)
   - Tasks follow format: `- [ ] [ID] [P?] [Story] Description with file path`
   - Enables independent implementation and testing per story
   - Includes dependency graph and parallel execution opportunities

4. **`/speckit.implement`** - Execute implementation
   - Checks all checklists for completion (blocks if incomplete)
   - Executes tasks phase-by-phase from `tasks.md`
   - Respects dependencies and parallel markers `[P]`
   - Marks completed tasks as `[X]` in tasks.md
   - Creates/verifies ignore files (.gitignore, .dockerignore, etc.)

### Supporting Commands

- **`/speckit.clarify`** - Refine specification with targeted questions (max 5)
- **`/speckit.checklist`** - Generate custom checklist for the current feature
- **`/speckit.analyze`** - Cross-artifact consistency analysis (spec.md, plan.md, tasks.md)
- **`/speckit.constitution`** - Create/update project constitution with principles and constraints
- **`/speckit.taskstoissues`** - Convert tasks.md into GitHub issues with dependencies

## Architecture

### Directory Structure

```
.claude/commands/           # Slash command definitions (speckit.*)
.specify/
  ├── memory/
  │   └── constitution.md   # Project principles and constraints
  ├── scripts/powershell/   # Workflow automation scripts
  │   ├── common.ps1        # Shared functions (Get-RepoRoot, Get-CurrentBranch, etc.)
  │   ├── create-new-feature.ps1
  │   ├── setup-plan.ps1
  │   ├── check-prerequisites.ps1
  │   └── update-agent-context.ps1
  └── templates/            # Document templates for spec, plan, tasks, checklists
specs/
  └── ###-feature-name/     # Per-feature documentation
      ├── spec.md           # What/Why (no implementation details)
      ├── plan.md           # How (tech stack, architecture)
      ├── research.md       # Technical decisions and alternatives
      ├── data-model.md     # Entities and relationships
      ├── tasks.md          # Actionable implementation tasks
      ├── quickstart.md     # Integration scenarios
      ├── contracts/        # API specifications (OpenAPI/GraphQL)
      └── checklists/       # Quality gates (requirements.md, ux.md, etc.)
```

### Key Concepts

**Feature Branches**: Named `###-feature-name` where `###` is zero-padded sequential number (001, 002...). Scripts auto-detect highest number across:
- Remote branches (`git ls-remote --heads origin`)
- Local branches (`git branch`)
- Specs directories (`specs/###-feature-name`)

**User Story Organization**: Tasks are grouped by user story (US1, US2, US3...) matching priorities from spec.md (P1, P2, P3...). Each story should be independently implementable and testable as MVP increments.

**Constitution Check**: All plans validated against `.specify/memory/constitution.md` principles. Violations must be justified or blocked.

**Script Invocation**: Scripts run from repo root. Support both git and non-git repositories (fallback to `.specify` marker). Use `-Json` flag for machine-readable output.

### PowerShell Script Patterns

All scripts follow these conventions:
- Use `Get-RepoRoot` to find repository root (git-aware with fallback)
- Use `Get-CurrentBranch` to detect feature context (git → env var → latest specs dir)
- Use `Test-HasGit` to check git availability
- JSON output via `-Json` flag for Claude Code parsing
- Support `$env:SPECIFY_FEATURE` override for non-git workflows

### Specification Quality Rules

**Spec.md must**:
- Focus on WHAT and WHY (no HOW/implementation)
- Be written for non-technical stakeholders
- Have independently testable user stories with priorities
- Limit [NEEDS CLARIFICATION] markers to max 3 critical items
- Include measurable, technology-agnostic success criteria

**Plan.md must**:
- Resolve all NEEDS CLARIFICATION from spec
- Define tech stack and project structure explicitly
- Pass constitution gates or document justified violations
- Map all entities/contracts to user stories

**Tasks.md must**:
- Follow format: `- [ ] [TID] [P?] [StoryLabel] Description with path`
- Organize by user story phases (Setup → Foundation → US1 → US2 → Polish)
- Mark parallel tasks with `[P]` marker
- Include exact file paths for all implementation tasks

## Important Notes

- **Always run scripts from repository root** - Scripts use relative paths
- **Parse JSON output** - All scripts with `-Json` flag emit structured data for tool parsing
- **Respect phase order** - Setup → Specify → Plan → Tasks → Implement (don't skip)
- **Test philosophy** - Tests are OPTIONAL unless explicitly requested in spec or TDD approach specified
- **Windows compatibility** - PowerShell scripts work on Windows, Linux (pwsh), and macOS (pwsh)
- **Non-git support** - All workflows function without git (use specs/ directory structure)
- **Quote handling** - For single quotes in args: `'I'\''m Groot'` (bash) or `"I'm Groot"` (PowerShell)

## Common Workflows

### Start a new feature
```bash
/speckit.specify "Add user authentication with OAuth2 support"
# Creates branch, spec.md, validates quality, asks clarifications
```

### Complete feature implementation
```bash
/speckit.plan          # Generate technical plan and research
/speckit.tasks         # Break down into executable tasks
/speckit.implement     # Execute all tasks phase-by-phase
```

### Add custom quality gate
```bash
/speckit.checklist "security"   # Create security checklist
# Edit checklists/security.md manually
# /speckit.implement will block if incomplete
```

### Update project principles
```bash
/speckit.constitution "Add principle: Test-First Development (TDD mandatory)"
# Updates constitution.md, propagates to templates, increments version
```
