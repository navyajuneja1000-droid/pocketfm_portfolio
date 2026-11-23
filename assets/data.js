/* =========================================================
   Navya Juneja · portfolio content, written for Pocket FM growth roles
   Every figure carries a provenance label:
   result = achieved · built = shipped/working · modelled = my assumption
   target = success criterion · sourced = external / survey, cited
   ========================================================= */
window.NJ = {
  person: {
    name: "Navya Juneja",
    role: "Growth & Product",
    location: "Gurgaon, India · open to relocating",
    email: "navyajuneja1000@gmail.com",
    phone: "+91 85568 17288",
    phoneHref: "tel:+918556817288",
    linkedin: "https://www.linkedin.com/in/junejanavya/",
    linkedinShort: "linkedin.com/in/junejanavya",
    resume: "Navya_Juneja_Resume.pdf",
    portfolio: "https://personalportfolio-lilac-tau.vercel.app/"
  },

  prov: {
    result:   { label: "Result",   tip: "Achieved" },
    built:    { label: "Built",    tip: "Working product you can open" },
    modelled: { label: "Modelled", tip: "My assumption, stated" },
    target:   { label: "Target",   tip: "Success criterion" },
    sourced:  { label: "Sourced",  tip: "External or survey data, cited" }
  },

  sellers: {
    phonepe: { name: "PhonePe", sub: "Payments · Jun 2023 – Jun 2025", logo: "assets/logos/phonepe.svg", original: true },
    cogent:  { name: "Cogent Infotech", sub: "Product Development · Aug 2025 – Jun 2026", logo: "assets/logos/cogent.svg" },
    mu:      { name: "Masters' Union", sub: "PGP-TBM · team ventures", logo: "assets/logos/masters-union.svg" },
    navya:   { name: "Navya Juneja", sub: "Independent builds", logo: "assets/logos/navya.svg" }
  },

  cats: [
    { id: "all",       name: "All shows" },
    { id: "growth",    name: "Growth & Funnels" },
    { id: "pricing",   name: "Pricing & Monetisation" },
    { id: "retention", name: "Retention & Win-back" },
    { id: "payments",  name: "Payments & Checkout" },
    { id: "build",     name: "0→1 Builds" },
    { id: "d2c",       name: "D2C & Ventures" },
    { id: "live",      name: "Live Builds" },
    { id: "phonepe",   name: "PhonePe Originals" }
  ],

  /* ---------------- PRODUCTS (case studies + PhonePe wins) ---------------- */
  products: [
    {
      id: "reconos", code: "CASE-01", seller: "navya", cats: ["payments",  "build",  "d2c"],
      name: "ReconOS — Revenue recovery for D2C brands",
      short: "ReconOS", kind: "Shipped product", badge: "Live", date: "Oct 2026 – present", sort: 202610,
      price: { v: "17", u: "leakage checks", strike: "", off: "57 engine tests", prov: "built" },
      hook: "Traces every order from sale to bank — and writes the claim email.",
      poster: { bg: "#2A0E2E", fg: "#FFE0F2", accent: "#F43397", big: "17", small: "leakage checks · 6 gateways · 9 couriers" },
      media: [
        { type: "video", src: "assets/work/reconos-teaser.mp4", poster: "assets/work/reconos-teaser-poster.jpg", alt: "ReconOS, 30-second product teaser" }
      ],
      links: [{ t: "Open reconos.in", u: "https://www.reconos.in" }],
      pfm: "Every coin top-up is a payment that has to land: store payouts net of commission, web-store gateway settlements, refunds and chargebacks across 20+ countries. ReconOS is that discipline (trace each rupee from purchase to bank), and it's the same instinct that asks whether the revenue a growth dashboard reports is the revenue that actually settled.",
      summary: {
        problem: "D2C brands pay a payment gateway and a courier for every order. Both deduct their own fees, and nobody checks either against the agreed rate card. A ₹14 overcharge on one shipment is invisible; across a month of orders it is a salary.",
        did: "A browser-based audit. Drop in last month's exports and the rate cards, and every order is traced from sale to bank, with a claim email ready to send.",
        landed: "Live at reconos.in and in early access. No customers or recovered amounts yet — and the page says so."
      },
      details: [
        ["My role", "Problem definition, scope, the checks themselves, pricing, and the build"],
        ["Output", "Working product, 57 engine tests, live site, early-access sign-up"],
        ["Category", "Revenue recovery for Indian Shopify D2C brands · Live MVP"],
        ["When", "October 2026 – present"]
      ],
      metrics: [
        { v: "6 + 9", l: "gateways and couriers supported by name", p: "built" },
        { v: "17", l: "leakage checks in five families", p: "built" },
        { v: "57", l: "engine tests — one fails if a planted leak is missed or a clean order is flagged", p: "built" }
      ],
      sections: [
        { h: "The pivot: narrowing the buyer made it buildable",
          p: "The first scope was transaction-level reconciliation for merchants doing ₹100 Cr of online GMV. The problem was real; the buyer was wrong. That merchant has a finance team — a slow, committee-shaped sale — and for them the gateway is only half the leak. In Indian D2C the courier takes more money than the gateway does. So the scope moved: one platform (Shopify), one buyer (the founder), both sides of the leak.",
          compare: [["Before", "Mid-market merchants, gateway reconciliation, a finance team as buyer."], ["Now", "D2C brands on Shopify, courier and gateway, the founder as buyer, a free first audit."]] },
        { h: "Where the money goes missing",
          list: ["COD never remitted", "Shipping above the rate card", "COD fee on prepaid orders", "Return charges on delivered orders", "Weight disputes past their deadline", "Gateway fee above the rate card", "Wrong GST on the fee", "Paid but never settled"] },
        { h: "How it works",
          steps: [["Drop in last month's files", "CSV or Excel exports from Shopify, every gateway and every courier — each recognised and matched to its partner."], ["Confirm the rate cards", "What the brand agreed to pay each partner. Without it there is nothing to compare against."], ["Audit, then claim", "Every order traced from sale to partner to bank, every finding carrying its evidence, and a ready-to-send email per partner."]] },
        { h: "The decision worth defending: Claim vs Check",
          p: "A tool that tells a founder to argue with their courier is only useful if it is right. 'Claim' means the brand's own files prove it. 'Check' means something does not add up but cannot be proven from the files alone. When a gateway file doesn't say credit or debit, the fee is checked against the highest rate it could have been — deliberately under-claiming. Finding less, and being right about it, is the product." },
        { h: "The adoption problem: nobody types in rate cards",
          p: "The audit cannot run without rate cards, and asking a founder to type zone-and-weight pricing for four partners is where tools like this quietly die. So ReconOS pre-fills each rate card from what the brand was actually charged most often, and reads the real one from whatever form it exists in — a PDF, a screenshot, an Excel sheet or pasted email text. Screenshots are read on the device; files never leave the browser." }
      ]
    },

    {
      id: "perfora", code: "CASE-02", seller: "mu", cats: ["growth",  "retention",  "payments"],
      name: "Perfora — doubling website revenue from ₹3 Cr to ₹6 Cr a month",
      short: "Perfora growth plan", kind: "Growth strategy · pitched to the CEO", badge: "Pitched to CEO", date: "2026", sort: 202611,
      price: { v: "₹6 Cr", u: "monthly website revenue target", strike: "₹3 Cr", off: "70% from fixing leaks", prov: "target" },
      hook: "More ad spend won't break the ₹3 Cr ceiling: the brand was losing customers at checkout, at the doorstep and after the first order.",
      poster: { bg: "#E9F7FF", fg: "#0B3B5C", accent: "#1BA1E2", big: "₹3 → ₹6 Cr", small: "monthly revenue plan · RTO, checkout, repeat" },
      media: [
        { type: "img", src: "assets/work/perfora-slide-1.jpg", alt: "Slide 1: diagnosis — funnel leaks, ad payback and four root causes" },
        { type: "img", src: "assets/work/perfora-slide-2.jpg", alt: "Slide 2: growth bridge from ₹3 Cr to ₹6 Cr, lever by lever" },
        { type: "img", src: "assets/work/perfora-slide-3.jpg", alt: "Slide 3: six-month roadmap, KPI scorecard and two beta tests" }
      ],
      links: [],
      deck: { u: "assets/decks/Perfora-Growth-Plan-Navya-Juneja.pdf", t: "Perfora growth plan", pages: 3, size: "0.3 MB" },
      pfm: "Spend went up, revenue didn't, because customers leaked at checkout, at the doorstep and after the first order. Pocket FM's version of that funnel is install → free episodes → paywall → first coin pack → repeat top-up. The lesson carries over: fix payer conversion and repeat top-ups before buying more installs, and release new UA budget only to channels whose payback clears the bar.",
      summary: {
        problem: "Perfora nearly doubled performance-marketing spend, yet website revenue stayed stuck at ~₹3 Cr a month, conversion sat at 1.9–2.4% and RTO rose from ~10% to 18%. The brief: a single data-backed plan to reach ₹6 Cr in six months while improving profitability.",
        did: "Diagnosed the full funnel from the case workbook, built a driver tree (sessions × CVR × AOV × repeat × delivery) to bridge ₹3 Cr to ₹6 Cr lever by lever, designed two randomised beta tests, and laid out a gated six-month roadmap with a KPI scorecard. Pitched it to Perfora's CEO.",
        landed: "A plan where ₹2.1 Cr of the extra ₹3 Cr comes from fixing delivery, checkout, basket size and repeat buying, and only ₹0.9 Cr from new customers — with ad spend up just 15%, and every ₹1 of ads earning ₹1.11 of contribution instead of ₹0.67."
      },
      details: [
        ["My role", "Built and pitched the growth plan — diagnosis, driver-tree model, beta-test design, roadmap"],
        ["Pitched to", "Perfora's CEO · Masters' Union × Perfora challenge"],
        ["Data", "MU × Perfora case workbook, case brief and founder inputs"],
        ["Output", "3-slide plan: diagnosis → growth bridge → 6-month roadmap"]
      ],
      metrics: [
        { v: "60%", l: "of checkouts abandoned — 98% of sessions are mobile", p: "sourced" },
        { v: "1 in 4", l: "orders never delivered (RTO + cancellations)", p: "sourced" },
        { v: "₹0.67", l: "of contribution per ₹1 of ads today; breakeven needs ₹1", p: "modelled" },
        { v: "₹2.1 Cr", l: "of the extra ₹3 Cr from fixing leaks, not new traffic", p: "modelled" },
        { v: "+15%", l: "ad spend needed (₹2.0 → ₹2.3 Cr), vs the ~+100% that bought no growth", p: "target" },
        { v: "₹4.3 Cr", l: "still reached if every lever delivers only half its assumed uplift", p: "modelled" }
      ],
      sections: [
        { h: "Diagnosis: the leaks, not the traffic",
          p: "15 L monthly sessions → 1.5 L add-to-carts → 75 K checkouts → 30 K orders (₹2.7 Cr booked) → 23 K delivered (₹2.07 Cr realised). Spend roughly doubled while revenue stayed flat, so the marginal return on the last ~₹1 Cr of ads was close to zero. Once returns are counted, ₹1 of ads brought back ₹0.67 of contribution.",
          list: ["Extra budget pushed into colder audiences on one channel (Meta ≈ 90%)", "60% COD with no confirmation or pincode gating, skewed to Tier 2/3", "Mobile checkout leak: only 40% of checkouts complete; 15K reviews not doing trust work on product pages", "No replenishment engine: 4.5% one-month retention on a 45-day product cycle"] },
        { h: "The bridge to ₹6 Cr, lever by lever",
          steps: [["RTO & cancellations · +₹0.35 Cr", "RTO 20% → 12%, cancellations 3.5% → 2.5%, via COD confirmation, partial COD and pincode gating."], ["Checkout conversion · +₹0.67 Cr", "Checkout completion 40% → 48%, lifting CVR 2.0% → 2.4% — the top of Perfora's own range — with UPI one-tap checkout."], ["Basket size · +₹0.61 Cr", "AOV ₹900 → ₹1,035: routine kits and a ₹999 free-shipping bar."], ["Repeat buying · +₹0.46 Cr", "One-month retention 4.5% → 9% with day-35 refill nudges and subscribe-and-save."], ["Qualified acquisition · +₹0.91 Cr", "Sessions 15 L → 17.7 L, with new spend released in tranches only to channels that pay back."]] },
        { h: "Two beta tests before spending more",
          compare: [["Test 1 · COD confirmation → RTO", "Tier 2/3 shoppers randomised 50/50 at checkout; WhatsApp confirmation + ₹49 partial COD. Roll out if COD RTO ≤ 24% and checkout completion drops < 1 pt; kill if CVR falls > 5%."], ["Test 2 · Past-buyer Meta holdout", "Hold out 50% of past buyers from Meta for four weeks. Keep the ~₹0.3 Cr/month only if the extra repeat orders it causes beat its cost; otherwise move it to prospecting."]] },
        { h: "Six-month roadmap",
          tiers: [["Fix: RTO, checkout, beta tests", "₹3.5 Cr", "Months 1–2"], ["Prove: kits, refill CRM, channel mix", "₹4.8 Cr", "Months 3–4"], ["Grow: gated new spend", "₹6.0 Cr", "Months 5–6"]],
          p: "Each phase has an owner, leading KPIs and a gate. New ad money is released only to channels whose incremental ROAS clears breakeven (≈1.6x at a 62% contribution margin)." },
        { h: "What if we're wrong?",
          p: "At 75% of every assumed uplift, revenue still reaches ~₹5.1 Cr; at 50%, ~₹4.3 Cr. Profit beats today in both cases. Facts come from the case workbook (Sourced); the size of each uplift is our judgement (Modelled), which is exactly why the two beta tests come first." }
      ]
    },

    {
      id: "mid", code: "CASE-03", seller: "navya", cats: ["build",  "payments"],
      name: "MID Procurement Automation — event-sourced ops system",
      short: "MID Procurement", kind: "System design & live build", badge: "Live build", date: "Sep 2026 – present", sort: 202609,
      price: { v: "99.0%", u: "bank replies auto-applied", strike: "", off: "283 tests", prov: "modelled" },
      hook: "Four teams, six banks, and nobody could say where the weeks went.",
      poster: { bg: "#F3E8FF", fg: "#3B1361", accent: "#9F2089", big: "99.0%", small: "bank replies applied without a human" },
      media: [
        { type: "img", src: "assets/work/mid-scorecard.png", alt: "Acquirer scorecard from the MID procurement dashboard" },
        { type: "img", src: "assets/work/mid-timeline.png", alt: "Per-request timeline with overlapping party clocks" }
      ],
      links: [
        { t: "Open the live build", u: "https://workflowmidprocurement.vercel.app/" },
        { t: "Read the PRD", u: "https://github.com/navyajuneja1000-droid/MID-Procurement-Workflow/blob/HEAD/PRD.md" },
        { t: "The repository", u: "https://github.com/navyajuneja1000-droid/MID-Procurement-Workflow" }
      ],
      pfm: "Launching a new language, market or payment method is a request many teams touch: content, localisation, payments, store listings, marketing. A tracker that can say a launch is late but not whose time it was is how it slips a quarter. This is the system for exactly that problem.",
      summary: {
        problem: "A merchant cannot go live until an acquiring bank issues a MID. Four teams and six banks touch every request, and the old tracker could show that a request was late but not where the time went.",
        did: "An event-sourced web app that times each party separately, reads bank replies out of the inbox, and checks intake data before it costs a bank cycle. Written up as a full PRD, with 283 tests.",
        landed: "99.0% of bank replies applied without a human — measured on a seeded synthetic dataset (360 merchants, 1,376 requests, 626 bank emails), not live traffic."
      },
      details: [
        ["My role", "Built end to end — data model, turnaround rules, bank reply parser, intake checks and dashboard"],
        ["Output", "Working web application, tested against a seeded synthetic dataset"],
        ["Context", "MID procurement across Indian acquiring, generalised from operator experience · acquirer names invented"],
        ["When", "September 2026 – present"]
      ],
      metrics: [
        { v: "~1,000", l: "requests a month, run by three people from a hand-updated sheet", p: "modelled" },
        { v: "30–40%", l: "of requests bounced by the bank for missing information", p: "modelled" },
        { v: "283", l: "tests, each one a rule from the PRD written down", p: "built" }
      ],
      sections: [
        { h: "Get the unit of work right, and the clocks follow",
          p: "The unit of work is merchant + MCC + acquirer, not merchant + acquirer. One merchant can run several use cases, each needing its own merchant category code and MID request — which is why bank replies are matched on legal name plus MCC. A one-row-per-merchant sheet cannot hold this at all." },
        { h: "Turnaround rules",
          list: ["Working days only, per acquirer holiday calendar", "A 2pm cut-off — after it, the bank's clock starts next working day", "Ops time measured per pickup; the pickup count is the rework measure", "Hands-on vs waiting split, so ops efficiency excludes the bank's queue"] },
        { h: "Why there's no share-of-delay pie chart",
          p: "Clocks overlap: ops runs alongside the acquirer, onboarding alongside BD. Per-party days add up to more than elapsed time, so a pie chart would be arithmetically wrong. The honest picture is a timeline per request." },
        { h: "Judging the bank fairly",
          compare: [["Rejected", "SLA on total time — bills the bank for days the request sat with us gathering a document."], ["Chosen", "SLA on the slowest single response round — each round is the bank's own time."]] },
        { h: "What was built",
          steps: [["Turnaround engine", "Event-sourced: nothing stores 'TAT = 5 days'. Every figure derives from an immutable log, so a rule change recalculates history."], ["Bank reply parser", "Reads tables, numbered lists and attached sheets out of the inbox and turns them into events."], ["Intake readiness check", "Per-acquirer field requirements catch a request that would bounce before it costs a cycle."]] }
      ]
    },

    {
      id: "foundit", code: "CASE-04", seller: "mu", cats: ["d2c",  "growth"],
      name: "Found It — Jaipur-sourced D2C brand, run on a weekly P&L",
      short: "Found It", kind: "Venture building · team venture", badge: "Real revenue", date: "Jul – Sep 2026", sort: 202607,
      price: { v: "₹6.94 L", u: "revenue in 3 months", strike: "", off: "10.1% EBT", prov: "result" },
      hook: "Sourcing from Jaipur workshops, selling at Gurugram stalls.",
      poster: { bg: "#FFF1D6", fg: "#5A2A00", accent: "#E8730C", big: "₹6.94 L", small: "revenue · 3 months · real customers" },
      media: [],
      links: [],
      pfm: "Real customers, real cash and a weekly P&L, restocking by what sells and cutting what doesn't. It's the content-portfolio question in miniature: which shows earn their marketing spend, and which are shelf space. 62% of revenue came from a channel nobody planned for, which is why I always look for the second channel.",
      summary: {
        problem: "Build an ethnic and lifestyle retail brand from nothing with a Masters' Union team: source from Jaipur workshops, sell at Gurugram stalls, and make it pay inside three months.",
        did: "Led sourcing, sales and people management, ran the venture on a weekly P&L, and opened a corporate gifting channel through cold emails and catalogues.",
        landed: "₹6.94 L revenue in three months at 13.1% gross margin and 10.1% EBT, from real customers. The B2B gifting channel brought in 62% of it."
      },
      details: [
        ["My role", "Led sourcing, sales and people management"],
        ["Team", "Co-launched with a Masters' Union team"],
        ["When & where", "July – September 2026 · Gurugram"],
        ["Source of truth", "The weekly P&L workbook — every number here comes from it"]
      ],
      metrics: [
        { v: "₹6,93,559", l: "revenue, three months", p: "result" },
        { v: "₹4,33,900", l: "B2B corporate gifting (62%)", p: "result" },
        { v: "₹2,59,659", l: "B2C at stalls", p: "result" },
        { v: "13.1%", l: "gross margin", p: "result" },
        { v: "10.1%", l: "EBT", p: "result" },
        { v: "~₹800", l: "average order value", p: "result" }
      ],
      sections: [
        { h: "Operations",
          list: ["Stock tracking", "Order packing", "Shiprocket fulfilment", "Weekly P&L", "Cash tracking"] },
        { h: "Trade-offs that came up every week",
          compare: [["Variety vs depth", "Many designs spread the risk of a flop; fewer designs in depth earn better workshop rates."], ["Bulk rates vs unsold stock", "A lower unit cost only helps if the stock sells inside three months."], ["Sourcing vs selling", "Hours with workshops are hours not spent at the stall or with corporate buyers."], ["Footfall vs location cost", "A busier stall brings more customers and costs more to run."]] },
        { h: "One thing worth building",
          p: "A product-level P&L that restocks by sales velocity. Our P&L was weekly and manual: it showed the venture's profit but not which products made it. The next version tracks margin and sell-through per product, so sourcing follows what actually sells." }
      ]
    },

    {
      id: "wowworld", code: "CASE-05", seller: "mu", cats: ["pricing",  "d2c",  "growth"],
      name: "WOW! World — WOW! Momo's next FMCG category, priced and sized",
      short: "WOW! World", kind: "Category strategy · team pitch", badge: "Placed 3rd", date: "2026", sort: 202610,
      price: { v: "₹5.2 Cr", u: "SOM a year in 3 pilot cities", strike: "", off: "6 SKUs · ₹10–₹99", prov: "modelled" },
      hook: "Global-inspired masalas from ₹10: a cheap way to try, a better deal to keep cooking.",
      cardImg: "assets/work/wow-packshot.jpg",
      poster: { bg: "#1E1E1E", fg: "#FFD43B", accent: "#E31B23", big: "₹5.2 Cr", small: "SOM · 3 cities · 6 SKUs from ₹10" },
      media: [
        { type: "img", src: "assets/work/wow-pricing.jpg", alt: "Pricing slide: a cheap way to try, a better deal to keep cooking" },
        { type: "img", src: "assets/work/wow-unit-economics.jpg", alt: "Unit economics slide: contribution per pack and margin by SKU" },
        { type: "img", src: "assets/work/wow-market.jpg", alt: "Market size slide: TAM to SAM to SOM" },
        { type: "img", src: "assets/work/wow-pilot.jpg", alt: "Pilot plan slide: ₹31 L in 6 months, ₹5.2 Cr a year at scale" },
        { type: "img", src: "assets/work/wow-shelf.jpg", alt: "Shelf gap slide: the shelf barely goes past Schezwan" },
        { type: "img", src: "assets/work/wow-range.jpg", alt: "Launch range slide: three flavours, six SKUs" }
      ],
      links: [],
      deck: { u: "assets/decks/WOW-World-Pitch-Deck.pdf", t: "WOW! World pitch deck", pages: 19, size: "2.4 MB" },
      pfm: "A ₹10 sachet to an ₹89 carton is a ladder from impulse to habit, which is exactly the job of a coin-pack ladder. The first top-up should be cheap enough to buy on impulse after a cliffhanger; the bigger pack should be the obviously better deal once the listener is hooked. Price per meal there, price per episode here.",
      summary: {
        problem: "WOW! Momo's packaged-foods business already sells frozen momos, cup and pouch noodles, ready-to-eat biryani and sauces. The brief: find the next category, and prove market gap, brand fit, size, SKUs, pricing and commercial viability.",
        did: "With a five-person Masters' Union team, we found the gap through customer interviews and a Reddit test: the shelf barely goes past Schezwan. I owned pricing, unit economics and SOM — the price ladder against the shelf, contribution for every SKU, and a pilot-first market size.",
        landed: "WOW! World: three global-inspired masalas across six SKUs from ₹10 to ₹99, a ₹54 L gated pilot in nine quick-commerce clusters, and money back by 2028. Placed 3rd, pitching to WOW! Momo's CEO."
      },
      details: [
        ["My role", "Pricing, unit economics and SOM"],
        ["Team", "Saanvi Jindal, Yash Dhariwal, Tarushi Tyagi, Anjali Lodha & Navya Juneja"],
        ["Pitched to", "WOW! Momo's CEO · placed 3rd"],
        ["Research", "On-camera customer interviews in Delhi, an r/delhi thread, shelf and competitor pricing"],
        ["Note", "Pack designs are concept mock-ups made by the team"]
      ],
      metrics: [
        { v: "₹1,273 Cr", l: "category today, ₹2,639 Cr by 2030 (15.7% CAGR)", p: "modelled" },
        { v: "₹31 L", l: "pilot sales in 6 months across 9 clusters", p: "modelled" },
        { v: "42%", l: "contribution on the ₹99 shaker — the margin engine of the range", p: "modelled" },
        { v: "₹17.8–20", l: "a meal: between Ching's ₹10 sachet and Knorr's ₹27.5", p: "target" },
        { v: "₹54 L", l: "pilot budget; at worst WOW! is ₹51 L out of pocket, back above zero in 2028", p: "modelled" },
        { v: "5 gates", l: "velocity, taste, trial, repeat and viability decide the ₹29 L scale-up", p: "target" }
      ],
      sections: [
        { h: "The gap: the shelf barely goes past Schezwan",
          p: "Young Indians try Korean, Thai and Himalayan street food when they eat out, but the pantry offers Indo-Chinese mixes or costly imports. Indo-Chinese recipe sachets cost about ₹10 a meal; imported Asian seasonings ₹3.75/g, with few brands in between. And there's no new habit to teach: Indians already cook with pav bhaji and biryani masalas." },
        { h: "Pricing: a cheap way to try, a better deal to keep cooking",
          tiers: [["Cooking masala sachet, 20 g", "₹20", "To try"], ["Carton, 5 × 20 g", "₹89", "To keep cooking"], ["Spring Onion shaker, 60 g", "₹99", "Finishing crunch"]],
          p: "₹17.8–20 a meal sits a step above Ching's ₹10 and below Knorr's ₹27.5. The carton is 11% cheaper per meal, so the sachet never undercuts it. ₹10 is the counter price for impulse adds; the shaker sits 32% below Orika's per gram while earning 42% of net revenue." },
        { h: "Unit economics: every SKU from MRP to contribution",
          p: "₹89 Korean Street Style carton: −₹4.2 GST, −₹22.9 channel margin = ₹61.9 net revenue; −₹35.5 COGS, −₹8 marketing, −₹3 logistics = ₹15.3 contribution (24.8%). Blended contribution is 28% on the 2028 mix. The Himalayan Jhol carton earns only 13.5% today — getting its ingredient cost down is job one for recipe work." },
        { h: "SOM built from the pilot, not as a share of India",
          steps: [["Pilot · ₹31 L in 6 months", "300 dark stores × 0.8 packs a day × 182 days × ₹66, plus 40 WOW! outlets × 1 pack a day."], ["Year 1 · ₹1.59 Cr", "Pilot plus scale-up in Delhi NCR, Bengaluru and Mumbai."], ["SOM · ₹5.2 Cr a year", "1,500 dark stores × 1.2 a day + 115 outlets × 1.5 + 500 modern-trade stores × 0.4 — 4.2% of the ₹124 Cr pilot-city SAM."]] },
        { h: "Gated pilot",
          list: ["Velocity: 0.8 packs per dark store a day", "Taste: 4/5 or better", "Trial: 8% of tasters buy within 7 days", "Repeat: 25% buy again within 60 days", "Viability: 20%+ contribution"] }
      ]
    },

    {
      id: "routeiq", code: "CASE-06", seller: "navya", cats: ["payments",  "growth"],
      name: "RouteIQ — dynamic payment routing, written as a PRD",
      short: "RouteIQ", kind: "PRD & trade-off design", badge: "Prototype", date: "", sort: 202606,
      price: { v: "6", u: "deliberate non-goals", strike: "", off: "4 guardrails", prov: "target" },
      hook: "Static routing rules can't see a gateway degrade. This is the general fix.",
      poster: { bg: "#E6F6F0", fg: "#0B4A35", accent: "#038D63", big: "≥ 2 pp", small: "payment success target · 4 guardrails" },
      media: [],
      links: [{ t: "Open the prototype", u: "https://route-wise-ai-51.lovable.app" }],
      pfm: "Every failed top-up is a listener who hit the paywall at a cliffhanger, decided to pay, and couldn't. It's the highest-intent moment in the funnel. Payment success rate is a growth metric: +4 pp at PhonePe was revenue, not ops hygiene.",
      summary: {
        problem: "A gateway that was the right choice this morning can be the wrong one this afternoon. Static rules keep sending traffic into a degraded path until a human notices — and by then the transactions are lost.",
        did: "The PRD for an MVP routing engine: success and guardrail metrics, six deliberate non-goals, edge cases, and a working prototype.",
        landed: "A specification and prototype, not a shipped product. It generalises routing work I did at PhonePe that saved ₹8 Cr a year."
      },
      details: [
        ["My role", "Problem framing, PRD, success and guardrail metrics, scope boundaries"],
        ["Output", "Product requirements document for an MVP routing engine"],
        ["Users", "Enterprise merchants running multiple gateways; payment ops and finance teams"]
      ],
      metrics: [
        { v: "≥ 2 pp", l: "payment success rate improvement", p: "target" },
        { v: "≥ 10%", l: "fall in routing-related failures", p: "target" },
        { v: "≥ 50%", l: "of eligible transactions routed via the engine in 3 months", p: "target" },
        { v: "≥ 30%", l: "fewer manual routing interventions", p: "target" }
      ],
      sections: [
        { h: "Product principle",
          p: "The routing engine should optimise for merchant business outcomes, not simply maximise payment success rate." },
        { h: "Four things not to break (guardrails)",
          list: ["Average processing cost per transaction — the price of a higher success rate", "Payment latency — a late routing decision is a failed checkout", "Merchant complaints — the signal before the metrics move", "Incorrect routing incidents — the engine doing the wrong thing confidently"] },
        { h: "Six things it deliberately does not do",
          list: ["Onboard new gateways automatically", "Negotiate gateway pricing", "Build a payment gateway", "Optimise fraud detection", "Change merchant business rules automatically", "Support every payment method at launch"] },
        { h: "Why the PRD names no algorithm",
          p: "A product manager should say what and why, and let engineering determine how." }
      ]
    },

    {
      id: "h2h", code: "CASE-07", seller: "cogent", cats: ["growth",  "pricing",  "build"],
      name: "H2H — 0→1 career-prep product: pricing, growth & launch",
      short: "H2H at Cogent", kind: "Professional · 0→1 product", badge: "Launched", date: "Aug 2025 – Jun 2026", sort: 202508,
      price: { v: "~$110K", u: "revenue in 2 months", strike: "", off: "6x ROAS", prov: "result" },
      hook: "From pay-after-placement to upfront pricing, then a launch that made ~$110K in two months.",
      poster: { bg: "#E3EEFF", fg: "#0B3C7D", accent: "#1C6DD0", big: "~$110K", small: "in 2 months at 6x ROAS" },
      media: [],
      links: [],
      pfm: "Sign-ups grew 4.6× from fixing the funnel, not from budget: form drop-off cut from 72% to 45%, 18% of drop-offs won back by email, and a free résumé audit as the first, no-risk step that converted 8% of 1,500+ sign-ups to paid. Free episodes do the same job at Pocket FM. Tiers named for where the buyer is stuck (22% of $499 buyers upgraded) is how I'd think about coin packs and passes: price on the moment, not the quantity.",
      summary: {
        problem: "US job seekers were buying point solutions (CV writers, LinkedIn optimisers, interview coaching) and still not getting callbacks. H2H's own offer, pay after placement (an ISA), left revenue waiting on each customer's job search.",
        did: "Pivoted to upfront pricing after 60+ interviews, a payback analysis and 15+ rivals. Built a 5-metric LinkedIn scoring model (0–100), packaged ~30 features into 3 tiers ($499 to $1,300), launched to 2 personas across 5 priority US states, and ran the funnel experiments.",
        landed: "~$110K in 2 months at 6x ROAS. Sign-ups grew 4.6×, 8% of 1,500+ sign-ups converted to paid, 22% of $499 buyers upgraded, and 90% of 150+ orders were delivered on time."
      },
      details: [
        ["My role", "Assistant Project Manager — discovery, pricing, packaging, launch, growth experiments and delivery"],
        ["When", "Aug 2025 – Jun 2026 · Remote"],
        ["Market", "US job seekers · 2 personas · 5 priority states"],
        ["Output", "Upfront pricing, 3 tiers, a 0–100 LinkedIn score, the launch, delivery SLAs"]
      ],
      metrics: [
        { v: "~$110K", l: "revenue in 2 months at 6x ROAS", p: "result" },
        { v: "4.6×", l: "sign-ups: form drop-off cut from 72% to 45%, 18% of drop-offs recovered via email", p: "result" },
        { v: "8%", l: "of 1,500+ sign-ups converted to paid, with a free résumé audit as the lead magnet", p: "result" },
        { v: "22%", l: "of $499 buyers upgraded across the 3 tiers", p: "result" },
        { v: "90%", l: "on-time delivery across 150+ orders", p: "result" },
        { v: "60+", l: "interviews, a payback analysis and 15+ rivals behind the pricing pivot", p: "result" }
      ],
      sections: [
        { h: "The pivot: pay after placement → pay upfront",
          p: "H2H began as an ISA: the customer pays once hired, so revenue waits on someone else's hiring cycle. After 60+ interviews, a payback analysis and benchmarking 15+ rivals, it moved to upfront pricing." },
        { h: "Priced on where the buyer is stuck",
          tiers: [["Interview Accelerator", "$499", "Stuck before the interview"], ["Offer Builder", "$899", "Stuck at conversion"], ["Offer Accelerator", "$1,300", "Stuck at the offer"]],
          p: "About 30 features packaged into three tiers, each named for where the buyer is failing. A 5-metric LinkedIn scoring model (0–100) made profile gaps measurable and anchored which tier a buyer needed, so the upgrade is a diagnosis rather than an upsell. 22% of $499 buyers upgraded." },
        { h: "Two personas, failing for opposite reasons",
          compare: [["The Tech Transitioner · 22.6M", "26–40, moving into tech from sales, ops, teaching. Real skills buried in non-tech language; no portfolio."], ["The ATS Victim · 25.6M", "22–35, already qualified, 50–100+ applications a week off one generic résumé, auto-rejected on keywords."]],
          p: "H2H launched to both. Addressable figures are platform-derived estimates (Modelled)." },
        { h: "Growth: fixing the funnel",
          steps: [["The form · drop-off 72% → 45%", "Cut the sign-up form's drop-off from 72% to 45%."], ["Email recovery · 18% back", "Followed up the people who left the form; 18% of them came back."], ["Lead magnet · 8% to paid", "A free résumé audit, shipped with Engineering, as the first step. 8% of 1,500+ sign-ups went on to pay."]],
          p: "Launched to 2 personas across 5 priority US states: ~$110K in 2 months at 6x ROAS, with sign-ups up 4.6×." },
        { h: "Delivery",
          p: "SLAs, SOPs and hand-offs set across 3 teams held on-time delivery at 90% across 150+ orders." }
      ]
    },

    {
      id: "prolectro", code: "CASE-08", seller: "mu", cats: ["retention",  "pricing",  "d2c"],
      name: "Prolectro — clear protein sachet, consumer research to GTM",
      short: "Prolectro", kind: "GTM strategy · proposed, not launched", badge: "Proposed", date: "Sep 2026", sort: 202609,
      price: { v: "₹129", u: "per sachet", strike: "₹166", off: "vs nearest rival", prov: "target" },
      hook: "Protein people will actually finish — built for the 23% who bought once and quit.",
      poster: { bg: "#FFE7EC", fg: "#7A0F2E", accent: "#E5345B", big: "41 of 74", small: "who tried protein powder had stopped" },
      media: [
        { type: "img", src: "assets/work/prolectro-pack.jpg", alt: "Prolectro Refresh sachet pack" },
        { type: "img", src: "assets/work/prolectro-keyvisual.jpg", alt: "Prolectro campaign key visual" },
        { type: "img", src: "assets/work/prolectro-flavours.jpg", alt: "Six proposed flavours in two families" },
        { type: "video", src: "assets/work/prolectro-teaser.mp4", poster: "assets/work/prolectro-teaser-poster.jpg", alt: "Prolectro campaign teaser" }
      ],
      links: [{ t: "Open the waitlist page", u: "https://partner-project-glow.lovable.app" }],
      pfm: "41 of 74 people who had tried protein powder had quit, so we designed for the people who left, around the exact reason they left. Lapsed payers are Pocket FM's cheapest growth because they already believe in the product. Win them back by removing the reason they stopped (say, the cost of finishing a 500-episode series), not with a bigger discount.",
      summary: {
        problem: "41 of the 74 surveyed people who had tried protein powder had stopped. Could a product win back the people who bought protein once and quit?",
        did: "Created the brand; owned positioning, product definition and pricing; ran the 101-person survey the strategy argues from. Team of five.",
        landed: "A go-to-market plan with launch gates and campaign assets. Proposed, never commercially launched — and labelled as such."
      },
      details: [
        ["My role", "Created the brand; positioning, product definition, pricing, primary research"],
        ["Team", "Five people · Masters' Union"],
        ["Research", "101 urban respondents, 12-question survey, September 2026"],
        ["Status", "Proposed, never commercially launched"]
      ],
      metrics: [
        { v: "55%", l: "of everyone who tried protein powder walked away (41 of 74)", p: "sourced" },
        { v: "47%", l: "found shakes too thick or filling", p: "sourced" },
        { v: "23%", l: "are Lapsed Intenders — the chosen customer", p: "sourced" },
        { v: "₹125", l: "Lapsed Intender mean willingness to pay — highest of four segments", p: "sourced" }
      ],
      sections: [
        { h: "The insight",
          p: "India buys the protein argument, not the habit. People rejected drinking it, not the protein. So the target is people who already quit: they accepted the argument, pay the most, and left for the exact reason a clear sachet removes." },
        { h: "The product",
          p: "Prolectro Refresh: one 36g sachet, 11g whey isolate plus electrolytes, mixed into 500–750ml of water. ₹129 a single serve, against ₹166–176 for the nearest combined product." },
        { h: "Honest caveat",
          p: "101 urban respondents is directional evidence, not proof of national demand. The credible next step is a small pilot that tests price, retention and channel before anything else is built." }
      ]
    },

    /* ---------- PhonePe Store — professional wins ---------- */
    {
      id: "pp-routing", code: "PP-01", seller: "phonepe", cats: ["payments",  "phonepe",  "growth"],
      name: "Merchant payment routing across Cards & NetBanking",
      short: "Routing logic", kind: "PhonePe · Senior Ops Analyst", badge: "PhonePe", date: "2024 – 2025", sort: 202407,
      price: { v: "₹8 Cr", u: "saved / year", strike: "", off: "+4 pp success", prov: "result" },
      hook: "Optimised acquiring-bank allocation and routing for ₹500+ Cr TPV travel merchants.",
      poster: { bg: "#5F259F", fg: "#FFFFFF", accent: "#C9A8FF", big: "₹8 Cr", small: "annualised savings from routing" },
      media: [], links: [],
      pfm: "Routing decisions were made weekly from SQL dashboards of success rates, bank traffic and error codes, and A/B tested with Growth. The same loop applies to a top-up flow: which method, which gateway, which country, and what each failed attempt costs.",
      summary: {
        problem: "Travel merchants like ixigo and MakeMyTrip push ₹500+ Cr of TPV through card and netbanking rails, where the wrong acquirer allocation costs money and conversions every day.",
        did: "Optimised acquiring-bank allocation and payment routing across Cards and NetBanking; A/B tested routes with Growth, Engineering, Success and Testing.",
        landed: "₹8 Cr saved annually, and a +4 pp lift in travel payment success."
      },
      details: [["Role", "Senior Operations Analyst – Product & Payments"], ["When", "Jul 2024 – Jun 2025 · Bengaluru"], ["Partners", "Growth, Engineering, Success, Testing"]],
      metrics: [
        { v: "₹8 Cr", l: "saved annually", p: "result" },
        { v: "+4 pp", l: "travel payment success from A/B tested routes", p: "result" },
        { v: "Weekly", l: "routing decisions from SQL dashboards", p: "result" }
      ],
      sections: []
    },
    {
      id: "pp-recon", code: "PP-02", seller: "phonepe", cats: ["payments",  "phonepe"],
      name: "Historical payment reconciliation recovery",
      short: "Recon recovery", kind: "PhonePe · Finance & Recon", badge: "PhonePe", date: "2024 – 2025", sort: 202406,
      price: { v: "₹15+ Cr", u: "recovered", strike: "", off: "with Finance & Recon", prov: "result" },
      hook: "Traced reconciliation mismatches and coordinated settlement fixes.",
      poster: { bg: "#3A0E6B", fg: "#FFFFFF", accent: "#FFD166", big: "₹15+ Cr", small: "recovered from reconciliation" },
      media: [], links: [],
      pfm: "The expensive failures are quiet: money that drifts rather than disappears. At millions of small coin purchases a day across stores, gateways and currencies, a few rupees of drift per purchase adds up to a line item.",
      summary: {
        problem: "Mismatches between what was transacted and what settled don't throw errors. They drift.",
        did: "Led historical payment reconciliation with the Finance and Recon teams — tracing mismatches and coordinating settlement fixes.",
        landed: "₹15+ Cr recovered. It's also why ReconOS exists."
      },
      details: [["Teams", "Finance, Recon"], ["Where", "PhonePe · Bengaluru"]],
      metrics: [{ v: "₹15+ Cr", l: "recovered", p: "result" }],
      sections: []
    },
    {
      id: "pp-migration", code: "PP-03", seller: "phonepe", cats: ["payments",  "phonepe"],
      name: "Acquiring-bank traffic migration in three months",
      short: "Bank migration", kind: "PhonePe · Payments", badge: "PhonePe", date: "2024 – 2025", sort: 202405,
      price: { v: "95%", u: "traffic migrated", strike: "", off: "in 3 months", prov: "result" },
      hook: "Phased routing shifts with live monitoring — without breaking merchant success rates.",
      poster: { bg: "#EFE6FB", fg: "#3A0E6B", accent: "#5F259F", big: "95%", small: "of payment traffic migrated in 3 months" },
      media: [], links: [],
      pfm: "Big migrations are won by phasing and monitoring, not by a launch date. Moving top-ups to a web store, a new gateway or a new paywall is the same job: shift in tranches, watch the guardrails, never let listeners feel a dip.",
      summary: {
        problem: "Moving payment traffic between acquiring banks risks merchant success rates at every step.",
        did: "Phased routing shifts with live monitoring.",
        landed: "95% of payment traffic migrated across acquiring banks in three months."
      },
      details: [["Approach", "Phased routing shifts, live monitoring"]],
      metrics: [{ v: "95%", l: "of payment traffic migrated", p: "result" }],
      sections: []
    },
    {
      id: "pp-golive", code: "PP-04", seller: "phonepe", cats: ["payments",  "phonepe",  "growth"],
      name: "Merchant go-live: onboarding workflow & bulk config tool",
      short: "Go-live workflow", kind: "PhonePe · Onboarding", badge: "PhonePe", date: "2023 – 2025", sort: 202306,
      price: { v: "53%", u: "cut in Cards go-live time", strike: "", off: "40% NetBanking", prov: "result" },
      hook: "Mapped MID-to-live onboarding as a 10-stage workflow and removed the friction points.",
      poster: { bg: "#FFF4E0", fg: "#5A2A00", accent: "#5F259F", big: "360", small: "merchant go-lives in one upload" },
      media: [], links: [],
      pfm: "Faster go-live is a growth lever, not an ops metric, whether it's 360 merchants live in one upload or a new market, language or show going live on Pocket FM.",
      summary: {
        problem: "Merchant go-live involved many stakeholder teams and slow handoffs.",
        did: "Mapped MID-to-live onboarding as a 10-stage workflow across stakeholder teams, and defined the requirements for a bulk configuration tool.",
        landed: "53% / 40% cut in go-live turnaround for Cards / NetBanking, and 360 merchant go-lives in one upload."
      },
      details: [["Workflow", "10 stages across stakeholder teams"]],
      metrics: [
        { v: "53% / 40%", l: "cut in go-live turnaround, Cards / NetBanking", p: "result" },
        { v: "360", l: "merchant go-lives in one upload", p: "result" }
      ],
      sections: []
    },
    {
      id: "pp-launches", code: "PP-05", seller: "phonepe", cats: ["payments",  "phonepe",  "build"],
      name: "Card network launches & bank integrations",
      short: "Network launches", kind: "PhonePe · Integrations", badge: "PhonePe", date: "2023 – 2025", sort: 202305,
      price: { v: "4", u: "launches", strike: "", off: "5+ integrations", prov: "result" },
      hook: "CVV-less payments, PAR API, Visa Direct and MoneySend — go-live coordinated with the card networks.",
      poster: { bg: "#E8E0F5", fg: "#3A0E6B", accent: "#5F259F", big: "4 + 5", small: "network launches · bank & PSP integrations" },
      media: [], links: [],
      pfm: "Owning requirements, UAT and go-live with an external partner (banks, networks, PSPs) is most of what launching a new payment method in a new country takes: UPI in India, cards and wallets abroad.",
      summary: {
        problem: "New card capabilities need coordinated go-live with networks, banks and PSPs.",
        did: "Owned requirements, UAT and go-live with partners.",
        landed: "4 launches (CVV-less, PAR API, Visa Direct, MoneySend) and 5+ bank and PSP integrations."
      },
      details: [["Launches", "CVV-less payments, PAR API, Visa Direct, MoneySend"]],
      metrics: [
        { v: "4", l: "network launches", p: "result" },
        { v: "5+", l: "bank and PSP integrations", p: "result" }
      ],
      sections: []
    }
  ],

  /* ---------------- PILOT: hypotheses for the first 90 days (public info only) ---------------- */
  pilot: [
    { t: "Route more top-ups through the web store",
      w: "Pocket FM's own site offers 25% extra coins on the web store (Sourced). Whether that bonus pays for itself depends on the store fee it avoids: at a 30% commission the web pack earns more per coin even after the bonus; at 15% it earns less (Modelled, try it in the calculator). So the question is which listeners, in which markets, to steer to the web.",
      m: "Share of top-ups on web · net revenue per coin by market · payment success on web vs in-app",
      p: "modelled" },
    { t: "Make the first coin pack an impulse buy",
      w: "The WOW! World logic: a ₹10 sachet to try, a carton to keep. The first purchase after a cliffhanger should be small and instant; the bigger pack should be the obvious upgrade.",
      m: "Paywall-to-first-purchase conversion · time to second top-up · pack mix",
      p: "modelled" },
    { t: "Win back lapsed payers by removing the reason they left",
      w: "The Prolectro logic: people who quit already believe in the product. If the reason is the cost of finishing a long series, test a finish-the-season bundle against a discount.",
      m: "Reactivation rate · 30-day repeat top-up · revenue per reactivated payer",
      p: "modelled" },
    { t: "Treat payment success as a growth metric",
      w: "A failed top-up at a cliffhanger is the most expensive drop-off in the funnel. At PhonePe, A/B testing routes moved travel payment success by 4 pp.",
      m: "Top-up success rate by method, gateway and country · retry recovery",
      p: "result" }
  ],

  /* ---------------- ORDERS = experience, recent → old ---------------- */
  orders: [
    {
      id: "mu", type: "edu", org: "Masters' Union", logo: "assets/logos/masters-union.svg",
      title: "PGP in Technology & Business Management (PGP-TBM)", when: "2026 – Present", where: "Gurgaon",
      status: "ongoing", statusText: "In progress",
      body: "Technology, strategy and business transformation. Co-launched 2 revenue-generating ventures (₹7.3 L combined) and a live AI product.",
      related: ["perfora", "wowworld", "foundit", "prolectro"]
    },
    {
      id: "cogent", type: "work", org: "Cogent Infotech", logo: "assets/logos/cogent.svg",
      title: "Assistant Project Manager – Product Development", when: "Aug 2025 – Jun 2026", where: "Remote",
      status: "delivered", statusText: "Delivered · Jun 2026",
      body: "Took H2H (Human to Human), an expert-led US career-prep program, from pay-after-placement (ISA) to upfront pricing, then launched it and ran the growth experiments. Owned discovery, pricing, packaging, launch and delivery.",
      bullets: [
        ["~$110K", "in 2 months at 6x ROAS, launching H2H to 2 personas across 5 priority US states"],
        ["4.6×", "sign-ups, by cutting form drop-off from 72% to 45% and recovering 18% of drop-offs via email"],
        ["8%", "of 1,500+ sign-ups converted to paid, with a free résumé audit shipped with Engineering as the lead magnet"],
        ["60+", "interviews, a payback analysis and 15+ rivals behind the pivot from pay-after-placement (ISA) to upfront pricing"],
        ["0–100", "LinkedIn scoring model on 5 metrics that made profile gaps measurable and anchored all 3 tiers"],
        ["22%", "of $499 buyers upgraded, after packaging ~30 features into 3 tiers ($499 to $1,300)"],
        ["90%", "on-time delivery across 150+ orders, by setting SLAs, SOPs and hand-offs for 3 teams"]
      ],
      track: [["Joined", "Aug 2025"], ["Pivot", "ISA → upfront pricing"], ["Launch", "~$110K in 2 months"], ["Delivered", "Jun 2026"]],
      related: ["h2h"]
    },
    {
      id: "phonepe-sr", type: "work", org: "PhonePe", logo: "assets/logos/phonepe.svg",
      title: "Senior Operations Analyst – Product & Payments", when: "Jul 2024 – Jun 2025", where: "Bengaluru",
      status: "delivered", statusText: "Delivered · Jun 2025",
      body: "Owned integrations, routing and onboarding for ₹500+ Cr TPV travel merchants, including ixigo and MakeMyTrip — the plumbing beneath the transactions.",
      bullets: [
        ["₹8 Cr", "saved annually by optimising acquiring-bank allocation and routing across Cards and NetBanking"],
        ["+4 pp", "travel payment success from A/B testing routes with Growth, Engineering, Success and Testing"],
        ["₹15+ Cr", "recovered by tracing reconciliation mismatches with Finance and Recon"],
        ["95%", "of payment traffic migrated across acquiring banks in three months"],
        ["4 launches", "CVV-less payments, PAR API, Visa Direct and MoneySend"]
      ],
      track: [["Promoted", "Jul 2024"], ["Routing & recon", "₹8 Cr + ₹15 Cr"], ["Migration", "95% in 3 months"], ["Delivered", "Jun 2025"]],
      related: ["pp-routing", "pp-recon", "pp-migration", "pp-launches"]
    },
    {
      id: "phonepe", type: "work", org: "PhonePe", logo: "assets/logos/phonepe.svg",
      title: "Operations Analyst – Payments", when: "Jun 2023 – Jun 2024", where: "Bengaluru",
      status: "delivered", statusText: "Delivered · Jun 2024",
      body: "Merchant onboarding, bank integrations and the go-live process.",
      bullets: [
        ["53% / 40%", "cut in go-live turnaround for Cards and NetBanking, by mapping MID-to-live as a 10-stage workflow"],
        ["360", "merchant go-lives in one upload, from defining requirements for a bulk configuration tool"],
        ["5+", "bank and PSP integrations — requirements, UAT and go-live with partners"],
        ["Weekly", "routing decisions informed by SQL dashboards of success rates, bank traffic and error codes"]
      ],
      track: [["Joined", "Jun 2023"], ["Onboarding", "10-stage workflow"], ["Bulk tool", "360 in one upload"], ["Promoted", "Jul 2024"]],
      related: ["pp-golive", "pp-launches"]
    },
    {
      id: "christ", type: "edu", org: "Christ University", logo: "assets/logos/christ.svg",
      title: "BBA (Hons), Finance · GPA 9.07/10", when: "2020 – 2023", where: "Bengaluru",
      status: "delivered", statusText: "Delivered · 2023",
      body: "Head of the theatre club; Student Council, Cultural Society and HR Club. Dissertation: UPI adoption in India — 211 users, 7 behavioural constructs, regression in SPSS. Trust, usability and perceived usefulness came out as the adoption drivers."
    },
    {
      id: "school", type: "edu", org: "Saint Kabir Public School", logo: "assets/logos/school.svg",
      title: "CBSE Class XII (Commerce) · 94.8%", when: "2018", where: "Chandigarh",
      status: "delivered", statusText: "Delivered · 2018",
      body: "Outclass Team President."
    }
  ],

  habits: [
    ["The expensive failures are quiet", "I gravitate to problems with no error message — money that drifts rather than money that disappears."],
    ["Metrics you can argue with", "I keep rejecting the flattering number in favour of the one that survives scrutiny."],
    ["Quantify before committing", "Market, funnel and unit economics get modelled before anything gets built or launched."],
    ["Deciding what not to build", "Non-goals, phasing and a manual first version — scope discipline as a deliverable."]
  ],

  offclock: [
    ["6", "first and second-place awards across national theatre competitions spanning 10+ colleges"],
    ["Top 15", "nationally at Mood Indigo, IIT Bombay, across 2,000+ entrants"],
    ["1st", "at the Masters' Union Startup Weekend, pitching a D2C pet-care venture against 20+ teams"],
    ["3", "inter-school Parliamentary Debate finals reached as semi-finalist or first runner-up"]
  ],

  certs: [
    ["Project Management", "Google · scoping, stakeholder alignment, risk planning, Agile delivery"],
    ["Financial Modelling & Valuation", "Udemy · three-statement modelling, DCF, unit economics"]
  ],

  faq: [
    ["Why Pocket FM?",
     "Because growth at Pocket FM is a money problem as much as a marketing one. The micropayment model means every listener's journey ends at a payment: a cliffhanger, a paywall, a coin pack, a top-up that has to go through. I spent two years inside PhonePe's payment rails (success rates, routing, reconciliation), then built a growth plan around conversion and repeat instead of spend, priced a sachet-to-carton ladder, and launched a product that made ~$110K in two months at 6x ROAS, growing sign-ups 4.6× by fixing the funnel. Pocket FM sits where those meet: funnels, pricing, payments and retention, at a scale where one point of conversion is real money."],
    ["What roles are you looking for?",
     "Growth Manager roles: user acquisition and payback, monetisation and pricing, retention and win-back, or payments and checkout conversion. Also product roles on 0→1 teams that need someone comfortable in both the spreadsheet and the spec."],
    ["What do the Result / Built / Modelled labels mean?",
     "Every number on this page says where it came from. Result: achieved. Built: a working product you can open. Modelled: my own assumption, stated. Target: a success criterion. Sourced: external or survey data. If a project didn't launch, it says so."],
    ["Is any Pocket FM data used here?",
     "No internal data. The Pocket FM facts on this page (minutes per user, markets, languages, the web-store coin bonus) come from Pocket FM's public website and press, and are labelled Sourced. Everything about what I'd do there is a hypothesis to test, not a finding."],
    ["Where are you based?",
     "Gurgaon, India. Open to relocating to Bengaluru."],
    ["Is any PhonePe data reproduced here?",
     "No. Figures are as stated on my CV. Underlying transaction data and internal documents are PhonePe's and are not reproduced."]
  ]
};
