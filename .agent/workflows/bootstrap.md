---
description: Bootstrap a new project step by step - khởi tạo dự án mới từ đầu
---

# /bootstrap - Khởi Tạo Dự Án Mới

Khởi tạo dự án mới từ đầu với full workflow.

## Nguyên Tắc

- **YAGNI**: Không over-engineering
- **KISS**: Giữ đơn giản
- **DRY**: Không lặp code

## Workflow

### 1. Git Check

- Check Git initialized → hỏi user init nếu chưa
- Sử dụng `git-manager` subagent

### 2. Fulfill Request

- Hỏi 1 question at a time
- Kích hoạt skills cần thiết

### 3. Research

- Parallel `researcher` subagents
- Research reports ≤150 lines

### 4. Tech Stack

- Hỏi user tech stack preference
- Hoặc auto-suggest với `planner` + `researcher`
- Write to `./docs/`

### 5. Planning

- `planner` subagent tạo implementation plan
- Cấu trúc progressive disclosure:
  - `plan.md` (≤80 lines)
  - `phase-XX-name.md` files
- **KHÔNG implement ngay** - wait for approval

### 6. Wireframe & Design (Optional)

- `ui-ux-designer` subagent
- Design guidelines: `./docs/design-guidelines.md`
- Wireframes: `./docs/wireframe/`
- Có thể generate logo với `ai-multimodal` skill

### 7. Implementation

- Follow plan step by step
- `ui-ux-designer` cho frontend
- Type checking và compile

### 8. Testing

- Real tests, NO fake data
- `tester` subagent
- `debugger` subagent nếu fail
- Repeat until all pass

### 9. Code Review

- `code-reviewer` subagent
- Fix issues và re-test
- Report to user for approval

### 10. Documentation

- `docs-manager` subagent:
  - `README.md`
  - `codebase-summary.md`
  - `project-overview-pdr.md`
  - `code-standards.md`
  - `system-architecture.md`
- `project-manager` subagent: roadmap

### 11. Onboarding

- Hướng dẫn user get started
- Configure step by step

### 12. Final Report

- Summary of changes
- Suggest next steps
- Offer git commit/push

## Variants

- `/bootstrap-auto` - Automatic mode
- `/bootstrap-auto-fast` - Fast automatic mode
- `/bootstrap-auto-parallel` - Parallel automatic mode
