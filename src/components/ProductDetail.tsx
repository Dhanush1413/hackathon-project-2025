import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Truck, Shield, Heart, Plus, Minus, ShoppingCart, Eye } from 'lucide-react';

interface ProductDetailProps {
  productId: number | null;
  setCurrentPage: (page: any) => void;
  cartItems: any[];
  setCartItems: (items: any[]) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  productId, 
  setCurrentPage, 
  cartItems, 
  setCartItems 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data - in real app, fetch by productId
  const product = {
    id: 1,
    name: 'Premium Vermicompost',
    seller: 'Green Valley Farm',
    price: 25,
    originalPrice: 30,
    unit: 'per 25kg bag',
    rating: 4.8,
    reviews: 124,
    location: 'San Francisco, CA',
    images: [
      'https://images.pexels.com/photos/1108199/pexels-photo-1108199.jpeg',
      'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg',
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
    ],
    description: 'Our premium vermicompost is produced using the finest organic materials and carefully managed earthworm colonies. This nutrient-rich soil amendment is perfect for organic gardening, sustainable farming, and anyone looking to improve their soil health naturally.',
    features: [
      'Rich in essential nutrients (NPK)',
      'Improves soil structure and water retention',
      'Contains beneficial microorganisms',
      'pH balanced for optimal plant growth',
      'Organic and chemical-free',
      'Sustainably produced'
    ],
    specifications: {
      'Weight': '25kg',
      'pH Level': '6.5-7.0',
      'Moisture Content': '35-45%',
      'Organic Matter': '85%+',
      'NPK Ratio': '2-1-1',
      'Shelf Life': '2 years'
    },
    inStock: true,
    stock: 45,
    badge: 'Best Seller',
    category: 'Vermicompost',
    shippingInfo: 'Free shipping on orders over $50',
    returnPolicy: '30-day return guarantee'
  };

  const addToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setCurrentPage('cart');
  };

  const buyNow = () => {
    addToCart();
    setCurrentPage('checkout');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('marketplace')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Marketplace</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative group">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Floating Add to Cart Button on Hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={addToCart}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-green-600 hover:scale-105 transform translate-y-4 group-hover:translate-y-0"
              >
                <ShoppingCart className="h-5 w-5 inline mr-2" />
                Add to Cart
              </button>
            </div>

            {/* Badge */}
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.badge}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            >
              <Heart 
                className={`h-5 w-5 transition-colors duration-300 ${
                  isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                }`} 
              />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  selectedImage === index ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">{product.seller}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 transition-all duration-300 hover:scale-110 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
                <span className="text-lg font-medium ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
              <div className="flex items-center gap-1 text-gray-600">
                <Eye className="h-4 w-4" />
                <span className="text-sm">1,234 views</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="h-5 w-5" />
              <span>{product.location}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                Save ${product.originalPrice - product.price}
              </span>
            </div>
            <p className="text-gray-600">{product.unit}</p>
            <p className="text-green-600 font-medium mt-2">{product.stock} available</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-900">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100 transition-colors duration-300 rounded-l-xl"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-6 py-3 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100 transition-colors duration-300 rounded-r-xl"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-green-500 text-white py-4 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="flex-1 bg-blue-500 text-white py-4 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Buy Now
            </button>
          </div>

          {/* Shipping & Return Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <Truck className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium text-blue-900">Free Shipping</p>
                <p className="text-sm text-blue-600">{product.shippingInfo}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <Shield className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium text-green-900">Return Policy</p>
                <p className="text-sm text-green-600">{product.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            
            <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};