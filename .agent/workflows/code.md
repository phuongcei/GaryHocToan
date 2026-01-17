---
description: Start coding & testing an existing plan - bắt đầu code theo kế hoạch
---

# /code - Thực Thi Kế Hoạch

Bắt đầu coding và testing theo kế hoạch có sẵn.

## Bước 0: Plan Detection

**Nếu không có argument:**

1. Tìm `plan.md` mới nhất trong `./plans/`
2. Parse phases và auto-select phase chưa hoàn thành

**Nếu có argument:** Sử dụng plan được chỉ định

## Bước 1: Analysis & Task Extraction

1. Đọc toàn bộ plan file
2. Map dependencies giữa các tasks
3. List ambiguities hoặc blockers
4. Kích hoạt skills cần thiết
5. Extract actionable tasks vào TodoWrite

**Output:** `✓ Step 1: Found [N] tasks across [M] phases`

## Bước 2: Implementation

1. Implement từng task theo extracted tasks
2. Cho UI work → gọi `ui-ux-designer` subagent
3. Sử dụng `ai-multimodal` skill cho assets
4. Run type checking và compile

**Output:** `✓ Step 2: Implemented [N] files - [X/Y] tasks complete`

## Bước 3: Testing

1. Write tests (happy path, edge cases, error cases)
2. Gọi `tester` subagent
3. Nếu fail → gọi `debugger` subagent → fix → re-test
4. Lặp lại cho đến khi 100% pass

**Output:** `✓ Step 3: Tests [X/X passed]`

> [!CAUTION]
> KHÔNG sử dụng fake data, mocks, cheats để pass tests!

## Bước 4: Code Review (BLOCKING GATE)

1. Gọi `code-reviewer` subagent
2. Review cycle (max 3):
   - Score, critical issues, warnings
   - Hỏi user: Fix/Approve/Abort
3. User PHẢI explicitly approve

**Output:** `✓ Step 4: Code reviewed - [score]/10 - User approved`

## Bước 5: Finalize

1. Gọi `project-manager` subagent → update plan status
2. Gọi `docs-manager` subagent → update docs
3. Auto-commit (nếu conditions met)

**Output:** `✓ Step 5: Finalize - Status updated - Git committed`

## Variants

- `/code-auto` - Auto mode
- `/code-no-test` - Skip testing
- `/code-parallel` - Parallel implementation
