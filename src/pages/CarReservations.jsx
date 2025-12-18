import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { format, parseISO, isAfter, isBefore } from 'date-fns';
import {
  PlusIcon,
  XMarkIcon,
  TruckIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';

const CarReservations = () => {
  const { cars, carReservations, addCarReservation, deleteCarReservation, checkCarAvailability, currentUser } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    carId: '',
    startDate: '',
    endDate: '',
    purpose: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.carId || !formData.startDate || !formData.endDate || !formData.purpose) {
      setError('All fields are required');
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End date must be after start date');
      return;
    }

    // Check availability
    const isAvailable = checkCarAvailability(formData.carId, formData.startDate, formData.endDate);
    if (!isAvailable) {
      setError('This car is not available during the selected time period');
      return;
    }

    const selectedCar = cars.find(car => car.id === formData.carId);

    addCarReservation({
      carId: formData.carId,
      carName: selectedCar.name,
      employeeName: currentUser.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      purpose: formData.purpose
    });

    // Reset form
    setFormData({
      carId: '',
      startDate: '',
      endDate: '',
      purpose: ''
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      deleteCarReservation(id);
    }
  };

  // Separate reservations into past and upcoming
  const now = new Date();
  const upcomingReservations = carReservations
    .filter(res => isAfter(parseISO(res.endDate), now))
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const pastReservations = carReservations
    .filter(res => isBefore(parseISO(res.endDate), now))
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Company Car Reservations</h1>
            <p className="mt-2 text-sm text-gray-600">Manage and view vehicle availability</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 ${
              showForm
                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
            }`}
          >
            {showForm ? (
              <>
                <XMarkIcon className="h-5 w-5" />
                Cancel
              </>
            ) : (
              <>
                <PlusIcon className="h-5 w-5" />
                New Reservation
              </>
            )}
          </button>
        </div>

        {/* Available Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cars.map(car => {
            const activeReservation = carReservations.find(res =>
              res.carId === car.id &&
              isAfter(parseISO(res.endDate), now) &&
              isBefore(parseISO(res.startDate), now)
            );

            const isAvailable = !activeReservation;

            return (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isAvailable ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <TruckIcon className={`h-6 w-6 ${
                        isAvailable ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg truncate">{car.name}</h3>
                      <p className="text-sm text-gray-600 font-mono">{car.plate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center py-3 mb-3">
                  {isAvailable ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full border border-green-200">
                      <CheckCircleIcon className="h-5 w-5" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-full border border-red-200">
                      <XCircleIcon className="h-5 w-5" />
                      In Use
                    </span>
                  )}
                </div>

                {activeReservation && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{activeReservation.employeeName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      Until {format(parseISO(activeReservation.endDate), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reservation Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">New Reservation</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                  <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Car
                  </label>
                  <select
                    value={formData.carId}
                    onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900"
                  >
                    <option value="">Choose a car</option>
                    {cars.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.name} ({car.plate})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="e.g., Client meeting, Business trip"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  Create Reservation
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Upcoming Reservations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Reservations</h2>
                <p className="text-sm text-gray-600 mt-0.5">{upcomingReservations.length} active reservations</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Start</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">End</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {upcomingReservations.map(reservation => (
                  <tr key={reservation.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <TruckIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">{reservation.carName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{reservation.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        {format(parseISO(reservation.startDate), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-gray-400" />
                        {format(parseISO(reservation.endDate), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DocumentTextIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">{reservation.purpose}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reservation.employeeName === currentUser.name && (
                        <button
                          onClick={() => handleDelete(reservation.id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-red-700 hover:bg-red-50 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-red-200"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {upcomingReservations.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <CalendarIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">No upcoming reservations</p>
                          <p className="text-gray-500 text-sm mt-1">Create a new reservation to get started</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Past Reservations */}
        {pastReservations.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ClockIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Past Reservations</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Last 5 completed reservations</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Car</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Purpose</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {pastReservations.slice(0, 5).map(reservation => (
                    <tr key={reservation.id} className="opacity-60 hover:opacity-100 transition-opacity duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <TruckIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{reservation.carName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{reservation.employeeName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{format(parseISO(reservation.startDate), 'MMM dd, yyyy')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DocumentTextIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">{reservation.purpose}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarReservations;
