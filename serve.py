"""Serve chung mọi site học ngôn ngữ trong thư mục này để xem thử, không cache.

    python serve.py           # cổng 8000; bận thì tự lấy cổng trống kế tiếp
    python serve.py 8080      # đúng cổng 8080, bận thì báo lỗi
    python serve.py --open    # mở luôn trang mục lục trên trình duyệt

Đường dẫn giống hệt GitHub Pages: mỗi thư mục con có src/ (english_study,
xuexi_hanyu…) được serve ở /<tên thư mục>/, ví dụ
http://localhost:8000/xuexi_hanyu/ là xuexi_hanyu/src/. Trang gốc / là
index.html nằm ngay trong thư mục này (mục lục). Workflow Pages gom file theo
đúng sơ đồ này, nên link tương đối chạy y hệt trên máy lẫn trên site.

`python -m http.server` không gửi Cache-Control, nên trình duyệt tự đoán thời hạn
cache theo Last-Modified: sửa xong một file thì trang trộn HTML cũ với CSS/JS mới.
Script này gửi `Cache-Control: no-cache` cho mọi file: trình duyệt luôn hỏi lại,
file không đổi thì server trả 304 nên vẫn nhanh.
"""
import argparse
import http.server
import posixpath
import socket
import sys
import urllib.parse
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEFAULT_PORT = 8000
PORT_TRIES = 20


def find_sites():
    return sorted(d.name for d in ROOT.iterdir() if (d / "src").is_dir())


SITES = find_sites()


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def translate_path(self, path):
        path = urllib.parse.unquote(path.split("?", 1)[0].split("#", 1)[0])
        trailing = path.endswith("/")
        parts = [p for p in posixpath.normpath(path).split("/") if p and p not in (".", "..")]
        if parts and parts[0] in SITES:
            base, parts = ROOT / parts[0] / "src", parts[1:]
        else:
            base = ROOT  # trang gốc: index.html (mục lục) ngay trong thư mục này
        full = base.joinpath(*parts) if parts else base
        return str(full) + ("/" if trailing else "")


class Server(http.server.ThreadingHTTPServer):
    # Mặc định HTTPServer bật SO_REUSEADDR; trên Windows cờ này cho hai server
    # cùng nghe một cổng và trình duyệt gặp ngẫu nhiên một trong hai. Tắt đi để
    # cổng đang bận thì bind báo lỗi thật.
    allow_reuse_address = False


def in_use(port):
    """Có gì đang nghe ở cổng này không. Chỉ bind thử thì không đủ: `python -m
    http.server` nghe trên [::] (IPv6 dual-stack), Windows vẫn cho bind 0.0.0.0
    cùng cổng, và localhost lại vào server kia. Nên gõ cửa cả hai địa chỉ."""
    for host in ("127.0.0.1", "::1"):
        try:
            with socket.create_connection((host, port), timeout=0.3):
                return True
        except OSError:
            pass
    return False


def bind(port, fixed):
    ports = [port] if fixed else range(port, port + PORT_TRIES)
    for p in ports:
        if not in_use(p):
            try:
                return Server(("", p), Handler)
            except OSError:
                pass
        if fixed:
            sys.exit(f"Cổng {p} đang bận. Tắt server đang chạy ở cổng đó hoặc chọn cổng khác.")
    sys.exit(f"Không tìm được cổng trống từ {port} tới {port + PORT_TRIES - 1}.")


def main():
    ap = argparse.ArgumentParser(description="Serve chung các site học ngôn ngữ, không cache.")
    ap.add_argument("port", nargs="?", type=int, help=f"cổng (mặc định {DEFAULT_PORT}, bận thì lấy cổng kế tiếp)")
    ap.add_argument("--open", action="store_true", help="mở trang mục lục trên trình duyệt")
    args = ap.parse_args()

    httpd = bind(args.port or DEFAULT_PORT, fixed=args.port is not None)
    url = f"http://localhost:{httpd.server_address[1]}/"
    with httpd:
        print(f"Đang serve {ROOT}", flush=True)
        for s in SITES:
            print(f"  {url}{s}/", flush=True)
        print(f"Mở {url}  (Ctrl+C hoặc đóng cửa sổ để dừng)", flush=True)
        if args.open:
            webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nĐã dừng.")


if __name__ == "__main__":
    main()
