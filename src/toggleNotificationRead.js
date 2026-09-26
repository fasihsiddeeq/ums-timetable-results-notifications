/**
 * US-14: As a student or faculty member, I want to mark a notification as
 * read/unread, so that I can manage which updates I still need to review.
 *
 * AC: toggling one notification doesn't affect others.
 */

function toggleNotificationRead(notificationId, allNotifications) {
  return allNotifications.map((n) =>
    n.id === notificationId ? { ...n, read: !n.read } : n
  );
}

module.exports = { toggleNotificationRead };
