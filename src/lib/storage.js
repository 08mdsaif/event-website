const KEYS = {
  registrations: 'campusfest_registrations',
  announcements: 'campusfest_announcements',
};

const DATA_EVENT = 'campusfest:data-updated';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function notifyDataChanged() {
  window.dispatchEvent(new Event(DATA_EVENT));
}

export function subscribeToDataUpdates(callback) {
  const handleStorage = (event) => {
    if (!event.key || Object.values(KEYS).includes(event.key)) {
      callback();
    }
  };

  window.addEventListener(DATA_EVENT, callback);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(DATA_EVENT, callback);
    window.removeEventListener('storage', handleStorage);
  };
}

export const defaultAnnouncements = [
  'Hackathon reporting at 10:15 AM in Lab Block A.',
  'Dance battle auditions close tonight at 9 PM.',
  'Volunteer orientation starts at 8:30 AM tomorrow.',
];

export function getAnnouncements() {
  return readJson(KEYS.announcements, defaultAnnouncements);
}

export function addAnnouncement(message) {
  const text = message.trim();
  if (!text) return;
  const current = getAnnouncements();
  writeJson(KEYS.announcements, [text, ...current].slice(0, 10));
  notifyDataChanged();
}

export function getRegistrations() {
  return readJson(KEYS.registrations, []);
}

export function addRegistration(registration) {
  const current = getRegistrations();
  writeJson(KEYS.registrations, [registration, ...current]);
  notifyDataChanged();
}
