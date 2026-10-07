# Google AI Build — Compact Master Prompt

**Before using:** Import `globalaicharter-a11y/Atlas-AI-Governance-` into Google AI Studio Build, or upload this folder. A private GitHub link alone does not give Build access. Do not paste the course JSON into chat.

## Prompt to paste into Build

Create a runnable, responsive Atlas Education Global Learning app from the source files under `education/atlas-global-learning/`.

**What is included:** `00_UI_SHELL.json` (UI/routes/branding/auth/certificate contract); `D01_FULL_CONTENT.json`–`D04_FULL_CONTENT.json` (4 domains, 60 modules, checkpoint quizzes); `FINAL_ASSESSMENT_FULL.json` (200 questions); `PACKAGE_MANIFEST.json` (integrity hashes); `GOOGLE_AI_BUILD_FULL_CONTENT_PROMPT.txt` (content rules); study-edition and alignment-audit Markdown; `scripts/validate_package.py` (source validator).

**What is not included:** a finished web app, `package.json`/app scaffold, backend, configured authentication, or trusted assessment/certificate service. Build the app in the current AI Studio workspace. Do not assume private-repo access, backend services, or working auth. If the source files are not visible, stop and ask me to import/upload them; do not invent course content.

First inspect the shell and existing workspace. Run `python3 education/atlas-global-learning/scripts/validate_package.py` if available. Keep all source JSON read-only; do not paste, rewrite, summarize, duplicate, or inline its contents into code/chat. Load real JSON data by file at runtime, preferably on demand per domain/module and only load the final bank on the assessment route. Do not show validation metadata to learners.

Implement routes from `00_UI_SHELL.json`: home, `/about`, `/course`, domain, module, each domain’s `/checkpoint-10`, `/assessment/final`, and gated certificate preview/view. Render all 4 domains and 60 complete modules in source order, including activities, cases, knowledge checks, reflections, applications, sources and assessments. Use the shell’s light professional theme, embedded logo, accessible navigation and responsive layout. `/about` must use the exact stored creator bio and the two stored profile links; invent no accreditation claims.

Use each packaged five-question checkpoint after its domain’s 10th module. Build 50-question final attempts from the 200-question bank with no duplicates, all four domains and all eight configured formats. Preserve format/scoring rules. Never expose answers, explanations or rubrics before submission. Passing is strictly `scorePercent > 75` (76 passes; 75 fails).

Use authenticated `auth.currentUser` only if actually configured. Certificate requires every source-defined completion/review condition and verified identity. Since no trusted backend is included, do not claim secure grading or issue a real certificate from client-only state; keep issuance disabled and state what backend/auth setup is missing.

Build in the existing AI Studio project, run its available build/preview checks, fix errors, and report briefly: routes/features completed, tests actually run, and remaining backend/auth/release gates. Do not publish. Never claim a test passed unless run.

Before finalizing, rerun the package validator. The six JSON checksums must remain unchanged; fix app code rather than source data if anything fails.