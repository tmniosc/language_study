/* Câu chia theo chức vụ — engine chữ, dùng chung cho hai trang en-svo.
   Không còn đồ thị: mỗi câu hiện dưới dạng dải "chức vụ" (S/V/O/C/…) kèm nghĩa,
   ghi chú câu, và với trang Omnibus là phần "một từ gánh được những gì".

   Trang nạp file nào thì phần đó hiện ra:
     verbs-data.js  -> window.SVO_VERBS  {GROUPS, DATA}  câu mẫu + thanh bên
     omni-data.js   -> window.SVO_OMNI                   ghi chú Omnibus
     data.js        -> window.TOPICS                     chủ đề ngữ nghĩa
   Thiếu file nào thì phần tương ứng tự bỏ qua.

   window.SVO_PAGE:
     groups  mảng {name, from, to} cắt từ DATA cho thanh bên (mặc định: GROUPS của verbs-data.js)
     start   chỉ số DATA chọn sẵn khi mở trang
*/
(function(){
  "use strict";

  const PAGE   = window.SVO_PAGE  || {};
  const VERBS  = window.SVO_VERBS || {};
  const DATA   = VERBS.DATA || [];
  const GROUPS = PAGE.groups || VERBS.GROUPS || [];
  const OMNI   = window.SVO_OMNI || [];

  const FUNC_INFO = {
    subj:   {ab:"subj",  vi:"chủ ngữ",            k:"s", req:"core"},
    expl:   {ab:"expl",  vi:"chủ ngữ giả",         k:"s", req:"fn"},
    verb:   {ab:"verb",  vi:"động từ chính",      k:"v", req:"core"},
    dObj:   {ab:"dObj",  vi:"tân ngữ trực tiếp",  k:"o", req:"req"},
    iObj:   {ab:"iObj",  vi:"tân ngữ gián tiếp",  k:"o", req:"req"},
    sComp:  {ab:"sComp", vi:"bổ ngữ chủ ngữ",     k:"c", req:"req"},
    oComp:  {ab:"oComp", vi:"bổ ngữ tân ngữ",     k:"c", req:"req"},
    aComp:  {ab:"aComp", vi:"bổ ngữ trạng ngữ",   k:"c", req:"req"},
    cComp:  {ab:"cComp", vi:"bổ ngữ mệnh đề",     k:"c", req:"req"},
    pComp:  {ab:"pComp", vi:"bổ ngữ của giới từ", k:"c", req:"req"},
    mod:    {ab:"mod",   vi:"bổ nghĩa",           k:"m", req:"opt"},
    adjunct:{ab:"adjunct", vi:"trạng ngữ tùy ý",  k:"m", req:"opt"},
    det:    {ab:"det",   vi:"từ hạn định",        k:"m", req:"fn"},
    aux:    {ab:"aux",   vi:"trợ động từ",        k:"v", req:"fn"},
    prt:    {ab:"prt",   vi:"tiểu từ động từ",    k:"v", req:"fn"},
    to:     {ab:"to",    vi:"tiểu từ “to”",       k:"m", req:"fn"}
  };
  const CHUNK_LAB = {subj:"S · chủ ngữ", expl:"S · chủ ngữ giả", verb:"V · động từ", dObj:"O · tân ngữ",
    iObj:"IO · tân ngữ gián tiếp", sComp:"C · bổ ngữ chủ ngữ", oComp:"C · bổ ngữ tân ngữ",
    aComp:"A · bổ ngữ trạng ngữ", cComp:"C · bổ ngữ mệnh đề", adjunct:"A · trạng ngữ tùy ý"};
  const MAJOR = new Set(["subj","expl","verb","dObj","iObj","sComp","oComp","aComp","cComp","adjunct"]);

  // Nhãn lạ (dữ liệu chủ đề do máy sinh) rơi về nhóm "từ phụ" thay vì ném lỗi.
  function funcInfo(f){ return FUNC_INFO[f] || {ab:f, vi:f, k:"m", req:"fn"}; }

  // Mỗi từ thuộc về "cụm" nào: leo theo head cho tới khi gặp một thành phần lớn.
  function chunkOf(toks, i){
    let c = i, guard = 0;
    while(!MAJOR.has(toks[c].func) && toks[c].head >= 0 && guard++ < 20) c = toks[c].head;
    return toks[c].func;
  }

  let cur = PAGE.start || 0, curSent = null;

  // Một động từ có thể có nhiều câu: câu chính ở DATA[idx], câu thêm ở DATA[idx].ex.
  function variantsOf(idx){
    const d = DATA[idx];
    if(!d) return [];
    return [d].concat(Array.isArray(d.ex) ? d.ex : []);
  }

  function showVariant(idx, k){
    const list = variantsOf(idx);
    if(!list[k]) return;
    cur = idx;
    buildSentence(list[k]);
    setPager(list.length, k, list[k].pattern || DATA[idx].verb, kk=>showVariant(idx, kk), list.map(s=>s.en));
  }

  function buildSentence(sent){
    curSent = sent;
    buildRibbon(sent);
  }

  // ---------- dải "câu chia theo chức vụ" ----------
  function buildRibbon(s){
    const rib = document.getElementById("ribbon");
    rib.innerHTML = "";
    const groups = [];
    s.tokens.forEach((t,i)=>{
      const f = chunkOf(s.tokens, i);
      const last = groups[groups.length-1];
      if(last && last.f === f) last.words.push(t.w);
      else groups.push({f, words:[t.w]});
    });
    groups.forEach(g=>{
      const info = funcInfo(g.f);
      const div = document.createElement("div");
      div.className = "chunk k-" + info.k + (info.req === "opt" ? " opt" : "");
      const txt = document.createElement("span"); txt.className = "txt"; txt.textContent = g.words.join(" ");
      const lab = document.createElement("span"); lab.className = "lab"; lab.textContent = CHUNK_LAB[g.f] || "";
      div.appendChild(txt); div.appendChild(lab);
      rib.appendChild(div);
    });
    const viEl = document.getElementById("vi");
    if(viEl) viEl.textContent = s.vi || "";

    // Ghi chú viết tay của câu (có sẵn <strong>/<em>); trang ngữ nghĩa không có #snote.
    const noteEl = document.getElementById("snote");
    if(noteEl){
      if(s.note){ noteEl.innerHTML = s.note; noteEl.hidden = false; }
      else { noteEl.innerHTML = ""; noteEl.hidden = true; }
    }
  }

  // ---------- thanh lật câu ----------
  const pagerEl = document.getElementById("pager");

  function mkPg(txt, cls, on, title){
    const b = document.createElement("button");
    b.type = "button"; b.className = "pg" + (cls ? " " + cls : ""); b.textContent = txt;
    if(title) b.title = title;
    if(on) b.addEventListener("click", on); else b.disabled = true;
    return b;
  }

  function setPager(n, idx, label, onPick, titles){
    if(!pagerEl) return;
    pagerEl.innerHTML = "";
    if(!n || n < 2){ pagerEl.hidden = true; return; }
    pagerEl.hidden = false;
    pagerEl.appendChild(mkPg("‹", "", idx > 0 ? ()=>onPick(idx - 1) : null));
    for(let k = 0; k < n; k++){
      const d = mkPg("", "pgdot", ()=>onPick(k), (k + 1) + ". " + (titles && titles[k] ? titles[k] : ""));
      if(k === idx) d.setAttribute("aria-current", "true");
      pagerEl.appendChild(d);
    }
    pagerEl.appendChild(mkPg("›", "", idx < n - 1 ? ()=>onPick(idx + 1) : null));
    if(label){ const l = mkPg(label, "lab", null); l.disabled = false; pagerEl.appendChild(l); }
  }

  // ---------- thanh bên: động từ theo nhóm ----------
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
      b.innerHTML = '<span class="verb"></span><span class="pat"></span>';
      b.querySelector(".verb").textContent = d.verb;
      const nvar = variantsOf(i).length;
      b.querySelector(".pat").textContent = d.pattern + (nvar > 1 ? "  +" + (nvar - 1) : "");
      b.title = variantsOf(i).map((s,k)=>(k + 1) + ". " + s.en).join("\n");
      b.addEventListener("click", ()=>{
        chipEls.forEach((c,j)=>c.setAttribute("aria-selected", j === i ? "true" : "false"));
        showVariant(i, 0);
        if(exbar) exbar.hidden = true;
        if(i < OMNI.length) renderOmni(i);
      });
      chipEls[i] = b;
      wrap.appendChild(b);
    }
  });

  // ---------- Omnibus: một từ gánh được những gì ----------
  const obody = document.getElementById("obody");

  function renderOmni(i){
    if(!obody || !OMNI[i]) return;
    const o = OMNI[i];
    let left = '<div class="ohead"><span class="ov">' + o.v + '</span><span class="gl">' + o.gloss + '</span></div>';
    left += '<p class="ointro">' + o.intro + '</p>';
    left += '<div class="ocol"><h4>Cách dùng phổ biến</h4><ul class="ouse">';
    o.use.forEach(u=>{ left += '<li><span class="lab">' + u[0] + '</span> — <span class="ex">' + u[1] + '</span></li>'; });
    left += '</ul></div>';
    if(o.tb){
      left += '<div class="ocol"><h4>Bảng tóm tắt nhanh</h4><table class="otable"><thead><tr>' +
              '<th>Cấu trúc</th><th>Ý nghĩa</th><th>Ví dụ</th></tr></thead><tbody>';
      o.tb.forEach(r=>{ left += '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; });
      left += '</tbody></table></div>';
    }

    let right = "";
    if(o.st){
      right += '<div class="ocol"><h4>Cấu trúc đặc biệt</h4><div class="ostruct">';
      o.st.forEach(t=>{
        right += '<div class="st"><code>' + t[0] + '</code><span class="mn">' + t[1] +
                 (t[2] ? ' <em>' + t[2] + '</em>' : '') + '</span></div>';
      });
      right += '</div></div>';
    }
    if(o.ph){
      right += '<div class="ocol"><h4>Phrasal verbs</h4><div class="oph">';
      o.ph.forEach(t=>{
        right += '<div><span class="pv">' + t[0] + '</span><span class="mn">' + t[1] +
                 (t[2] ? '<em class="pvx">' + t[2] + '</em>' : '') + '</span></div>';
      });
      right += '</div></div>';
    }
    if(o.id){
      right += '<div class="ocol"><h4>Thành ngữ</h4><div class="oph">';
      o.id.forEach(t=>{ right += '<div><span class="pv">' + t[0] + '</span><span class="mn">' + t[1] + '</span></div>'; });
      right += '</div></div>';
    }
    obody.innerHTML = '<div>' + left + '</div><div>' + right + '</div>';
  }

  // ---------- chủ đề ngữ nghĩa ----------
  const TOPICS = window.TOPICS || [];
  let topen = -1, vcur = -1, ecur = -1;
  const tpChips = [], tpWraps = [];

  const exbar = document.getElementById("exbar");
  const exrows = document.getElementById("exrows");

  function renderExRows(){
    const v = TOPICS[topen].v[vcur];
    document.getElementById("exbar-t").innerHTML =
      TOPICS[topen].n + " · <b>" + v.v + "</b> · " + v.ex.length + " câu";
    exrows.innerHTML = "";
    v.ex.forEach((e,k)=>{
      const b = document.createElement("button");
      b.className = "exrow"; b.type = "button";
      if(k === ecur) b.setAttribute("aria-current", "true");
      b.innerHTML = '<span class="i"></span><span class="s"></span>';
      b.querySelector(".i").textContent = String(k + 1).padStart(2,"0");
      b.querySelector(".s").textContent = e.en;
      b.addEventListener("click", ()=>showEx(k));
      exrows.appendChild(b);
    });
    exbar.hidden = false;
  }

  function showEx(k){
    const v = TOPICS[topen].v[vcur];
    ecur = k;
    chipEls.forEach(c=>c.setAttribute("aria-selected","false"));
    buildSentence({en:v.ex[k].en, vi:"", tokens:v.ex[k].t});
    setPager(v.ex.length, k, v.v, showEx, v.ex.map(e=>e.en));
    renderExRows();
  }

  function pickVerb(i, j){
    topen = i; vcur = j;
    tpWraps[i].querySelectorAll(".tv").forEach((t,k)=>
      t.setAttribute("aria-selected", k === j ? "true" : "false"));
    showEx(0);
  }

  function toggleTopic(i){
    const open = topen === i && tpWraps[i] && !tpWraps[i].hidden;
    tpWraps.forEach((wr,k)=>{ if(wr){ wr.hidden = true; tpChips[k].setAttribute("aria-expanded","false"); } });
    if(open){ return; }
    topen = i; vcur = -1;
    tpChips[i].setAttribute("aria-expanded","true");
    const wr = tpWraps[i];
    wr.hidden = false;
    if(!wr.childElementCount){
      TOPICS[i].v.forEach((v,j)=>{
        const b = document.createElement("button");
        b.className = "tv"; b.type = "button"; b.setAttribute("role","tab");
        b.setAttribute("aria-selected","false");
        b.textContent = v.v;
        b.title = v.ex.length + " câu";
        b.addEventListener("click", ()=>pickVerb(i, j));
        wr.appendChild(b);
      });
    }
  }

  if(TOPICS.length){
    const twrap = addGroup("Chủ đề ngữ nghĩa");
    TOPICS.forEach((t,i)=>{
      const b = document.createElement("button");
      b.className = "chip tp"; b.type = "button";
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
  }

  // ---------- khởi động ----------
  if(OMNI.length) renderOmni(cur);
  openGroup(0);

  if(DATA.length){
    showVariant(cur, 0);
  }else if(TOPICS.length){
    toggleTopic(0);
    pickVerb(0, 0);
  }
})();
