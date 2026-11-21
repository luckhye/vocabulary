/* Sound Deck web app — stateless schedule (spec sections 13, 15, 16).
 * Word number -> the day it is learned (50 a day from START).
 * Reviews fall on base day + 1, 3, 7, 14, 30, 60. base = learned day, or the
 * day it was last marked "Don't know" (the only thing that is saved). */
"use strict";
const START = new Date(2026, 10, 23, 4, 0, 0);   // Mon 2026-11-23, day starts 04:00 local
const PER_DAY = 50;
const INTERVALS = [1, 3, 7, 14, 30, 60];
const DAYMS = 86400000;
const K_MISSED = "sd-missed-v1", K_PROG = "sd-progress-v1", K_SHEET = "sd-sheet-url";

const WORDS = window.PACK_A || [];
const BYN = Object.fromEntries(WORDS.map(w => [w.n, w]));
const learnDay = w => Math.floor((+w.n - 1) / PER_DAY);

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};

// ?day=N previews day N (1-based) without saving anything
const params = new URLSearchParams(location.search);
const PREVIEW = params.has("day");
let today = PREVIEW ? Math.max(0, (+params.get("day") || 1) - 1) : Math.floor((Date.now() - START) / DAYMS);

let missed = store.get(K_MISSED, {});          // { "037": dayIndex }
const base = w => (missed[w.n] != null ? missed[w.n] : learnDay(w));

function fmtDay(d) {
  const t = new Date(START.getTime() + d * DAYMS);
  return t.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/* ---------- today's queue ---------- */
function buildQueue() {
  const known = new Set();
  WORDS.forEach(w => { if (learnDay(w) < today) w.sounds.forEach(s => known.add(s)); });
  const reviews = WORDS.filter(w => learnDay(w) < today && INTERVALS.includes(today - base(w)));
  // a word missed earlier today comes back too
  WORDS.forEach(w => { if (missed[w.n] === today && learnDay(w) < today && !reviews.includes(w)) reviews.push(w); });
  const fresh = WORDS.filter(w => learnDay(w) === today);
  const q = reviews.map(w => ({ id: "w:" + w.n, n: w.n, review: true }));
  fresh.forEach(w => {
    w.sounds.forEach(s => { if (!known.has(s)) { known.add(s); q.push({ id: "s:" + s, sound: s, before: w.n }); } });
    q.push({ id: "w:" + w.n, n: w.n, review: false });
  });
  return q;
}

let prog = store.get(K_PROG, null);
if (PREVIEW || !prog || prog.day !== today) prog = { day: today, done: [], again: [] };
const saveProg = () => { if (!PREVIEW) store.set(K_PROG, prog); };
let queue = [];
function rebuild() {
  const done = new Set(prog.done);
  queue = buildQueue().filter(c => !done.has(c.id));
  // cards marked "Don't know" today and not yet known go to the back
  prog.again.forEach(id => { if (!done.has(id) && !queue.some(c => c.id === id)) queue.push({ id, n: id.slice(2), review: true }); });
}

/* ---------- Google Sheet sync ---------- */
const sheetUrl = () => store.get(K_SHEET, "");
async function pullSheet() {
  const url = sheetUrl(); if (!url || PREVIEW) return false;
  try {
    const r = await fetch(url, { cache: "no-store" });
    const data = await r.json();
    let changed = false;
    for (const [n, d] of Object.entries(data.missed || {})) {
      if (BYN[n] && (missed[n] == null || d > missed[n])) { missed[n] = d; changed = true; }
    }
    // push anything the sheet does not have yet
    const missing = Object.entries(missed).filter(([n, d]) => (data.missed || {})[n] !== d);
    if (missing.length) await pushSheet(missing.map(([n, d]) => ({ n, w: BYN[n] ? BYN[n].w : "", day: d, date: dateStr(d) })));
    if (changed) store.set(K_MISSED, missed);
    setSync("Synced " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    return changed;
  } catch (e) { setSync("Could not reach the sheet. Saved on this phone."); return false; }
}
async function pushSheet(items) {
  const url = sheetUrl(); if (!url || PREVIEW) return;
  try { await fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ items }) }); }
  catch (e) { setSync("Could not reach the sheet. Saved on this phone."); }
}
function dateStr(d) { const t = new Date(START.getTime() + d * DAYMS); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`; }
function setSync(t) { const el = document.getElementById("syncState"); if (el) el.textContent = t; }

/* ---------- speech ---------- */
function speak(text) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "en-US"; u.rate = 0.85; speechSynthesis.speak(u); } catch (e) {} }

/* ---------- render ---------- */
let flipped = false, backSide = false;
const ph = document.getElementById("phone");
const cls = id => (id[0] === "V" ? "v" : "c");

function ipaHtml(w) {
  return w.seg.map(([t, id]) => id ? `<span class="${cls(id)}${w.hard.includes(id) ? " hard" : ""}">${esc(t)}</span>` : esc(t)).join("");
}
function koTable(w) {
  return `<table class="ko"><thead><tr><th>Sound</th><th>Closest Korean</th><th>How it differs</th></tr></thead><tbody>${
    w.sounds.map(id => `<tr><td><span class="chip ${cls(id)}${w.hard.includes(id) ? " hard" : ""}">${esc(SOUND[id])}</span></td><td>${esc(KO[id][0])}</td><td>${esc(KO[id][1])}</td></tr>`).join("")}</tbody></table>`;
}

function header() {
  document.getElementById("dayTitle").textContent = today < 0 ? "Sound Deck" : `Day ${today + 1}`;
  document.getElementById("dayDate").textContent = today < 0 ? "" : " · " + fmtDay(today) + (PREVIEW ? " · preview" : "");
  const words = queue.filter(c => c.n).length;
  document.getElementById("left").textContent = today < 0 ? "" : `${words} left`;
}

function render() {
  header();
  if (today < 0) {
    ph.innerHTML = `<div class="done"><b>Starts ${fmtDay(0)}</b>${PER_DAY} new words a day, then reviews on day 1, 3, 7, 14, 30 and 60.<br><br><a class="btn" href="?day=1">Preview Day 1</a></div>`;
    return;
  }
  const c = queue[0];
  if (!c) {
    const tomorrow = WORDS.filter(w => learnDay(w) < today + 1 && INTERVALS.includes(today + 1 - base(w))).length;
    const newT = WORDS.filter(w => learnDay(w) === today + 1).length;
    ph.innerHTML = `<div class="done"><b>Done for today</b>Tomorrow: ${tomorrow} reviews${newT ? ` and ${newT} new words` : ""}.${PREVIEW ? `<br><br><a class="btn" href="?day=${today + 2}">Preview Day ${today + 2}</a>` : ""}</div>`;
    return;
  }
  if (c.sound) return renderSound(c);
  renderWord(c);
}

function renderSound(c) {
  const id = c.sound, w = BYN[c.before];
  const top = `<div class="cardtop"><span><span class="id">New sound</span> · before ${c.before} ${esc(w.w)}</span><span class="kind">${id[0] === "V" ? "Vowel" : "Consonant"}</span></div>`;
  const face = backSide
    ? `<div class="mouth" id="mouthIntro"></div>`
    : `<div class="pic"><span class="word" style="font-size:96px;color:var(--${id[0] === "V" ? "vowel" : "cons"})">${esc(SOUND[id])}</span>${HARD_IDS.has(id) ? `<span class="tag">Hard for Korean speakers</span>` : ""}</div><div class="prompt">How do you make this sound? Try it out loud.</div><button class="btn play" type="button" id="sayEx">▶ Hear "${esc(w.w)}"</button>`;
  ph.innerHTML = top + face + `<div class="spacer"></div>` + (flipped
    ? `<button class="btn primary reveal" type="button" data-act="know">Got it</button><div class="hint">Tap to flip · swipe right to continue</div>`
    : `<div class="hint">Tap the card to see the answer</div>`);
  if (backSide) mountMouth(document.getElementById("mouthIntro"), id);
  const se = document.getElementById("sayEx"); if (se) se.onclick = () => speak(w.w);
}

function renderWord(c) {
  const w = BYN[c.n];
  const top = `<div class="cardtop"><span><span class="id">${w.n}</span> · ${c.review ? "Review" : "New"}</span><span class="kind">${w.emo ? "Picture → word" : "Audio → word"}</span></div>`;
  const front = w.emo
    ? `<div class="pic"><span class="emo" aria-hidden="true">${w.emo}</span></div><div class="prompt">What is this? Say the word out loud.</div>`
    : `<div class="pic"><button class="btn primary play big" type="button" id="say">▶ Listen</button></div><div class="prompt">Listen, then say the word yourself.</div>`;
  const firstHard = w.hard.find(id => soundEntry(id)) || w.sounds.find(id => soundEntry(id));
  const back = `<div class="word">${esc(w.w)}</div><div class="ipa">/${ipaHtml(w)}/${w.alt ? `<small>also /${esc(w.alt)}/</small>` : ""}</div>${koTable(w)}<div class="mouth"><div class="pick">Mouth: ${
    w.sounds.filter(id => soundEntry(id)).map(id => `<button type="button" data-s="${id}" aria-pressed="${id === firstHard}">${esc(SOUND[id])}</button>`).join("")}</div><div id="mouthBack"></div></div>${
    w.warn.length ? `<div class="warn">${w.warn.map(x => `<div>${esc(x)}</div>`).join("")}</div>` : ""}<button class="btn play" type="button" id="say">▶ Hear again</button>`;
  ph.innerHTML = top + (flipped && backSide ? back : front) + `<div class="spacer"></div>` + (flipped
    ? `<div class="grade2"><button type="button" class="no" data-act="again">Don't know</button><button type="button" class="yes" data-act="know">Know</button></div><div class="hint">Tap to flip · Swipe right: Know · Swipe left: Don't know</div>`
    : `<div class="hint">Tap the card to see the answer</div>`);
  const mb = document.getElementById("mouthBack");
  if (mb && firstHard) {
    mountMouth(mb, firstHard);
    ph.querySelectorAll(".mouth .pick button").forEach(b => b.onclick = () => {
      ph.querySelectorAll(".mouth .pick button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      mountMouth(mb, b.dataset.s);
    });
  }
  const say = document.getElementById("say"); if (say) say.onclick = () => speak(w.w);
}
const HARD_IDS = new Set(["V01", "V02", "V05", "V06", "V07", "V08", "V10", "V11", "V12", "V13", "C03", "C04", "C05", "C07", "C09", "C10", "C13"]);

/* ---------- actions ---------- */
function reveal() {
  const c = queue[0]; if (!c) return;
  if (!flipped) { flipped = true; backSide = true; if (c.n) speak(BYN[c.n].w); }
  else backSide = !backSide;
  render();
}
function act(kind) {
  const c = queue.shift(); if (!c) return;
  flipped = false; backSide = false;
  if (kind === "know" || c.sound) {
    prog.done.push(c.id);
  } else {
    // Don't know: remember the day, show it again at the end of today's set
    if (!PREVIEW) {
      missed[c.n] = today; store.set(K_MISSED, missed);
      pushSheet([{ n: c.n, w: BYN[c.n].w, day: today, date: dateStr(today) }]);
    }
    if (!prog.again.includes(c.id)) prog.again.push(c.id);
    queue.push({ id: c.id, n: c.n, review: true });
  }
  saveProg(); render();
}
function advance(dir) {
  if (!flipped || !queue[0]) return false;
  if (queue[0].sound && dir < 0) return false;
  act(dir > 0 ? "know" : "again"); return true;
}

ph.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (b) { act(b.dataset.act); return; }
});
(() => {
  let x0 = null, y0 = 0, dx = 0, swiped = false;
  ph.addEventListener("pointerdown", e => { if (e.target.closest("button,a,.ctl")) { x0 = null; return; } x0 = e.clientX; y0 = e.clientY; dx = 0; swiped = false; ph.classList.remove("anim"); });
  ph.addEventListener("pointermove", e => { if (x0 === null) return; dx = e.clientX - x0; if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(e.clientY - y0) && flipped) ph.style.transform = `translateX(${dx}px) rotate(${dx / 40}deg)`; });
  const end = () => {
    if (x0 === null) return; const d = dx; x0 = null; ph.classList.add("anim");
    if (Math.abs(d) > 80 && flipped && !(queue[0] && queue[0].sound && d < 0)) {
      swiped = true; const dir = d > 0 ? 1 : -1; ph.style.transform = `translateX(${dir * 120}%)`; ph.style.opacity = "0";
      setTimeout(() => { ph.classList.remove("anim"); ph.style.transform = `translateX(${-dir * 40}px)`; advance(dir); requestAnimationFrame(() => { ph.classList.add("anim"); ph.style.transform = ""; ph.style.opacity = ""; }); }, 220);
    } else { if (Math.abs(d) > 10) swiped = true; ph.style.transform = ""; }
  };
  ph.addEventListener("pointerup", end); ph.addEventListener("pointercancel", end);
  ph.addEventListener("click", e => { if (swiped) { swiped = false; return; } if (e.target.closest("button,a,.ctl")) return; reveal(); });
})();

/* ---------- settings ---------- */
const dlg = document.getElementById("set");
document.getElementById("openSet").onclick = () => { document.getElementById("sheetUrl").value = sheetUrl(); dlg.showModal(); };
document.getElementById("sheetUrl").onchange = e => { store.set(K_SHEET, e.target.value.trim()); };
document.getElementById("syncNow").onclick = async () => {
  store.set(K_SHEET, document.getElementById("sheetUrl").value.trim());
  setSync("Syncing…"); if (await pullSheet()) { rebuild(); render(); }
};

// a new day while the app stays open
setInterval(() => {
  if (PREVIEW) return;
  const d = Math.floor((Date.now() - START) / DAYMS);
  if (d !== today) { today = d; prog = { day: today, done: [], again: [] }; rebuild(); render(); }
}, 60000);

rebuild(); render();
pullSheet().then(ch => { if (ch) { rebuild(); render(); } });
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
