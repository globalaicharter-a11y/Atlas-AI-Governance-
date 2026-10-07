#!/usr/bin/env python3
"""Validate the supplied Atlas Education package without modifying source files."""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "PACKAGE_MANIFEST.json"
DOMAIN_FILES = [f"D{i:02d}_FULL_CONTENT.json" for i in range(1, 5)]
ASSESSMENT_FILE = "FINAL_ASSESSMENT_FULL.json"


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def main() -> int:
    errors: list[str] = []
    manifest = load_json(MANIFEST)

    for filename, expected in manifest["packages"].items():
        path = ROOT / filename
        if not path.is_file():
            errors.append(f"Missing manifest package: {filename}")
            continue
        raw = path.read_bytes()
        if len(raw) != expected["bytes"]:
            errors.append(f"Byte-size mismatch: {filename}")
        if hashlib.sha256(raw).hexdigest() != expected["sha256"]:
            errors.append(f"SHA-256 mismatch: {filename}")
        try:
            json.loads(raw)
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            errors.append(f"Invalid JSON: {filename}: {exc}")

    module_total = 0
    for index, filename in enumerate(DOMAIN_FILES, start=1):
        path = ROOT / filename
        if not path.is_file():
            errors.append(f"Missing domain package: {filename}")
            continue
        data = load_json(path)
        domain = data.get("domain", {})
        modules = domain.get("modules", [])
        module_total += len(modules)
        expected_id = f"D{index:02d}"
        if domain.get("id") != expected_id:
            errors.append(f"{filename}: expected domain id {expected_id}, got {domain.get('id')!r}")
        if domain.get("moduleCount") != len(modules):
            errors.append(f"{filename}: moduleCount does not match actual modules")
        if not modules:
            errors.append(f"{filename}: no modules found")
        quiz = data.get("checkpointQuiz", {})
        if not quiz.get("questions"):
            errors.append(f"{filename}: checkpoint quiz has no questions")

    assessment = load_json(ROOT / ASSESSMENT_FILE).get("finalAssessment", {})
    question_count = len(assessment.get("questionBank", []))
    if question_count != 200:
        errors.append(f"Expected 200 final assessment questions, found {question_count}")
    if assessment.get("questionBankSize") != question_count:
        errors.append("Final assessment questionBankSize does not match the question bank")

    if errors:
        print("PACKAGE VALIDATION: FAIL")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PACKAGE VALIDATION: PASS")
    print(f"- Manifest checksums and byte sizes: {len(manifest['packages'])} packages verified")
    print(f"- Domains: {len(DOMAIN_FILES)}; modules: {module_total}")
    print(f"- Final assessment questions: {question_count}")
    print("- Source JSON files were read only; no package content was rewritten.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
