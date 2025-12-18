import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/solid';

const Dashboard = () => {
  const { salesRecords, authorPayments, carReservations } = useApp();

  // Calculate KPIs
  const totalSales = salesRecords.reduce((sum, record) => sum + record.revenue, 0);
  const currentMonthSales = salesRecords
    .filter(record => record.month === '2025-12')
    .reduce((sum, record) => sum + record.revenue, 0);

  const totalOutstandingPayments = authorPayments
    .filter(payment => payment.status !== 'paid')
    .reduce((sum, payment) => sum + payment.amountDue, 0);

  const overduePaymentsCount = authorPayments.filter(payment => payment.status === 'overdue').length;

  const today = new Date();
  const nextWeek = addDays(today, 7);
  const upcomingReservations = carReservations.filter(res => {
    const resDate = parseISO(res.startDate);
    return isAfter(resDate, today) && isBefore(resDate, nextWeek);
  }).length;

  // Sales by month
  const salesByMonth = salesRecords.reduce((acc, record) => {
    const monthName = record.month === '2025-11' ? 'November' : 'December';
    if (!acc[monthName]) {
      acc[monthName] = 0;
    }
    acc[monthName] += record.revenue;
    return acc;
  }, {});

  const monthlySalesData = Object.entries(salesByMonth).map(([month, revenue]) => ({
    month,
    revenue
  }));

  // Sales by rep
  const salesByRep = salesRecords.reduce((acc, record) => {
    if (!acc[record.repName]) {
      acc[record.repName] = 0;
    }
    acc[record.repName] += record.revenue;
    return acc;
  }, {});

  const repSalesData = Object.entries(salesByRep)
    .map(([name, revenue]) => ({
      name: name.split(' ')[0], // First name only
      revenue
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Payment status distribution
  const paymentStatusData = [
    { name: 'Paid', value: authorPayments.filter(p => p.status === 'paid').length, color: '#10B981' },
    { name: 'Due', value: authorPayments.filter(p => p.status === 'due').length, color: '#F59E0B' },
    { name: 'Overdue', value: authorPayments.filter(p => p.status === 'overdue').length, color: '#EF4444' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">€{totalSales.toLocaleString()}</p>
                <div className="mt-3 flex items-center text-sm">
                  <span className="flex items-center text-green-600">
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    {salesRecords.length} transactions
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Current Month Sales Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">December Sales</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">€{currentMonthSales.toLocaleString()}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Current month
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Outstanding Payments Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">€{totalOutstandingPayments.toLocaleString()}</p>
                <div className="mt-3">
                  {overduePaymentsCount > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                      {overduePaymentsCount} overdue
                    </span>
                  )}
                  {overduePaymentsCount === 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <BanknotesIcon className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Reservations Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Reservations</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{upcomingReservations}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    Next 7 days
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Sales Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Monthly Sales</h2>
                  <p className="mt-1 text-sm text-gray-600">Revenue comparison by month</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip
                    formatter={(value) => `€${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#2563EB"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Rep Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Sales by Representative</h2>
                  <p className="mt-1 text-sm text-gray-600">Performance by team member</p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={repSalesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip
                    formatter={(value) => `€${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#059669"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Author Payment Status</h2>
                  <p className="mt-1 text-sm text-gray-600">Distribution of payment states</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Paid</p>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  {paymentStatusData.find(p => p.name === 'Paid')?.value || 0}
                </p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center justify-center mb-2">
                  <ClockIconSolid className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Due</p>
                <p className="mt-1 text-2xl font-bold text-amber-600">
                  {paymentStatusData.find(p => p.name === 'Due')?.value || 0}
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center justify-center mb-2">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Overdue</p>
                <p className="mt-1 text-2xl font-bold text-red-600">
                  {paymentStatusData.find(p => p.name === 'Overdue')?.value || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Car Reservations */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Reservations</h2>
                  <p className="mt-1 text-sm text-gray-600">Next scheduled vehicle bookings</p>
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {carReservations
                .filter(res => {
                  const resDate = parseISO(res.startDate);
                  return isAfter(resDate, today);
                })
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                .slice(0, 6)
                .map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <CalendarIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{res.carName}</p>
                        <p className="text-xs text-gray-600 truncate">{res.employeeName}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right ml-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {format(parseISO(res.startDate), 'MMM dd')}
                      </p>
                      <p className="text-xs text-gray-600">
                        {format(parseISO(res.startDate), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}

              {carReservations.filter(res => isAfter(parseISO(res.startDate), today)).length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600">No upcoming reservations</p>
                  <p className="text-xs text-gray-500 mt-1">New bookings will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
