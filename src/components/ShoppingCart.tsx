import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart as CartIcon, CreditCard } from 'lucide-react';

interface ShoppingCartProps {
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  setCurrentPage: (page: any) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ 
  cartItems, 
  setCartItems, 
  setCurrentPage 
}) => {
  const [removingItems, setRemovingItems] = useState<number[]>([]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setRemovingItems(prev => [...prev, id]);
    setTimeout(() => {
      setCartItems(cartItems.filter(item => item.id !== id));
      setRemovingItems(prev => prev.filter(itemId => itemId !== id));
    }, 300);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getShippingCost = () => {
    const total = getTotalPrice();
    return total >= 50 ? 0 : 9.99;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShippingCost();
  };

  if (cartItems.length === 0) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setCurrentPage('marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Marketplace</span>
        </button>

        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CartIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="bg-green-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart ({getTotalItems()} items)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 ${
                removingItems.includes(item.id) 
                  ? 'opacity-0 transform scale-95' 
                  : 'opacity-100 transform scale-100 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-6">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.seller}</p>
                  <p className="text-gray-500 text-sm">{item.unit}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xl font-bold text-gray-900">${item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300 rounded-l-xl"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300 rounded-r-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {getShippingCost() === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${getShippingCost().toFixed(2)}`
                  )}
                </span>
              </div>
              
              {getShippingCost() > 0 && (
                <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                  Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900 transition-all duration-300 hover:text-green-600">
                    ${getFinalTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <CreditCard className="h-5 w-5" />
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};