---
description: ClaudeKit usage guide - hướng dẫn sử dụng ClaudeKit
---

# /ck-help - Hướng Dẫn ClaudeKit

Tất cả hướng dẫn ClaudeKit trong một command. Chạy script để tìm command phù hợp.

## Cách Sử Dụng

```
/ck-help [category|command|task description]
```

Ví dụ:
- `/ck-help fix` - Xem hướng dẫn về category fix
- `/ck-help config` - Xem cấu hình schema
- `/ck-help fix bugs` - Tìm command phù hợp cho task

## Bước Thực Hiện

1. **Dịch sang tiếng Anh** nếu arguments là tiếng Việt
2. **Chạy script:**
   ```bash
   python .claude/scripts/ck-help.py "$ARGUMENTS"
   ```
3. **Đọc output type marker** (`@CK_OUTPUT_TYPE:<type>`) và trình bày phù hợp

## Output Types

| Type | Mô tả | Presentation |
|------|-------|--------------|
| `comprehensive-docs` | Documentation đầy đủ | Show full + add examples/tips |
| `category-guide` | Workflow guides | Show workflow + practical context |
| `command-details` | Single command docs | Show info + usage example |
| `search-results` | Search matches | Group by relevance, suggest best |
| `task-recommendations` | Task-based suggestions | Explain why + suggested order |

## Nguyên Tắc

- **Luôn show đầy đủ script output** - không summarize
- **Thêm value sau output** - examples, tips, gotchas
- **Correct workflow:** `/plan` → `/code`, **KHÔNG** `/plan` → `/cook`
