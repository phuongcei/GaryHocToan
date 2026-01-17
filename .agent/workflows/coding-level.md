---
description: Set coding experience level - thiết lập level lập trình
---

# /coding-level - Thiết Lập Level Lập Trình

Đặt level kinh nghiệm lập trình để nhận giải thích phù hợp với trình độ.

## Cách Sử Dụng

```
/coding-level [0-5]
```

## Các Level

| Level | Tên | Mô tả |
|-------|-----|-------|
| 0 | ELI5 | Zero experience - dùng analogies, không jargon |
| 1 | Junior | 0-2 năm - giải thích WHY, không chỉ HOW |
| 2 | Mid-Level | 3-5 năm - design patterns, system thinking |
| 3 | Senior | 5-8 năm - trade-offs, business context |
| 4 | Tech Lead | 8-10 năm - risk, business impact, strategy |
| 5 | God Mode | Expert - maximum efficiency (default) |

## Cách Hoạt Động

1. Set `codingLevel` trong `.claude/.ck.json`:
   ```json
   {
     "codingLevel": 1
   }
   ```
2. Guidelines được **tự động inject** mỗi session
3. Không cần kích hoạt thủ công

## Optional: Manual Output Styles

Để kiểm soát chi tiết hơn, dùng `/output-style`:
- `coding-level-0-eli5` đến `coding-level-5-god`
