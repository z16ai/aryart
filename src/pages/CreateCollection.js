import React, { useState } from 'react';

const baseStyles = [
  'Illustration', 'Cartoon', 'Ink Painting', 'Photo', 'Impressionism', 'Animation',
  'Children\'s Painting', 'Retro Animation', 'Classical', 'Water-soluble Colored Pencil',
  'CG Impasto', 'Wool Felt', 'Vector Illustration', 'Picture Book', 'Miniature Landscape',
  'Chinese Style', 'Simple Drawing', 'Oil Painting', 'Figure', 'Flat Style', 'Vaporwave',
  'Brutalism', 'Abstraction', 'Sketch', 'Rembrandt', 'Cyber', 'Watercolor', 'Printmaking',
  'Line Drawing', 'Chinese Animation', 'Japanese Animation', 'Charcoal Graffiti'
];

export default function CreateCollection() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    baseStyle: '',
    basePrompt: '',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStyleSelect = (style) => {
    setFormData((prev) => ({
      ...prev,
      baseStyle: style,
    }));
  };

  const generatePreview = async () => {
    setIsGenerating(true);
    // Simulate AI image generation with a placeholder
    setTimeout(() => {
      setPreviewImage(`https://source.unsplash.com/random/800x800?${formData.baseStyle},${formData.basePrompt}`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle collection creation logic here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Create Your Collection</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Details */}
          <div className="space-y-6">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-300">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                id="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                className="mt-1 block w-full h-12 rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          {/* Base Style Selection */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Select Base Style</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {baseStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleStyleSelect(style)}
                  className={`p-3 text-sm rounded-lg ${
                    formData.baseStyle === style
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Base Prompt */}
          <div>
            <label htmlFor="basePrompt" className="block text-sm font-medium text-gray-300">
              Base Prompt
            </label>
            <textarea
              name="basePrompt"
              id="basePrompt"
              rows={4}
              value={formData.basePrompt}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Describe your base NFT style and theme..."
              required
            />
          </div>

          {/* Preview Generation */}
          <div>
            <button
              type="button"
              onClick={generatePreview}
              disabled={!formData.baseStyle || !formData.basePrompt || isGenerating}
              className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:from-primary-500 hover:to-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating Preview...' : 'Generate Preview'}
            </button>
          </div>

          {/* Preview Display */}
          {previewImage && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Preview</h3>
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
                <img
                  src={previewImage}
                  alt="Generated Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Create Collection Button */}
          <div>
            <button
              type="submit"
              disabled={!previewImage || isGenerating}
              className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:from-primary-500 hover:to-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
