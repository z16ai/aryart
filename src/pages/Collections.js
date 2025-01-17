import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Sample data - replace with actual API calls
const collectionsData = [
  {
    id: 1,
    name: 'Mystical Wizards',
    thumbnail: '/images/themes/wizardn.png',
    creator: '0xWiz...ard9',
    totalItems: 100,
    floorPrice: '0.5 ETH',
    totalVolume: '150 ETH',
    description: 'A collection of powerful wizards with unique magical abilities',
  },
  {
    id: 2,
    name: 'Doge Universe',
    thumbnail: '/images/themes/dogen.png',
    creator: '0xDog...e420',
    totalItems: 88,
    floorPrice: '0.3 ETH',
    totalVolume: '120 ETH',
    description: 'Much wow, very NFT! A collection of the internet\'s favorite dog',
  },
  {
    id: 3,
    name: 'Crypto Frogs',
    thumbnail: '/images/themes/frog.png',
    creator: '0xPep...e777',
    totalItems: 75,
    floorPrice: '0.4 ETH',
    totalVolume: '95 ETH',
    description: 'Rare Pepes and magical frogs from the crypto pond',
  },
  {
    id: 4,
    name: 'Crypto Monkeys',
    thumbnail: '/images/themes/monkey.png',
    creator: '0xBan...e365',
    totalItems: 92,
    floorPrice: '0.45 ETH',
    totalVolume: '135 ETH',
    description: 'Join the monkey business in the NFT jungle',
  },
];

const sortOptions = [
  { name: 'Top Mint', value: 'mint' },
  { name: 'Top Holder', value: 'holder' },
  { name: 'Newest', value: 'newest' },
];

export default function Collections() {
  const [sortBy, setSortBy] = useState('mint');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCollections = collectionsData.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEO 
        title="NFT Collections - AryArt | Browse AI-Generated Digital Art"
        description="Explore unique NFT collections on AryArt. Discover AI-generated digital art, rare collectibles, and join a community of creators and collectors."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold text-white">Collections</h1>
          <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full h-[36px] rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Sort Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                sortBy === option.value
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>

        {/* Collections Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCollections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collection/${collection.id}`}
              className="group relative bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all duration-200"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={collection.thumbnail}
                  alt={collection.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-white">{collection.name}</h3>
                <p className="mt-1 text-sm text-gray-400">by {collection.creator}</p>
                <p className="mt-2 text-sm text-gray-400">{collection.description}</p>
                
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p className="text-gray-400">Floor Price</p>
                    <p className="text-white font-medium">{collection.floorPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Items</p>
                    <p className="text-white font-medium">{collection.totalItems}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Volume</p>
                    <p className="text-white font-medium">{collection.totalVolume}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/mint-nft?collection=${collection.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-sm font-medium text-white hover:from-primary-500 hover:to-secondary-500"
                  >
                    Mint NFT
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-400">No collections found matching your search.</p>
          </div>
        )}
      </div>
    </>
  );
}
