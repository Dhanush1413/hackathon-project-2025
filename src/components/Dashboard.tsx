import React from 'react';
import { TrendingUp, Package, DollarSign, Users, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Composting Batches',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-blue-500',
    },
    {
      title: 'Waste Processed (tons)',
      value: '89.2',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      title: 'Active Users',
      value: '156',
      change: '+5.1%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  const aiRecommendations = [
    {
      type: 'optimization',
      title: 'Optimal Temperature Alert',
      message: 'Batch #A-001 temperature is 15°C below optimal. Consider adding brown materials.',
      priority: 'high',
      icon: AlertTriangle,
    },
    {
      type: 'efficiency',
      title: 'Moisture Level Adjustment',
      message: 'Batch #B-003 requires moisture adjustment. Add 2L water for optimal decomposition.',
      priority: 'medium',
      icon: Clock,
    },
    {
      type: 'market',
      title: 'High Demand Alert',
      message: 'Organic compost demand increased by 25% in your area. Consider increasing production.',
      priority: 'low',
      icon: TrendingUp,
    },
  ];

  const recentBatches = [
    { id: 'A-001', status: 'Processing', progress: 65, daysRemaining: 8 },
    { id: 'A-002', status: 'Curing', progress: 90, daysRemaining: 3 },
    { id: 'B-001', status: 'Ready', progress: 100, daysRemaining: 0 },
    { id: 'B-002', status: 'Processing', progress: 45, daysRemaining: 12 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'text-green-600 bg-green-50';
      case 'Processing': return 'text-blue-600 bg-blue-50';
      case 'Curing': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white rounded-lg p-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-green-600 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {aiRecommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getPriorityColor(rec.priority)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-600">{rec.message}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Batches */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Active Composting Batches</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentBatches.map((batch, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">Batch {batch.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                    {batch.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{batch.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${batch.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {batch.daysRemaining > 0 
                      ? `${batch.daysRemaining} days remaining`
                      : 'Ready for harvest'
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">2.4 tons</div>
            <div className="text-green-100">CO₂ Reduced</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">89.2 tons</div>
            <div className="text-green-100">Waste Diverted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1,245 m³</div>
            <div className="text-green-100">Compost Produced</div>
          </div>
        </div>
      </div>
    </div>
  );
};