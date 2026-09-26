/**
 * US-13: As a student or faculty member, I want to view a list of my past
 * notifications, so that I can check anything I may have missed.
 *
 * AC: most recent first; empty list shows a clear message; distinguishes
 * read vs unread.
 */

function getNotifications(userId, allNotifications) {
  const mine = allNotifications.filter((n) => n.userId === userId);

  if (mine.length === 0) {
    return { hasNotifications: false, message: "No notifications.", notifications: [] };
  }

  const sorted = [...mine].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return {
    hasNotifications: true,
    message: `${sorted.length} notification(s).`,
    notifications: sorted,
  };
}

module.exports = { getNotifications };
