---
description: Analyze and fix issues - phân tích và sửa lỗi thông minh
---

# /fix - Sửa Lỗi Thông Minh

Phân tích issues và route tới specialized fix command phù hợp.

## Decision Tree

### 1. Check existing plan

- Nếu có markdown plan → `/code <path-to-plan>`

### 2. Route theo issue type

| Keywords | Route To |
|----------|----------|
| type, typescript, tsc, type error | `/fix-types` |
| ui, ux, design, layout, style, css | `/fix-ui` |
| github actions, pipeline, ci/cd | `/fix-ci` |
| test, spec, jest, vitest, failing test | `/fix-test` |
| logs, error logs, stack trace | `/fix-logs` |
| 2+ unrelated issues | `/fix-parallel` |
| complex, architecture, refactor | `/fix-hard` |
| simple bug, single file (default) | `/fix-fast` |

## Variants

- `/fix-fast` - Quick fix cho bugs đơn giản
- `/fix-hard` - Complex issues cần deep analysis
- `/fix-types` - TypeScript type errors
- `/fix-ui` - UI/UX issues
- `/fix-ci` - CI/CD pipeline issues
- `/fix-test` - Test failures
- `/fix-logs` - Log analysis
- `/fix-parallel` - Multiple independent issues

## Lưu Ý

> [!TIP]
>
> - Nếu unclear → hỏi user để clarify
> - Có thể combine routes: e.g., type errors + UI → `/fix-parallel`
