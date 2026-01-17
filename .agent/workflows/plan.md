---
description: Intelligent plan creation with prompt enhancement - lập kế hoạch thông minh
---

# /plan - Lập Kế Hoạch Thông Minh

Tạo kế hoạch implementation với prompt enhancement.

## Bước 1: Đọc Task

Đọc và phân tích yêu cầu của user:

```
Task: $ARGUMENTS
```

## Bước 2: Pre-Creation Check

Kiểm tra context:

- Nếu có plan đang active → Hỏi user: "Active plan found: {path}. Continue? [Y/n]"
- Nếu có suggested plan → Hỏi user muốn activate hay create new
- Nếu không có plan → Tạo plan mới

## Bước 3: Workflow

1. **Phân tích task** - Đọc yêu cầu và hỏi chi tiết nếu cần
2. **Quyết định độ phức tạp**:
   - Đơn giản → `/plan-fast`
   - Phức tạp → `/plan-hard`
3. **Kích hoạt skill**: `planning`
4. **Tạo enhanced prompt** mô tả chi tiết task

## Bước 4: Tạo Plan

Tạo plan trong thư mục `./plans/` với cấu trúc:

```
plans/
├── YYMMDD-HHMM-feature-name/
│   ├── plan.md                    # Overview (≤80 lines)
│   ├── phase-01-setup.md          # Phase details
│   ├── phase-02-implement.md
│   └── ...
```

## Lưu Ý

> [!IMPORTANT]
>
> - PHẢI kích hoạt `planning` skill
> - KHÔNG bắt đầu implement ngay
> - Sacrifice grammar for concision
> - List unresolved questions at the end

## Biến Thể

- `/plan-fast` - Quick planning cho tasks đơn giản
- `/plan-hard` - Deep planning cho tasks phức tạp
- `/plan-parallel` - Parallel research planning
- `/plan-ci` - CI/CD planning
- `/plan-cro` - CRO (Conversion Rate Optimization) planning
- `/plan-validate` - Validate existing plan
- `/plan-archive` - Archive completed plan
