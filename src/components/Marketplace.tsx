import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Package, Plus, Eye, Heart, ShoppingCart } from 'lucide-react';

interface MarketplaceProps {
  setCurrentPage: (page: any) => void;
  setSelectedProductId: (id: number) => void;
  cartItems: any[];
  setCartItems: (items: any[]) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ 
  setCurrentPage, 
  setSelectedProductId, 
  cartItems, 
  setCartItems 
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [showListProduct, setShowListProduct] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: 'Premium Vermicompost',
      seller: 'Green Valley Farm',
      price: 25,
      originalPrice: 30,
      unit: 'per 25kg bag',
      rating: 4.8,
      reviews: 124,
      location: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/1108199/pexels-photo-1108199.jpeg',
      description: 'High-quality vermicompost rich in nutrients, perfect for organic gardening and sustainable farming.',
      inStock: true,
      stock: 45,
      badge: 'Best Seller',
      category: 'Vermicompost',
    },
    {
      id: 2,
      name: 'Organic Kitchen Compost',
      seller: 'Urban Composters',
      price: 18,
      originalPrice: 22,
      unit: 'per 20kg bag',
      rating: 4.6,
      reviews: 89,
      location: 'Portland, OR',
      image: 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg',
      description: 'Made from kitchen waste, ideal for vegetable gardens and potted plants with rich organic matter.',
      inStock: true,
      stock: 32,
      badge: 'Eco-Friendly',
      category: 'Kitchen Compost',
    },
    {
      id: 3,
      name: 'Garden Mix Compost',
      seller: 'Eco Solutions',
      price: 22,
      originalPrice: 25,
      unit: 'per 30kg bag',
      rating: 4.7,
      reviews: 156,
      location: 'Denver, CO',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      description: 'Perfect blend of garden and kitchen waste compost for all-purpose gardening and landscaping.',
      inStock: false,
      stock: 0,
      badge: 'Premium',
      category: 'Mixed Compost',
    },
    {
      id: 4,
      name: 'Worm Casting Fertilizer',
      seller: 'Nature\'s Best',
      price: 35,
      originalPrice: 40,
      unit: 'per 15kg bag',
      rating: 4.9,
      reviews: 203,
      location: 'Austin, TX',
      image: 'https://images.pexels.com/photos/1108199/pexels-photo-1108199.jpeg',
      description: 'Pure worm castings with exceptional nutrient density for premium plant growth and soil health.',
      inStock: true,
      stock: 28,
      badge: 'Premium',
      category: 'Worm Castings',
    },
    {
      id: 5,
      name: 'Bokashi Compost Starter',
      seller: 'Ferment Pro',
      price: 28,
      originalPrice: 32,
      unit: 'per 10kg bag',
      rating: 4.5,
      reviews: 67,
      location: 'Seattle, WA',
      image: 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg',
      description: 'Fermented organic matter using traditional Japanese bokashi method for enhanced soil biology.',
      inStock: true,
      stock: 15,
      badge: 'New',
      category: 'Bokashi',
    },
    {
      id: 6,
      name: 'Mushroom Compost Blend',
      seller: 'Fungi Farm Co',
      price: 20,
      originalPrice: 24,
      unit: 'per 25kg bag',
      rating: 4.4,
      reviews: 91,
      location: 'Phoenix, AZ',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      description: 'Nutrient-rich mushroom substrate compost perfect for improving soil structure and fertility.',
      inStock: true,
      stock: 38,
      badge: 'Organic',
      category: 'Mushroom Compost',
    },
  ];

  const myListings = [
    {
      id: 1,
      name: 'Premium Organic Compost',
      price: 30,
      unit: 'per 25kg bag',
      stock: 28,
      views: 145,
      orders: 12,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Vermi Fertilizer Blend',
      price: 35,
      unit: 'per 20kg bag',
      stock: 15,
      views: 89,
      orders: 8,
      status: 'Active',
    },
  ];

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'bg-orange-500 text-white';
      case 'Premium': return 'bg-purple-500 text-white';
      case 'Eco-Friendly': return 'bg-green-500 text-white';
      case 'New': return 'bg-blue-500 text-white';
      case 'Organic': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compost Marketplace</h1>
          <p className="text-gray-600 mt-2">Discover premium organic compost products from verified sellers</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'sell' && (
            <button
              onClick={() => setCurrentPage('vendor-upload')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Plus className="h-5 w-5" />
              List Product
            </button>
          )}
          <button
            onClick={() => setCurrentPage('cart')}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart ({cartItems.length})
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'buy', label: 'Buy Compost' },
            { key: 'sell', label: 'My Listings' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-all duration-300 hover:scale-105 ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'buy' ? (
        <>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search compost products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
                <Filter className="h-5 w-5" />
                Filter
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all duration-300 hover:scale-110"
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors duration-300 ${
                        favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`} 
                    />
                  </button>

                  {/* Quick Actions on Hover */}
                  <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-3 transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProductId(product.id);
                        setCurrentPage('product-detail');
                      }}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    >
                      Quick View
                    </button>
                    {product.inStock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.seller}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-1">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 transition-colors duration-300 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm font-medium ml-2">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{product.location}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">{product.unit}</span>
                      {product.inStock && (
                        <p className="text-xs text-green-600 mt-1">{product.stock} available</p>
                      )}
                    </div>
                    <button 
                      onClick={() => product.inStock && addToCart(product)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                        product.inStock 
                          ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* My Listings */}
          <div className="grid grid-cols-1 gap-6">
            {myListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 hover:scale-110 transition-transform duration-300">
                        <Package className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{listing.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <span className="font-medium">${listing.price} {listing.unit}</span>
                          <span>Stock: {listing.stock}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            listing.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="font-bold text-lg">{listing.views}</span>
                      </div>
                      <div className="text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-green-600">{listing.orders}</div>
                      <div className="text-gray-500">Orders</div>
                    </div>
                    <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};