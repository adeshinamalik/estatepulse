
// This file contains mock data for the EstatePulse app
// In a real implementation, this would be replaced with Firebase Firestore calls

// Amenity Data
export const amenityData = {
  power: {
    status: "On",
    hoursToday: 6.5,
    lastUpdated: "2025-04-15T08:00:00Z"
  },
  water: {
    tankLevel: 50,
    quality: "Safe",
    lastUpdated: "2025-04-15T08:30:00Z"
  },
  security: {
    gateStatus: "Secure",
    lastActivity: "2025-04-15T07:45:00Z"
  }
};

// Announcements Data
export const announcementsData = [
  {
    id: "1",
    title: "Power Maintenance",
    message: "Generator will be off for maintenance on April 16, 2025 from 2-4 PM.",
    isPinned: true,
    postedAt: "2025-04-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Water Tank Cleaning",
    message: "Water supply will be temporarily interrupted on April 17, 2025 from 9-11 AM for tank cleaning.",
    isPinned: false,
    postedAt: "2025-04-14T14:30:00Z"
  },
  {
    id: "3",
    title: "Security Update",
    message: "New security personnel will be on duty starting April 18, 2025. Please ensure you have your ID card for verification.",
    isPinned: true,
    postedAt: "2025-04-13T09:15:00Z"
  },
  {
    id: "4",
    title: "Dues Reminder",
    message: "Please pay your monthly maintenance dues by April 20, 2025 to avoid late fees.",
    isPinned: false,
    postedAt: "2025-04-12T11:45:00Z"
  }
];

// Issues Data
export const issuesData = [
  {
    id: "issue1",
    block: "Hostel A",
    room: "Room 5",
    amenity: "Power",
    description: "No power in my room since yesterday evening.",
    photo: null,
    status: "Open",
    submittedAt: "2025-04-14T18:30:00Z"
  },
  {
    id: "issue2",
    block: "Hostel B",
    room: "Room 12",
    amenity: "Water",
    description: "Low water pressure in bathroom.",
    photo: null,
    status: "Open",
    submittedAt: "2025-04-15T09:15:00Z"
  },
  {
    id: "issue3",
    block: "Block C",
    room: "Room 3",
    amenity: "Security",
    description: "Gate was left open overnight.",
    photo: null,
    status: "Resolved",
    submittedAt: "2025-04-13T22:45:00Z"
  }
];

// Payments Data
export const paymentsData = [
  {
    id: "pay1",
    block: "Hostel A",
    room: "Room 5",
    amount: 10000,
    status: "Paid",
    dueDate: "2025-04-30T00:00:00Z",
    paidAt: "2025-04-10T14:20:00Z"
  },
  {
    id: "pay2",
    block: "Hostel B",
    room: "Room 12",
    amount: 10000,
    status: "Overdue",
    dueDate: "2025-03-31T00:00:00Z",
    paidAt: null
  },
  {
    id: "pay3",
    block: "Block C",
    room: "Room 3",
    amount: 15000,
    status: "Paid",
    dueDate: "2025-04-30T00:00:00Z",
    paidAt: "2025-04-05T11:30:00Z"
  }
];

// Format date for display
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
