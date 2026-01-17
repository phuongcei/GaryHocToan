---
description: Scout directories to respond to requests - khám phá codebase nhanh
---

# /scout - Khám Phá Codebase

Tìm kiếm nhanh trong codebase để tìm files cần thiết.

## Variables

- `USER_PROMPT`: Yêu cầu tìm kiếm
- `SCALE`: Số agents (default: 3)
- `REPORT_OUTPUT_DIR`: Từ `## Naming` section

## Workflow

1. **Spawn multiple Explore subagents** in parallel
2. Each agent scout một folder khác nhau
3. Timeout: 3 minutes per agent
4. Skip agents không return trong timeout

## Hướng Dẫn

> [!TIP]
>
> - Quick search, không phải full-blown search
> - Divide folders intelligently
> - Sacrifice grammar for concision
> - List unresolved questions

## Variants

- `/scout-ext` - Scout external resources (preferred)
