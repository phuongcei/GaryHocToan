---
description: Review recent changes and wrap up - xem lại thay đổi gần đây
---

# /watzup - Review Changes

Review branch hiện tại và các commits gần đây, tổng hợp thay đổi.

## Cách Sử Dụng

```
/watzup
```

## Bước Thực Hiện

1. **Kiểm tra branch hiện tại:**
   ```bash
   git branch --show-current
   ```

2. **Xem commits gần đây:**
   ```bash
   git log -n 10 --oneline
   ```

3. **Xem chi tiết thay đổi:**
   ```bash
   git diff HEAD~5 --stat
   ```

4. **Tổng hợp báo cáo:**
   - Files được modified, added, removed
   - Impact và quality của changes
   - Có issues gì cần chú ý không

## Output

Cung cấp detailed summary bao gồm:
- ✅ Những gì đã thay đổi
- ➕ Files mới được thêm
- ➖ Files đã bị xóa
- 📊 Overall impact analysis
- ⚠️ Potential issues (nếu có)

## Lưu Ý

> [!IMPORTANT]
> **KHÔNG** bắt đầu implement bất cứ thứ gì. Đây chỉ là review command.
