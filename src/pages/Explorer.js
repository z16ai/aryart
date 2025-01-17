import React, { useState, useEffect } from 'react';
import { fetchSpaceImages } from '../services/explorerService';

const Explorer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedImages = await fetchSpaceImages();
        setImages(fetchedImages);
      } catch (err) {
        console.error('Failed to load images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-800 bg-opacity-30 p-4 rounded-lg">
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate grid columns based on number of images
  const getGridCols = () => {
    if (images.length <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (images.length <= 6) return 'grid-cols-2 sm:grid-cols-3';
    if (images.length <= 12) return 'grid-cols-3 sm:grid-cols-4';
    return 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6';
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore AryArt</h1>
        
        {images.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px] bg-gray-900 bg-opacity-50 rounded-lg">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No images found</p>
            </div>
          </div>
        ) : (
          <div className={`grid ${getGridCols()} gap-0`}>
            {images.map((image) => (
              <a
                key={image.cid}
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square group"
              >
                <img
                  src={image.url}
                  alt={`Art ${image.cid}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
