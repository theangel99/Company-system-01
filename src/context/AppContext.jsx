import { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CAR_RESERVATIONS,
  INITIAL_SALES_RECORDS,
  INITIAL_AUTHOR_PAYMENTS,
  CARS,
  EMPLOYEES
} from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or use mock data
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : { role: 'manager', name: 'Julia Becker' };
  });

  const [carReservations, setCarReservations] = useState(() => {
    const saved = localStorage.getItem('carReservations');
    return saved ? JSON.parse(saved) : INITIAL_CAR_RESERVATIONS;
  });

  const [salesRecords, setSalesRecords] = useState(() => {
    const saved = localStorage.getItem('salesRecords');
    return saved ? JSON.parse(saved) : INITIAL_SALES_RECORDS;
  });

  const [authorPayments, setAuthorPayments] = useState(() => {
    const saved = localStorage.getItem('authorPayments');
    return saved ? JSON.parse(saved) : INITIAL_AUTHOR_PAYMENTS;
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('carReservations', JSON.stringify(carReservations));
  }, [carReservations]);

  useEffect(() => {
    localStorage.setItem('salesRecords', JSON.stringify(salesRecords));
  }, [salesRecords]);

  useEffect(() => {
    localStorage.setItem('authorPayments', JSON.stringify(authorPayments));
  }, [authorPayments]);

  // Car Reservations functions
  const addCarReservation = (reservation) => {
    const newReservation = {
      ...reservation,
      id: `res-${Date.now()}`
    };
    setCarReservations(prev => [...prev, newReservation]);
    return newReservation;
  };

  const deleteCarReservation = (id) => {
    setCarReservations(prev => prev.filter(res => res.id !== id));
  };

  const checkCarAvailability = (carId, startDate, endDate, excludeId = null) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const conflicts = carReservations.filter(res => {
      if (excludeId && res.id === excludeId) return false;
      if (res.carId !== carId) return false;

      const resStart = new Date(res.startDate);
      const resEnd = new Date(res.endDate);

      // Check for overlap
      return (start < resEnd && end > resStart);
    });

    return conflicts.length === 0;
  };

  // Author Payments functions
  const updatePaymentStatus = (id, status, paidDate = null) => {
    setAuthorPayments(prev =>
      prev.map(payment =>
        payment.id === id
          ? { ...payment, status, paidDate }
          : payment
      )
    );
  };

  // Reset demo data
  const resetDemoData = () => {
    setCarReservations(INITIAL_CAR_RESERVATIONS);
    setSalesRecords(INITIAL_SALES_RECORDS);
    setAuthorPayments(INITIAL_AUTHOR_PAYMENTS);
  };

  const value = {
    // User
    currentUser,
    setCurrentUser,

    // Static data
    cars: CARS,
    employees: EMPLOYEES,

    // Car Reservations
    carReservations,
    addCarReservation,
    deleteCarReservation,
    checkCarAvailability,

    // Sales
    salesRecords,

    // Author Payments
    authorPayments,
    updatePaymentStatus,

    // Utilities
    resetDemoData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
