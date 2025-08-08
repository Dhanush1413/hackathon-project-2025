import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { WasteTracking } from './components/WasteTracking';
import { Marketplace } from './components/Marketplace';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { VendorUpload } from './components/VendorUpload';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

type Page = 'dashboard' | 'tracking' | 'marketplace' | 'product-detail' | 'cart' | 'checkout' | 'vendor-upload' | 'analytics' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tracking':
        return <WasteTracking />;
      case 'marketplace':
        return <Marketplace setCurrentPage={setCurrentPage} setSelectedProductId={setSelectedProductId} cartItems={cartItems} setCartItems={setCartItems} />;
      case 'product-detail':
        return <ProductDetail productId={selectedProductId} setCurrentPage={setCurrentPage} cartItems={cartItems} setCartItems={setCartItems} />;
      case 'cart':
        return <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return <Checkout cartItems={cartItems} setCurrentPage={setCurrentPage} />;
      case 'vendor-upload':
        return <VendorUpload setCurrentPage={setCurrentPage} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        cartItemsCount={cartItems.length}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          setSidebarOpen={setSidebarOpen}
          currentPage={currentPage}
          cartItemsCount={cartItems.length}
          setCurrentPage={setCurrentPage}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;