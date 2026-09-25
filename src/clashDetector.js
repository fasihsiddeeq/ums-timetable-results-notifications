/**
 * US-04: Detect scheduling clashes for a new/edited timetable entry
 * against existing entries, for the same room, section, or faculty member.
 *
 * Entry shape:
 * { id, day, startTime: "HH:MM", endTime: "HH:MM", room, section, faculty }
 */

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function timesOverlap(aStart, aEnd, bStart, bEnd) {
  // Strict overlap: back-to-back slots (aEnd === bStart) do NOT count as a clash.
  return aStart < bEnd && bStart < aEnd;
}

function sharesResource(a, b) {
  return a.room === b.room || a.faculty === b.faculty || a.section === b.section;
}

/**
 * Returns an array of existing entries that conflict with newEntry.
 * An empty array means no clash.
 */
function hasClash(newEntry, existingEntries) {

  const newStart = timeToMinutes(newEntry.startTime);
  const newEnd = timeToMinutes(newEntry.endTime);

  return existingEntries.filter((existing) => {
    if (existing.day !== newEntry.day) return false;
    if (existing.id === newEntry.id) return false; // don't clash with self when editing

    const exStart = timeToMinutes(existing.startTime);
    const exEnd = timeToMinutes(existing.endTime);

    if (!timesOverlap(newStart, newEnd, exStart, exEnd)) return false;

    return sharesResource(newEntry, existing);
     
  });
}

module.exports = { hasClash, timeToMinutes, timesOverlap, sharesResource };
