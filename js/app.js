// ---------- Logika ----------
const $ = id => document.getElementById(id);
const PRON = new Set([...NOR, ...NORK, ...NORI, "hi", "hik", "hiri"]);
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[.,;:!?¿¡"'()]/g, " ").trim().split(/\s+/).filter(w => w && !PRON.has(w)).join(" ");
const escapeHTML = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const store = {
  get(k, d) { try { const v = localStorage.getItem("maiaditza:" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("maiaditza:" + k, JSON.stringify(v)); } catch {} }
};

let kind = store.get("kind", "tables");   // tables | sent
let mode = store.get("mode", "table");    // table | flash (taulak bakarrik)
let fGroup = store.get("group", "all");
let fTense = store.get("tense", "or");
let fNor = store.get("nor", "hura");
let current = null;
let flashRow = null;
let checked = false;
let score = store.get("score", { ok: 0, total: 0, streak: 0 });

const data = () => kind === "sent" ? SENT : EX;
const single = () => kind === "sent" || mode === "flash";
const NOR_GROUPS = ["NOR-NORI", "NOR-NORK", "NOR-NORI-NORK"];
const norActive = () => NOR_GROUPS.includes(fGroup);
const filtered = () => data().filter(e => (fGroup === "all" || e.g === fGroup) && e.t === fTense && (!norActive() || e.nor === fNor));

function ctxText(ex, flash) {
  const tail = t => flash ? "" : ` · osatu ${t} bakoitzarentzat`;
  if (!ex.ctx) return "";
  if (ex.g === "NOR-NORI-NORK") {
    const [obj, nork] = ex.ctx.split(" · NORK: ");
    return `NOR: <b>${obj}</b> · NORK: <b>${nork}</b>${tail("NORI")}`;
  }
  if (ex.g === "NOR-NORI") return `NOR: <b>${ex.ctx}</b>${tail("NORI")}`;
  return `NOR: <b>${ex.ctx}</b>${tail("NORK")}`;
}

function exLabel(e) {
  if (e.g === "Aditz trinkoak") return `${e.verb}${e.ctx ? " · NOR " + e.ctx : ""}`;
  if (!e.ctx) return e.g;
  return `${e.g} · ${e.g === "NOR-NORI-NORK" ? "NOR " + e.ctx.replace(" · NORK: ", " · NORK ") : "NOR " + e.ctx}`;
}

function fillFilters() {
  const groups = GROUPS.filter(g => data().some(e => e.g === g));
  if (fGroup !== "all" && !groups.includes(fGroup)) fGroup = "all";
  $("f-group").innerHTML = `<option value="all">Taula guztiak</option>` + groups.map(g => `<option value="${g}">${g}</option>`).join("");
  $("f-group").value = fGroup;
  const tenses = Object.keys(TENSES).filter(t => data().some(e => e.t === t && (fGroup === "all" || e.g === fGroup)));
  if (!tenses.includes(fTense)) fTense = tenses[0];
  $("f-tense").innerHTML = tenses.map(t => `<option value="${t}">${TENSES[t]}</option>`).join("");
  $("f-tense").value = fTense;
  $("nor-wrap").hidden = !norActive();
  if (norActive()) {
    const nors = NOR.filter(n => data().some(e => e.g === fGroup && e.t === fTense && e.nor === n));
    if (!nors.includes(fNor)) fNor = nors.includes("hura") ? "hura" : nors[0];
    $("f-nor").innerHTML = nors.map(n => `<option value="${n}">${n}</option>`).join("");
    $("f-nor").value = fNor;
  }
  $("f-ex").innerHTML = kind === "tables" ? filtered().map(e => `<option value="${e.id}">${exLabel(e)}</option>`).join("") : "";
  if (current && filtered().includes(current) && kind === "tables") $("f-ex").value = current.id;
  $("modes").hidden = kind !== "tables";
  $("pick-wrap").hidden = single();
  $("k-tables").setAttribute("aria-pressed", kind === "tables");
  $("k-sent").setAttribute("aria-pressed", kind === "sent");
  $("m-table").setAttribute("aria-pressed", mode === "table");
  $("m-flash").setAttribute("aria-pressed", mode === "flash");
}

function rowHTML(r, i, flash) {
  const label = flash ? "" : `<label for="a-${i}">${r.l}</label>`;
  return `<div class="row" data-i="${i}">${label}<input type="text" id="a-${i}" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="${r.l}"><div class="fb"></div></div>`;
}

function render() {
  const ex = current;
  checked = false;
  $("c-group").textContent = ex.g;
  $("c-tense").textContent = TENSES[ex.t];
  $("summary").hidden = true;
  if (kind === "sent") {
    $("verb").textContent = ex.v ? `Aditza: ${ex.v}` : "Idatzi falta den aditza";
    $("ctx").hidden = true;
    $("example").textContent = "";
    const [a, b] = ex.s.split("___");
    $("rows").innerHTML = `<div class="sent-wrap"><div class="row"><p class="sentence">${escapeHTML(a)}<input type="text" id="a-0" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="Falta den aditza">${escapeHTML(b)}</p><div class="fb"></div></div></div>`;
  } else {
    const flash = mode === "flash";
    $("verb").textContent = ex.verb;
    $("ctx").innerHTML = ctxText(ex, flash);
    $("ctx").hidden = !ex.ctx;
    $("example").textContent = "Adib.: " + EXAMPLES[ex.g];
    if (flash) {
      const r = ex.rows[flashRow];
      $("rows").innerHTML = `<div class="flash"><p class="who">${r.l}</p>${rowHTML(r, 0, true)}</div>`;
    } else {
      $("rows").innerHTML = ex.rows.map((r, i) => rowHTML(r, i, false)).join("");
      $("f-ex").value = ex.id;
    }
  }
  updateScore();
  const first = $("a-0");
  if (first) first.focus({ preventScroll: true });
}

function pick(random) {
  const list = filtered();
  if (!list.length) return;
  const rand = () => list[Math.floor(Math.random() * list.length)];
  let guard = 0;
  if (kind === "tables" && mode === "flash") {
    let ex, i;
    do { ex = rand(); i = Math.floor(Math.random() * ex.rows.length); } while (ex === current && i === flashRow && guard++ < 20);
    current = ex; flashRow = i;
  } else if (random || kind === "sent") {
    let ex;
    do { ex = rand(); } while (ex === current && list.length > 1 && guard++ < 20);
    current = ex;
  } else {
    current = list.find(e => e.id === +$("f-ex").value) || list[0];
  }
  render();
}

function rowsInPlay() {
  if (kind === "sent") return [{ l: "", f: current.f }];
  return mode === "flash" ? [current.rows[flashRow]] : current.rows;
}

function mark(el, r, ok) {
  el.classList.toggle("ok", ok);
  el.classList.toggle("bad", !ok);
  const sol = `<b>${r.l ? r.l + " " : ""}${r.f.join(" / ")}</b>`;
  const typed = el.querySelector("input").value.trim();
  el.querySelector(".fb").innerHTML = ok
    ? `Zuzen! ${sol}`
    : (typed ? `«${escapeHTML(typed)}» idatzi duzu. Erantzuna: ${sol}` : `Erantzuna: ${sol}`);
}

function check(reveal = false) {
  if (checked) return;
  checked = true;
  const rows = rowsInPlay();
  let ok = 0;
  document.querySelectorAll("#rows .row").forEach((el, i) => {
    const r = rows[i];
    const a = norm(el.querySelector("input").value);
    const good = !reveal && !!a && r.f.some(f => norm(f) === a);
    if (good) ok++;
    mark(el, r, good);
  });
  if (!reveal) {
    score.ok += ok;
    score.total += rows.length;
    if (single()) score.streak = ok ? score.streak + 1 : 0;
    store.set("score", score);
  }
  updateScore();
  const s = $("summary");
  s.hidden = single() || reveal;
  if (!single()) s.textContent = ok === rows.length ? `Bikain! ${ok}/${rows.length} zuzen.` : `${rows.length}tik ${ok} zuzen.`;
  $("next").focus({ preventScroll: true });
}

function updateScore() {
  const pct = score.total ? Math.round(100 * score.ok / score.total) : 0;
  const streak = single() ? `<br>segida: ${score.streak}` : "";
  $("score").innerHTML = `<b>${score.ok} / ${score.total}</b> zuzen<br>% ${pct} · <a href="#" id="reset">berrezarri</a>${streak}`;
  $("reset").onclick = e => { e.preventDefault(); score = { ok: 0, total: 0, streak: 0 }; store.set("score", score); updateScore(); };
}

function refresh() { current = null; fillFilters(); pick(true); fillFilters(); }

// ---------- Gertaerak ----------
$("k-tables").onclick = () => { kind = "tables"; store.set("kind", kind); refresh(); };
$("k-sent").onclick = () => { kind = "sent"; store.set("kind", kind); refresh(); };
$("m-table").onclick = () => { mode = "table"; store.set("mode", mode); refresh(); };
$("m-flash").onclick = () => { mode = "flash"; store.set("mode", mode); refresh(); };
$("f-group").onchange = e => { fGroup = e.target.value; store.set("group", fGroup); refresh(); };
$("f-tense").onchange = e => { fTense = e.target.value; store.set("tense", fTense); refresh(); };
$("f-nor").onchange = e => { fNor = e.target.value; store.set("nor", fNor); refresh(); };
$("f-ex").onchange = () => pick(false);
$("check").onclick = () => check();
$("reveal").onclick = () => check(true);
$("next").onclick = () => pick(true);
$("quiz").addEventListener("submit", e => e.preventDefault());
$("quiz").addEventListener("keydown", e => {
  if (e.key !== "Enter" || !e.target.matches("input")) return;
  e.preventDefault();
  if (checked) return pick(true);
  const inputs = [...document.querySelectorAll("#rows input")];
  const i = inputs.indexOf(e.target);
  if (i < inputs.length - 1) inputs[i + 1].focus();
  else check();
});
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && checked && !e.target.matches("input, button, select, a")) { e.preventDefault(); pick(true); }
});

// Abiaraztea: taula moduan, lehen taula (NOR · izan · orainaldia)
fillFilters();
if (kind === "tables" && mode === "table") { current = filtered()[0] || EX[0]; render(); } else pick(true);
fillFilters();

// Lineaz kanpo erabiltzeko (instalatutako aplikazioa)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
