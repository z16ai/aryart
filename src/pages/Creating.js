import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { generateImage } from '../services/aiService';
import { uploadToIPFS } from '../services/storageService';

const styles = [
  { id: 1, name: 'oil painting', description: 'Classical oil painting style with rich textures and depth' },
  { id: 2, name: 'watercolor', description: 'Soft and flowing watercolor style with gentle color transitions' },
  { id: 3, name: 'sketch', description: 'Hand-drawn sketch style with line work and shading' },
  { id: 4, name: 'ink painting', description: 'Traditional ink painting style with elegant brushwork' },
  { id: 5, name: '3D cartoon', description: 'Three-dimensional cartoon style with depth and character' },
  { id: 6, name: 'animation', description: 'Animated style with dynamic and expressive characteristics' },
  { id: 7, name: 'science fiction', description: 'Futuristic sci-fi style with advanced technology themes' },
  { id: 8, name: 'cyberpunk', description: 'High-tech dystopian style with neon and urban elements' },
  { id: 9, name: 'Rembrandt', description: 'Dutch Golden Age style with dramatic lighting and rich details' },
  { id: 10, name: 'Gothic', description: 'Dark and dramatic Gothic style with medieval influences' },
  { id: 11, name: 'occultism', description: 'Mystical and esoteric style with occult symbolism' },
  { id: 12, name: 'other', description: 'Custom style - please specify in the text field below' }
];

const Creating = () => {
  const { connected } = useWallet();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [customStyle, setCustomStyle] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [ipfsResult, setIpfsResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleStyleChange = (styleName) => {
    setSelectedStyle(styleName);
    if (styleName !== 'other') {
      setCustomStyle('');
    }
    setError(null);
  };

  const handleCustomStyleChange = (event) => {
    setCustomStyle(event.target.value);
    setError(null);
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!connected) {
      setError('Please connect your Solana wallet first');
      return;
    }
    if (!selectedStyle) {
      setError('Please select a style first');
      return;
    }
    if (selectedStyle === 'other' && !customStyle.trim()) {
      setError('Please specify your custom style');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    // Reset states
    setError(null);
    setUploadError(null);
    setIsGenerating(true);
    setIpfsResult(null);
    setGeneratedImage(null);
    
    try {
      // Step 1: Generate and display image
      const finalStyle = selectedStyle === 'other' ? customStyle : selectedStyle;
      const imageDataUrl = await generateImage(prompt, finalStyle);
      setGeneratedImage(imageDataUrl);
      setIsGenerating(false);

      // Step 2: Start IPFS upload automatically
      setIsUploading(true);
      try {
        // Convert data URL to Blob
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();
        
        // Upload to IPFS
        const result = await uploadToIPFS(blob);
        if (!result) {
          throw new Error('Upload failed - no result returned');
        }
        setIpfsResult(result);
        setUploadError(null);
      } catch (uploadErr) {
        console.error('IPFS upload failed:', uploadErr);
        if (uploadErr.message.includes('Missing configuration')) {
          setUploadError('Storage configuration error. Please try again later.');
        } else {
          setUploadError('Failed to upload to IPFS. Image is saved locally. ' + uploadErr.message);
        }
      } finally {
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError(error.message || 'Failed to generate image. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleMintNFT = () => {
    // This will be implemented in the future
    console.log('Mint NFT functionality coming soon');
  };

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Full-screen IPFS Upload Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p className="text-primary-300 font-medium">Uploading to IPFS...</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Create AI Art</h1>

        {/* Error Messages */}
        {error && (
          <div className="bg-red-800 bg-opacity-30 p-4 rounded-lg mb-6">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {!connected && (
          <div className="bg-yellow-800 bg-opacity-30 p-4 rounded-lg mb-6">
            <p className="text-yellow-200">Please connect your Solana wallet to continue</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Controls */}
          <div className="lg:w-1/2">
            {/* Style Selection */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-4">
                Select Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStyleChange(style.name)}
                    className={`p-4 rounded-lg border transition-all duration-200 text-left h-full relative group
                      ${selectedStyle === style.name 
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 border-transparent'
                        : 'border-gray-700 bg-gray-800 hover:bg-gray-700'}`}
                  >
                    <span className="font-medium capitalize">{style.name}</span>
                    
                    {/* Tooltip */}
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 
                      bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-10">
                      <p className="text-sm text-gray-300">{style.description}</p>
                      {/* Arrow */}
                      <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-r border-b border-gray-700"></div>
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedStyle === 'other' && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter your desired style
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    value={customStyle}
                    onChange={(e) => {
                      setCustomStyle(e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g., Renaissance, Pop Art, Abstract Expressionism"
                  />
                </div>
              )}
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-4">
                Enter Prompt
              </label>
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 min-h-[120px]"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setError(null);
                }}
                placeholder="Describe what you want to create..."
                disabled={!connected}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handlePromptSubmit}
              disabled={!connected || isGenerating}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                ${!connected || isGenerating
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 active:from-primary-700 active:to-secondary-700'}`}
            >
              {isGenerating ? 'Generating...' : 'Generate Image'}
            </button>

            {/* Demo Tip */}
            <div className="mt-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400">
                AryArt is still a demo, and the generated images will be displayed anonymously on the explorer page.
              </p>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              {/* Generated Image */}
              {generatedImage && (
                <div className="space-y-4">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <img
                      src={generatedImage}
                      alt="Generated artwork"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex mt-4">
                    <button
                      disabled={true}
                      className="w-full py-2 px-4 rounded-lg font-medium bg-gray-700 text-gray-400 cursor-not-allowed"
                    >
                      Mint NFT (Coming Soon)
                    </button>
                  </div>

                  {/* IPFS Result */}
                  {ipfsResult && (
                    <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                      <p className="text-sm text-gray-300 break-all">
                        IPFS URL: <a href={ipfsResult.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 break-all">{ipfsResult.url}</a>
                      </p>
                    </div>
                  )}

                  {/* Upload Error */}
                  {uploadError && (
                    <div className="mt-4 p-4 bg-red-900 bg-opacity-30 rounded-lg">
                      <p className="text-sm text-red-300">{uploadError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="aspect-w-1 aspect-h-1 w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
                </div>
              )}

              {/* Empty State */}
              {!generatedImage && !isGenerating && (
                <div className="aspect-w-1 aspect-h-1 w-full flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Select a style and enter a prompt<br />to create your artwork</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creating;
