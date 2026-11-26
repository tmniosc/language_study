# Học tiếng Trung

Hai trang học tiếng Trung. Toàn bộ là file tĩnh (HTML, CSS, JS, JSON), không có backend, không có bước dựng;
đăng trên GitHub Pages cùng repo cha `language_study`, ở thư mục con `xuexi_hanyu/` của site.

| Trang | Nội dung |
|---|---|
| `zh-svo` | Câu tiếng Trung HSK1–6 chia theo chức vụ, pinyin trên từng từ: động từ, ngữ pháp, hội thoại |
| `zh-chunks` | Từ vựng tiếng Trung theo bài / mục ngữ pháp / nhóm động từ, câu tách sẵn thành từ |

## Cấu trúc

```
src/            cả site, đăng nguyên thư mục này
  index.html            trang mục lục
  zh-svo/, zh-chunks/   hai site tiếng Trung
  hanyu/                dùng chung cho hai site
    data.json           câu đã tách từ, pinyin, từ điển (dựng từ note, xem dưới)
    hanyu.js            đọc note, tách từ, căn pinyin; trên trình duyệt chỉ tải data.json
    hanyu-syntax.js     phân tích cú pháp (chủ ngữ, vị ngữ, tân ngữ, bổ ngữ…), chạy trên trình duyệt
tools/
  dung-du-lieu.js       dựng src/hanyu/data.json từ note (Node)
```

Trang zh-svo tải `data.json` rồi tự phân tích câu ngay trên trình duyệt (`zh-svo/data.js`); zh-chunks dùng thẳng
`data.json`.

## Xem thử

Trang đọc dữ liệu bằng `fetch`, nên phải mở qua http chứ không mở file trực tiếp. Dùng server chung ở thư mục cha
`language_study` (serve mọi repo cùng lúc, không cache): double-click `..\run.bat`, hoặc

```bash
python ../serve.py --open
```

rồi vào http://localhost:8000/xuexi_hanyu/ (cổng bận thì tự lấy cổng kế tiếp, địa chỉ in ra trong cửa sổ). Không
dùng thẳng `python -m http.server`: nó không gửi `Cache-Control`, trình duyệt giữ bản cũ của file đã sửa và trang bị
trộn HTML cũ với CSS/JS mới.

## Đăng lên GitHub Pages

Thư mục này nằm trong repo `language_study`. Đẩy repo đó lên nhánh `main` là xong: workflow ở
`../.github/workflows/pages.yml` đăng `src/` của thư mục này thành `xuexi_hanyu/` trên site.

## Sửa nội dung

- Câu, từ vựng tiếng Trung: note giáo trình không nằm trong repo (để không bị công khai). Sửa note, rồi dựng lại
  `data.json` (cần Node 18+):

  ```bash
  node tools/dung-du-lieu.js <thư mục note>
  ```

  Thư mục note gồm `hanyu-data/` (note HSK1 chép từ vault Obsidian) và `hanyu-plus/` (`ngu-phap.md`,
  `dong-tu.md`, `tu-dien.txt`). Định dạng bảng: `Chữ Hán | Pinyin | Nghĩa`; chữ **đậm** là từ / điểm ngữ pháp
  của mục; dấu cách giữa các chữ Hán là ranh giới từ. Từ mới cần từ loại: thêm dòng `chữ|pinyin|từ loại|nghĩa`
  vào `tu-dien.txt`. Thêm bài HSK1 mới thì thêm tên note vào `HY_LESSONS` trong `src/hanyu/hanyu.js`.
