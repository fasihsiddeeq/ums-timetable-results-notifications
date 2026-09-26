/**
 * US-08: As a student, I want to view my published results, so that I know
 * my academic performance.
 *
 * AC: only the student's own PUBLISHED results are shown; unpublished/pending
 * ones return a "not yet available" message instead of being visible.
 */

function getPublishedResults(studentId, allResults) {
  const published = allResults.filter(
    (r) => r.studentId === studentId && r.status === "published"
  );

  if (published.length === 0) {
    return { hasResults: false, message: "No published results available yet.", results: [] };
  }

  return {
    hasResults: true,
    message: `${published.length} published result(s) found.`,
    results: published.map((r) => ({
      course: r.course,
      grade: r.grade,
      creditHours: r.creditHours,
    })),
  };
}

module.exports = { getPublishedResults };
