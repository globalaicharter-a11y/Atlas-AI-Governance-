# Atlas Education — Global Learning (D01–D04)

Build-ready source package for the Atlas Education Global Learning application. The canonical Google AI Build inputs remain at the repository root so they can be selected and uploaded together without path ambiguity.

## Package contents

- `00_UI_SHELL.json` — authoritative application shell, routes, theme, rendering and assessment contracts.
- `D01_FULL_CONTENT.json`–`D04_FULL_CONTENT.json` — complete domain objects and checkpoint quizzes.
- `FINAL_ASSESSMENT_FULL.json` — complete final assessment configuration and 200-question bank.
- `GOOGLE_AI_BUILD_FULL_CONTENT_PROMPT.txt` — build brief and non-negotiable preservation/release requirements.
- `PACKAGE_MANIFEST.json` — original source and per-file size/SHA-256 checksums.
- `Atlas_AI_Governance_Cycle_Study_Edition_v7_Professional_Chapter_Aligned.md` and `Atlas_AI_Governance_Cycle_v7_Professional_Alignment_Audit.md` — supplementary professional alignment materials.
- `scripts/validate_package.py` — local integrity and completeness check.

## Google AI Build handoff

1. Start a new application in Google AI Studio Build.
2. Upload the six JSON inputs, the manifest, and `GOOGLE_AI_BUILD_FULL_CONTENT_PROMPT.txt` from the repository root. Use the prompt as the build instructions; do not ask the model to recreate the source content from this README.
3. Keep the canonical JSON files as source data and load domain packages on demand, as directed by the prompt. Do not inline or summarize the assessment answer key in learner-facing pages.
4. After generation, verify `/about`, domain/module navigation, checkpoints, the randomized final assessment, certificate eligibility, and responsive/accessibility behavior against `00_UI_SHELL.json` and its release gates.
5. Run `python3 scripts/validate_package.py` before changes and after any package-file updates. A passing local check validates input integrity, not a generated application's runtime behavior; separately test the app in Google AI Studio Build preview.

## Preservation and release notes

The six canonical JSON inputs are preserved exactly as supplied. The build prompt requires exact rendering, on-demand loading, a strict `scorePercent > 75` pass rule, and withholding answer keys/explanations/rubrics until submission. Do not claim accreditation, government approval, university credit, or external certification unless independently verified and authorized by Atlas Education. Complete the institutional pre-release gates before public release.
