# UMS Increment — XP Practice Starter (Q7)

Covers: Timetable Management, Result/Grade Management, Notifications
Team: Fasih Siddeeq (25F-3074), Huzaifa Siddiqi (25F-3071)

## Setup
```
npm install
npm test
```

## How each file maps to your XP evidence (Q7)

### 1. Pair Programming (Q7-a)
Work through `src/clashDetector.js` together on a call/in person:
one of you types (Driver), the other reviews/directs (Navigator). Switch
roles halfway (e.g., Fasih drives the `hasClash` filter logic, then you
swap and Huzaifa drives the `sharesResource` helper). Log this in your
report table: Driver, Navigator, task, duration, outcome — a screenshot
alone is not enough evidence per the assignment; the session log matters.

### 2. Test-Driven Development (Q7-b)
`test/clashDetector.test.js` is written first.
1. Temporarily comment out the body of `hasClash` in `src/clashDetector.js`
   (or delete `src/clashDetector.js` entirely) and run `npm test` —
   screenshot the RED (failing) output.
2. Restore/write the implementation, run `npm test` again — screenshot GREEN.
3. Run it once more as final verification, and commit both files together
   with a message like `feat(US-04): add clash detection with TDD`.

### 3. Refactoring (Q7-c)
- **Before:** `src/gradeValidator.before.js` — one function mixing parsing,
  validation, and formatting.
- **Refactor performed:** split into `parseMarks`, `isValidRange`,
  `assignGradeLetter`.
- **After:** `src/gradeValidator.after.js`.
- **Verification:** `test/gradeValidator.test.js` runs the identical case
  list against both versions — run `npm test` and screenshot both
  "BEFORE implementation" and "AFTER implementation" blocks passing.

### 4. Continuous Integration (Q7-d)
`.github/workflows/ci.yml` runs `npm test` automatically on every push/PR
to `main`. Push this repo to a real GitHub repository, make a small commit
(e.g. adding a comment or a new test case), and screenshot the green check
under the "Actions" tab. In your report, briefly explain that frequent
integration + an automated test run catches breakages (like a bad merge)
right after they happen, instead of days later at the end of a sprint.

### 5. Evidence statements (Q7-e)
For each practice, write one short paragraph in the report:
*what was done → what artifact proves it (file/commit/screenshot) →
what outcome resulted* (e.g., "Pair programming on clash detection logic
caught an off-by-one boundary bug during navigation, before it was committed").

## Suggested commit history (for genuine, incremental evidence)
```
git init
git add package.json .gitignore README.md
git commit -m "chore: project setup"

git add test/clashDetector.test.js
git commit -m "test(US-04): add failing clash detection tests (RED)"

git add src/clashDetector.js
git commit -m "feat(US-04): implement clash detection to pass tests (GREEN)"

git add src/gradeValidator.before.js test/gradeValidator.test.js
git commit -m "feat(US-06): add grade validator with baseline tests"

git add src/gradeValidator.after.js
git commit -m "refactor(US-06): split grade validator into pure functions"

git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions test workflow"
```
Space these commits out over your real working sessions rather than
pushing them all at once — commit timestamps are part of your evidence.
