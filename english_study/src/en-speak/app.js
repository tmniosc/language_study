/* Nói không qua dịch — đổ nội dung ra hai danh sách mở sẵn.
   Dữ liệu ở data.js (window.SPEAK). Không còn flashcard, không lưu tiến độ. */
(function(){
  "use strict";
  const SP = window.SPEAK || { selftalk: [], intents: [] };
  const $ = (s, r=document) => r.querySelector(s);
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  // Tô đậm khối chốt trong câu mẫu.
  function hl(en, key){
    if(!key) return esc(en);
    const i = en.toLowerCase().indexOf(String(key).toLowerCase());
    if(i < 0) return esc(en);
    return esc(en.slice(0,i)) + '<span class="ck">' + esc(en.slice(i, i+key.length)) + '</span>' + esc(en.slice(i+key.length));
  }

  // Độc thoại: cả danh sách gợi ý, mở sẵn.
  const self = $("#selftalkList");
  if(self){
    self.innerHTML = SP.selftalk.map(s => '<li>'+esc(s)+'</li>').join("");
  }

  // Ngân hàng ý: ý tiếng Việt -> các cách nói, mở sẵn.
  const bank = $("#intentBank");
  if(bank){
    bank.innerHTML = SP.intents.map(it =>
      '<li><p class="vi">'+esc(it.vi)+'</p>' +
        '<ul class="ens">' +
          it.models.map(m => '<li>'+hl(m.en, m.key)+'</li>').join("") +
        '</ul>' +
      '</li>'
    ).join("");
  }
})();
