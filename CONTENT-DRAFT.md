# Content draft: full-time AI Research Engineer (electronics/IoT + AI)

**Status:** for Karan's review. Nothing here is on the site yet. Mark up anything you
want changed, and I'll apply it once you've signed off. The design stays the same;
only copy and section order change.

Every claim below comes from what's already on the site (degrees, Amdocs, Sisai,
Vegapod, the repos). Anything I couldn't source is marked **[?]** and listed in the
questions at the end.

---

## 0. Positioning (one line everything else hangs off)

> **AI Research Engineer working where hardware meets ML: signals, sensors, and
> the models that read them.**

Rail / role label: `AI Research Engineer` (replaces `RAG & Agentic AI Engineer`)

The argument the page now makes: *ECE by training, ML by trade. I've worked on the
electronics, the sensor pipelines, and the models, so I can take a problem from the
raw signal to a model you can trust.* RAG and agents stay, but as one strand of the
work, not the whole pitch.

---

## 1. Proposed section order

| # | Now | Proposed | Why |
|---|---|---|---|
| 1 | Hero | **Hero** | unchanged |
| 2 | Featured (EdgarBrief, RFP Bid Manager) | **Featured research**: Predictive Maintenance, Acoustic RUL, plus EdgarBrief | Lead with the signal/sensor work. That's the electronics + AI story. EdgarBrief stays as the LLM proof. |
| 3 | Depth (6 repos + stack) | **Experience** (the Background track, moved out of About into its own slide) | Hiring managers look for experience second. It's buried inside About right now. |
| 4 | About (statement + track) | **Depth**: the remaining repos + stack | Breadth after the career story |
| 5 | Contact | **About**: statement + testimonial | Personality last, before the ask |
| 6 | — | **Contact** | unchanged position |

**Alternative if you want fewer layout changes:** keep the current five slides and
just swap Featured's projects. The track stays inside About.

The RFP Bid Manager is a client SaaS build. I'd move it down into Depth as a regular
entry, or drop it. Your call.

---

## 2. Hero

- **Greeting:** Hey, I'm Karan.
- **Expertise deck:** *I build* **AI for signals, sensors** *&* **the systems around them.**
- **Support:** Electronics engineer turned AI researcher. I take problems from the
  raw sensor data to a model that holds up on hardware it hasn't seen.
- **Stats:** `3+` yrs shipping AI · `9.6` GPA · Master's in AI **[? 9.6 vs 9.4, see Q2]**
- **Header CTA (removed today):** leave empty, or add a quiet `Contact` link? Contact
  is already in the nav, so I'd leave it empty.

---

## 3. Featured research

**Predictive Maintenance** · eyebrow `Industrial IoT · RUL`
- Tagline: Remaining useful life for bearings and cutting tools, tested on machines the model never saw.
- Summary: NASA IMS bearing and PHM 2010 tool-wear data. Leave-one-machine-out evaluation, so the score reflects a new machine on the shop floor, not a memorised one.
- Pipeline: `vibration / force signals → features + wavelets → [RF · XGBoost] [CNN-LSTM · TCN] → RUL`
- Capabilities: *Honest evaluation* (leave-one-out across machines) · *Classical vs deep, side by side* · *Signal-first features*

**Acoustic RUL** · eyebrow `Digital twin · Audio ML`
- Tagline: Predicting spring fatigue from the sound of the mechanism.
- Summary: As a recoil spring fatigues, the gap between muzzle blast and bolt closure stretches. A digital-twin simulator turns a handful of recordings into thousands of run-to-failure trajectories, and three models predict RUL from them.
- Pipeline: `seed audio → digital twin → [XGBoost] [2D CNN scalograms] [1D CNN raw] → RUL`

**EdgarBrief** · eyebrow `LLM · RAG system` (current copy kept as is)

*(EEG Alzheimer's detection is the other strong candidate for a featured slot. It's
signal processing on biomedical hardware data. Want it in Featured instead of EdgarBrief?)*

---

## 4. Experience track (newest first)

| Year | Kicker | Label | Claim | Place |
|---|---|---|---|---|
| 2026 → Now **[?]** | Research | Independent ML research | Publishing open work on signal ML, RUL and grounded LLM systems, built end to end and evaluated honestly. | Independent · Pune |
| 2025 | Foundations | Master's in AI | Under the hood of the models: architecture, how they work, and how to modify them. | M.S. Ramaiah Univ. · GPA **[?]** |
| 2022 | Retrieval | Production RAG | Shipped RAG to real users at Amdocs: hybrid search, plus a query-rephrasing step that fixed multi-turn context loss. | Software Developer · Amdocs |
| 2022 | IIoT | Real-time sensor pipelines | Telemetry from 1,000+ industrial sensors, ingested live, with automated fault detection. | Project Intern · Sisai |
| 2018 | Electronics | Hardware & control | Led the electronics team at Vegapod, a student hyperloop, on control systems. | B.Tech ECE · MIT-WPU |

Change: "Freelance / for clients" becomes independent research. Sisai and Vegapod get
more weight in the copy, since they're the electronics/IoT proof.

---

## 5. Depth (heading: "Also built")

- **Support:** More of the work, all public: EEG classification, clinical NER, generative image models, an agent skill, and LLM systems.
- **Order:** EEG Alzheimer's → BioBERT NER → VAE restoration → Founder's Court → RFP Bid Manager (if kept)
- **Stack, emphasised skills:** move Signal processing, PyTorch, XGBoost, InfluxDB, CNNs and time-series to the front. RAG tools stay, at a lower weight.
- **Stack, new "Hardware & IoT" group [?]:** e.g. microcontrollers, sensors, DSP, control systems. I need your real list (Q3).

---

## 6. About

- **Lead:** I'm Karan, an electronics engineer who moved into AI. I like problems where the data comes off real hardware.
- **Short:** I work calm and methodical. I'd rather spend a few days finding the right approach than rush a wrong one. Most of my work starts with a signal: vibration, audio, EEG, sensor telemetry. It ends with a model I've tried hard to break, because a score that only holds on the training machine isn't a result. Off the clock, it's the gym and coffee, in that order.
- **Story question:** Why hardware + AI
- **Story:** **[needs your voice]** The current story is about information stuck in documents, which is the freelance RAG angle. I'd rewrite it around Vegapod and Sisai: seeing sensors produce more data than anyone could read, and wanting models that could.
- **Stat:** replace "100% of answers grounded" (RAG-specific) with something research-shaped. Option: `0` *results reported on data the model trained on: every model is scored on unseen machines, subjects or files.* Or drop the stat.
- **Points:**
  - 3+ years in ML across signals, imaging and NLP, from industrial IoT pipelines to production RAG.
  - B.Tech in Electronics & Communication and a Master's in AI, so I'm comfortable on both sides of the sensor.
- **Availability line:** `Based in Pune · Open to full-time AI research roles` **[? relocation / remote, Q4]**

---

## 7. Contact

- **Eyebrow:** ● Open to full-time roles
- **Heading:** Let's talk. (keep)
- **Body:** Hiring for AI research or ML engineering, especially around sensors, signals or edge devices? I'd like to hear about it.
- **CTA:** `Email me ↗` (already live) + the email address
- **Résumé:** removed today; it comes back when the new one is ready.

---

## 8. Everywhere else (metadata, twin, blog)

- **Site title:** `Karan Khatavkar · AI Research Engineer`
- **SEO description:** Karan Khatavkar is an AI research engineer working on machine learning for signals, sensors and IoT, with production LLM experience. Open to full-time roles.
- **OG card:** "Open to freelance & contract" becomes "Open to full-time roles". Alt text updated to match.
- **JSON-LD:** jobTitle `AI Research Engineer`; drop the Upwork profile; add IoT, Embedded Systems, Time-Series Analysis and Predictive Maintenance to knowsAbout.
- **Keywords:** drop "freelance machine learning engineer"; add "AI research engineer", "IoT", "signal processing", "predictive maintenance".
- **Blog post footer:** "I build RAG systems and AI agents for clients…" becomes "I'm an AI research engineer working on ML for signals and sensors. Open to full-time roles."
- **Twin (chat + system prompt):** same facts, new framing. "Are you available?" now answers *open to full-time AI research / ML roles; email me*. Remove every "clients / handover / freelance" line. Add the Predictive Maintenance and Acoustic RUL projects to its featured work.
- **README / PROJECT.md / FLOW.md / SEO.md:** update the "win freelance work" goal statements so future edits don't drift back.

---

## Questions for you

1. **Title:** "AI Research Engineer" exactly, or something like "AI Research Engineer · Edge & IoT AI" / "ML Engineer, Signals & Sensors"?
2. **GPA conflict:** the hero and track say **9.6**; `education.ts` says **9.4/10**, and calls it an M.Tech in AI & ML. Which is correct?
3. **Hardware/IoT skills:** which boards, MCUs, protocols or tools have you actually used (e.g. Arduino, ESP32, STM32, Raspberry Pi, MQTT, embedded C, PCB design, edge inference like TFLite)? Only things you'd defend in an interview.
4. **Location:** open to relocation or remote? This goes in the availability line.
5. **The "Now" stop:** what are you doing from Apr 2026 on, now that it's no longer framed as freelance? "Independent research", "Master's (final year)", or something else?
6. **Section order:** the full reorder (§1) or the minimal swap?
7. **RFP Bid Manager:** move to Depth, or drop?
8. **About story:** happy for me to draft the hardware → AI origin from Vegapod and Sisai, or would you rather give me a few lines in your own words?
