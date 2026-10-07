# Google AI Build — Master Prompt

Paste the prompt below into Google AI Studio Build **after importing this private repository into the Build workspace or uploading the referenced files**. A private GitHub URL by itself does not grant Build access.

---

## Prompt to paste into Google AI Studio Build

Build a complete, runnable, responsive web application for **Atlas Education — Global Learning: AI Governance Professional (D01–D04)** using the existing project scaffold and the source files in:

`education/atlas-global-learning/`

### 1. Verify source access before coding

First inspect these exact files in the imported repository/workspace:

- `00_UI_SHELL.json`
- `D01_FULL_CONTENT.json`
- `D02_FULL_CONTENT.json`
- `D03_FULL_CONTENT.json`
- `D04_FULL_CONTENT.json`
- `FINAL_ASSESSMENT_FULL.json`
- `PACKAGE_MANIFEST.json`
- `GOOGLE_AI_BUILD_FULL_CONTENT_PROMPT.txt`
- `scripts/validate_package.py`

Also inspect the existing app scaffold and its package scripts before choosing or changing the architecture. If the files are not actually available in your workspace, stop and clearly ask me to import the repository or upload the files. Do not pretend you read a URL you cannot access, and do not generate substitute course content.

Before implementation, parse the JSON, verify the six manifest checksums and byte sizes, confirm four domains with 15 modules each (60 total), and confirm the final assessment question bank has 200 questions. Run `python3 scripts/validate_package.py` if Python is available. Report any discrepancy and do not silently repair or rewrite the source files.

### 2. Source of truth and preservation

Treat `00_UI_SHELL.json` as the authoritative UI, route, branding, rendering, accessibility, authentication, certificate and release contract. Treat D01–D04 and `FINAL_ASSESSMENT_FULL.json` as canonical content data. Follow `GOOGLE_AI_BUILD_FULL_CONTENT_PROMPT.txt` as a companion specification, subject to these requirements.

Do not summarize, paraphrase, translate, truncate, normalize, delete, reorder or invent content inside the supplied source JSON. Render every original domain, module and checkpoint field from the stored data. Keep source JSON files unchanged. You may write application code and non-destructive data-loading adapters, but adapters must not change the source objects or omit learner-facing fields. Preserve module and section order. Do not show internal validation/checksum fields as course content.

Load the UI shell at startup and load domain content on demand by domain/module ID. Load the final assessment only when the learner opens it. Use the real files and real fields—no mock course copy, placeholder modules, invented answers or fake progress in the finished learner flow.

### 3. Implement the full application

Implement the actual working app in the existing framework; do not return only a plan, mockup, static description or partial prototype. Follow the route definitions in `00_UI_SHELL.json`, including:

- `/` — course home
- `/about` — About Atlas Education
- `/course` — four-domain catalogue
- `/course/:domainId` — domain overview and ordered module list
- `/course/:domainId/:moduleId` — complete module learning page
- `/course/:domainId/checkpoint-10` — that domain’s checkpoint quiz
- `/assessment/final` — final assessment
- `/certificate/preview` and `/certificate/:certificateId` — gated certificate preview/view

Use domain cards first, then module cards in sequence order. Each module page must render the full stored module object, including `whyThisMatters`, learning objectives, content sections, activities, cases, knowledge checks, reflections, professional application, sources, assessment and next-module preparation when present. Preserve arrays as ordered lists/cards; make source URLs clickable. Add breadcrumbs, clear previous/next navigation, completion tracking, usable loading/error/empty states and a course progress view. Do not hide content behind inaccessible interactions.

Use the shell’s light professional international theme: white/light-gray surfaces, navy and blue text, restrained antique-gold accents, and the specified typography/branding. Use `branding.logo.dataUri` where supported. Keep the layout polished and responsive on desktop, tablet and mobile. Meet the shell’s accessibility targets: semantic landmarks and headings, keyboard operation, visible focus, labels, meaningful alt text, sufficient contrast, no color-only meaning, and reduced-motion support.

### 4. About page and creator profile

Render `/about` from `aboutPage` in `00_UI_SHELL.json`. Preserve the creator bio exactly as stored (300–400 words), including the exact name, title, affiliation and location. Add the exact buttons and URLs from the source:

- “View Author Profile” → `https://nafiulahmadrafi.com`
- “Visit Atlas AI Institute” → `https://atlasai.institute`

Open external links in a new tab with safe link attributes. Do not invent accreditation, government approval, university credit or external certification claims.

### 5. Checkpoints, final assessment and answer security

Render the supplied checkpoint quiz after module 10 of its domain, using that domain package’s exact checkpoint quiz object and all its questions. Do not create substitute checkpoint questions.

Use the complete 200-question `questionBank` from `FINAL_ASSESSMENT_FULL.json` to generate learner-specific final attempts of 50 questions, without duplicate question IDs, covering all four domains and following the configured blueprint, delivery and format rules. Support all eight original formats: single choice, multiple select, true/false, short written, scenario written, matching, ordering and evidence review. Keep required response formats, word limits, required artifacts, rubric/scoring semantics and matching/ordering relationships intact. Randomize only where the assessment configuration permits; do not break answer-option/item associations.

Never expose `answerKey`, `explanation` or scoring rubric to a learner before submission. Give the learner a final-submit confirmation. Show feedback only after submission, as permitted by the shell. Apply the exact strict pass rule everywhere: `scorePercent > 75`; 76% passes and 75% fails. Do not substitute `>= 75`.

Keep answer material and authoritative scoring server-side or teacher-only in production. If this Build environment provides no trusted backend, be explicit about that limitation: do not claim client-only grading or a client-side flag is secure, and do not issue an official certificate based solely on client-controlled state. Save written drafts only through the configured backend or local draft storage; never collect unnecessary sensitive data.

### 6. Identity, progress and certificate gate

Use the authenticated `auth.currentUser` profile available in the project. Bind the visible certificate name to `displayName`, falling back only to verified `givenName + familyName`; never use email as the displayed learner name. Track progress per learner, autosave written drafts using supported storage, and avoid leaking one learner’s progress to another.

Keep the certificate locked unless every condition in `certificateEligibility` is true: all 60 modules complete; all four checkpoint quizzes completed and passed above 75%; final assessment passed above 75%; required written/scenario/evidence reviews completed; authenticated identity and required certificate data present. Render the certificate only when `certificateEligibility.isEligible === true`. Use `certificateDesign`, the embedded logo and dynamic learner/certificate/date fields; never hard-code a person, date or certificate ID. If trusted identity or server-side eligibility verification is unavailable, keep issuance disabled and explain the setup requirement rather than faking eligibility.

### 7. Build, test and report

After implementation, run the project’s actual install/build/test commands (inspect `package.json` first), fix compile/runtime errors, and use the Build preview to test:

1. Every route above loads and navigation works.
2. Four domains and all 60 modules render from the canonical files; no source module is missing or duplicated.
3. Each domain’s checkpoint appears after its tenth module and uses its packaged questions.
4. A final attempt has 50 unique questions, covers all four domains and handles all eight formats; answer keys/explanations remain hidden until submission.
5. Strict pass/fail boundary: 75% fails; 76% passes.
6. About-page bio and both external links match the shell exactly.
7. Certificate remains locked when any eligibility condition is false and cannot be issued from a client-only flag.
8. Keyboard accessibility and responsive layouts work at mobile, tablet and desktop widths.
9. The JSON sources still pass `python3 scripts/validate_package.py` and their manifest checksums remain unchanged.

Fix all issues you can within the existing scaffold. Do not publish or claim institutional approval. In your final response, state what was implemented, tests actually run and passed/failed, any required backend/auth setup that remains, and any release gates still awaiting Atlas Education review. Never claim a test passed unless you actually ran it.
