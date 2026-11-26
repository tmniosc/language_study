# Học ngôn ngữ

Các site học ngoại ngữ, gộp chung một repo. Toàn bộ là file tĩnh (HTML, CSS, JS, JSON), không có backend.

| Thư mục | Nội dung |
|---|---|
| `index.html` | Trang mục lục, dẫn sang từng site |
| `english_study/` | Học tiếng Anh: chức vụ câu, khối từ, luyện nói, phản xạ nói |
| `xuexi_hanyu/` | Học tiếng Trung: câu HSK1–6 chia theo chức vụ, từ vựng |

Mỗi site để trang trong `src/` của nó; chi tiết xem README trong từng thư mục.

## Xem thử

Trang đọc dữ liệu bằng `fetch`, nên phải mở qua http chứ không mở file trực tiếp. Trên Windows: double-click
`run.bat`. Hoặc:

```bash
python serve.py --open
```

Server không cache, cổng mặc định 8000 (bận thì tự lấy cổng kế tiếp). Đường dẫn giống hệt trên GitHub Pages:
`/` là mục lục, `/english_study/` là `english_study/src/`, `/xuexi_hanyu/` là `xuexi_hanyu/src/`.

## Đăng lên GitHub Pages

Một lần: trong Settings → Pages của repo, chọn Source là **GitHub Actions**.

Sau đó đẩy lên nhánh `main` là xong: `.github/workflows/pages.yml` gom `index.html` và `src/` của mỗi site
(mọi thư mục con có `src/`) thành site tĩnh rồi đăng. Site nằm ở `https://<tài khoản>.github.io/<tên repo>/`;
đặt tên repo là `<tài khoản>.github.io` thì site nằm ngay ở tên miền gốc.

Thêm một site mới: tạo thư mục con có `src/index.html`, rồi thêm một thẻ vào `index.html`. Workflow và
`serve.py` tự nhận thư mục mới.
