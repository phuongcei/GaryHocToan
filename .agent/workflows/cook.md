---
description: Implement a feature step by step - implement feature từ đầu đến cuối
---

# /cook - Implement Feature (Standalone)

Implement một feature từ đầu đến cuối, bao gồm planning nội bộ.

> [!IMPORTANT]
> `/cook` là standalone workflow - tự plan internally.
> KHÔNG cần chạy `/plan` trước khi `/cook`.

## Nguyên Tắc

- **YAGNI**: Không over-engineering
- **KISS**: Giữ đơn giản
- **DRY**: Không lặp code

## Workflow

### 1. Fulfill Request

- Hỏi 1 question at a time nếu cần
- Kích hoạt skills từ `.claude/skills/*`

### 2. Research

- Parallel `researcher` subagents
- `/scout:ext` hoặc `/scout` để tìm files
- Reports ≤150 lines

### 3. Plan

- `planner` subagent analyze reports
- Tạo plan với progressive disclosure structure
- Directory: `./plans/`

### 4. Implementation

- `/code` slash command
- `ui-ux-designer` cho frontend
- `ai-multimodal` cho assets
- Type checking và compile

### 5. Testing

- Real tests, NO fake data/mocks
- `tester` subagent
- `debugger` subagent nếu fail
- Repeat until all pass

### 6. Code Review

- `code-reviewer` subagent
- Fix và re-test nếu critical issues
- Report to user

### 7. Project Management & Docs

**If approved:**

- `project-manager` + `docs-manager` parallel
- Update progress và docs

**If rejected:**

- Ask user to explain
- Fix và repeat

### 8. Onboarding

- Hướng dẫn user (API keys, env vars, etc.)
- Configure step by step

### 9. Final Report

- Summary of changes
- Suggest next steps
- Offer git commit/push

## Variants

- `/cook-auto` - Automatic mode
- `/cook-auto-fast` - Fast automatic mode
- `/cook-auto-parallel` - Parallel automatic mode
