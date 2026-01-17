---
description: Preview markdown files - xem trước markdown
---

# /preview - Xem Trước Markdown

Universal viewer cho markdown files.

## Usage

- `/preview <file.md>` - View markdown file
- `/preview <directory/>` - Browse directory
- `/preview --stop` - Stop server

## Examples

```bash
/preview plans/my-plan/plan.md     # View markdown file
/preview plans/                    # Browse plans directory
/preview docs/                     # Browse docs directory
```

## Execution

Skill location: `.claude/skills/markdown-novel-viewer/`

### Stop Server

```bash
node .claude/skills/markdown-novel-viewer/scripts/server.cjs --stop
```

### Start Server (File mode)

```bash
node .claude/skills/markdown-novel-viewer/scripts/server.cjs \
  --file "$INPUT_PATH" \
  --host 0.0.0.0 \
  --open \
  --foreground
```

### Start Server (Directory mode)

```bash
node .claude/skills/markdown-novel-viewer/scripts/server.cjs \
  --dir "$INPUT_PATH" \
  --host 0.0.0.0 \
  --open \
  --foreground
```

> [!IMPORTANT]
>
> - MUST display FULL URL including path and query string
> - Run as background task
