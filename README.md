# gh-preadmission-lens

Gravitate-Health Lens that adds pre-admission safety cues for patients with heart failure taking Furosemide. When selected, it injects a questionnaire link into the relevant ePI section or, if no matching section is found, inserts an emergency-warning banner at the top of the page.

## What Is a Lens?

Lenses are FHIR Library resources containing JavaScript that runs inside the Lens Execution Environment (LEE). They use inputs like the preprocessed ePI HTML, the ePI bundle, IPS, and an optional persona vector to highlight or enrich regulated ePI content without altering the original text.

## What This Lens Does

- Runs only when the ePI bundle or product identifier matches a known allowlist.
- Reads category codes from `Composition.extension` (`grav-5` in `https://www.gravitatehealth.eu/sid/doc`) and maps them to HTML class names.
- If a matching class exists in the HTML, wraps that section with a link to a safety questionnaire (`https://example.org/questionnaire/high-risk`).
- If no matching class is found, inserts a localized warning banner for heart failure patients taking Furosemide at the top of the page.
- Injects a single emergency-support script that posts to a placeholder endpoint when the banner button is clicked.
- Localizes strings based on `Composition.language` (fallback to bundle language, then English).

## Inputs and Output

- Inputs: `html` (preprocessed ePI HTML), `epi` (ePI bundle), `ips` (patient summary), `pv` (persona vector, optional).
- Output: modified HTML string (body contents).

## Triggering Logic (Current Allowlist)

- Bundle identifiers: `epibundle-123`, `epibundle-abc`.
- Product identifiers (MedicinalProductDefinition): `CIT-204447`, `RIS-197361`.
- Category code: `grav-5` in `https://www.gravitatehealth.eu/sid/doc`.
- Lens spec version: `1.0.0-preadmission-banner`.

## Files

- `preadmission-lens.js`: lens logic.
- `preadmission-lens.json`: FHIR Library packaging.
- `data/`: sample inputs.
- `test/`: Jest tests for banner vs. in-section link behavior.

## Notes

- The emergency endpoint (`https://your-api.example.com/emergency`) and questionnaire URL are placeholders and should be replaced for production deployments.

