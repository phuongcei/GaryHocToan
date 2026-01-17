---
description: AI agent orchestration board - kanban dashboard
---

# /kanban - Dashboard Quản Lý

Plans dashboard với progress tracking.

## Usage

- `/kanban` - View dashboard cho `./plans`
- `/kanban plans/` - View cho specific directory
- `/kanban --stop` - Stop server

## Features

- Plan cards với progress bars
- Phase status breakdown
- Timeline/Gantt visualization
- Activity heatmap
- Issue và branch links

## Execution

Skill location: `.claude/skills/plans-kanban/`

### Stop Server

```bash
node .claude/skills/plans-kanban/scripts/server.cjs --stop
```

### Start Server

```bash
node .claude/skills/plans-kanban/scripts/server.cjs \
  --dir "./plans" \
  --host 0.0.0.0 \
  --open \
  --foreground
```

> [!IMPORTANT]
>
> - MUST display FULL URL including path and query string
> - Run as background task
