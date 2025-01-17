import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Sample data - replace with actual API calls
const collectionsData = {
  1: {
    name: 'Mystical Wizards',
    baseNFT: {
      id: 'base-1',
      name: 'Base Wizard',
      image: '/images/themes/wizardn.png',
    },
    subNFTs: [
      {
        id: 'sub-1',
        name: 'Wizard #1',
        image: '/images/themes/wizard1.png',
      },
      {
        id: 'sub-2',
        name: 'Wizard #2',
        image: '/images/themes/wizard2.png',
      },
    ],
  },
  2: {
    name: 'Doge Universe',
    baseNFT: {
      id: 'base-2',
      name: 'Base Doge',
      image: '/images/themes/dogen.png',
    },
    subNFTs: [
      {
        id: 'sub-3',
        name: 'Doge #1',
        image: '/images/themes/doge1.png',
      },
    ],
  },
};

export default function MintNFT() {
  const location = useLocation();
  const [selectedParent, setSelectedParent] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    // Get collection ID from URL query parameters
    const params = new URLSearchParams(location.search);
    const collectionId = params.get('collection');
    if (collectionId && collectionsData[collectionId]) {
      setCollection(collectionsData[collectionId]);
    }
  }, [location]);

  const generatePreview = async () => {
    if (!selectedParent || !prompt) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setPreviewImage(selectedParent.image);
      setIsGenerating(false);
    }, 2000);
  };

  const handleMint = async () => {
    if (!previewImage) return;
    
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      // Navigate to the new NFT's page or show success message
    }, 2000);
  };

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
        <div className="text-center text-gray-400">
          Please select a collection to mint from.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Mint NFT</h1>
        <p className="text-gray-400 mb-8">Collection: {collection.name}</p>

        <div className="space-y-8">
          {/* Parent NFT Selection */}
          <div>
            <h2 className="text-xl font-medium text-white mb-4">Select Parent NFT</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedParent(collection.baseNFT)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedParent?.id === collection.baseNFT.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <img
                  src={collection.baseNFT.image}
                  alt={collection.baseNFT.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium">{collection.baseNFT.name}</span>
                </div>
              </button>
              {collection.subNFTs.map((nft) => (
                <button
                  key={nft.id}
                  onClick={() => setSelectedParent(nft)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedParent?.id === nft.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">{nft.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <h2 className="text-xl font-medium text-white mb-4">Enter Your Prompt</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Describe your NFT..."
            />
          </div>

          {/* Preview & Generate Button */}
          <div>
            <h2 className="text-xl font-medium text-white mb-4">Preview</h2>
            <div className="aspect-square w-full rounded-lg bg-gray-800 overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  Preview will appear here
                </div>
              )}
            </div>
            <button
              onClick={generatePreview}
              disabled={!selectedParent || !prompt || isGenerating}
              className="mt-6 w-full py-3 px-4 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:from-primary-500 hover:to-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Preview'}
            </button>
            {previewImage && (
              <button
                onClick={handleMint}
                disabled={isMinting}
                className="mt-4 w-full py-3 px-4 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:from-primary-500 hover:to-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMinting ? 'Minting...' : 'Mint NFT'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
