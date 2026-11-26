/* Nói không qua dịch — đổ nội dung ra hai danh sách bấm-để-sổ.
   Dữ liệu ở data.js (window.SPEAK). Mỗi dòng là một <details>: gợi ý / ý muốn nói nằm
   trên, bấm vào mới sổ ra mẫu — để tự nói trước rồi mới đối chiếu. Không lưu tiến độ. */
(function(){
  "use strict";
  const SP = window.SPEAK || { selftalk: [], intents: [] };
  const $ = (s, r=document) => r.querySelector(s);
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  // Tô đậm các khối chốt trong câu: mỗi khối lấy lần xuất hiện đầu, bỏ khối chồng lên khối trước.
  function hl(en, keys){
    const low = en.toLowerCase(), spans = [];
    [].concat(keys || []).forEach(k => {
      const i = low.indexOf(String(k).toLowerCase());
      if(i >= 0) spans.push([i, i + k.length]);
    });
    spans.sort((a,b) => a[0] - b[0]);
    let out = "", at = 0;
    spans.forEach(([s,e]) => {
      if(s < at) return;
      out += esc(en.slice(at, s)) + '<span class="ck">' + esc(en.slice(s, e)) + '</span>';
      at = e;
    });
    return out + esc(en.slice(at));
  }

  // Độc thoại: gợi ý -> sổ ra đoạn mẫu + nghĩa.
  const self = $("#selftalkList");
  if(self){
    self.innerHTML = SP.selftalk.map(s =>
      '<li><details><summary>' + esc(s.p) + '</summary>' +
        '<div class="mono"><p class="en" lang="en">' + hl(s.en, s.keys) + '</p>' +
        '<p class="tr">' + esc(s.vi) + '</p></div>' +
      '</details></li>'
    ).join("");
  }

  // Ngân hàng ý: ý tiếng Việt -> sổ ra các cách nói.
  const bank = $("#intentBank");
  if(bank){
    bank.innerHTML = SP.intents.map(it =>
      '<li><details><summary>' + esc(it.vi) + '</summary>' +
        '<ul class="ens" lang="en">' +
          it.models.map(m => '<li>' + hl(m.en, m.key) + '</li>').join("") +
        '</ul>' +
      '</details></li>'
    ).join("");
  }

  // Nút "Mở hết / Gập hết" của từng mục.
  document.querySelectorAll("[data-toggle]").forEach(btn => {
    const list = document.getElementById(btn.dataset.toggle);
    if(!list) return;
    const sync = () => {
      const all = list.querySelectorAll("details"), open = list.querySelectorAll("details[open]");
      const full = all.length > 0 && open.length === all.length;
      btn.textContent = full ? "Gập hết" : "Mở hết";
      btn.setAttribute("aria-pressed", full ? "true" : "false");
    };
    btn.addEventListener("click", () => {
      const all = list.querySelectorAll("details");
      const full = list.querySelectorAll("details[open]").length === all.length;
      all.forEach(d => { d.open = !full; });
      sync();
    });
    list.addEventListener("toggle", sync, true);
    sync();
  });
})();
