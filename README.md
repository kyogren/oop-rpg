# Hành Trình OOP

Web đồng hành môn Lập trình hướng đối tượng C++: cả lớp cùng xây một game RPG theo lượt, mỗi tuần thêm một kỹ năng OOP mới.

## Chạy thử trên máy

```bash
npm install
npm run dev        # mở http://localhost:5173
```

## Cập nhật nội dung hằng tuần

Mọi nội dung nằm trong 3 chỗ, không cần đụng vào code giao diện:

| Muốn làm gì | Sửa ở đâu |
|---|---|
| Mở khóa vùng đất mới trên bản đồ | `src/content/weeks.ts`: đặt `unlocked: true` |
| Công bố lời giải sau buổi học | `src/content/weeks.ts`: đặt `solutionReleased: true` |
| Nhiệm vụ, phần thưởng, sơ đồ lớp, bài tập, link Moodle | `src/content/weeks.ts` |
| Phần "Kỹ năng mới" | `src/content/weeks/<slug>.md` (Markdown) |
| Code C++ hiển thị trên web | `code/weekXX/main.cpp` |

Vùng "đang ở đây" tự động là vùng mở khóa cuối cùng.

Sơ đồ lớp: thêm `change: 'new'` hoặc `change: 'changed'` cho thuộc tính, phương thức để tô màu phần thay đổi so với tuần trước.

## Đăng lên GitHub Pages

1. Tạo repo mới trên GitHub (ví dụ `oop-rpg`), rồi trong thư mục này:
   ```bash
   git init && git add . && git commit -m "Khởi tạo web Hành Trình OOP"
   git branch -M main
   git remote add origin https://github.com/<user>/oop-rpg.git
   git push -u origin main
   ```
2. Trên GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Mỗi lần `git push`, web tự build và cập nhật tại `https://<user>.github.io/oop-rpg/`.
4. Điền `repoUrl` trong `src/content/site.ts` để mỗi file code có nút "Xem trên GitHub".

## Lưu ý về lời giải

`solutionReleased: false` chỉ ẩn lời giải trên giao diện web. Nếu repo để public, sinh viên vẫn đọc được file trong thư mục `code/`. Nên chỉ commit file lời giải của tuần sau khi buổi học kết thúc.
