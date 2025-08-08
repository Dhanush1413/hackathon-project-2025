import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    {
      title: 'Total Waste Processed',
      value: '2,450 kg',
      change: '+12.5%',
      changeType: 'positive' as const,
      period: 'this month',
    },
    {
      title: 'Compost Produced',
      value: '1,225 kg',
      change: '+8.3%',
      changeType: 'positive' as const,
      period: 'this month',
    },
    {
      title: 'Revenue Generated',
      value: '$18,450',
      change: '+15.7%',
      changeType: 'positive' as const,
      period: 'this month',
    },
    {
      title: 'Processing Efficiency',
      value: '92.4%',
      change: '-2.1%',
      changeType: 'negative' as const,
      period: 'vs last month',
    },
  ];

  const wasteBreakdown = [
    { type: 'Kitchen Waste', percentage: 45, color: 'bg-green-500' },
    { type: 'Garden Waste', percentage: 30, color: 'bg-blue-500' },
    { type: 'Paper Waste', percentage: 15, color: 'bg-orange-500' },
    { type: 'Other Organic', percentage: 10, color: 'bg-purple-500' },
  ];

  const monthlyData = [
    { month: 'Jan', waste: 1800, compost: 900, revenue: 13500 },
    { month: 'Feb', waste: 2100, compost: 1050, revenue: 15750 },
    { month: 'Mar', waste: 1950, compost: 975, revenue: 14625 },
    { month: 'Apr', waste: 2300, compost: 1150, revenue: 17250 },
    { month: 'May', waste: 2450, compost: 1225, revenue: 18450 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Track performance and environmental impact</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <div className={`flex items-center gap-1 text-sm ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            </div>
            <p className="text-xs text-gray-500">{metric.period}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Processing Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Processing Volume</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.waste / 2500) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-16 text-right">{data.waste} kg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Waste Type Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Waste Type Breakdown</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {wasteBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-6">Environmental Impact This Month</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">4.8 tons</div>
            <div className="text-green-100">CO₂ Emissions Reduced</div>
            <div className="text-sm text-green-200 mt-1">+18% vs last month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">2,450 kg</div>
            <div className="text-green-100">Organic Waste Diverted</div>
            <div className="text-sm text-green-200 mt-1">From landfills</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1,225 kg</div>
            <div className="text-green-100">Compost Produced</div>
            <div className="text-sm text-green-200 mt-1">Nutrient-rich soil amendment</div>
          </div>
        </div>
      </div>

      {/* Efficiency Trends */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Processing Efficiency Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">28 days</div>
            <div className="text-sm text-gray-600">Avg. Processing Time</div>
            <div className="text-xs text-green-600 mt-1">-3 days improvement</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">92.4%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
            <div className="text-xs text-red-600 mt-1">-2.1% vs target</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">50%</div>
            <div className="text-sm text-gray-600">Waste to Compost Ratio</div>
            <div className="text-xs text-green-600 mt-1">Industry standard</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">24</div>
            <div className="text-sm text-gray-600">Active Batches</div>
            <div className="text-xs text-green-600 mt-1">+4 this month</div>
          </div>
        </div>
      </div>
    </div>
  );
};