// Mock data for the demo application

export const CARS = [
  { id: 'car-1', name: 'VW Golf', plate: 'B-AB 1234' },
  { id: 'car-2', name: 'Toyota Corolla', plate: 'B-CD 5678' },
  { id: 'car-3', name: 'Skoda Octavia', plate: 'B-EF 9012' }
];

export const EMPLOYEES = [
  { id: 'emp-1', name: 'Anna Schmidt', role: 'sales' },
  { id: 'emp-2', name: 'Michael Weber', role: 'sales' },
  { id: 'emp-3', name: 'Sarah Klein', role: 'sales' },
  { id: 'emp-4', name: 'Thomas Müller', role: 'sales' },
  { id: 'emp-5', name: 'Julia Becker', role: 'manager' }
];

export const INITIAL_CAR_RESERVATIONS = [
  {
    id: 'res-1',
    carId: 'car-1',
    carName: 'VW Golf',
    employeeName: 'Anna Schmidt',
    startDate: '2025-12-17T09:00',
    endDate: '2025-12-17T17:00',
    purpose: 'Client meeting in Frankfurt'
  },
  {
    id: 'res-2',
    carId: 'car-2',
    carName: 'Toyota Corolla',
    employeeName: 'Michael Weber',
    startDate: '2025-12-18T08:00',
    endDate: '2025-12-18T16:00',
    purpose: 'Book fair preparation'
  },
  {
    id: 'res-3',
    carId: 'car-1',
    carName: 'VW Golf',
    employeeName: 'Sarah Klein',
    startDate: '2025-12-19T10:00',
    endDate: '2025-12-19T15:00',
    purpose: 'Author meeting in Berlin'
  },
  {
    id: 'res-4',
    carId: 'car-3',
    carName: 'Skoda Octavia',
    employeeName: 'Thomas Müller',
    startDate: '2025-12-20T09:00',
    endDate: '2025-12-20T18:00',
    purpose: 'Bookstore visits'
  }
];

export const INITIAL_SALES_RECORDS = [
  // November 2025
  { id: 's-1', repName: 'Anna Schmidt', productName: 'Business Guide 2025', quantity: 45, revenue: 1350, date: '2025-11-05', month: '2025-11' },
  { id: 's-2', repName: 'Michael Weber', productName: 'Marketing Handbook', quantity: 32, revenue: 960, date: '2025-11-08', month: '2025-11' },
  { id: 's-3', repName: 'Sarah Klein', productName: 'Tech Trends', quantity: 28, revenue: 1120, date: '2025-11-12', month: '2025-11' },
  { id: 's-4', repName: 'Thomas Müller', productName: 'Leadership Stories', quantity: 38, revenue: 1140, date: '2025-11-15', month: '2025-11' },
  { id: 's-5', repName: 'Anna Schmidt', productName: 'Sales Masterclass', quantity: 52, revenue: 2080, date: '2025-11-20', month: '2025-11' },
  { id: 's-6', repName: 'Michael Weber', productName: 'Digital Strategy', quantity: 41, revenue: 1640, date: '2025-11-22', month: '2025-11' },

  // December 2025
  { id: 's-7', repName: 'Sarah Klein', productName: 'Business Guide 2025', quantity: 38, revenue: 1140, date: '2025-12-03', month: '2025-12' },
  { id: 's-8', repName: 'Thomas Müller', productName: 'Marketing Handbook', quantity: 44, revenue: 1320, date: '2025-12-05', month: '2025-12' },
  { id: 's-9', repName: 'Anna Schmidt', productName: 'Tech Trends', quantity: 55, revenue: 2200, date: '2025-12-08', month: '2025-12' },
  { id: 's-10', repName: 'Michael Weber', productName: 'Leadership Stories', quantity: 36, revenue: 1080, date: '2025-12-10', month: '2025-12' },
  { id: 's-11', repName: 'Sarah Klein', productName: 'Sales Masterclass', quantity: 48, revenue: 1920, date: '2025-12-12', month: '2025-12' },
  { id: 's-12', repName: 'Thomas Müller', productName: 'Digital Strategy', quantity: 39, revenue: 1560, date: '2025-12-15', month: '2025-12' },
  { id: 's-13', repName: 'Anna Schmidt', productName: 'Business Guide 2025', quantity: 42, revenue: 1260, date: '2025-12-16', month: '2025-12' }
];

export const INITIAL_AUTHOR_PAYMENTS = [
  {
    id: 'ap-1',
    authorName: 'Dr. Klaus Fischer',
    bookTitle: 'Business Guide 2025',
    amountDue: 3500,
    status: 'paid',
    dueDate: '2025-11-30',
    paidDate: '2025-11-28'
  },
  {
    id: 'ap-2',
    authorName: 'Lisa Hoffmann',
    bookTitle: 'Marketing Handbook',
    amountDue: 2800,
    status: 'due',
    dueDate: '2025-12-15',
    paidDate: null
  },
  {
    id: 'ap-3',
    authorName: 'Stefan Berg',
    bookTitle: 'Tech Trends',
    amountDue: 4200,
    status: 'due',
    dueDate: '2025-12-20',
    paidDate: null
  },
  {
    id: 'ap-4',
    authorName: 'Maria Schneider',
    bookTitle: 'Leadership Stories',
    amountDue: 3100,
    status: 'overdue',
    dueDate: '2025-12-05',
    paidDate: null
  },
  {
    id: 'ap-5',
    authorName: 'Robert Wagner',
    bookTitle: 'Sales Masterclass',
    amountDue: 5000,
    status: 'paid',
    dueDate: '2025-11-20',
    paidDate: '2025-11-18'
  },
  {
    id: 'ap-6',
    authorName: 'Nina Krause',
    bookTitle: 'Digital Strategy',
    amountDue: 3800,
    status: 'due',
    dueDate: '2025-12-28',
    paidDate: null
  }
];
