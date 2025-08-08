import React, { useState } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, Save, X, Eye } from 'lucide-react';

interface VendorUploadProps {
  setCurrentPage: (page: any) => void;
}

export const VendorUpload: React.FC<VendorUploadProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    unit: '',
    description: '',
    features: [''],
    weight: '',
    phLevel: '',
    moistureContent: '',
    organicMatter: '',
    npkRatio: '',
    shelfLife: '',
    stock: '',
    location: ''
  });

  const [images, setImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const categories = [
    'Vermicompost',
    'Kitchen Compost',
    'Mixed Compost',
    'Worm Castings',
    'Bokashi',
    'Mushroom Compost'
  ];

  const units = [
    'per 10kg bag',
    'per 15kg bag',
    'per 20kg bag',
    'per 25kg bag',
    'per 30kg bag'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Product data:', formData);
    console.log('Images:', images);
    setCurrentPage('marketplace');
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPreviewMode(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Edit</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Product Preview</h1>
        </div>

        {/* Product Preview Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-md mx-auto">
          <div className="aspect-video bg-gray-200 relative overflow-hidden">
            {images[0] ? (
              <img 
                src={images[0]} 
                alt={formData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              New
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-1">{formData.name || 'Product Name'}</h3>
            <p className="text-sm text-gray-600 mb-2">Your Store</p>
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-3">
              {formData.category || 'Category'}
            </span>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {formData.description || 'Product description will appear here...'}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${formData.price || '0'}
                  </span>
                  {formData.originalPrice && formData.originalPrice !== formData.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${formData.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-600">{formData.unit || 'per unit'}</span>
                <p className="text-xs text-green-600 mt-1">
                  {formData.stock || '0'} available
                </p>
              </div>
              <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPreviewMode(false)}
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            Edit Product
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Publish Product
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
          <span>Back to Marketplace</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Upload New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>
            
            {/* Image Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragOver 
                  ? 'border-green-500 bg-green-50 scale-105' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images here, or</p>
              <label className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-all duration-300 hover:scale-105 inline-block">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">Maximum 5 images, up to 10MB each</p>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                    focusedField === 'name' 
                      ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  onFocus={() => setFocusedField('category')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                    focusedField === 'category' 
                      ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    onFocus={() => setFocusedField('price')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'price' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    onFocus={() => setFocusedField('originalPrice')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'originalPrice' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    onFocus={() => setFocusedField('unit')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'unit' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  >
                    <option value="">Select unit</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    onFocus={() => setFocusedField('stock')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                      focusedField === 'stock' 
                        ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className={`w-full p-4 border rounded-xl transition-all duration-300 ${
                    focusedField === 'description' 
                      ? 'border-green-500 ring-2 ring-green-200 scale-105' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Describe your product..."
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="space-y-6">
          {/* Product Features */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Features</h2>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter feature"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-green-500 hover:text-green-600 text-sm font-medium transition-colors duration-300"
              >
                + Add Feature
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 25kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">pH Level</label>
                <input
                  type="text"
                  value={formData.phLevel}
                  onChange={(e) => handleInputChange('phLevel', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 6.5-7.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moisture Content</label>
                <input
                  type="text"
                  value={formData.moistureContent}
                  onChange={(e) => handleInputChange('moistureContent', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 35-45%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organic Matter</label>
                <input
                  type="text"
                  value={formData.organicMatter}
                  onChange={(e) => handleInputChange('organicMatter', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 85%+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NPK Ratio</label>
                <input
                  type="text"
                  value={formData.npkRatio}
                  onChange={(e) => handleInputChange('npkRatio', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 2-1-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shelf Life</label>
                <input
                  type="text"
                  value={formData.shelfLife}
                  onChange={(e) => handleInputChange('shelfLife', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 2 years"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Location</h2>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              placeholder="City, State"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              <Eye className="h-5 w-5" />
              Preview
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Save className="h-5 w-5" />
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};