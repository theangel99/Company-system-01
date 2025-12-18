import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  TrophyIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Sales = () => {
  const { currentUser, salesRecords } = useApp();

  // Filter sales based on role
  const relevantSales = currentUser.role === 'sales'
    ? salesRecords.filter(record => record.repName === currentUser.name)
    : salesRecords;

  // Calculate totals
  const totalRevenue = relevantSales.reduce((sum, record) => sum + record.revenue, 0);
  const totalQuantity = relevantSales.reduce((sum, record) => sum + record.quantity, 0);

  // Group by month
  const salesByMonth = relevantSales.reduce((acc, record) => {
    const monthName = record.month === '2025-11' ? 'November' : 'December';
    if (!acc[monthName]) {
      acc[monthName] = { month: monthName, revenue: 0, quantity: 0 };
    }
    acc[monthName].revenue += record.revenue;
    acc[monthName].quantity += record.quantity;
    return acc;
  }, {});

  const monthlyData = Object.values(salesByMonth);

  // Group by product
  const salesByProduct = relevantSales.reduce((acc, record) => {
    if (!acc[record.productName]) {
      acc[record.productName] = { product: record.productName, revenue: 0, quantity: 0 };
    }
    acc[record.productName].revenue += record.revenue;
    acc[record.productName].quantity += record.quantity;
    return acc;
  }, {});

  const productData = Object.values(salesByProduct).sort((a, b) => b.revenue - a.revenue);

  // For manager view: sales by rep
  let repData = [];
  if (currentUser.role === 'manager') {
    const salesByRep = salesRecords.reduce((acc, record) => {
      if (!acc[record.repName]) {
        acc[record.repName] = { name: record.repName, revenue: 0, quantity: 0, transactions: 0 };
      }
      acc[record.repName].revenue += record.revenue;
      acc[record.repName].quantity += record.quantity;
      acc[record.repName].transactions += 1;
      return acc;
    }, {});

    repData = Object.values(salesByRep).sort((a, b) => b.revenue - a.revenue);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {currentUser.role === 'sales' ? 'My Sales Performance' : 'Team Sales Performance'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {currentUser.role === 'sales'
              ? 'Track your sales metrics and performance'
              : 'Overview of all sales team performance'}
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">€{totalRevenue.toLocaleString()}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {currentUser.role === 'sales' ? 'Your total' : 'All team'}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Units Sold Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Units Sold</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalQuantity.toLocaleString()}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {relevantSales.length} transactions
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ShoppingCartIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Average Transaction Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Average Sale</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  €{relevantSales.length > 0 ? Math.round(totalRevenue / relevantSales.length).toLocaleString() : 0}
                </p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Per transaction
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manager View: Sales by Rep */}
        {currentUser.role === 'manager' && (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 mb-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Performance by Sales Representative</h2>
                  <p className="mt-1 text-sm text-gray-600">Team performance breakdown</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Representative
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Units Sold
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Transactions
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Avg. Sale
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {repData.map((rep, index) => {
                    const isTopPerformer = index === 0;
                    const avgSale = Math.round(rep.revenue / rep.transactions);
                    const performanceLevel =
                      avgSale > 15000 ? 'excellent' :
                      avgSale > 10000 ? 'good' : 'standard';

                    return (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          isTopPerformer ? 'bg-amber-50/30' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                              isTopPerformer ? 'bg-gradient-to-br from-amber-400 to-amber-500' :
                              'bg-gradient-to-br from-gray-400 to-gray-500'
                            }`}>
                              {rep.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 flex items-center gap-2">
                                {rep.name}
                                {isTopPerformer && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                                    <TrophyIcon className="w-3 h-3" />
                                    Top
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">Sales Representative</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-base font-bold text-gray-900">
                            €{rep.revenue.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-base font-semibold text-gray-700">
                            {rep.quantity.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                            {rep.transactions}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg font-bold text-sm ${
                            performanceLevel === 'excellent' ? 'bg-green-100 text-green-700' :
                            performanceLevel === 'good' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            €{avgSale.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
                  <p className="mt-1 text-sm text-gray-600">Revenue comparison by month</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
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

          {/* Product Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Sales by Product</h2>
                  <p className="mt-1 text-sm text-gray-600">Product performance breakdown</p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <ShoppingCartIcon className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="product"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
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
                    fill="#059669"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Latest sales activity</p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  {currentUser.role === 'manager' && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Sales Rep
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {relevantSales
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 10)
                  .map((record, index) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      {currentUser.role === 'manager' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            {record.repName}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ShoppingCartIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {record.productName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="inline-flex items-center px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                          {record.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-base font-bold text-gray-900">
                          €{record.revenue.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
