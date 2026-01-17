---
description: Khởi tạo và kích hoạt toàn bộ hệ thống AI - đọc tất cả skills, commands, agents, rules để sẵn sàng làm việc
---

# /start - Khởi Tạo Hệ Thống AI

Khi workflow này được kích hoạt, AI phải thực hiện các bước sau để hiểu và kích hoạt toàn bộ hệ thống hướng dẫn.

---

## 🔄 Bước 0: Sync Check (TỰ ĐỘNG ĐỒNG BỘ)

**MỤC ĐÍCH:** Phát hiện và đồng bộ các thay đổi mới từ ClaudeKit trước khi bắt đầu.

### 0.1 Quét ClaudeKit Commands

Liệt kê tất cả commands trong `.claude/commands/`:

```
Scan: ./.claude/commands/*.md
Scan: ./.claude/commands/**/*.md (subdirectories)
```

### 0.2 So sánh với Workflows hiện có

Liệt kê workflows hiện có trong `.agent/workflows/`:

```
Scan: ./.agent/workflows/*.md
```

### 0.3 Phát hiện thay đổi

So sánh và phân loại:

| Loại | Mô tả | Hành động |
|------|-------|-----------|
| **NEW** | Command mới chưa có workflow | Tạo workflow mới |
| **UPDATED** | Command có nội dung thay đổi đáng kể | Cập nhật workflow |
| **DELETED** | Workflow có nhưng command đã bị xóa | Báo cáo cho user |
| **SYNCED** | Đã đồng bộ | Không làm gì |

### 0.4 Tự động đồng bộ

**Nếu phát hiện NEW commands:**

1. Đọc nội dung command mới
2. Tạo workflow tương ứng trong `.agent/workflows/`
3. Format: Giữ description gốc + Việt hóa mô tả

**Nếu phát hiện UPDATED commands:**

1. So sánh nội dung cũ vs mới
2. Cập nhật workflow với logic mới
3. Giữ nguyên format và style

### 0.5 Báo cáo Sync

```
📦 ClaudeKit Sync Report:
├── Commands scanned: X
├── Workflows existing: Y
├── NEW: [list new commands]
├── UPDATED: [list updated commands]
├── DELETED: [list deleted commands]
└── Status: ✅ Synced / ⚠️ Needs attention
```

---

## Bước 1: Đọc Các File Hướng Dẫn Chính

Đọc và ghi nhớ nội dung các file hướng dẫn cấp cao nhất:

1. **CLAUDE.md** - Hướng dẫn chính cho Claude AI
2. **AGENTS.md** - Hướng dẫn cho OpenCode và các AI khác
3. **README.md** (nếu có) - Tổng quan dự án

```
Đọc file: ./CLAUDE.md
Đọc file: ./AGENTS.md
Đọc file: ./README.md (nếu có)
```

---

## Bước 2: Đọc Các Rules (Quy Tắc)

Đọc tất cả các file rules để hiểu quy trình làm việc:

```
Đọc tất cả file trong: ./.claude/rules/
- development-rules.md
- documentation-management.md
- orchestration-protocol.md
- primary-workflow.md
- (và các rules mới nếu có)
```

---

## Bước 3: Index Danh Sách Commands

Liệt kê và ghi nhớ tất cả commands có sẵn trong thư mục `.claude/commands/`:

### Commands Chính

- `/ask` - Hỏi đáp kiến trúc
- `/bootstrap` - Khởi tạo dự án mới
- `/brainstorm` - Brainstorming ý tưởng
- `/code` - Viết code theo kế hoạch
- `/cook` - Implement feature từ A-Z
- `/debug` - Debug lỗi
- `/fix` - Sửa lỗi thông minh
- `/journal` - Viết nhật ký
- `/kanban` - Dashboard quản lý
- `/plan` - Lập kế hoạch
- `/preview` - Xem trước markdown
- `/scout` - Khám phá codebase
- `/test` - Chạy tests
- `/worktree` - Git worktree

### Quét Commands mới

```
Nếu có commands mới trong .claude/commands/ chưa có trong danh sách trên
→ Thêm vào danh sách
→ Tạo workflow nếu cần
```

---

## Bước 4: Index Danh Sách Skills

Ghi nhớ các skills có sẵn trong `.claude/skills/`:

### Skill Categories đã biết

- ai-artist, ai-multimodal, backend-development, better-auth
- brainstorming, chrome-devtools, code-review, common
- context-engineering, databases, debugging, devops
- docs-seeker, document-skills, frontend-design, frontend-development
- google-adk-python, markdown-novel-viewer, mcp-builder, mcp-management
- media-processing, mermaidjs-v11, mobile-development, payment-integration
- planning, plans-kanban, problem-solving, repomix
- research, sequential-thinking, shopify, skill-creator
- template-skill, threejs, ui-styling, ui-ux-pro-max, web-frameworks

### Quét Skills mới

```
Scan: ./.claude/skills/*/
Nếu có skill mới chưa có trong danh sách → Thêm vào index
```

---

## Bước 5: Index Danh Sách Agents

Ghi nhớ các agents có sẵn trong `.claude/agents/`:

### Agents đã biết

- brainstormer, code-reviewer, copywriter, database-admin
- debugger, docs-manager, fullstack-developer, git-manager
- journal-writer, mcp-manager, planner, project-manager
- researcher, scout-external, scout, tester, ui-ux-designer

### Quét Agents mới

```
Scan: ./.claude/agents/*.md
Nếu có agent mới chưa có trong danh sách → Thêm vào index
```

---

## Bước 6: Kiểm Tra OpenCode Config (Nếu Sử Dụng OpenCode)

Nếu đang sử dụng OpenCode, đọc thêm:

```
Đọc file: ./.opencode/package.json
Liệt kê: ./.opencode/command/
Liệt kê: ./.opencode/skill/
Liệt kê: ./.opencode/agent/
Liệt kê: ./.opencode/rules/
```

---

## Bước 7: Xác Nhận Kích Hoạt

Sau khi hoàn thành tất cả các bước trên, AI phải:

1. **Báo cáo tóm tắt** những gì đã đọc và kích hoạt
2. **Liệt kê** các thay đổi mới (nếu có)
3. **Xác nhận** sẵn sàng làm việc

### Format Báo Cáo

```
✅ Đã khởi tạo hệ thống AI thành công!

🔄 Sync Status:
- Commands: X total (Y new, Z updated)
- Skills: X total (Y new)
- Agents: X total (Y new)
- Workflows: X total (Y auto-created)

📚 Đã đọc:
- X file hướng dẫn chính
- X rules
- X commands (và biến thể)
- X skills
- X agents

🆕 Thay đổi mới phát hiện:
- [Liệt kê commands/skills/agents mới nếu có]
- [Hoặc "Không có thay đổi mới"]

🎯 Sẵn sàng làm việc. Sử dụng các lệnh sau:
- /plan - Lập kế hoạch
- /code - Viết code
- /fix - Sửa lỗi
- /test - Test code
- /cook - Implement feature
- ... (và các lệnh khác)

Hỏi "/ck-help" để xem hướng dẫn chi tiết.
```

---

## Lưu Ý Quan Trọng

> [!IMPORTANT]
>
> - **SYNC TRƯỚC** - Luôn chạy Bước 0 trước khi làm bất cứ điều gì
> - **PHẢI TUÂN THỦ** quy trình trong `development-rules.md`
> - **PHẢI ĐỌC** `README.md` trước khi bắt đầu bất kỳ dự án nào
> - **PHẢI KÍCH HOẠT** skills phù hợp với task đang làm
> - Khi chạy Python scripts từ skills, sử dụng venv Python interpreter

> [!TIP]
>
> - Sử dụng `/plan` trước khi code để lập kế hoạch
> - Sử dụng `/scout` để tìm hiểu codebase hiện có
> - Sử dụng `/kanban` để quản lý tasks
> - Nếu có lỗi, dùng `/fix` để được routing thông minh

---

## Cấu Trúc Thư Mục Tham Khảo

```
.claude/
├── commands/          # ClaudeKit commands (source)
├── skills/            # Skills library
├── agents/            # Agent definitions
├── rules/             # Development rules
└── scripts/           # Helper scripts

.agent/
└── workflows/         # Antigravity workflows (synced from commands)

.opencode/             # OpenCode alternative (if used)
├── command/
├── skill/
├── agent/
└── rules/
```

---

*Workflow này được tạo cho Antigravity AI và tương thích với Claude Code, OpenCode, và các AI coding agents khác.*
*Auto-sync feature đảm bảo workflows luôn cập nhật với ClaudeKit mới nhất.*
