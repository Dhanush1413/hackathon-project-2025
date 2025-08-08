import React from 'react';
import { X, BarChart3, Package, ShoppingCart, TrendingUp, Settings, Leaf, Upload } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: any) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cartItemsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  isOpen, 
  setIsOpen,
  cartItemsCount
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tracking', label: 'Waste Tracking', icon: Package },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'vendor-upload', label: 'Upload Product', icon: Upload },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-white rounded-lg p-2 transition-all duration-300 hover:scale-110">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-gray-900">CompostFlow</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded transition-all duration-300 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-300 hover:scale-105 relative
                    ${isActive 
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-green-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'marketplace' && cartItemsCount > 0 && (
                    <span className="ml-auto bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-500 text-white rounded-full p-1">
                <Leaf className="h-3 w-3" />
              </div>
              <span className="text-sm font-medium text-green-800">Eco Impact</span>
            </div>
            <p className="text-xs text-green-600 mb-1">CO₂ Reduced This Month</p>
            <p className="text-lg font-bold text-green-700">2.4 tons</p>
          </div>
        </div>
      </div>
    </>
  );
};