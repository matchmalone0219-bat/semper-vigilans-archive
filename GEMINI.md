# Semper Vigilans Archive - AI Editorial Rules

This repository is a strict, evidence-based canonical archive for *The Batman* universe and *The Batman: Part II*. All AI agents, automated tasks, and contributors MUST follow these rules during content curation and code updates:

## 1. Direct Quotes: Literal Translations Only (严禁文学化改写)
- `quoteZh` must be an accurate, literal translation of `quoteEn`. Preserve the subject's authentic, conversational phrasing (e.g., "很有野心", "一次‘急转弯’（real left turn）", "剧本非常密（incredibly dense）").
- NEVER add decorative metaphors, rhetorical exaggerations, or subjective literary embellishments (e.g., do NOT write "另一重全新维度的探索", "出人意料的急转弯", "沉浸气质", "格局宏大得令人赞叹").

## 2. Analysis & Notes: Segregate to `note` with Prefix (【本站整理】)
- Contextual background, narrative connections, stylistic interpretations, and editorial observations belong exclusively in the `note` field.
- Every editorial note added by the archive must be prefixed with `【本站整理】` (or `[ARCHIVE CURATOR NOTE / 档案注记]`) to clearly distinguish firsthand evidence from secondary curation.

## 3. Provenance Architecture: Decouple Official from Extended (史料与扩展严格解耦)
- `historical`: Reserved STRICTLY for 100% authentic, historical artifacts officially released by Warner Bros. / DC in the 2021–2022 viral campaign (e.g., GCPD suspect sketches `SKETCH.IMG`, official cipher sheets `CIPHER.TXT`, `GOODBYE.TXT`).
- `extended`: Content curated by this fan archive for continuous web gameplay (e.g., movie stills, transitional riddles, fan tributes `TRIBUTE.TXT`). Must be labeled with `Archive Adaptation / 本站剧照适配` or `Archive Fan Tribute / 本站致敬扩展`.
- Data separation: Official historical texts and fan easter eggs must NEVER be merged into a single object or file. Keep them as distinct items.

## 4. Release Date & Fact Consistency (档期与事实强一致性)
- The official North American theatrical release date for *The Batman: Part II* is **February 18, 2028 (2028 年 2 月 18 日)**.
- This date must be completely unified across all files (`film.ts`, `recap.ts`, `rataalada.ts`, i18n dictionaries, and terminal logs). Never reintroduce outdated tentative dates (e.g., October 2028).

## 5. Reference & Quality Verification
- Full content specifications: see `CONTENT_GUIDE.md`.
- After every edit, verify:
  ```bash
  npm run typecheck
  npm test
  npm run content:check
  npm run i18n:check
  npm run media:check
  npm run build:github-pages
  ```
