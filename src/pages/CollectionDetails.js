import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Sample data - replace with actual API calls
const collectionData = {
  id: 1,
  name: 'Cyber Dreams',
  description: 'A collection of AI-generated cyberpunk artworks exploring the intersection of technology and humanity. Each piece is uniquely created using advanced AI algorithms and curated for maximum visual impact.',
  creator: '0x1234...5678',
  baseNFT: {
    id: 'base-1',
    image: '/images/themes/wizardn.png',
    prompt: 'Cyberpunk cityscape with neon lights and floating holograms, digital art style',
    description: 'The foundation piece of the Cyber Dreams collection, featuring a mesmerizing cyberpunk cityscape with vibrant neon elements and floating holographic displays.',
  },
  subNFTs: [
    {
      id: 'sub-1',
      image: '/images/themes/wizard1.png',
      name: 'Mystical Wizard #1',
      prompt: 'Cyberpunk warrior with glowing neon armor',
      owner: '0xWiz...ard1',
    },
    {
      id: 'sub-2',
      image: '/images/themes/wizard2.png',
      name: 'Mystical Wizard #2',
      prompt: 'Abstract digital landscape with flowing data streams',
      owner: '0xWiz...ard2',
    },
    {
      id: 'sub-3',
      image: '/images/themes/wizard3.png',
      name: 'Mystical Wizard #3',
      prompt: 'Futuristic Tokyo cityscape with holographic advertisements',
      owner: '0xWiz...ard3',
    },
    {
      id: 'sub-4',
      image: '/images/themes/wizard4.png',
      name: 'Mystical Wizard #4',
      prompt: 'Futuristic Tokyo cityscape with holographic advertisements',
      owner: '0xWiz...ard4',
    },
  ],
};

export default function CollectionDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      {/* Collection Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">{collectionData.name}</h1>
          <Link
            to={`/mint/${id}`}
            className="px-6 py-3 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:from-primary-500 hover:to-secondary-500"
          >
            Mint NFT
          </Link>
        </div>
        <p className="mt-4 text-gray-400">Created by {collectionData.creator}</p>
        <p className="mt-2 text-gray-300 max-w-3xl">{collectionData.description}</p>
      </div>

      {/* Base NFT */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Base NFT</h2>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <img
                src={collectionData.baseNFT.image}
                alt="Base NFT"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">Prompt</h3>
                <p className="mt-1 text-gray-400">{collectionData.baseNFT.prompt}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Description</h3>
                <p className="mt-1 text-gray-400">{collectionData.baseNFT.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub NFTs */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Collection Items</h2>
          <div className="flex items-center space-x-4">
            <select className="rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500">
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionData.subNFTs.map((nft) => (
            <Link
              key={nft.id}
              to={`/nft/${nft.id}`}
              className="group bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all duration-200"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="h-full w-full object-cover group-hover:opacity-75 transition-opacity duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-white">{nft.name}</h3>
                <p className="mt-1 text-sm text-gray-400">Owned by {nft.owner}</p>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">{nft.prompt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
