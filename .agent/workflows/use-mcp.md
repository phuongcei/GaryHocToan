---
description: Utilize MCP server tools - sử dụng tools từ MCP servers
---

# /use-mcp - Sử Dụng MCP Tools

Thực thi MCP operations qua **Gemini CLI** để tiết kiệm context budget.

## Cách Sử Dụng

```
/use-mcp [task]
```

## Bước Thực Hiện

### 1. Thực thi qua Gemini CLI (Ưu tiên)

```bash
# QUAN TRỌNG: Dùng stdin piping, KHÔNG dùng -p flag (deprecated)
echo "$ARGUMENTS. Return JSON only per GEMINI.md instructions." | gemini -y -m gemini-2.5-flash
```

### 2. Fallback: mcp-manager subagent

Nếu Gemini CLI không khả dụng:
- Dùng `mcp-manager` subagent để discover và execute tools
- Nếu script có issues, dùng `mcp-builder` skill để fix
- **KHÔNG** tạo scripts mới
- Nếu không tìm thấy tools phù hợp, report và move on

## Lưu Ý Quan Trọng

- **PHẢI dùng stdin piping** - flag `-p` deprecated, skip MCP init
- Dùng `-y` flag để auto-approve tool execution
- **GEMINI.md tự động load** - enforce JSON response format
- **Output format:** `{"server":"name","tool":"name","success":true,"result":<data>,"error":null}`

## Anti-Pattern (KHÔNG LÀM)

```bash
# BROKEN - deprecated -p flag skips MCP connections!
gemini -y -m gemini-2.5-flash -p "..."
```
