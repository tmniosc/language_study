/* Nói không qua dịch — đổ nội dung ra hai danh sách bấm-để-sổ.
   Dữ liệu ở data.js (window.SPEAK). Mỗi dòng là một <details>: gợi ý / ý muốn nói nằm
   trên, bấm vào mới sổ ra mẫu — để tự nói trước rồi mới đối chiếu. Không lưu tiến độ. */
(function(){
  "use strict";
  const SP = window.SPEAK || { selftalk: [], intents: [] };
  const $ = (s, r=document) => r.querySelector(s);
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  // Đánh dấu câu theo từng ký tự rồi gom thành đoạn:
  //   keys  -> khối chốt (gạch chân), lấy lần xuất hiện đầu của mỗi khối;
  //   verbs -> động từ (nền trắng chữ đen), khớp nguyên từ, mọi lần xuất hiện;
  //            "từ#n" chỉ lấy lần thứ n (vd. "like#3" khi hai chữ like trước là giới từ).
  function hl(en, keys, verbs){
    const n = en.length, ck = new Uint8Array(n), vb = new Uint8Array(n);
    const low = en.toLowerCase();
    [].concat(keys || []).forEach(k => {
      const i = low.indexOf(String(k).toLowerCase());
      if(i >= 0) ck.fill(1, i, i + k.length);
    });
    [].concat(verbs || []).forEach(v => {
      const [w, nth] = String(v).split("#");
      const re = new RegExp("(?<![\\w’'])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\w’'])", "gi");
      let m, k = 0;
      while((m = re.exec(en))){
        k++;
        if(!nth || k === +nth) vb.fill(1, m.index, m.index + m[0].length);
      }
    });
    let out = "", i = 0;
    while(i < n){
      let j = i;
      while(j < n && ck[j] === ck[i] && vb[j] === vb[i]) j++;
      const cls = (ck[i] ? "ck" : "") + (vb[i] ? (ck[i] ? " vb" : "vb") : "");
      out += cls ? '<span class="' + cls + '">' + esc(en.slice(i, j)) + '</span>' : esc(en.slice(i, j));
      i = j;
    }
    return out;
  }

  // Độc thoại: gợi ý -> sổ ra đoạn mẫu + nghĩa.
  const self = $("#selftalkList");
  if(self){
    self.innerHTML = SP.selftalk.map(s =>
      '<li><details><summary>' + esc(s.p) + '</summary>' +
        '<div class="mono"><p class="en" lang="en">' + hl(s.en, s.keys, s.verbs) + '</p>' +
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
          it.models.map(m => '<li>' + hl(m.en, m.key, m.verbs) + '</li>').join("") +
        '</ul>' +
      '</details></li>'
    ).join("");
  }

  // Mỗi danh sách chỉ mở một mục: mở mục này thì đóng các mục còn lại. Mục đóng phía trên
  // làm trang co lại, nên kéo mục vừa mở vào khung nhìn nếu nó trôi lên quá mép trên.
  [self, bank].forEach(list => {
    if(!list) return;
    list.addEventListener("toggle", e => {
      const d = e.target;
      if(!(d instanceof HTMLDetailsElement) || !d.open) return;
      list.querySelectorAll("details[open]").forEach(o => { if(o !== d) o.open = false; });
      const top = d.getBoundingClientRect().top;
      if(top < 0) d.scrollIntoView({block: "start"});
    }, true);
  });
})();
