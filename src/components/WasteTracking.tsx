import React, { useState } from 'react';
import { Plus, Search, Filter, Package, Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

export const WasteTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const [showAddBatch, setShowAddBatch] = useState(false);

  const batches = [
    {
      id: 'A-001',
      type: 'Kitchen Waste',
      weight: '250 kg',
      startDate: '2024-01-15',
      status: 'Processing',
      progress: 65,
      temperature: '45°C',
      moisture: '60%',
      ph: '7.2',
      location: 'Composting Unit A',
      estimatedCompletion: '2024-02-15',
    },
    {
      id: 'A-002',
      type: 'Garden Waste',
      weight: '180 kg',
      startDate: '2024-01-20',
      status: 'Curing',
      progress: 90,
      temperature: '35°C',
      moisture: '45%',
      ph: '6.8',
      location: 'Composting Unit A',
      estimatedCompletion: '2024-02-10',
    },
    {
      id: 'B-001',
      type: 'Mixed Organic',
      weight: '320 kg',
      startDate: '2024-01-10',
      status: 'Ready',
      progress: 100,
      temperature: '25°C',
      moisture: '40%',
      ph: '6.5',
      location: 'Composting Unit B',
      estimatedCompletion: '2024-02-05',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Curing':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'Ready':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'text-blue-600 bg-blue-50';
      case 'Curing':
        return 'text-orange-600 bg-orange-50';
      case 'Ready':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredBatches = batches.filter(batch => {
    if (activeTab === 'active') return batch.status !== 'Ready';
    if (activeTab === 'completed') return batch.status === 'Ready';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waste Tracking</h1>
          <p className="text-gray-600">Monitor and manage your composting batches</p>
        </div>
        <button
          onClick={() => setShowAddBatch(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Batch
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search batches..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'active', label: 'Active Batches', count: batches.filter(b => b.status !== 'Ready').length },
            { key: 'completed', label: 'Completed', count: batches.filter(b => b.status === 'Ready').length },
            { key: 'all', label: 'All Batches', count: batches.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(batch.status)}
                  <span className="font-semibold text-gray-900">Batch {batch.id}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                  {batch.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">{batch.type}</p>
                  <p className="font-medium text-gray-900">{batch.weight}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{batch.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${batch.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Temp</p>
                    <p className="font-medium">{batch.temperature}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Moisture</p>
                    <p className="font-medium">{batch.moisture}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">pH</p>
                    <p className="font-medium">{batch.ph}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Est. completion: {batch.estimatedCompletion}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{batch.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Batch Modal */}
      {showAddBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Composting Batch</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option>Kitchen Waste</option>
                  <option>Garden Waste</option>
                  <option>Mixed Organic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option>Composting Unit A</option>
                  <option>Composting Unit B</option>
                  <option>Composting Unit C</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddBatch(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};