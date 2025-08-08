import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';

interface CheckoutProps {
  cartItems: any[];
  setCurrentPage: (page: any) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShippingCost = () => {
    const total = getTotalPrice();
    return total >= 50 ? 0 : 9.99;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShippingCost();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-medium">#CF-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-medium">${getFinalTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-medium">3-5 business days</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setCurrentPage('marketplace')}
          className="bg-green-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <button
        onClick={() => setCurrentPage('cart')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Cart</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order securely</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'firstName' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'lastName' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Last name"
                    required
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'address' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Street address"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    onFocus={() => setFocusedField('city')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'city' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    onFocus={() => setFocusedField('zipCode')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'zipCode' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="ZIP code"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    onFocus={() => setFocusedField('nameOnCard')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'nameOnCard' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Name on card"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    onFocus={() => setFocusedField('cardNumber')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'cardNumber' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Card number"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      onFocus={() => setFocusedField('expiryDate')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                        focusedField === 'expiryDate' 
                          ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      onFocus={() => setFocusedField('cvv')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                        focusedField === 'cvv' 
                          ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="CVV"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105 hover:shadow-lg text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Place Order - ${getFinalTotal().toFixed(2)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
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
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${getFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>SSL encrypted checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};