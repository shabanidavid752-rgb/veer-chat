// Seed contact list — a mock Firebase RTDB shape so swapping in the real
// backend later is a one-line change per screen.
export const CURRENT_USER = {
  name: 'You',
  phone: '+1 555 0100',
  status: 'Online',
};

export const CONTACTS = [
  { id: 'c1', name: 'Asha', phone: '+1 555 0182', online: true, lastMsg: 'Sending you the 4K clip now', time: 'now', unread: 2 },
  { id: 'c2', name: 'Rohan Mehta', phone: '+1 555 0114', online: true, lastMsg: 'You: call tonight? 📹', time: '2m', unread: 0 },
  { id: 'c3', name: 'Design Crew', phone: 'group · 4 members', online: false, lastMsg: 'Priya: renders are up', time: '9m', unread: 5 },
  { id: 'c4', name: 'Priya Sharma', phone: '+1 555 0139', online: false, lastMsg: 'HD photos look unreal ✨', time: '12m', unread: 0 },
  { id: 'c5', name: 'Dev Team', phone: 'group · 4 members', online: true, lastMsg: 'Asha: pushing the build', time: '31m', unread: 0 },
  { id: 'c6', name: 'Marco Silva', phone: '+1 555 0170', online: false, lastMsg: 'You: 🎥', time: '1h', unread: 0 },
  { id: 'c7', name: 'Lena Fischer', phone: '+1 555 0126', online: true, lastMsg: 'Voice note · 0:42', time: '3h', unread: 0 },
  { id: 'c8', name: 'Family', phone: 'group · 4 members', online: false, lastMsg: 'Mom: dinner at 8?', time: '5h', unread: 0 },
];

// Participants for the group video call screen (4 tiles incl. You)
export const GROUP_PARTICIPANTS = [
  { id: 'g1', name: 'Asha', online: true, speaking: true },
  { id: 'g2', name: 'Rohan', online: true, speaking: false },
  { id: 'g3', name: 'Priya', online: true, speaking: false },
  { id: 'g4', name: 'You', online: true, speaking: false, self: true },
];

// Gallery items for the HD Media page
export const MEDIA = [
  { id: 'm1', type: 'video', label: 'Sunset_Timelapse_4K', meta: '4K · 2160p · 384 MB', duration: '0:48' },
  { id: 'm2', type: 'image', label: 'Concert_Raw', meta: '4032×3024 · 12.4 MB' },
  { id: 'm3', type: 'video', label: 'Skate_Line_HD', meta: '1080p · 240 MB', duration: '1:12' },
  { id: 'm4', type: 'image', label: 'Portrait_Raw', meta: '4032×3024 · 11.8 MB' },
  { id: 'm5', type: 'video', label: 'Drone_Run_4K', meta: '4K · 2160p · 512 MB', duration: '2:05' },
  { id: 'm6', type: 'image', label: 'Street_Night', meta: '4000×6000 · 14.1 MB' },
];
