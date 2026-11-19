# Pocket FM × navya

Navya Juneja's portfolio for Pocket FM Growth Manager roles, built to feel like an audio-drama app.

- **Home**: promo strip, a featured "Navya Juneja Show" with a spoken trailer, genre chips, Browse the library, ranked Explore blockbusters, a *Pilot episode* (four 90-day growth hypotheses from public info), PhonePe Originals, a Trending rail filtered by evidence, and **Follow the coin**, a calculator comparing in-app (15% / 30% store fee) and web-store (+25% bonus coins) top-ups.
- **Shows** (`#/shows/<genre>`): every case as a show, with genre chips, filters (studio, evidence) and sort.
- **Show pages** (`#/show/<id>`): cover, status (Completed / Ongoing / Pilot), Play Ep-1, headline number as "plays", provenance as the rating, credits, then **Episodes** (problem → what I did → where it landed → each section → bonus: why it matters at Pocket FM). Each episode plays aloud through the browser's built-in text-to-speech, with a mini player that bingees to the next episode.
- **Library** (`#/library`): saved shows and recently played (kept in this browser only).
- **Store** (`#/store`): packs (intro call → hire), all ₹0; "Unlock" opens an interview-request email with the role and saved shows filled in.
- **Profile** (`#/profile`): author page, Seasons (experience and education), certifications, how I work, off air, FAQ.
- **Studio** (`#/studio/phonepe`): the two years at PhonePe.

Every figure is labelled Result, Built, Modelled, Target or Sourced. Pocket FM facts come from its public website only.

Static site: open `index.html` or serve the folder (`python3 -m http.server`). Content lives in `assets/data.js`.

Independent job-application portfolio. Not affiliated with or endorsed by Pocket FM or PhonePe. The logo mark is an original drawing.
