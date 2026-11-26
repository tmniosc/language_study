# Học tiếng Anh

Bốn trang học tiếng Anh. Toàn bộ là file tĩnh (HTML, CSS, JS, JSON), không có backend, không có bước dựng;
đăng trên GitHub Pages cùng repo cha `language_study`, ở thư mục con `english_study/` của site.

| Trang | Nội dung |
|---|---|
| `en-svo` | Câu tiếng Anh chia theo chức vụ (S/V/O/C…): động từ đặc biệt, nhóm theo ngữ nghĩa, bảng tra nhãn |
| `en-chunks` | ~1270 khối (cụm từ) tiếng Anh thông dụng, mỗi câu ví dụ tách thành khối |
| `en-matrix` | ~2900 câu luyện nói từ bộ Speaking Matrix, ngắt khối kèm nghĩa tiếng Việt |
| `en-speak` | Rèn phản xạ nói: thần chú, năm nguyên tắc, danh sách độc thoại, ngân hàng ý (ý → cách nói theo khối) |

## Cấu trúc

```
src/            cả site, đăng nguyên thư mục này
  index.html            trang mục lục
  en-svo/, en-chunks/   đồ thị câu, khối từ (en-chunks đọc chunks.json)
  en-matrix/            luyện nói Speaking Matrix: data.json (dựng từ epub), vi.json (nghĩa tiếng Việt)
  en-speak/             rèn phản xạ nói: data.js (gợi ý độc thoại + ý→khối), hiện thẳng trong trang
tools/
  speaking-matrix.py    dựng src/en-matrix/data.json từ năm cuốn epub Speaking Matrix (Python 3)
```

## Xem thử

Trang đọc dữ liệu bằng `fetch`, nên phải mở qua http chứ không mở file trực tiếp. Dùng server chung ở thư mục cha
`language_study` (serve mọi repo cùng lúc, không cache): double-click `..\run.bat`, hoặc

```bash
python ../serve.py --open
```

rồi vào http://localhost:8000/english_study/ (cổng bận thì tự lấy cổng kế tiếp, địa chỉ in ra trong cửa sổ).

## Đăng lên GitHub Pages

Thư mục này nằm trong repo `language_study`. Đẩy repo đó lên nhánh `main` là xong: workflow ở
`../.github/workflows/pages.yml` đăng `src/` của thư mục này thành `english_study/` trên site.

## Sửa nội dung

- Khối tiếng Anh: `src/en-chunks/chunks.json`.
- Speaking Matrix: epub không nằm trong repo. Dựng lại `data.json`:

  ```bash
  python tools/speaking-matrix.py <thư mục epub>
  ```

  Sách viết cho người Hàn, nhưng trang và `data.json` không giữ chữ Hàn nào. Nghĩa câu, nghĩa từng khối nằm ở
  `src/en-matrix/vi.json` (khóa là câu tiếng Anh), nên dựng lại `data.json` không mất bản dịch. Tên bài, tên mục,
  ghi chú từ vựng được thay bằng tiếng Việt lúc dựng, tra từ `vi-titles.json` đặt cạnh các file epub; chưa dịch
  thì để trống. Cần bản gốc tiếng Hàn để dịch phần mới thì thêm `--ko` (ghi `src/en-matrix/ko.json`, không đăng).
