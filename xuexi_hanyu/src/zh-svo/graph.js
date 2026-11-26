/* Câu tiếng Trung chia theo chức vụ — dùng chung cho ba trang câu của zh-svo.

   Mỗi câu hiện thành một dải khối (chủ ngữ, vị ngữ, tân ngữ, bổ ngữ…), pinyin
   trên từng khối; bấm một từ trong dải thì bảng chi tiết hiện từ loại, chức vụ,
   từ nó gắn vào. Script không mang dữ liệu; trang nhúng sẵn:
     window.SVO_VERBS  {GROUPS, DATA}  động từ + câu, cho thanh bên dạng chip
     window.TOPICS     [{g, n, b, v:[{v, ex}]}]  mục → nhóm câu → câu
   Mỗi câu: {zh, py, vi, spk, p, note?, tokens:[{w, py, pos, func, head, vi}]}.

   window.SVO_PAGE khai báo trang cần gì:
     start   chỉ số DATA hiện sẵn khi mở trang
*/
(function(){
  "use strict";

  const PAGE   = window.SVO_PAGE  || {};
  const VERBS  = window.SVO_VERBS || {};
  const DATA   = VERBS.DATA || [];
  const GROUPS = PAGE.groups || VERBS.GROUPS || [];

  // k: màu · req: core (nòng cốt) | req (bắt buộc) | opt (tùy ý) | fn (từ chức năng)
  const FUNC_INFO = {
    subj: {ab:"subj",  zh:"主语",     vi:"chủ ngữ",                 k:"s", req:"core"},
    pred: {ab:"pred",  zh:"谓语",     vi:"vị ngữ",                  k:"v", req:"core"},
    obj:  {ab:"obj",   zh:"宾语",     vi:"tân ngữ",                 k:"o", req:"req"},
    iobj: {ab:"iobj",  zh:"间接宾语", vi:"tân ngữ gián tiếp",       k:"o", req:"req"},
    comp: {ab:"comp",  zh:"补语",     vi:"bổ ngữ",                  k:"c", req:"req"},
    vcomp:{ab:"vcomp", zh:"连动",     vi:"động từ nối tiếp",        k:"c", req:"req"},
    pobj: {ab:"pobj",  zh:"介词宾语", vi:"tân ngữ của giới từ",     k:"c", req:"req"},
    conj: {ab:"conj",  zh:"分句",     vi:"vế câu nối tiếp",         k:"v", req:"opt"},
    attr: {ab:"attr",  zh:"定语",     vi:"định ngữ",                k:"m", req:"opt"},
    adv:  {ab:"adv",   zh:"状语",     vi:"trạng ngữ",               k:"m", req:"opt"},
    det:  {ab:"det",   zh:"数量/指示", vi:"số, lượng từ, chỉ thị",  k:"m", req:"fn"},
    aux:  {ab:"aux",   zh:"能愿动词", vi:"động từ năng nguyện",     k:"v", req:"fn"},
    asp:  {ab:"asp",   zh:"动态助词", vi:"trợ từ động thái",        k:"v", req:"fn"},
    de:   {ab:"de",    zh:"结构助词", vi:"trợ từ kết cấu",          k:"m", req:"fn"},
    sfp:  {ab:"sfp",   zh:"语气助词", vi:"trợ từ ngữ khí",          k:"m", req:"fn"},
    mark: {ab:"mark",  zh:"关联词",   vi:"từ nối",                  k:"m", req:"fn"},
    topic:{ab:"topic", zh:"主题",     vi:"chủ đề (đưa lên đầu câu)", k:"o", req:"req"},
    voc:  {ab:"voc",   zh:"独立语",   vi:"lời gọi, thán từ",        k:"m", req:"opt"}
  };
  const REQ_VI = {
    core:{t:"nòng cốt", cls:"req"},
    req:{t:"bắt buộc — bỏ đi câu sai", cls:"req"},
    opt:{t:"tùy ý — bỏ đi câu vẫn đúng", cls:"opt"},
    fn:{t:"từ chức năng", cls:""}
  };
  const POS_VI = {PRON:"đại từ 代词", NOUN:"danh từ 名词", PROPN:"danh từ riêng 专有名词",
    VERB:"động từ 动词", AUX:"động từ năng nguyện 能愿动词", ADP:"giới từ 介词", NUM:"số từ 数词",
    CLF:"lượng từ 量词", TIME:"từ chỉ thời gian 时间词", PART:"trợ từ 助词", ADJ:"tính từ 形容词",
    ADV:"phó từ 副词", CCONJ:"liên từ 连词", SCONJ:"liên từ 连词", INTJ:"thán từ 叹词"};
  const CHUNK_LAB = {topic:"T · chủ đề", voc:"lời gọi", subj:"S · chủ ngữ", pred:"V · vị ngữ", obj:"O · tân ngữ", iobj:"O₁ · tân ngữ gián tiếp",
    comp:"C · bổ ngữ", vcomp:"V₂ · động từ nối tiếp", adv:"A · trạng ngữ", conj:"vế sau",
    sfp:"ngữ khí", mark:"từ nối"};
  const MAJOR = new Set(["topic","voc","subj","pred","obj","iobj","comp","vcomp","adv","conj","sfp","mark"]);

  // Nhãn lạ không làm vỡ trang: rơi về nhóm "từ phụ" và hiện nguyên tên.
  function funcInfo(f){
    return FUNC_INFO[f] || {ab:f, zh:"", vi:f, k:"m", req:"fn"};
  }

  // Trạng ngữ, trợ từ ngữ khí, từ nối chỉ thành khối riêng khi treo vào động
  // từ; 最 trong 我最好的朋友 treo vào tính từ làm định ngữ, nên thuộc khối tân ngữ.
  const CLAUSE_ONLY = new Set(["adv","sfp","mark"]);
  function isChunk(toks, c){
    const f = toks[c].func;
    if(!MAJOR.has(f)) return false;
    if(!CLAUSE_ONLY.has(f) || toks[c].head < 0) return true;
    const h = toks[toks[c].head];
    return h.head < 0 || ["pred","conj","vcomp"].includes(h.func) || ["VERB","AUX"].includes(h.pos);
  }
  function chunkOf(toks, i){
    let c = i, guard = 0;
    while(!isChunk(toks, c) && toks[c].head >= 0 && guard++ < 20) c = toks[c].head;
    return toks[c].func;
  }

  // ---------- trạng thái ----------
  let cur = PAGE.start || 0;
  let sel = null;          // chỉ số từ đang chọn trong câu, null = chưa chọn
  let curSent = null;
  let wordEls = [];        // nút của từng từ trên dải, theo chỉ số token

  // Một động từ có thể có nhiều câu: câu chính nằm ngay trong DATA[idx], các
  // câu thêm nằm trong DATA[idx].ex — cùng hình dạng. Gộp lại thành một danh
  // sách để thanh chấm đi qua; setPager() tự ẩn khi chỉ có một câu.
  function variantsOf(idx){
    const d = DATA[idx];
    if(!d) return [];
    return [d].concat(Array.isArray(d.ex) ? d.ex : []);
  }

  function showVariant(idx, k){
    const list = variantsOf(idx);
    if(!list[k]) return;
    cur = idx;
    showSentence(list[k]);
    // Nhãn thanh chấm là KHUNG của câu đang xem, không phải tên động từ: tên động
    // từ đã nằm ở chip đang sáng bên cạnh, còn khung thì đổi theo từng câu.
    setPager(list.length, k, list[k].p || DATA[idx].verb, kk=>showVariant(idx, kk), list.map(s=>s.zh));
  }

  function showSentence(s){
    curSent = s; sel = null;
    buildRibbon(s);
    applySel();
  }

  // ---------- phân trang câu ----------
  const pagerEl = document.getElementById("pager");

  function mkPg(txt, cls, on, title){
    const b = document.createElement("button");
    b.type = "button"; b.className = "pg" + (cls ? " " + cls : ""); b.textContent = txt;
    if(title) b.title = title;
    if(on) b.addEventListener("click", on); else b.disabled = true;
    return b;
  }

  function setPager(n, idx, label, onPick, titles){
    pagerEl.innerHTML = "";
    if(!n || n < 2){ pagerEl.hidden = true; return; }
    pagerEl.hidden = false;
    pagerEl.appendChild(mkPg("‹", "", idx > 0 ? ()=>onPick(idx - 1) : null));
    // Một mục ngữ pháp có tới vài chục câu: quá 12 chấm thì hàng chấm quá dài,
    // nên thay bằng bộ đếm "k / n"; danh sách câu đầy đủ nằm bên dưới.
    if(n > 12){
      const c = mkPg((idx + 1) + " / " + n, "cnt", null);
      c.disabled = false;
      pagerEl.appendChild(c);
    }else for(let k = 0; k < n; k++){
      const d = mkPg("", "pgdot", ()=>onPick(k), (k + 1) + ". " + (titles && titles[k] ? titles[k] : ""));
      if(k === idx) d.setAttribute("aria-current", "true");
      pagerEl.appendChild(d);
    }
    pagerEl.appendChild(mkPg("›", "", idx < n - 1 ? ()=>onPick(idx + 1) : null));
    // Nhãn đứng SAU cụm nút, không phải trước. Nó là thứ mô tả câu đang xem chứ
    // không phải nút bấm, nên để lẫn vào đầu hàng thì dễ tưởng là bấm được --
    // nhất là khi nó cũng là một thẻ .pg như mấy nút kia.
    if(label){ const l = mkPg(label, "lab", null); l.disabled = false; pagerEl.appendChild(l); }
  }

  // ---------- chọn từ · bảng chi tiết ----------
  function select(i){ sel = (sel === i) ? null : i; applySel(); }

  function applySel(){
    wordEls.forEach((el,i)=>el.setAttribute("aria-pressed", i === sel ? "true" : "false"));
    if(sel === null) hideDetail();
    else showDetail(curSent);
  }

  const panelEl = document.getElementById("panel");

  function hideDetail(){
    panelEl.hidden = true;
    document.getElementById("panel-body").innerHTML = "";
  }

  function showDetail(s){
    panelEl.hidden = false;
    const body = document.getElementById("panel-body");
    const t = s.tokens[sel], info = funcInfo(t.func), rq = REQ_VI[info.req];
    const kids = s.tokens.map((x,i)=>x.head === sel ? x.w : null).filter(Boolean);
    document.getElementById("panel-title").textContent = "Chi tiết";
    let html = '<div class="detail"><p class="word" lang="zh">' + esc(t.w) + '</p>' +
               (t.py ? '<p class="wpy">' + esc(t.py) + '</p>' : '') +
               (t.vi ? '<p class="wvi">' + esc(t.vi) + '</p>' : '') + '<dl>';
    html += '<dt>Từ loại</dt><dd>' + (POS_VI[t.pos] || t.pos) + ' <span class="code">' + t.pos + '</span></dd>';
    html += '<dt>Chức vụ</dt><dd>' + info.vi + (info.zh ? ' <span lang="zh">' + info.zh + '</span>' : '') +
            ' <span class="code">' + info.ab + '</span></dd>';
    html += '<dt>Vai trò</dt><dd><span class="pill ' + rq.cls + '">' + rq.t + '</span></dd>';
    html += '<dt>Thuộc cụm</dt><dd>' + (CHUNK_LAB[chunkOf(s.tokens, sel)] || "—") + '</dd>';
    html += '<dt>Gắn vào</dt><dd>' + (t.head >= 0 ? '<em lang="zh">' + esc(s.tokens[t.head].w) + '</em>' : 'gốc câu') + '</dd>';
    html += '<dt>Kéo theo</dt><dd lang="zh">' + (kids.length ? esc(kids.join("、")) : "—") + '</dd>';
    html += '</dl></div>';
    body.innerHTML = html;
    const back = document.createElement("button");
    back.className = "backlink"; back.type = "button"; back.textContent = "← bỏ chọn";
    back.addEventListener("click", ()=>{ sel = null; applySel(); });
    body.appendChild(back);
  }

  function esc(x){
    return String(x).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
  }

  // Tiếng Trung viết liền: các từ trong một khối nối không dấu cách, pinyin
  // của khối nằm ngay trên, cách nhau theo từ. Mỗi từ là một nút bấm riêng để
  // mở bảng chi tiết.
  function buildRibbon(s){
    const rib = document.getElementById("ribbon");
    rib.innerHTML = "";
    wordEls = [];
    const groups = [];
    s.tokens.forEach((t,i)=>{
      const f = chunkOf(s.tokens, i);
      const last = groups[groups.length-1];
      if(last && last.f === f) last.idx.push(i);
      else groups.push({f, idx:[i]});
    });
    groups.forEach(g=>{
      const info = funcInfo(g.f);
      const div = document.createElement("div");
      div.className = "chunk k-" + info.k + (info.req === "opt" ? " opt" : "");
      const py  = document.createElement("span"); py.className = "cpy";
      py.textContent = g.idx.map(i=>s.tokens[i].py || "").filter(Boolean).join(" ");
      const txt = document.createElement("span"); txt.className = "txt"; txt.lang = "zh";
      g.idx.forEach(i=>{
        const t = s.tokens[i];
        const b = document.createElement("button");
        b.type = "button"; b.className = "wd"; b.textContent = t.w;
        b.title = [t.py, t.vi].filter(Boolean).join(" · ");
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", ()=>select(i));
        wordEls[i] = b;
        txt.appendChild(b);
      });
      const lab = document.createElement("span"); lab.className = "lab"; lab.textContent = CHUNK_LAB[g.f] || "";
      div.appendChild(py); div.appendChild(txt); div.appendChild(lab);
      rib.appendChild(div);
    });
    const spk = document.getElementById("spk");
    if(spk){ spk.textContent = s.spk ? s.spk + ":" : ""; spk.hidden = !s.spk; }
    const pyEl = document.getElementById("spy");
    if(pyEl) pyEl.textContent = s.py || "";
    document.getElementById("vi").textContent = s.vi || "";

    // Ghi chú của câu (trang Động từ: pinyin và nghĩa của động từ đang xem).
    // Chèn bằng innerHTML vì có <strong>/<em>; nội dung đã được data.js thoát
    // ký tự, không phải chữ người dùng nhập.
    const noteEl = document.getElementById("snote");
    if(noteEl){
      if(s.note){ noteEl.innerHTML = s.note; noteEl.hidden = false; }
      else { noteEl.innerHTML = ""; noteEl.hidden = true; }
    }
  }

  const chips = document.getElementById("chips");
  const chipEls = [], groupHeads = [], groupWraps = [];

  function openGroup(g){
    groupWraps.forEach((w,k)=>{
      const on = k === g;
      w.hidden = !on;
      groupHeads[k].setAttribute("aria-expanded", on ? "true" : "false");
    });
  }

  function addGroup(name){
    const h = document.createElement("button");
    h.className = "vgroup"; h.type = "button";
    h.setAttribute("aria-expanded","false");
    h.textContent = name;
    const w = document.createElement("div");
    w.className = "gwrap"; w.hidden = true;
    const g = groupHeads.length;
    // luôn giữ đúng một nhóm mở: bấm lại nhóm đang mở thì không đóng
    h.addEventListener("click", ()=>openGroup(g));
    chips.appendChild(h); chips.appendChild(w);
    groupHeads.push(h); groupWraps.push(w);
    return w;
  }

  GROUPS.forEach(g=>{
    const wrap = addGroup(g.name);
    for(let i = g.from; i < g.to; i++){
      const d = DATA[i];
      const b = document.createElement("button");
      b.className = "chip"; b.type = "button"; b.setAttribute("role","tab");
      b.setAttribute("aria-selected", i === cur ? "true" : "false");
      b.innerHTML = '<span class="verb" lang="zh"></span><span class="pat"></span>';
      b.querySelector(".verb").textContent = d.verb;
      // Một động từ có nhiều câu thì cũng có nhiều khung, nên dán mỗi khung của
      // câu đầu lên chip là nói sai. "+n" cho biết còn n khung nữa ở thanh chấm
      // trên câu; khung của câu ĐANG xem thì hiện ngay trên thanh chấm đó.
      const nvar = variantsOf(i).length;
      b.querySelector(".pat").textContent = d.pattern + (nvar > 1 ? "  +" + (nvar - 1) : "");
      b.title = variantsOf(i).map((s,k)=>(k + 1) + ". " + s.zh).join("\n");
      b.addEventListener("click", ()=>{
        chipEls.forEach((c,j)=>c.setAttribute("aria-selected", j === i ? "true" : "false"));
        showVariant(i, 0);
        if(exbar) exbar.hidden = true;
      });
      chipEls[i] = b;
      wrap.appendChild(b);
    }
  });

  // ---------- mục → nhóm câu → câu: xổ ngay trên thanh bên ----------
  // TOPICS[i].g là tên nhóm trên thanh bên (HSK1 / HSK2–4, Giáo trình / Luyện
  // nói): đổi tên nhóm thì mở một nhóm mới. Mục chỉ có một nhóm câu thì bấm
  // vào là hiện luôn, không xổ thêm một tầng nút chỉ có một nút.
  const TOPICS = window.TOPICS || [];
  let topen = -1, vcur = -1, ecur = -1;
  const tpChips = [], tpWraps = [];

  const exbar = document.getElementById("exbar");
  const exrows = document.getElementById("exrows");

  function renderExRows(){
    const t = TOPICS[topen], v = t.v[vcur];
    document.getElementById("exbar-t").innerHTML =
      esc(t.n) + (t.v.length > 1 ? " · <b>" + esc(v.v) + "</b>" : "") + " · " + v.ex.length + " câu";
    exrows.innerHTML = "";
    v.ex.forEach((e,k)=>{
      const b = document.createElement("button");
      b.className = "exrow"; b.type = "button";
      if(k === ecur) b.setAttribute("aria-current", "true");
      b.innerHTML = '<span class="i"></span><span class="s"><span class="zh" lang="zh"></span><span class="g"></span></span>';
      b.querySelector(".i").textContent = e.spk || String(k + 1).padStart(2,"0");
      b.querySelector(".zh").textContent = e.zh;
      b.querySelector(".g").textContent = e.vi;
      b.addEventListener("click", ()=>showEx(k));
      exrows.appendChild(b);
    });
    exbar.hidden = false;
    // Giữ câu đang xem trong khung danh sách. Chỉ cuộn chính danh sách:
    // scrollIntoView() cuộn luôn cả trang, kéo câu đang xem ra khỏi màn hình.
    const on = exrows.querySelector('[aria-current="true"]');
    if(on && exrows.scrollHeight > exrows.clientHeight){
      const r = on.getBoundingClientRect(), c = exrows.getBoundingClientRect();
      if(r.top < c.top) exrows.scrollTop += r.top - c.top;
      else if(r.bottom > c.bottom) exrows.scrollTop += r.bottom - c.bottom;
    }
  }

  function showEx(k){
    const v = TOPICS[topen].v[vcur];
    ecur = k;
    chipEls.forEach(c=>c.setAttribute("aria-selected","false"));
    showSentence(v.ex[k]);
    setPager(v.ex.length, k, v.ex[k].p || v.v, showEx, v.ex.map(e=>e.zh));
    renderExRows();
  }

  function pickSub(i, j){
    topen = i; vcur = j;
    tpWraps[i].querySelectorAll(".tv").forEach((t,k)=>
      t.setAttribute("aria-selected", k === j ? "true" : "false"));
    showEx(0);
  }

  function toggleTopic(i){
    const single = TOPICS[i].v.length === 1;
    const open = topen === i && (single ? tpChips[i].getAttribute("aria-expanded") === "true" : !tpWraps[i].hidden);
    tpWraps.forEach((wr,k)=>{ wr.hidden = true; tpChips[k].setAttribute("aria-expanded","false"); });
    if(open && !single) return;
    topen = i; vcur = -1;
    tpChips[i].setAttribute("aria-expanded","true");
    if(single){ pickSub(i, 0); return; }
    const wr = tpWraps[i];
    wr.hidden = false;
    if(!wr.childElementCount){
      TOPICS[i].v.forEach((v,j)=>{
        const b = document.createElement("button");
        b.className = "tv"; b.type = "button"; b.setAttribute("role","tab");
        b.setAttribute("aria-selected","false");
        b.textContent = v.v;
        b.title = v.ex.length + " câu";
        b.addEventListener("click", ()=>pickSub(i, j));
        wr.appendChild(b);
      });
    }
    pickSub(i, 0);
  }

  let twrap = null, tgroup = null;
  TOPICS.forEach((t,i)=>{
    const g = t.g || "Chủ đề";
    if(g !== tgroup){ twrap = addGroup(g); tgroup = g; }
    const b = document.createElement("button");
    b.className = "chip tp" + (t.v.length === 1 ? " one" : ""); b.type = "button";
    b.setAttribute("aria-expanded","false");
    b.innerHTML = '<span class="verb"></span>';
    b.querySelector(".verb").textContent = t.n;
    b.title = t.b || t.n;
    b.addEventListener("click", ()=>toggleTopic(i));
    twrap.appendChild(b);
    const wr = document.createElement("div");
    wr.className = "tvwrap"; wr.hidden = true;
    twrap.appendChild(wr);
    tpChips.push(b); tpWraps.push(wr);
  });

  // Esc bỏ chọn từ đang xem chi tiết.
  document.addEventListener("keydown", ev=>{
    if(ev.key === "Escape" && sel !== null){ sel = null; applySel(); }
  });

  // ---------- khởi động ----------
  openGroup(0);

  if(DATA.length){
    showVariant(cur, 0);
  }else if(TOPICS.length){
    toggleTopic(0);
  }
})();
