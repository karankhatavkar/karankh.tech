# karankh.tech — Project Specification

Personal portfolio for **Karan Khatavkar**, hosted at **karankh.tech**. This document is the source of truth for content and product/design decisions. Build against it.

> Tech/framework rules live in [AGENTS.md](./AGENTS.md) and [CLAUDE.md](./CLAUDE.md). This is **Next.js 16** — consult `node_modules/next/dist/docs/` before writing framework code.

## 1. Goal & audience

- **Primary goal:** win **freelance / contract LLM & ML work**.
- **Audience:** prospective clients, hiring managers, collaborators.
- **Primary CTA:** get in touch (contact form + email/socials).

## 2. Structure — single-page scroll

One route (`app/page.tsx`) with anchored sections, in order:

1. **Hero** — name, role, tagline, primary CTA. Typography-led, **no profile photo**. This is the showpiece — make it cinematic.
2. **About** — short bio + availability for freelance/contract.
3. **Skills / Stack** — grouped (LLM & GenAI · ML & Deep Learning · Serving & Infra · Languages).
4. **Projects** — all projects (see §6), LLM/agent work first.
5. **Experience** — roles + highlights.
6. **Education** — two degrees.
7. **Certifications** — Azure AZ-900 / AI-900 / DP-900.
8. **Contact** — form + email + social links + résumé download.

A sticky/section nav with smooth-scroll and scroll-spy is encouraged.

## 3. Design system — "premium minimalism"

The site should feel **fancy and high-craft**, not a basic template — distinctive enough to be memorable, while staying clean.

- **Theme:** dark only — near-black canvas with layered grays.
- **Palette:** monochrome + white. **No color accent**; differentiation comes from contrast, weight, and depth, not hue.
- **Typography-driven:** large, confident type as the primary design element. Geist Sans / Geist Mono (already wired via `next/font/google`). Use a deliberate type scale, mono for labels/metadata for an engineering feel.
- **Motion & interaction (this is what makes it "fancy"):** scroll-triggered reveals, subtle parallax/depth, magnetic or animated hero, hover micro-interactions on projects/links, smooth section transitions. Tasteful and performant — never gratuitous. Respect `prefers-reduced-motion`.
- **Depth & texture within monochrome:** subtle grain/noise, soft radial gradients, fine hairline borders, layered cards — to add richness without color.
- **No imagery of the person.** Visual interest comes from type, motion, spacing, and structure.
- Fully responsive; accessible (semantic landmarks, keyboard-navigable, sufficient contrast, reduced-motion fallback).

> When building the UI, use the `frontend-design` skill for distinctive, production-grade output — avoid generic AI aesthetics.

## 4. Tech & architecture

- **Framework:** Next.js 16, App Router, React 19.2, TypeScript (strict).
- **Styling:** Tailwind CSS v4 (PostCSS plugin; tokens in `app/globals.css` `@theme`). Dark-only palette defined here.
- **Content source:** hardcoded in typed TS modules (e.g. `app/data/` or `lib/content.ts`). No CMS, no MDX — content volume is small and static.
- **Animation:** pick a lightweight approach (CSS + IntersectionObserver, or a small lib like Framer Motion/`motion`) — decide at build time; keep bundle lean.
- **Analytics:** Vercel Analytics.
- **Assets:** résumé PDF moves to `public/` for download; favicon/OG image in `public/`.

## 5. Functional requirements

- **Contact form + direct contact.** Form UI built now; **email-delivery backend deferred** — wire a placeholder handler and choose the service (Resend vs Formspree/Web3Forms) before launch. Show email + LinkedIn + GitHub alongside the form.
- **Résumé download** — link to the PDF in `public/`.
- **SEO/meta** — replace the scaffold's "Create Next App" metadata: real `<title>`, description, Open Graph + Twitter tags, OG image, sitemap, robots, canonical `https://karankh.tech`.
- **No phone number** displayed anywhere.

## 6. Content (extracted from `assets/`)

### Identity
- **Name:** Karan Khatavkar
- **Role:** AI/ML Engineer — LLM, NLP & Deep Learning
- **Tagline:** "Building LLM apps, agents, and ML models for clients."
- **Bio:** Builds LLM systems for clients — agents, RAG pipelines, and fine-tuned NLP — backed by a deep-learning background in signals and imaging. Available for freelance and contract work.
- **Location:** Pune, India

### Contact (public)
- **Email:** work.karankh@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/karan-khatavkar/
- **GitHub:** https://github.com/karankhatavkar
- Phone: **not public**

### Skills
- **LLM & GenAI:** RAG, LangChain, LLMs (Llama, Mistral, GPT-4), Hugging Face, Ollama, Claude Agent Skills, prompt & context engineering, Gemini API, Chroma, FAISS
- **ML & Deep Learning:** PyTorch, TensorFlow/Keras, Transformers, BERT/BioBERT, CNNs (ResNet), VAEs, attention (CBAM, self-attention), Mixture Density Networks, scikit-learn, XGBoost, Random Forest, SHAP, signal processing (CWT scalograms, PSD), NumPy, Pandas
- **Serving & Infra:** FastAPI, Streamlit, Docker, Kubernetes, Azure, GitHub Actions, Git, Jupyter
- **Databases:** FAISS, Chroma, PostgreSQL, MongoDB, MySQL, InfluxDB (time-series)
- **Languages:** Python, JavaScript (React/Node), TypeScript, SQL, Java, Bash

### Experience
- **Amdocs Development Centre** — Software Developer · Aug 2022 – Jan 2025 · Pune
  - Built a LangChain RAG pipeline for technical-support queries; dynamic chunking cut token usage and improved accuracy on internal docs.
  - Fixed multi-turn context loss with a question-rephrasing step (rewrites follow-ups from history before FAISS retrieval); held up through UAT.
  - Built a dashboard to trace retrieval failures and tune BM25 hybrid-search weights, cutting hallucinated answers.
- **Sisai Technologies Pvt. Ltd.** — Project Intern · Mar–Jun 2021 & Oct 2021–May 2022 · Pune
  - InfluxDB pipeline ingesting real-time telemetry from 1,000+ industrial sensors.
  - Automated sensor-fault detection with Z-score anomaly detection.
  - React dashboard with role-based access for operational data and sensor health.

### Education
- **M.S. Ramaiah University of Applied Sciences** — M.Tech, AI & ML · GPA 9.4/10 · Jan 2025 – Present · Bengaluru
- **Dr. Vishwanath Karad MIT World Peace University** — B.Tech, Electronics & Communication · GPA 8.97/10 · Aug 2018 – Jul 2022 · Pune

### Certifications
- Azure Fundamentals (AZ-900), Azure AI Fundamentals (AI-900), Azure Data Fundamentals (DP-900)

### Projects (show all; lead with LLM/agent)
| Project | What it does | Tech | Link |
|---|---|---|---|
| Founder's Court | Claude Agent Skill that judges a startup idea across five stages, returns one verdict (~25% pass rate). | Claude · Agent Skills | github.com/karankhatavkar/founders-court |
| BioBERT Medical NER | Fine-tuned BioBERT for token-level clinical NER on MACCROBAT 2018 (~40 entity types, 78 BIO tags). | PyTorch · Hugging Face | github.com/karankhatavkar/biobert-medical-ner |
| Alzheimer's Detection from EEG | EEG → time-frequency scalograms; CNNs w/ CBAM, SE, self-attention vs PSD-feature trees (AD/CN/FTD); saliency + SHAP. | CNN · Attention · SHAP | github.com/karankhatavkar/alzheimer-eeg-classification |
| VAE Image Restoration | Variational autoencoders for inpainting on MNIST/COCO/CelebA; scored with PSNR & SSIM. | VAE · CNN | github.com/karankhatavkar/variational-autoencoders-image-restoration |
| Acoustic RUL | Digital-twin simulator for run-to-failure audio; predicts recoil-spring RUL via XGBoost, 2D CNN, 1D CNN. | Digital Twin · CNN | github.com/karankhatavkar/ak47-acoustic-rul |
| Predictive Maintenance | RUL on NASA bearings & PHM tool wear, validated on unseen machines/failure modes. | PyTorch · CNN-LSTM · TCN | github.com/karankhatavkar/predictive-maintenance-bearing-tool-wear |
| Customer Churn ANN | Feedforward net (~86%) predicting bank churn, served via Streamlit. | ANN · Streamlit | github.com/karankhatavkar/customer-churn-ann |

## 7. Deployment

- **Host:** Vercel.
- **Domain:** karankh.tech (owned). DNS managed on **Cloudflare** — add the CNAME/A record Vercel provides and set it to **DNS-only (grey cloud)** to avoid proxy conflicts with Vercel's TLS/edge.

## 8. Deferred / open

- Contact-form delivery backend (Resend vs Formspree/Web3Forms) — choose before launch.
- Animation library/approach — decide at build time.
- Design reference sites: none provided → follow "premium minimalism, dark, monochrome."
- OG/share image design.
- **Publication (MixVal, under review 2026)** — intentionally omitted for now; add later.

## 9. Out of scope (v1)

- Blog / writing section.
- CMS or MDX content pipeline.
- Light theme / theme toggle.
- Profile photography.
- Multi-language (i18n).
