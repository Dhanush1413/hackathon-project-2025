import React from 'react';
import { Menu, Bell, User, Search, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  cartItemsCount: number;
  setCurrentPage: (page: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarOpen, currentPage, cartItemsCount, setCurrentPage }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'tracking':
        return 'Waste Tracking';
      case 'marketplace':
        return 'Compost Marketplace';
      case 'product-detail':
        return 'Product Details';
      case 'cart':
        return 'Shopping Cart';
      case 'checkout':
        return 'Checkout';
      case 'vendor-upload':
        return 'Upload Product';
      case 'analytics':
        return 'Analytics & Reports';
      case 'settings':
        return 'Settings';
      default:
        return 'CompostFlow';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
            <p className="text-sm text-gray-500 mt-1">
              AI-powered waste management and composting optimization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-gray-700 w-48"
            />
          </div>
          
          <button 
            onClick={() => setCurrentPage('cart')}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-green-500 text-white rounded-full p-1">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};