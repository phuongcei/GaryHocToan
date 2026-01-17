---
description: Create git worktree for parallel development - tạo worktree cho phát triển song song
---

# /worktree - Git Worktree

Tạo isolated git worktree cho parallel feature development.

## Workflow

### Step 1: Get Repo Info

```bash
node .claude/scripts/worktree.cjs info --json
```

Response: `repoType`, `baseBranch`, `projects`, `envFiles`, `dirtyState`

### Step 2: Detect Branch Prefix

| Keywords | Prefix |
|----------|--------|
| fix, bug, error, issue | `fix` |
| refactor, restructure | `refactor` |
| docs, documentation | `docs` |
| test, spec, coverage | `test` |
| chore, cleanup, deps | `chore` |
| perf, performance, optimize | `perf` |
| Others | `feat` |

### Step 3: Slug Conversion

- "add authentication system" → `add-auth`
- "fix login bug" → `login-bug`
- Remove filler words, kebab-case, max 50 chars

### Step 4: Execute

**Monorepo:**

```bash
node .claude/scripts/worktree.cjs create "<PROJECT>" "<SLUG>" --prefix <TYPE>
```

**Standalone:**

```bash
node .claude/scripts/worktree.cjs create "<SLUG>" --prefix <TYPE>
```

### Step 5: Install Dependencies

Based on project context:

- `bun.lock` → `bun install`
- `pnpm-lock.yaml` → `pnpm install`
- `yarn.lock` → `yarn install`
- `package-lock.json` → `npm install`

## Commands

| Command | Usage |
|---------|-------|
| `create` | Create new worktree |
| `remove` | Remove worktree and branch |
| `info` | Get repo info |
| `list` | List existing worktrees |
