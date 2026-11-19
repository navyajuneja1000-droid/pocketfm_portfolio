/* Pocket FM × navya — app logic (vanilla JS, hash routing, browser text-to-speech player) */
(function () {
  "use strict";
  var D = window.NJ, P = D.person;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var byId = {}; D.products.forEach(function (p) { byId[p.id] = p; if (p.links.length && p.cats.indexOf("live") < 0) p.cats.push("live"); });
  function host(u) { return u.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]; }

  /* cover art: a real image where the case has one */
  var SHOT = { wowworld: "assets/work/wow-packshot.jpg", prolectro: "assets/work/prolectro-keyvisual.jpg" };
  var GSHORT = { all: "All", growth: "Growth", pricing: "Pricing", retention: "Retention", payments: "Payments", build: "0→1", d2c: "D2C", live: "Live", phonepe: "PhonePe" };

  /* ---------------- storage (per-viewer convenience only) ---------------- */
  function load(k, d) { try { var v = localStorage.getItem("pfn_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem("pfn_" + k, JSON.stringify(v)); } catch (e) {} }
  var S = {
    lib: load("lib", []).filter(function (id) { return byId[id]; }),
    hist: load("hist", []).filter(function (id) { return byId[id]; }),
    f: { sort: "rel", seller: [], prov: [], q: "" },
    mv: "all", role: "Growth Manager", rounds: 2, pack: "hire", fltOpen: false, promo: load("promo", true)
  };

  /* ---------------- icons ---------------- */
  function ic(d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + "</svg>"; }
  var I = {
    search: ic('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5" stroke-linecap="round"/>'),
    home: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M3 10.6L12 3.5l9 7.1V20a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 20z"/></svg>',
    compass: ic('<circle cx="12" cy="12" r="9.2"/><path d="M15.5 8.5l-2 5-5 2 2-5z" stroke-linejoin="round"/>'),
    lib: ic('<rect x="3.5" y="4" width="4" height="16" rx="1"/><rect x="9.5" y="4" width="4" height="16" rx="1"/><path d="M16 5.2l3.6-.9 3 15.5-3.6.8z" stroke-linejoin="round"/>'),
    coin: ic('<circle cx="12" cy="12" r="8.8"/><circle cx="12" cy="12" r="5.6"/><path d="M12 9.3v5.4" stroke-linecap="round"/>'),
    user: ic('<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" stroke-linecap="round"/>'),
    doc: ic('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h4" stroke-linecap="round"/>'),
    chev: ic('<path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>'),
    chevD: ic('<path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>'),
    back: ic('<path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/>'),
    x: ic('<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>'),
    check: ic('<path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/>'),
    plus: ic('<path d="M12 5v14M5 12h14" stroke-linecap="round"/>'),
    share: ic('<path d="M12 15V3.5M7.5 8L12 3.5 16.5 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12v7a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-7" stroke-linecap="round"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" stroke-linejoin="round"/>'),
    phone: ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" stroke-linejoin="round"/>'),
    linkedin: ic('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2.5 2.5 0 0 1 5 0v4M12 10v7" stroke-linecap="round"/>'),
    ext: ic('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" stroke-linecap="round" stroke-linejoin="round"/>'),
    globe: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    pin: ic('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.5"/>'),
    filter: ic('<path d="M4 6h16M7 12h10M10 18h4" stroke-linecap="round"/>'),
    star: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1-4.5-4.3 6.1-.8z"/></svg>',
    clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round" stroke-linejoin="round"/>'),
    shield: ic('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5" stroke-linecap="round" stroke-linejoin="round"/>'),
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    playO: ic('<path d="M8 5.5v13l11-6.5z" stroke-linejoin="round"/>'),
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M5 6v12l9-6zM16 6h2.5v12H16z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M19 6v12l-9-6zM5.5 6H8v12H5.5z"/></svg>',
    lock: ic('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0" stroke-linecap="round"/>'),
    unlock: ic('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 7.6-1.7" stroke-linecap="round"/>'),
    head: ic('<path d="M4 15v-3a8 8 0 0 1 16 0v3" stroke-linecap="round"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.5"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.5"/>'),
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z" fill="#E51A4D"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" fill="#F5B82E"/></svg>',
    quill: ic('<path d="M20 4c-7 0-12 5-13.5 12.5L5 20M20 4c-1 6-5 10-11 11" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15c2-3 5-6 8-8" stroke-linecap="round"/>')
  };

  function mark(sz) { return '<svg class="mk" viewBox="0 0 64 64" width="' + (sz || 34) + '" height="' + (sz || 34) + '" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#E51A4D"/><path d="M18 20a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6h-9l-7 7v-7a6 6 0 0 1-6-6z" fill="#fff"/><path d="M28 22v10l8-5z" fill="#E51A4D"/></svg>'; }
  function logo() { return '<a class="logo" href="#/" aria-label="Pocket FM × navya: home">' + mark() + '<span class="lw"><b>Pocket FM</b><small>× navya</small></span></a>'; }

  /* ---------------- shared bits ---------------- */
  var PCLS = { result: "", built: "", modelled: "amber", target: "blue", sourced: "grey" };
  function provChip(p) {
    var x = D.prov[p]; if (!x) return "";
    return '<span class="chip ' + PCLS[p] + '" title="' + esc(x.tip) + '">' + (p === "result" || p === "built" ? I.check : "") + esc(x.label) + "</span>";
  }
  function inLib(id) { return S.lib.indexOf(id) > -1; }
  function seller(p) { return D.sellers[p.seller]; }
  function catName(id) { var c = D.cats.filter(function (c) { return c.id === id; })[0]; return c ? c.name : "All shows"; }
  function genre(p) { return catName(p.cats[0]); }
  function status(p) {
    if (/present/i.test(p.date)) return ["ONGOING SERIES", "on"];
    if (/Proposed|Prototype/.test(p.badge)) return ["PILOT EPISODE", "pi"];
    return ["COMPLETED SERIES", ""];
  }

  /* cover: dark drama-style artwork, image-backed where the case has a real visual */
  function cover(p, big) {
    var o = p.poster, pp = p.seller === "phonepe", img = SHOT[p.id];
    return '<span class="cv' + (img ? " has-img" : "") + (big ? " big" : "") + '" style="--a:' + o.accent + '">' +
      (img ? '<img src="' + img + '" alt="" loading="lazy">' : "") + '<span class="cv-g"></span>' +
      (pp ? '<img class="cv-pl" src="assets/logos/phonepe.svg" alt="">' : big ? '<span class="cv-k">A NAVYA ORIGINAL</span>' : "") +
      '<span class="cv-t">' + esc(p.short) + "</span>" +
      '<span class="cv-n">' + esc(o.big) + "</span>" + (big ? '<span class="cv-s">' + esc(o.small) + "</span>" : "") + "</span>";
  }
  function libBtn(p, cls) {
    var on = inLib(p.id);
    return '<button class="lb ' + (on ? "on " : "") + (cls || "") + '" data-act="lib" data-id="' + p.id + '" aria-pressed="' + on + '" aria-label="' + (on ? "Remove " : "Add ") + esc(p.short) + (on ? " from" : " to") + ' library">' + (on ? I.check : I.plus) + "</button>";
  }
  function card(p) {
    return '<div class="sc" data-card="' + p.id + '"><div class="sc-i"><a href="#/show/' + p.id + '" tabindex="-1" aria-hidden="true">' + cover(p) + "</a>" +
      (p.badge ? '<span class="bdg">' + esc(p.badge) + "</span>" : "") + libBtn(p) + "</div>" +
      '<a class="sc-b" href="#/show/' + p.id + '"><b class="nm">' + esc(p.short) + '</b><span class="gn">' + esc(genre(p)) + "</span>" +
      '<span class="pl">' + I.playO + "<b>" + esc(p.price.v) + "</b> " + esc(p.price.u) + "</span></a>" +
      '<span class="pv">' + provChip(p.price.prov) + "</span></div>";
  }
  function rail(id, title, list, more, sub) {
    return '<section class="sec"><div class="sec-h"><div><h2>' + esc(title) + "</h2>" + (sub ? "<p>" + esc(sub) + "</p>" : "") + "</div>" + (more ? '<a class="see" href="' + more + '">See all ' + I.chev + "</a>" : "") + "</div>" +
      '<div class="rail-w"><div class="rail" id="' + id + '">' + list.map(card).join("") + '</div><button class="rnav" data-act="rail" data-k="' + id + '" aria-label="Scroll ' + esc(title) + '">' + I.chev + "</button></div></section>";
  }
  function rankRail(list) {
    return '<section class="sec"><div class="sec-h"><div><h2>Explore blockbusters</h2><p>Ranked by the size of the headline number. Every one is labelled.</p></div></div><div class="rail-w"><div class="rail rank" id="r-rank">' +
      list.map(function (p, i) { return '<a class="rk" href="#/show/' + p.id + '"><span class="rk-n" aria-hidden="true">' + (i + 1) + '</span><span class="rk-c">' + cover(p) + '</span><span class="rk-t"><small>Rank ' + (i + 1) + "</small><b>" + esc(p.short) + '</b><span class="gn">' + esc(genre(p)) + '</span><span class="pl">' + I.playO + esc(p.price.v) + "</span></span></a>"; }).join("") +
      '</div><button class="rnav" data-act="rail" data-k="r-rank" aria-label="Scroll blockbusters">' + I.chev + "</button></div></section>";
  }

  /* ---------------- episodes: every case plays as a series ---------------- */
  function plain(s) {
    var t = [];
    if (s.p && !s.compare && !s.tiers && !s.steps) t.push(s.p);
    if (s.list) t.push(s.list.join(". ") + ".");
    if (s.steps) s.steps.forEach(function (x, i) { t.push("Step " + (i + 1) + ", " + x[0] + ". " + x[1]); });
    if (s.compare) s.compare.forEach(function (x) { t.push(x[0] + ": " + x[1]); });
    if (s.tiers) s.tiers.forEach(function (x) { t.push(x[0] + ", " + x[1] + ", " + x[2] + "."); });
    if (s.p && (s.compare || s.tiers || s.steps)) t.push(s.p);
    return t.join(" ");
  }
  function episodes(p) {
    var e = [{ t: "The problem", x: p.summary.problem }, { t: "What I did", x: p.summary.did }, { t: "Where it landed", x: p.summary.landed }];
    p.sections.forEach(function (s) { e.push({ t: s.h, x: plain(s), s: s }); });
    e.push({ t: "Why this matters at Pocket FM", x: p.pfm, bonus: true });
    return e;
  }
  function dur(x) { var sec = Math.max(20, Math.round(x.split(/\s+/).length / 2.5)); return Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2); }
  function totalMin(p) { var w = episodes(p).reduce(function (a, e) { return a + e.x.split(/\s+/).length; }, 0); return Math.max(1, Math.round(w / 150)); }
  function secBody(s) {
    var h = "";
    if (s.p && !s.compare && !s.tiers && !s.steps) h += "<p>" + esc(s.p) + "</p>";
    if (s.list) h += "<ul>" + s.list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    if (s.steps) h += '<div class="steps">' + s.steps.map(function (x, i) { return '<div class="step"><i>' + (i + 1) + "</i><div><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></div></div>"; }).join("") + "</div>";
    if (s.compare) h += '<div class="cmp">' + s.compare.map(function (x) { return "<div><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></div>"; }).join("") + "</div>";
    if (s.tiers) h += '<div class="tiers">' + s.tiers.map(function (x) { return "<div><small>" + esc(x[0]) + "</small><b>" + esc(x[1]) + "</b><span>" + esc(x[2]) + "</span></div>"; }).join("") + "</div>";
    if (s.p && (s.compare || s.tiers || s.steps)) h += "<p>" + esc(s.p) + "</p>";
    return h;
  }

  /* ---------------- calculator: follow the coin ---------------- */
  var ROUTE = { a30: { l: "In-app · 30% fee", r: 0.30 }, a15: { l: "In-app · 15% fee", r: 0.15 }, web: { l: "Web store · +25% coins", r: 0 } };
  var CR = "a30";
  function coinBlock() {
    return '<section class="sec" aria-labelledby="ftc-h"><div class="sec-h"><div><h2 id="ftc-h">Follow the coin</h2><p>A listener tops up a coin pack after a cliffhanger. What reaches the bank, and what does each coin earn? Payments arithmetic is growth arithmetic.</p></div></div>' +
      '<div class="calc"><div class="calc-t"><div class="seg" role="tablist">' + Object.keys(ROUTE).map(function (k) { return '<button class="' + (k === CR ? "on" : "") + '" data-act="route" data-k="' + k + '" role="tab" aria-selected="' + (k === CR) + '">' + ROUTE[k].l + "</button>"; }).join("") + "</div>" +
      '<small>Coin pack price</small><output id="cpOut">₹499</output><input id="cpR" type="range" min="49" max="1999" step="50" value="499" data-act="coin" aria-label="Coin pack price">' +
      '<div class="coins" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></div>' +
      '<div class="calc-b"><div class="calc-r"><span>Listener pays</span><b id="c1">₹499.00</b></div>' +
      '<div class="calc-r neg"><span>GST inside the price <small>18%</small></span><b id="c2"></b></div>' +
      '<div class="calc-r neg"><span id="c3l">Store commission</span><b id="c3"></b></div>' +
      '<div class="calc-r tot"><span>Lands in the bank</span><b id="c4"></b></div>' +
      '<div class="calc-r"><span>Coins delivered <small id="c5s"></small></span><b id="c5"></b></div>' +
      '<div class="calc-r hl"><span>Earned per 100 coins</span><b id="c6"></b></div>' +
      '<p class="verdict" id="cv"></p>' +
      '<p class="fine">The 25% web-store coin bonus is on Pocket FM\'s own site (Sourced). Store fees, the 2% gateway rate and 1 coin ≈ ₹1 are illustrative (Modelled). Not Pocket FM data.</p></div></div></section>';
  }
  function inr(n, dp) { return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp }); }
  function net(P0, k) { var n0 = P0 / 1.18; if (k === "web") { var fee = P0 * 0.02; return { gst: P0 - n0, fee: fee * 1.18, bank: n0 - fee * 1.18, coins: Math.round(P0 * 1.25) }; } var f = n0 * ROUTE[k].r; return { gst: P0 - n0, fee: f, bank: n0 - f, coins: Math.round(P0) }; }
  function updCoin() {
    var r = $("#cpR"); if (!r) return;
    var v = +r.value, x = net(v, CR), per = x.bank / x.coins * 100;
    r.style.setProperty("--p", ((v - r.min) / (r.max - r.min) * 100) + "%");
    $("#cpOut").textContent = inr(v, 0); $("#c1").textContent = inr(v, 2);
    $("#c2").textContent = "− " + inr(x.gst, 2);
    $("#c3l").innerHTML = CR === "web" ? "Gateway fee <small>2% + GST on the fee</small>" : "Store commission <small>" + (ROUTE[CR].r * 100) + "% of net</small>";
    $("#c3").textContent = "− " + inr(x.fee, 2); $("#c4").textContent = inr(x.bank, 2);
    $("#c5").textContent = x.coins.toLocaleString("en-IN"); $("#c5s").textContent = CR === "web" ? "incl. 25% bonus" : "";
    $("#c6").textContent = inr(per, 2);
    var w = net(v, "web"), a30 = net(v, "a30"), a15 = net(v, "a15");
    var pw = w.bank / w.coins * 100, p30 = a30.bank / a30.coins * 100, p15 = a15.bank / a15.coins * 100;
    $("#cv").innerHTML = CR === "web"
      ? "Even after giving away 25% more coins, the web pack earns <b class=\"up\">" + inr(pw - p30, 2) + " more</b> per 100 coins than in-app at 30%, and <b class=\"dn\">" + inr(p15 - pw, 2) + " less</b> than in-app at 15%. Where the store fee is low, the bonus costs more than it saves."
      : "Per ₹100 Cr of top-ups a year, this route banks <b>" + inr(x.bank / v * 100, 1) + " Cr</b>. The web store would bank <b class=\"up\">" + inr(w.bank / v * 100, 1) + " Cr</b>, before the cost of the bonus coins.";
  }

  function habitsBlock(h) {
    return '<section class="sec"><div class="sec-h"><div><h2>' + (h || "Why listeners keep coming back") + '</h2><p>Four habits that show up in every case: a settlement file, a bank\'s reply email or the price of a masala sachet.</p></div></div><div class="habits">' +
      D.habits.map(function (x, i) { return '<div class="habit"><i>' + String.fromCharCode(65 + i) + "</i><div><b>" + esc(x[0]) + "</b><span>" + esc(x[1]) + "</span></div></div>"; }).join("") + "</div></section>";
  }
  function pilotBlock() {
    return '<section class="sec pilot" id="pilot"><div class="sec-h"><div><span class="kick">' + I.spark + "PILOT EPISODE</span><h2>My first 90 days at Pocket FM</h2><p>Four hypotheses from public information only, each paired with the metric that would prove it wrong. Hypotheses, not findings.</p></div></div>" +
      '<div class="pl-g">' + D.pilot.map(function (x, i) { return '<div class="pl-c"><span class="pl-n">EP ' + (i + 1) + "</span><b>" + esc(x.t) + "</b><p>" + esc(x.w) + '</p><div class="pl-m"><small>Watch</small><span>' + esc(x.m) + "</span></div>" + provChip(x.p) + "</div>"; }).join("") + "</div></section>";
  }

  /* ---------------- HOME ---------------- */
  function hero() {
    return '<section class="hero"><div class="feat"><div class="feat-bg" aria-hidden="true"></div><div class="feat-tx"><span class="kick on">' + I.spark + "NEW SEASON · NOW STREAMING</span>" +
      '<h2>The Navya Juneja Show</h2><p>Season 3 of a payments-to-growth story. Two years inside PhonePe\'s payment rails, then funnels, pricing ladders and win-back with real users.</p>' +
      '<div class="feat-cta"><button class="btn play" data-act="trailer">' + I.play + 'Play trailer</button><a class="btn ghost" href="#/profile">' + I.user + "Meet the author</a></div></div>" +
      '<div class="feat-v"><img src="assets/portrait.jpg" alt="Navya Juneja"><span class="fv-tag"><b>₹15 Cr+</b>recovered</span></div></div>' +
      '<h1>Home of the binge-worthy story of a <em>growth manager</em></h1><p class="sub">Payments · Funnels · Pricing · Retention · every number labelled</p></section>';
  }
  function topGrid() {
    var list = ["perfora", "pp-routing", "wowworld", "h2h", "prolectro", "reconos", "routeiq", "pp-recon", "mid", "foundit"].map(function (id) { return byId[id]; });
    return '<section class="sec"><div class="sec-h"><div><h2>Browse the library</h2></div><a class="see" href="#/shows/all">Browse all ' + D.products.length + " shows " + I.chev + '</a></div><div class="grid">' + list.map(card).join("") + "</div></section>";
  }
  function genreChips(active) {
    return '<div class="gchips" role="tablist">' + D.cats.map(function (c) { return '<a class="fc' + (c.id === active ? " on" : "") + '" href="#/shows/' + c.id + '"' + (c.id === active ? ' aria-current="page"' : "") + ">" + esc(c.name) + "</a>"; }).join("") + "</div>";
  }
  function evidence() {
    var f = { all: function () { return true; }, result: function (p) { return p.price.prov === "result"; }, built: function (p) { return p.price.prov === "built" || p.cats.indexOf("live") > -1; }, model: function (p) { return /modelled|target|sourced/.test(p.price.prov); } };
    var list = D.products.filter(f[S.mv]).slice(0, 10);
    var tabs = [["all", "All"], ["result", "Results"], ["built", "Built & live"], ["model", "Modelled & targets"]];
    return '<section class="sec" id="fresh"><div class="sec-h"><div><h2>Trending this week · filter by evidence</h2><p>Every figure says where it came from. No hidden coins.</p></div></div>' +
      '<div class="chips" role="tablist">' + tabs.map(function (t) { return '<button class="fc' + (S.mv === t[0] ? " on" : "") + '" role="tab" aria-selected="' + (S.mv === t[0]) + '" data-act="mv" data-k="' + t[0] + '">' + t[1] + "</button>"; }).join("") + "</div>" +
      '<div class="rail-w"><div class="rail" id="r-fresh">' + list.map(card).join("") + '</div><button class="rnav" data-act="rail" data-k="r-fresh" aria-label="Scroll">' + I.chev + "</button></div></section>";
  }
  function stats() {
    var X = [["₹15 Cr+", "recovered from payment reconciliation at PhonePe", "result"], ["₹8 Cr", "saved a year through payment routing", "result"], ["+4 pp", "travel payment success from A/B tested routes", "result"], ["4.6×", "sign-ups in two months, through the funnel", "result"]];
    return '<section class="sec stats"><h2>Pocket FM is the world\'s largest audio entertainment platform.<br><span>This is the growth manager who\'d like to help it get larger.</span></h2><div class="st-g">' +
      X.map(function (x) { return "<div><b>" + x[0] + "</b><span>" + esc(x[1]) + "</span>" + provChip(x[2]) + "</div>"; }).join("") + '</div></section>';
  }
  function seasonsRail() {
    var work = D.orders;
    return '<section class="sec"><div class="sec-h"><div><h2>Write your story, start earning</h2><p>Every season so far, most recent first.</p></div><a class="see" href="#/profile">All seasons ' + I.chev + '</a></div><div class="rail-w"><div class="rail seas" id="r-seas">' +
      work.map(function (o, i) { return '<a class="sn" href="#/profile?o=' + o.id + '"><span class="sn-h"><img src="' + o.logo + '" alt=""><small>Season ' + (work.length - i) + "</small></span><b>" + esc(o.org) + "</b><span>" + esc(o.title) + '</span><em>' + esc(o.when) + "</em></a>"; }).join("") +
      '</div><button class="rnav" data-act="rail" data-k="r-seas" aria-label="Scroll seasons">' + I.chev + "</button></div></section>";
  }
  function vHome() {
    var cont = S.hist.map(function (id) { return byId[id]; });
    var rank = ["pp-recon", "pp-routing", "perfora", "foundit", "wowworld", "h2h", "pp-golive", "pp-migration", "prolectro", "reconos"].map(function (id) { return byId[id]; });
    var pp = D.products.filter(function (p) { return p.seller === "phonepe"; });
    var live = D.products.filter(function (p) { return p.cats.indexOf("live") > -1 || p.deck; });
    return '<div class="wrap">' + hero() + genreChips("") +
      (cont.length ? rail("r-cont", "Continue listening", cont, "#/library") : "") +
      topGrid() + rankRail(rank) + pilotBlock() +
      rail("r-pp", "PhonePe Originals", pp, "#/studio/phonepe", "Two years in Cards and NetBanking, as a studio.") +
      evidence() + coinBlock() +
      rail("r-live", "Open them yourself · live builds & decks", live, "#/shows/live") +
      stats() + seasonsRail() + habitsBlock() + hireStrip() + "</div>";
  }
  function hireStrip() {
    return '<section class="sec hs"><div><h2>Your next episode is waiting.</h2><p>Open to Growth Manager roles. The first call costs zero coins.</p></div><div class="hs-b"><a class="btn pk lg" href="#/store">' + I.coin + 'Visit the store</a><a class="btn ghost lg" href="' + P.resume + '" download>' + I.doc + "Résumé</a></div></section>";
  }

  /* ---------------- SHOWS (genre browse) ---------------- */
  function filtered(cat) {
    var q = S.f.q.trim().toLowerCase();
    var l = D.products.filter(function (p) {
      if (cat !== "all" && p.cats.indexOf(cat) < 0) return false;
      if (S.f.seller.length && S.f.seller.indexOf(p.seller) < 0) return false;
      if (S.f.prov.length && S.f.prov.indexOf(p.price.prov) < 0) return false;
      if (q && (p.name + " " + p.short + " " + p.code + " " + p.kind + " " + p.hook + " " + p.cats.join(" ") + " " + seller(p).name).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    if (S.f.sort === "new") l.sort(function (a, b) { return b.sort - a.sort; });
    if (S.f.sort === "old") l.sort(function (a, b) { return a.sort - b.sort; });
    if (S.f.sort === "az") l.sort(function (a, b) { return a.short.localeCompare(b.short); });
    return l;
  }
  function chk(k, v, label) { var on = S.f[k].indexOf(v) > -1; return '<label><input type="checkbox" data-act="chk" data-k="' + k + '" value="' + v + '"' + (on ? " checked" : "") + ">" + esc(label) + "</label>"; }
  function vShows(cat) {
    var l = filtered(cat), n = S.f.seller.length + S.f.prov.length + (S.f.q ? 1 : 0);
    return '<div class="wrap"><div class="sh-top"><h1>Audio dramas for every mood. <span>' + esc(catName(cat)) + "</span></h1>" +
      '<div class="cl-ctl"><small>' + l.length + " show" + (l.length === 1 ? "" : "s") + '</small><button class="fc' + (S.fltOpen || n ? " on" : "") + '" data-act="flt" aria-expanded="' + S.fltOpen + '">' + I.filter + "Filters" + (n ? " (" + n + ")" : "") + '</button><label class="sel"><span class="sr">Sort</span><select data-act="sort"><option value="rel"' + (S.f.sort === "rel" ? " selected" : "") + '>Top picks</option><option value="new"' + (S.f.sort === "new" ? " selected" : "") + '>New arrivals</option><option value="old"' + (S.f.sort === "old" ? " selected" : "") + '>Oldest first</option><option value="az"' + (S.f.sort === "az" ? " selected" : "") + ">A → Z</option></select></label></div></div>" +
      genreChips(cat) +
      '<div class="flt' + (S.fltOpen ? " on" : "") + '"><div><h4>Studio</h4>' + Object.keys(D.sellers).map(function (k) { return chk("seller", k, D.sellers[k].name); }).join("") + "</div>" +
      "<div><h4>Evidence</h4>" + Object.keys(D.prov).map(function (k) { return chk("prov", k, D.prov[k].label + " · " + D.prov[k].tip); }).join("") + "</div>" + (n ? '<button class="clr" data-act="clr">Clear all</button>' : "") + "</div>" +
      (S.f.q ? '<p class="qline">Results for “<b>' + esc(S.f.q) + '</b>” <button class="chip grey" data-act="clrq">Clear ×</button></p>' : "") +
      (l.length ? '<div class="grid">' + l.map(card).join("") + "</div>" : emptyState("Nothing in this genre", "Try a different filter or search term.", null, "Reset filters", "clr")) + "</div>";
  }

  /* ---------------- SHOW PAGE (case detail) ---------------- */
  var GI = {};
  function galleryItems(p) { return p.media.slice(); }
  function gallery(p) {
    var items = galleryItems(p); if (!items.length) return "";
    var cur = Math.min(GI[p.id] || 0, items.length - 1), m = items[cur];
    var main = m.type === "video" ? '<video controls preload="none" playsinline poster="' + m.poster + '" aria-label="' + esc(m.alt) + '"><source src="' + m.src + '" type="video/mp4"></video>'
      : '<button class="zoom" data-act="lbx" data-id="' + p.id + '" data-k="' + cur + '" aria-label="Open image: ' + esc(m.alt) + '"><img src="' + m.src + '" alt="' + esc(m.alt) + '"></button>';
    var th = items.length > 1 ? '<div class="thumbs" role="tablist" aria-label="Media">' + items.map(function (x, i) {
      var t = x.type === "video" ? '<img src="' + x.poster + '" alt=""><span class="tp">' + I.play + "</span>" : '<img src="' + x.src + '" alt="">';
      return '<button role="tab" aria-selected="' + (i === cur) + '" class="' + (i === cur ? "on" : "") + '" data-act="gi" data-id="' + p.id + '" data-k="' + i + '" aria-label="' + esc(x.alt) + '">' + t + "</button>";
    }).join("") + "</div>" : "";
    return '<section class="box" id="gal"><h2>Visuals <small>· ' + items.length + " from the case</small></h2><div class=\"gmain\">" + main + (items.length > 1 ? '<span class="gcount">' + (cur + 1) + " / " + items.length + "</span>" : "") + "</div>" + th + "</section>";
  }
  function vShow(id) {
    var p = byId[id]; if (!p) return vNotFound();
    var s = seller(p), st = status(p), eps = episodes(p);
    var sim = D.products.filter(function (x) { return x.id !== p.id && x.cats.some(function (c) { return c !== "live" && p.cats.indexOf(c) > -1; }); }).slice(0, 8);
    var links = (p.links || []).map(function (l) { return '<a class="lk" href="' + l.u + '" target="_blank" rel="noopener"><span class="lki">' + I.ext + '</span><span class="tx"><b>' + esc(l.t) + "</b><span>" + esc(host(l.u)) + "</span></span>" + I.chev + "</a>"; }).join("");
    if (p.deck) links += '<a class="lk" href="' + p.deck.u + '" target="_blank" rel="noopener"><span class="lki">' + I.doc + '</span><span class="tx"><b>Open the full deck</b><span>' + esc(p.deck.t) + " · PDF · " + p.deck.pages + " pages · " + p.deck.size + "</span></span>" + I.chev + "</a>";
    var studioHref = p.seller === "phonepe" ? "#/studio/phonepe" : "#/profile?o=" + (p.seller === "cogent" ? "cogent" : p.seller === "mu" ? "mu" : "");
    var playing = PL.id === p.id && PL.on;
    return '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a>' + I.chev + '<a href="#/shows/' + p.cats[0] + '">' + esc(genre(p)) + "</a>" + I.chev + "<span>" + esc(p.short) + "</span></nav>" +
      '<div class="sp"><div class="sp-c">' + cover(p, true) + "</div>" +
      '<div class="sp-i"><span class="stt ' + st[1] + '">' + I.check + st[0] + "</span>" +
      '<h1>' + esc(p.name) + "</h1>" +
      '<div class="sp-btns"><button class="btn play lg" data-act="play" data-id="' + p.id + '" data-k="' + (playing ? PL.i : 0) + '">' + (playing ? I.pause + "Pause Ep-" + (PL.i + 1) : I.play + "Play Ep-1") + "</button>" + libBtn(p, "big") + '<button class="ib" data-act="share" aria-label="Share this show">' + I.share + "</button></div>" +
      '<div class="sp-meta"><b class="plays">' + esc(p.price.v) + " " + esc(p.price.u) + '</b><span class="rate">' + I.star + esc(D.prov[p.price.prov].label) + "<i>|</i>" + esc(p.price.off) + '</span><span class="gn">' + esc(genre(p)) + "</span><span class=\"age\">" + esc(p.code) + "</span></div>" +
      '<p class="hook">' + esc(p.hook) + "</p>" +
      '<dl class="cred"><dt>Original author</dt><dd>' + esc(P.name) + "</dd><dt>Studio</dt><dd><a href=\"" + studioHref + '">' + esc(s.name) + "</a> · " + esc(s.sub) + "</dd>" + p.details.map(function (d) { return "<dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd>"; }).join("") + "</dl>" +
      (links ? '<div class="lks">' + links + "</div>" : "") + "</div></div>" +
      '<div class="sp-d"><section class="box eps"><div class="eps-h"><h2>Episodes <small>· ' + eps.length + " · about " + totalMin(p) + ' min</small></h2><span class="free">' + I.unlock + "All episodes unlocked · 0 coins</span></div>" +
      eps.map(function (e, i) {
        var on = PL.id === p.id && PL.i === i && PL.on;
        return '<div class="ep' + (e.bonus ? " bonus" : "") + (on ? " now" : "") + '" id="ep-' + i + '"><button class="ep-p" data-act="play" data-id="' + p.id + '" data-k="' + i + '" aria-label="' + (on ? "Pause" : "Play") + " episode " + (i + 1) + '">' + (on ? I.pause : I.play) + '</button><button class="ep-r" data-act="ep" data-k="' + i + '" aria-expanded="' + (i === 0) + '"><small>' + (e.bonus ? "BONUS · " : "") + "EP " + (i + 1) + " · " + dur(e.x) + "</small><b>" + esc(e.t) + "</b>" + (on ? '<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>' : "") + I.chevD + '</button><div class="ep-b">' + (e.s ? secBody(e.s) : "<p>" + esc(e.x) + "</p>") + "</div></div>";
      }).join("") + "</section>" +
      '<section class="box"><h2>Show stats <small>· the numbers, labelled</small></h2><div class="nut">' + p.metrics.map(function (m) { return "<div><b>" + esc(m.v) + "</b><span>" + esc(m.l) + "</span>" + provChip(m.p) + "</div>"; }).join("") + "</div></section>" +
      gallery(p) +
      '<section class="box why"><h2>' + I.spark + "Why this matters at Pocket FM</h2><p>" + esc(p.pfm) + "</p></section></div>" +
      (sim.length ? rail("r-sim", "More like this", sim) : "") + "</div>";
  }

  /* ---------------- STUDIO (PhonePe) ---------------- */
  function vStudio() {
    var pp = D.products.filter(function (p) { return p.seller === "phonepe"; });
    var mgr = D.orders.filter(function (o) { return o.org === "PhonePe"; });
    return '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a>' + I.chev + "<span>PhonePe Originals</span></nav>" +
      '<section class="bh"><img src="assets/logos/phonepe.svg" alt="PhonePe logo"><div><span class="kick">STUDIO · 2 SEASONS</span><h1>PhonePe Originals</h1><p>Cards &amp; NetBanking · ₹500+ Cr TPV travel merchants · Jun 2023 – Jun 2025 · Bengaluru</p></div>' +
      '<div class="bh-s"><div><b>₹15 Cr+</b><span>recovered</span></div><div><b>₹8 Cr</b><span>saved a year</span></div><div><b>+4 pp</b><span>payment success</span></div><div><b>95%</b><span>traffic migrated in 3 mo</span></div></div></section>' +
      '<section class="sec"><div class="sec-h"><h2>All shows (' + pp.length + ')</h2></div><div class="grid">' + pp.map(card).join("") + "</div></section>" +
      '<section class="sec"><div class="sec-h"><h2>The seasons</h2></div><div class="mgr">' + mgr.map(function (o) {
        return '<div class="box"><div class="mgr-h"><img src="' + o.logo + '" alt=""><div><b>' + esc(o.title) + "</b><span>" + esc(o.when) + " · " + esc(o.where) + '</span></div></div><p>' + esc(o.body) + '</p><div class="bul">' + o.bullets.map(function (b) { return "<div><b>" + esc(b[0]) + "</b><span>" + esc(b[1]) + "</span></div>"; }).join("") + "</div></div>";
      }).join("") + "</div></section>" + coinBlock() +
      '<p class="fine" style="margin:0 0 40px">Figures are as stated on my CV. Underlying transaction data and internal documents are PhonePe\'s and are not reproduced.</p></div>';
  }

  /* ---------------- LIBRARY ---------------- */
  function vLibrary() {
    var l = S.lib.map(function (id) { return byId[id]; }), h = S.hist.map(function (id) { return byId[id]; });
    var pop = ["perfora", "pp-routing", "wowworld", "h2h", "prolectro", "reconos"].map(function (id) { return byId[id]; });
    return '<div class="wrap"><h1 class="ph">Library</h1><p class="mut">Shows you saved and shows you\'ve played. Kept in this browser only.</p>' +
      (l.length ? '<section class="sec"><div class="sec-h"><div><h2>Saved shows (' + l.length + ')</h2></div><button class="btn pk" data-act="hire">' + I.unlock + "Talk about these</button></div><div class=\"grid\">" + l.map(card).join("") + "</div></section>"
        : emptyState("Your library is empty", "Tap + on any show to save it, then bring the list to an interview.", "#/shows/all", "Browse shows")) +
      (h.length ? rail("r-hist", "Recently played", h) : "") +
      (l.length ? "" : rail("r-pop", "Popular right now", pop)) + "</div>";
  }

  /* ---------------- STORE (hire) ---------------- */
  var PACKS = [
    { id: "intro", c: "15", t: "Intro call", d: "15 minutes · who I am, why Pocket FM", tag: "" },
    { id: "deep", c: "45", t: "Case deep-dive", d: "45 minutes · pick shows from your library", tag: "POPULAR" },
    { id: "loop", c: "∞", t: "Full interview loop", d: "As many rounds as you need", tag: "" },
    { id: "hire", c: "1", t: "Hire Navya", d: "One growth manager · immediate joiner", tag: "BEST VALUE" }
  ];
  var ROLES = ["Growth Manager", "Associate Growth Manager", "Growth — UA & Payback", "Growth — Monetisation & Pricing", "Growth — Retention & CRM", "Product Manager — Payments"];
  function vStore() {
    var l = S.lib.map(function (id) { return byId[id]; }), pk = PACKS.filter(function (x) { return x.id === S.pack; })[0];
    return '<div class="wrap narrow"><section class="st-hero"><span class="kick">' + I.coin + "STORE</span><h1>Your next episode is waiting.</h1><p>Pick a pack to keep listening, in person. Every pack costs 0 coins, and you're already on the web store, so there's no app-store fee either.</p></section>" +
      '<div class="packs" role="radiogroup" aria-label="Packs">' + PACKS.map(function (x) {
        return '<button class="pack' + (x.id === S.pack ? " on" : "") + '" role="radio" aria-checked="' + (x.id === S.pack) + '" data-act="pack" data-k="' + x.id + '">' + (x.tag ? '<em>' + x.tag + "</em>" : "") + '<span class="pk-c">' + I.coin + "<b>" + x.c + '</b></span><b class="pk-t">' + esc(x.t) + "</b><span>" + esc(x.d) + '</span><span class="pk-p"><s>₹' + (x.id === "hire" ? "∞" : "499") + "</s> ₹0</span></button>";
      }).join("") + "</div>" +
      '<div class="ct"><div>' + (l.length ? '<div class="box"><h2>Shows to discuss (' + l.length + ")</h2>" + l.map(function (p) { return '<div class="it"><a href="#/show/' + p.id + '" class="it-a">' + cover(p) + '</a><div class="it-t"><a href="#/show/' + p.id + '"><b>' + esc(p.short) + "</b></a><span>" + esc(p.price.v + " " + p.price.u) + "</span>" + provChip(p.price.prov) + "</div>" + libBtn(p, "sm") + "</div>"; }).join("") + '<a class="more" href="#/shows/all">+ Add more shows</a></div>'
        : '<div class="box empty-s"><b>No shows saved yet</b><span>Optional: save shows with + and they\'ll be attached to your request.</span><a class="btn ghost" href="#/shows/all">Browse shows</a></div>') + "</div>" +
      '<aside><div class="box bill"><h2>Bill details</h2>' +
      '<div class="br"><span>' + esc(pk.t) + "</span><b>₹0</b></div>" +
      '<div class="br"><span>App-store commission</span><b><s>30%</s> <em>0%</em></b></div>' +
      '<div class="br"><span>Web-store bonus</span><b class="g">+25% enthusiasm</b></div>' +
      '<div class="br"><label for="roleSel">Role</label><select id="roleSel" data-act="role">' + ROLES.map(function (r) { return "<option" + (r === S.role ? " selected" : "") + ">" + r + "</option>"; }).join("") + "</select></div>" +
      '<div class="br"><span>Interview rounds</span><span class="stp"><button data-act="rounds" data-k="-1" aria-label="Fewer rounds">−</button><b id="rOut">' + S.rounds + '</b><button data-act="rounds" data-k="1" aria-label="More rounds">+</button></span></div>' +
      '<div class="br tot"><span>To pay</span><b>₹0</b></div></div>' +
      '<div class="box addr">' + I.pin + "<div><b>Navya is in Gurgaon</b><span>Open to relocating to Bengaluru</span></div></div>" +
      '<button class="btn play lg block" data-act="hire">' + I.unlock + "Unlock · Pay ₹0</button><p class=\"fine c\">Opens an email with your role and saved shows filled in. Nothing is sent until you hit send.</p></aside></div>" +
      coinBlock() + "</div>";
  }

  /* ---------------- PROFILE (author page + seasons) ---------------- */
  function vProfile(qs) {
    var open = qs.o || "";
    return '<div class="wrap"><section class="au"><div class="au-i"><img src="assets/portrait.jpg" alt="Navya Juneja"></div><div class="au-t"><span class="kick">' + I.quill + "AUTHOR</span><h1>" + esc(P.name) + '</h1><p class="role">' + esc(P.role) + " · Writer from India · " + esc(P.location) + "</p>" +
      '<div class="au-s"><div><b>' + D.products.length + "</b><span>shows</span></div><div><b>" + D.orders.length + "</b><span>seasons</span></div><div><b>~3 yrs</b><span>on air</span></div><div><b>0</b><span>coins to unlock</span></div></div>" +
      '<div class="au-cta"><button class="btn play" data-act="hire">' + I.mail + 'Hire Navya</button><a class="btn ghost" href="' + P.resume + '" download>' + I.doc + "Résumé</a></div></div></section>" +
      '<div class="pf"><div><section class="sec"><div class="sec-h"><div><h2>Seasons</h2><p>Experience and education, most recent first.</p></div></div><div class="ol">' + D.orders.map(function (o, i) {
        return '<div class="oc' + (open === o.id ? " open" : "") + '" id="o-' + o.id + '"><button class="oc-r" data-act="otoggle" data-id="' + o.id + '" aria-expanded="' + (open === o.id) + '"><img src="' + o.logo + '" alt=""><span class="oc-t"><span class="st ' + (o.status === "ongoing" ? "on" : "") + '">Season ' + (D.orders.length - i) + " · " + esc(o.status === "ongoing" ? "Now streaming" : "Completed") + "</span><b>" + esc(o.org) + '</b><span class="t">' + esc(o.title) + '</span><span class="w">' + esc(o.when) + " · " + esc(o.where) + "</span></span>" + I.chevD + "</button>" +
          '<div class="oc-b"><p>' + esc(o.body) + "</p>" +
          (o.bullets ? '<div class="bul">' + o.bullets.map(function (b) { return "<div><b>" + esc(b[0]) + "</b><span>" + esc(b[1]) + "</span></div>"; }).join("") + "</div>" : "") +
          (o.track ? '<div class="track">' + o.track.map(function (t) { return "<div><i></i><b>" + esc(t[0]) + "</b><span>" + esc(t[1]) + "</span></div>"; }).join("") + "</div>" : "") +
          (o.related ? '<div class="rel"><small>Episodes from this season</small>' + o.related.map(function (r) { return '<a class="fc" href="#/show/' + r + '">' + esc(byId[r].short) + " " + I.chev + "</a>"; }).join("") + "</div>" : "") + "</div></div>";
      }).join("") + "</div></section>" +
      '<section class="sec"><div class="sec-h"><h2>Certifications</h2></div><div class="oc2">' + D.certs.map(function (c) { return "<div><b>" + esc(c[0]) + "</b><span>" + esc(c[1]) + "</span></div>"; }).join("") + "</div></section>" +
      habitsBlock("How I work") +
      '<section class="sec"><div class="sec-h"><div><h2>Off air</h2><p>Outside work, mostly on stage.</p></div></div><div class="menu">' + D.offclock.map(function (o) { return "<div><b>" + esc(o[0]) + "</b><span>" + esc(o[1]) + "</span></div>"; }).join("") + "</div></section>" +
      '<section class="sec"><div class="sec-h"><h2>Help &amp; support</h2></div><div class="faq">' + D.faq.map(function (f, i) { return "<details" + (i ? "" : " open") + "><summary>" + esc(f[0]) + I.chevD + "</summary><p>" + esc(f[1]) + "</p></details>"; }).join("") + "</div></section></div>" +
      '<aside class="box pcard"><h2>Contact</h2><div class="cls">' +
      '<a href="mailto:' + P.email + '">' + I.mail + "<span>" + esc(P.email) + "</span></a>" +
      '<a href="' + P.phoneHref + '">' + I.phone + "<span>" + esc(P.phone) + "</span></a>" +
      '<a href="' + P.linkedin + '" target="_blank" rel="noopener">' + I.linkedin + "<span>" + esc(P.linkedinShort) + "</span>" + I.ext + "</a>" +
      '<a href="' + P.resume + '" download>' + I.doc + "<span>Résumé (PDF)</span><small>Download</small></a>" +
      '<a href="' + P.portfolio + '" target="_blank" rel="noopener">' + I.globe + "<span>Main portfolio</span>" + I.ext + "</a></div>" +
      '<div class="qr"><img src="assets/qr-linkedin.svg" alt="QR code to Navya\'s LinkedIn"><span><b>Scan to connect</b>LinkedIn</span></div>' +
      '<div class="qa"><a href="#/library">' + I.lib + "Library</a><a href=\"#/store\">" + I.coin + "Store</a><a href=\"#/studio/phonepe\">" + I.star + "PhonePe Originals</a></div></aside></div></div>";
  }
  function emptyState(h, p, href, cta, act) {
    return '<div class="empty"><div class="ei">' + I.head + "</div><h2>" + esc(h) + "</h2><p>" + esc(p) + "</p>" + (act ? '<button class="btn pk" data-act="' + act + '">' + esc(cta) + "</button>" : '<a class="btn pk" href="' + href + '">' + esc(cta) + "</a>") + "</div>";
  }
  function vNotFound() { return '<div class="wrap">' + emptyState("This episode doesn't exist", "That link doesn't lead anywhere. Let's get you back to the library.", "#/", "Go home") + "</div>"; }

  /* ---------------- SHELL ---------------- */
  var NAV = [["#/", "Home", "home", ""], ["#/shows/all", "Shows", "compass", "shows"], ["#/library", "Library", "lib", "library"], ["#/store", "Store", "coin", "store"], ["#/profile", "Profile", "user", "profile"]];
  function renderShell() {
    var cc = S.lib.length, cnt = cc ? '<span class="cnt">' + cc + "</span>" : "";
    $("#promo").innerHTML = S.promo ? '<div class="promo-in"><a href="#/store" class="promo-t"><b>GET 100% FREE FIRST CALL</b><small>ONLY ON THIS WEBSITE</small></a><a class="promo-b" href="#/store">Visit Store</a><button class="promo-x" data-act="promo" aria-label="Close banner">' + I.x + "</button></div>" : "";
    $("#hdr").innerHTML = '<div class="wrap hdr-in">' + logo() +
      '<nav class="pills" aria-label="Main">' + NAV.slice(0, 4).map(function (n) { return '<a href="' + n[0] + '" data-nav="' + n[3] + '">' + I[n[2]] + "<span>" + n[1] + "</span>" + (n[3] === "library" ? cnt : "") + "</a>"; }).join("") + "</nav>" +
      searchBox("q1") +
      '<a class="lang" href="' + P.resume + '" download>' + I.doc + "<span>Résumé</span></a>" +
      '<a class="login" href="#/profile" data-nav="profile"><img src="assets/portrait.jpg" alt=""><span>Navya</span></a>' +
      '<button class="ib bare msb" data-act="msearch" aria-label="Search">' + I.search + "</button></div>";
    $("#bnav").innerHTML = NAV.map(function (n) { return '<a href="' + n[0] + '" data-nav="' + n[3] + '">' + I[n[2]] + (n[3] === "library" && cc ? '<span class="cnt">' + cc + "</span>" : "") + "<span>" + n[1] + "</span></a>"; }).join("");
    document.body.classList.toggle("has-promo", !!S.promo);
    markNav();
  }
  function searchBox(id) {
    return '<div class="srch"><form data-act="searchform" role="search"><span aria-hidden="true">' + I.search + '</span><input id="' + id + '" data-q type="search" autocomplete="off" placeholder="Search for “pricing”" aria-label="Search shows" aria-controls="' + id + 'd" value="' + esc(S.f.q) + '"></form><div class="sdrop" id="' + id + 'd" role="listbox"></div></div>';
  }
  function results(q) {
    q = q.trim().toLowerCase();
    var list = q ? D.products.filter(function (p) { return (p.name + " " + p.short + " " + p.code + " " + p.kind + " " + p.cats.join(" ") + " " + seller(p).name).toLowerCase().indexOf(q) > -1; }) : ["perfora", "pp-routing", "wowworld", "prolectro", "h2h"].map(function (id) { return byId[id]; });
    var cats = q ? D.cats.filter(function (c) { return c.name.toLowerCase().indexOf(q) > -1; }) : [];
    if (!list.length && !cats.length) return '<div class="sempty">No shows for “' + esc(q) + '”. Try “pricing”, “retention” or “PhonePe”.</div>';
    return (q ? "<h5>Shows</h5>" : "<h5>Trending searches</h5>") + list.slice(0, 7).map(function (p, i) {
      return '<a class="sres' + (i ? "" : " act") + '" href="#/show/' + p.id + '"><span class="sa">' + cover(p) + '</span><span class="tx"><b>' + esc(p.short) + "</b><span>" + esc(genre(p)) + " · " + esc(p.kind) + '</span></span><span class="pr"><b>' + esc(p.price.v) + "</b><small>" + esc(D.prov[p.price.prov].label) + "</small></span></a>";
    }).join("") + (cats.length ? "<h5>Genres</h5>" + cats.map(function (c) { return '<a class="sres" href="#/shows/' + c.id + '"><span class="sa g">' + I.compass + '</span><span class="tx"><b>' + esc(c.name) + "</b></span></a>"; }).join("") : "");
  }
  function markNav() {
    var r = parse(), p = r.parts[0] || "";
    if (p === "show" || p === "studio") p = "shows";
    $$("[data-nav]").forEach(function (a) { var on = a.getAttribute("data-nav") === p; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  }
  function renderFooter() {
    $("#ftr").innerHTML = '<div class="wrap ftr-in"><div class="ftr-l">' + logo() + "<p>A growth portfolio built in the image of an audio-drama app, for Pocket FM Growth Manager applications. " + esc(P.name) + " · " + esc(P.role) + ".</p></div>" +
      '<div><h4>Genres</h4><ul><li><a href="#/shows/growth">Growth &amp; Funnels</a></li><li><a href="#/shows/pricing">Pricing &amp; Monetisation</a></li><li><a href="#/shows/retention">Retention &amp; Win-back</a></li><li><a href="#/shows/payments">Payments &amp; Checkout</a></li><li><a href="#/studio/phonepe">PhonePe Originals</a></li></ul></div>' +
      '<div><h4>You</h4><ul><li><a href="#/profile">Seasons (experience)</a></li><li><a href="#/library">Library</a></li><li><a href="#/store">Store</a></li><li><a href="' + P.resume + '" download>Résumé (PDF)</a></li></ul></div>' +
      '<div><h4>Contact</h4><ul><li><a href="mailto:' + P.email + '">Email</a></li><li><a href="' + P.linkedin + '" target="_blank" rel="noopener">LinkedIn ↗</a></li><li><a href="' + P.phoneHref + '">' + esc(P.phone) + '</a></li><li><a href="' + P.portfolio + '" target="_blank" rel="noopener">Main portfolio ↗</a></li></ul></div>' +
      '<p class="disc">Independent job-application portfolio. Not affiliated with or endorsed by Pocket FM or PhonePe; brand names belong to their owners and are used only to refer to the role and past employment. The logo mark is an original drawing. Nothing here is for sale: the "plays" are each case\'s headline number, the coins are a joke, and every figure is labelled Result, Built, Modelled, Target or Sourced. Audio uses your browser\'s built-in text-to-speech.</p></div>';
  }

  /* ---------------- PLAYER (browser text-to-speech) ---------------- */
  var TTS = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  var PL = { id: null, i: 0, on: false, paused: false, tok: 0, n: 0, k: 0 };
  function voice() {
    if (!TTS) return null; var v = speechSynthesis.getVoices();
    return v.filter(function (x) { return /en-IN/i.test(x.lang); })[0] || v.filter(function (x) { return /en-GB/i.test(x.lang); })[0] || v.filter(function (x) { return /^en/i.test(x.lang); })[0] || null;
  }
  function chunks(t) { var out = [], cur = ""; t.replace(/\s+/g, " ").split(/(?<=[.!?:])\s+/).forEach(function (s) { if ((cur + " " + s).length > 220 && cur) { out.push(cur); cur = s; } else cur = cur ? cur + " " + s : s; }); if (cur) out.push(cur); return out; }
  function speakText(text, onDone) {
    speechSynthesis.cancel(); var tok = ++PL.tok, parts = chunks(text), v = voice();
    PL.n = parts.length; PL.k = 0;
    parts.forEach(function (c, j) {
      var u = new SpeechSynthesisUtterance(c); if (v) u.voice = v; u.lang = v ? v.lang : "en-IN"; u.rate = 1.02;
      u.onstart = function () { if (tok === PL.tok) { PL.k = j; progress(); } };
      if (j === parts.length - 1) u.onend = function () { if (tok === PL.tok && onDone) onDone(); };
      speechSynthesis.speak(u);
    });
  }
  function play(id, i) {
    var p = byId[id], eps = episodes(p);
    if (PL.id === id && PL.i === i && PL.on) { togglePause(); return; }
    if (!TTS) { var ep = $("#ep-" + i); if (ep) { ep.classList.add("open"); ep.scrollIntoView({ block: "center", behavior: "smooth" }); } toast("Audio isn't available in this browser, so it's in reading mode."); return; }
    PL.id = id; PL.i = i; PL.on = true; PL.paused = false;
    addHist(id);
    var e = eps[i], intro = i === 0 ? p.short + ". Episode 1. " : "Episode " + (i + 1) + ". ";
    speakText(intro + e.t + ". " + e.x, function () { if (i + 1 < eps.length) play(id, i + 1); else { PL.on = false; renderPlayer(); syncShow(); toast("Series finished. Next up: the Store"); } });
    renderPlayer(); syncShow();
  }
  function trailer() {
    if (!TTS) { location.hash = "#/profile"; return; }
    PL.id = "_trailer"; PL.i = 0; PL.on = true; PL.paused = false;
    speakText("Previously, on the Navya Juneja Show. Two years inside PhonePe's payment rails: eight crore rupees a year saved through routing, fifteen crore recovered from reconciliation, and four points more payment success. Then a plan to double a D2C brand's website revenue by fixing leaks instead of buying more traffic, pitched to its CEO. A pricing ladder from a ten rupee sachet. A product taken from sixty-five to three hundred sign-ups through the funnel. This season: Pocket FM. Every number on this page is labelled with where it came from. Press play on any show to keep listening.", function () { PL.on = false; renderPlayer(); });
    renderPlayer();
  }
  function togglePause() {
    if (!PL.on) return;
    if (PL.paused) { speechSynthesis.resume(); PL.paused = false; } else { speechSynthesis.pause(); PL.paused = true; }
    renderPlayer(); syncShow();
  }
  function stopPlay() { PL.tok++; if (TTS) speechSynthesis.cancel(); PL.on = false; PL.paused = false; PL.id = null; renderPlayer(); syncShow(); }
  function progress() { var b = $("#plBar"); if (b) b.style.width = Math.round((PL.k + 1) / Math.max(1, PL.n) * 100) + "%"; }
  function renderPlayer() {
    var el = $("#player");
    if (!PL.on) { el.classList.remove("on"); document.body.classList.remove("has-player"); return; }
    var tr = PL.id === "_trailer", p = byId[PL.id], eps = tr ? [] : episodes(p);
    el.innerHTML = '<div class="pl-in"><a class="pl-cv" href="' + (tr ? "#/profile" : "#/show/" + p.id) + '">' + (tr ? '<img src="assets/portrait.jpg" alt="">' : cover(p)) + '</a><a class="pl-tx" href="' + (tr ? "#/profile" : "#/show/" + p.id) + '"><b>' + (tr ? "The Navya Juneja Show · Trailer" : esc(p.short)) + "</b><small>" + (tr ? "Season 3" : "Ep " + (PL.i + 1) + " · " + esc(eps[PL.i].t)) + "</small></a>" +
      '<div class="pl-ctl">' + (tr ? "" : '<button class="ib bare" data-act="plprev" aria-label="Previous episode"' + (PL.i ? "" : " disabled") + ">" + I.prev + "</button>") + '<button class="ib pp" data-act="plpause" aria-label="' + (PL.paused ? "Resume" : "Pause") + '">' + (PL.paused ? I.play : I.pause) + "</button>" + (tr ? "" : '<button class="ib bare" data-act="plnext" aria-label="Next episode"' + (PL.i + 1 < eps.length ? "" : " disabled") + ">" + I.next + "</button>") + '<button class="ib bare" data-act="plstop" aria-label="Close player">' + I.x + '</button></div><span class="pl-bar"><i id="plBar"></i></span></div>';
    el.classList.add("on"); document.body.classList.add("has-player"); progress();
  }
  function syncShow() {
    var r = parse(); if (r.parts[0] !== "show") return;
    var y = window.scrollY, open = $$(".ep.open").map(function (e) { return e.id; });
    $("#view").innerHTML = vShow(r.parts[1]); open.forEach(function (id) { var e = document.getElementById(id); if (e) e.classList.add("open"); });
    window.scrollTo(0, y); railNav();
  }
  function addHist(id) { S.hist = [id].concat(S.hist.filter(function (x) { return x !== id; })).slice(0, 8); save("hist", S.hist); }

  /* ---------------- ROUTER ---------------- */
  var lastRoute = "", navCount = 0;
  function parse() {
    var raw = (location.hash || "#/").slice(1), qi = raw.indexOf("?");
    var path = (qi > -1 ? raw.slice(0, qi) : raw) || "/", qs = {};
    if (qi > -1) raw.slice(qi + 1).split("&").forEach(function (kv) { var a = kv.split("="); if (a[0]) qs[decodeURIComponent(a[0])] = decodeURIComponent(a[1] || ""); });
    return { parts: path.split("/").filter(Boolean), qs: qs, path: path };
  }
  function route() {
    var r = parse(), p = r.parts, view, title = "", cls = "r-home";
    if ((p[0] === "pn" || p[0] === "case" || p[0] === "p") && p[1]) { location.replace("#/show/" + p[1]); return; }
    if (p[0] === "cn" || p[0] === "cases" || p[0] === "search") { location.replace("#/shows/" + (p[1] || "all") + (r.qs.q ? "?q=" + encodeURIComponent(r.qs.q) : "")); return; }
    if (p[0] === "orders" || p[0] === "account" || p[0] === "help") { location.replace("#/profile"); return; }
    if (p[0] === "cart") { location.replace("#/store"); return; }
    if (p[0] === "brand") { location.replace("#/studio/phonepe"); return; }
    if (!p.length) { view = vHome(); }
    else if (p[0] === "shows") { var c = p[1] || "all"; if (!D.cats.some(function (x) { return x.id === c; })) c = "all"; if (r.qs.q != null) S.f.q = r.qs.q; view = vShows(c); title = catName(c); cls = "r-shows"; }
    else if (p[0] === "show") { view = vShow(p[1]); title = byId[p[1]] ? byId[p[1]].short : "Not found"; cls = "r-show"; if (byId[p[1]]) addHist(p[1]); }
    else if (p[0] === "studio") { view = vStudio(); title = "PhonePe Originals"; cls = "r-studio"; }
    else if (p[0] === "library") { view = vLibrary(); title = "Library"; cls = "r-library"; }
    else if (p[0] === "store") { view = vStore(); title = "Store"; cls = "r-store"; }
    else if (p[0] === "profile") { view = vProfile(r.qs); title = "Profile"; cls = "r-profile"; }
    else { view = vNotFound(); title = "Not found"; cls = "r-nf"; }
    document.body.className = (document.body.className.replace(/\br-\S+/g, "").trim() + " " + cls).trim();
    var v = $("#view"); v.innerHTML = view; v.classList.remove("view-in"); void v.offsetWidth; v.classList.add("view-in");
    var f = $(".ep"); if (f) f.classList.add("open");
    document.title = (title ? title + " · " : "") + "Pocket FM × navya: Navya Juneja, Growth Manager";
    if (r.path !== lastRoute) { window.scrollTo(0, 0); S.fltOpen = false; }
    lastRoute = r.path;
    markNav(); updCoin(); railNav(); setHdrH();
    if (r.qs.o) { var el = $("#o-" + r.qs.o); if (el) setTimeout(function () { el.scrollIntoView({ block: "center", behavior: "smooth" }); }, 120); }
  }
  function setHdrH() { document.documentElement.style.setProperty("--hdr-h", $("#hdr").offsetHeight + "px"); }
  function rerender() { var y = window.scrollY, open = $$(".ep.open").map(function (e) { return e.id; }); route(); $$(".ep").forEach(function (e) { e.classList.toggle("open", open.indexOf(e.id) > -1); }); window.scrollTo(0, y); }
  function railNav() { $$(".rail").forEach(function (r) { var b = r.parentNode.querySelector(".rnav"); if (b) b.hidden = r.scrollWidth <= r.clientWidth + 4; }); }

  /* ---------------- sheets ---------------- */
  var lastFocus = null;
  function openSheet(html, cls) { lastFocus = document.activeElement; var s = $("#sheet"); s.className = "sheet " + (cls || ""); s.innerHTML = html; requestAnimationFrame(function () { s.classList.add("on"); $("#scrim").classList.add("on"); }); document.body.classList.add("no-scroll"); var f = $("button, a, input", s); if (f) setTimeout(function () { f.focus(); }, 60); }
  function closeSheet() { var s = $("#sheet"); if (!s.classList.contains("on")) return; s.classList.remove("on"); $("#scrim").classList.remove("on"); document.body.classList.remove("no-scroll"); if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {} }
  function sheetHead(h) { return '<div class="sheet-h"><h3>' + esc(h) + '</h3><button class="ib bare" data-act="close" aria-label="Close">' + I.x + "</button></div>"; }
  function hireSheet(id) {
    var items = id && byId[id] ? [byId[id]] : S.lib.map(function (x) { return byId[x]; });
    var pk = PACKS.filter(function (x) { return x.id === S.pack; })[0];
    var subj = "Interview: Navya Juneja, " + S.role + (items.length ? " (re: " + items.map(function (p) { return p.short; }).join(", ") + ")" : "");
    var body = "Hi Navya,\n\nI saw your Pocket FM × navya portfolio" + (items.length ? ", especially " + items.map(function (p) { return p.name; }).join("; ") : "") + ".\nWe'd like to talk about a " + S.role + " role (" + pk.t.toLowerCase() + ", " + S.rounds + " interview round" + (S.rounds > 1 ? "s" : "") + ").\n\n";
    var href = "mailto:" + P.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
    openSheet('<div class="placed"><button class="ib bare cx" data-act="close" aria-label="Close">' + I.x + '</button><div class="ck">' + I.unlock + "</div><h3>Episode unlocked!</h3><p>Paid <b>₹0</b>. No coins were harmed.</p>" +
      '<div class="trk"><div class="on"><i></i><b>' + esc(pk.t) + "</b><span>" + esc(S.role) + " · " + S.rounds + " round" + (S.rounds > 1 ? "s" : "") + '</span></div><div class="on"><i></i><b>Résumé attached</b><span>' + (items.length ? items.length + " saved show" + (items.length === 1 ? "" : "s") + " in the email" : "Every show is linked") + '</span></div><div><i></i><b>Send the email</b><span>Button below, nothing goes until you send</span></div><div><i></i><b>Next episode</b><span>Navya replies within a day</span></div></div>' +
      '<div class="acts"><a class="btn play lg block" href="' + href + '">' + I.mail + 'Send interview request</a><a class="btn ghost block" href="' + P.phoneHref + '">' + I.phone + esc(P.phone) + '</a><a class="btn ghost block" href="' + P.linkedin + '" target="_blank" rel="noopener">' + I.linkedin + "Connect on LinkedIn</a></div></div>", "btm");
  }
  function lightbox(id, i) {
    var p = byId[id], all = galleryItems(p), imgs = all.filter(function (m) { return m.type === "img"; });
    var m = all[i]; if (!m || m.type !== "img") return; var k = imgs.indexOf(m);
    openSheet('<div class="lbx"><img src="' + m.src + '" alt="' + esc(m.alt) + '"><button class="x" data-act="close" aria-label="Close">' + I.x + "</button>" +
      (imgs.length > 1 ? '<button class="nv p" data-act="lbx" data-id="' + id + '" data-k="' + all.indexOf(imgs[(k - 1 + imgs.length) % imgs.length]) + '" aria-label="Previous">' + I.back + '</button><button class="nv n" data-act="lbx" data-id="' + id + '" data-k="' + all.indexOf(imgs[(k + 1) % imgs.length]) + '" aria-label="Next">' + I.chev + "</button>" : "") +
      "<p>" + esc(m.alt) + " · " + (k + 1) + " / " + imgs.length + "</p></div>", "wide");
  }
  function mSearch() {
    openSheet(sheetHead("Search") + '<div class="sheet-b"><div class="srch" style="width:100%;display:block"><form data-act="searchform" role="search"><span aria-hidden="true">' + I.search + '</span><input id="q2" data-q type="search" autocomplete="off" placeholder="Search for “pricing”" aria-label="Search shows"></form></div><div id="q2r" style="margin-top:10px">' + results("") + "</div></div>", "top");
  }

  /* ---------------- toast ---------------- */
  var tt;
  function toast(html) { var el = $("#toast"); el.innerHTML = html; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { el.classList.remove("on"); }, 2600); }

  /* ---------------- actions ---------------- */
  function setLib(id) {
    var i = S.lib.indexOf(id), on = i < 0;
    if (on) S.lib.push(id); else S.lib.splice(i, 1);
    save("lib", S.lib); renderShell(); rerender();
    toast(on ? "Added to Library · " + esc(byId[id].short) + ' <a href="#/library">View</a>' : "Removed from Library");
  }
  function copyLink() {
    var u = location.href;
    function ok() { toast("Link copied"); }
    if (navigator.clipboard) navigator.clipboard.writeText(u).then(ok, function () { toast("Copy this: " + esc(u)); }); else toast("Copy this: " + esc(u));
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]"); if (!el) return;
    var a = el.getAttribute("data-act"), id = el.getAttribute("data-id"), k = el.getAttribute("data-k");
    switch (a) {
      case "lib": e.preventDefault(); e.stopPropagation(); setLib(id); break;
      case "hire": e.preventDefault(); hireSheet(parse().parts[0] === "show" ? parse().parts[1] : null); break;
      case "play": e.preventDefault(); play(id, +k); break;
      case "trailer": trailer(); break;
      case "plpause": togglePause(); break;
      case "plnext": if (PL.id && PL.id !== "_trailer") play(PL.id, PL.i + 1); break;
      case "plprev": if (PL.id && PL.id !== "_trailer" && PL.i) play(PL.id, PL.i - 1); break;
      case "plstop": stopPlay(); break;
      case "ep": var ep = $("#ep-" + k), op = ep.classList.toggle("open"); el.setAttribute("aria-expanded", op); break;
      case "close": closeSheet(); break;
      case "promo": S.promo = false; save("promo", false); renderShell(); setHdrH(); break;
      case "mv": S.mv = k; var m = $("#fresh"); if (m) { m.outerHTML = evidence(); railNav(); } break;
      case "rail": var r = document.getElementById(k); if (r) r.scrollBy({ left: r.clientWidth * 0.8, behavior: "smooth" }); break;
      case "gi": GI[id] = +k; var g = $("#gal"); if (g) g.outerHTML = gallery(byId[id]); break;
      case "rounds": S.rounds = Math.max(1, Math.min(6, S.rounds + (+k))); $("#rOut").textContent = S.rounds; break;
      case "pack": S.pack = k; rerender(); break;
      case "route": CR = k; $$("[data-act=route]").forEach(function (b) { var on = b.getAttribute("data-k") === k; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); }); updCoin(); break;
      case "share": if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(function () {}); else copyLink(); break;
      case "lbx": lightbox(id, +k); break;
      case "otoggle": var o = $("#o-" + id), oo = o.classList.toggle("open"); el.setAttribute("aria-expanded", oo); break;
      case "flt": S.fltOpen = !S.fltOpen; var f = $(".flt"); if (f) f.classList.toggle("on", S.fltOpen); el.setAttribute("aria-expanded", S.fltOpen); break;
      case "clr": S.f = { sort: S.f.sort, seller: [], prov: [], q: "" }; $$("[data-q]").forEach(function (i) { i.value = ""; }); if (location.hash.indexOf("?") > -1) location.hash = "#/shows/all"; else rerender(); break;
      case "clrq": S.f.q = ""; $$("[data-q]").forEach(function (i) { i.value = ""; }); if (location.hash.indexOf("?") > -1) location.hash = "#/shows/all"; else rerender(); break;
      case "msearch": mSearch(); break;
    }
  });
  document.addEventListener("change", function (e) {
    var el = e.target, a = el.getAttribute("data-act");
    if (a === "sort") { S.f.sort = el.value; rerender(); }
    if (a === "role") { S.role = el.value; }
    if (a === "chk") { var k = el.getAttribute("data-k"), arr = S.f[k], ix = arr.indexOf(el.value); if (el.checked && ix < 0) arr.push(el.value); if (!el.checked && ix > -1) arr.splice(ix, 1); S.fltOpen = true; rerender(); }
  });
  function showDrop(inp) {
    if (inp.id === "q2") { $("#q2r").innerHTML = results(inp.value); return; }
    var d = $("#" + inp.id + "d"); if (!d) return; d.innerHTML = results(inp.value); d.classList.add("on");
  }
  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.hasAttribute("data-q")) showDrop(el);
    if (el.getAttribute("data-act") === "coin") updCoin();
  });
  document.addEventListener("focusin", function (e) { if (e.target.hasAttribute && e.target.hasAttribute("data-q") && e.target.id !== "q2") showDrop(e.target); });
  document.addEventListener("mousedown", function (e) { if (!e.target.closest(".srch")) $$(".sdrop").forEach(function (d) { d.classList.remove("on"); }); });
  document.addEventListener("submit", function (e) {
    if (e.target.getAttribute("data-act") === "searchform") {
      e.preventDefault(); var i = $("input", e.target); S.f.q = i.value; i.blur();
      $$(".sdrop").forEach(function (d) { d.classList.remove("on"); }); closeSheet();
      var target = "#/shows/all" + (i.value ? "?q=" + encodeURIComponent(i.value) : "");
      if (location.hash === target) rerender(); else location.hash = target;
    }
  });
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); var q = $("#q1"); if (q && q.offsetParent) q.focus(); else mSearch(); }
    if (e.key === "Escape") { closeSheet(); $$(".sdrop").forEach(function (d) { d.classList.remove("on"); }); }
    if (e.target.hasAttribute && e.target.hasAttribute("data-q") && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      var box = e.target.id === "q2" ? $("#q2r") : $("#" + e.target.id + "d"); if (!box) return;
      var it = $$(".sres", box), cur = it.findIndex(function (x) { return x.classList.contains("act"); });
      if (!it.length) return; e.preventDefault();
      var nx = (cur + (e.key === "ArrowDown" ? 1 : -1) + it.length) % it.length;
      it.forEach(function (x, j) { x.classList.toggle("act", j === nx); });
    }
    if (e.target.hasAttribute && e.target.hasAttribute("data-q") && e.key === "Enter") {
      var b = e.target.id === "q2" ? $("#q2r") : $("#" + e.target.id + "d"), act = b && $(".sres.act", b);
      if (act && e.target.value.trim()) { e.preventDefault(); e.target.blur(); $$(".sdrop").forEach(function (d) { d.classList.remove("on"); }); closeSheet(); location.hash = act.getAttribute("href"); }
    }
  });
  $("#scrim").addEventListener("click", closeSheet);
  window.addEventListener("hashchange", function () { navCount++; closeSheet(); $$(".sdrop").forEach(function (d) { d.classList.remove("on"); }); route(); });
  window.addEventListener("resize", function () { railNav(); setHdrH(); });
  window.addEventListener("scroll", function () { document.body.classList.toggle("scrolled", window.scrollY > 8); }, { passive: true });
  window.addEventListener("beforeunload", function () { if (TTS) speechSynthesis.cancel(); });
  if (TTS && speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = function () {};

  /* rotating placeholder */
  var phs = ["pricing", "retention", "PhonePe", "funnels", "payments", "win-back"], phi = 0;
  setInterval(function () { phi = (phi + 1) % phs.length; $$("[data-q]").forEach(function (i) { if (document.activeElement !== i) i.placeholder = "Search for “" + phs[phi] + "”"; }); }, 2600);

  /* ---------------- SPLASH ---------------- */
  function splash() {
    var sp = $("#splash"); if (!sp) return;
    var seen = false; try { seen = sessionStorage.getItem("pfn_seen") === "1"; } catch (e) {}
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dur = seen ? 900 : (reduce ? 900 : 3000), done = false;
    if (seen) sp.classList.add("fast");
    function end() { if (done) return; done = true; sp.classList.add("out"); document.body.classList.remove("no-scroll"); setTimeout(function () { sp.classList.add("gone"); sp.setAttribute("aria-hidden", "true"); }, 600); try { sessionStorage.setItem("pfn_seen", "1"); } catch (e) {} }
    document.body.classList.add("no-scroll");
    $("#spSkip").addEventListener("click", end);
    sp.addEventListener("click", function (e) { if (e.target.id !== "spSkip") end(); });
    setTimeout(end, dur);
  }

  /* ---------------- boot ---------------- */
  renderShell(); renderFooter(); route(); splash();
})();
