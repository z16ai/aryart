import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Sample data - replace with actual API calls
const nftData = {
  id: 'sub-1',
  name: 'Mystical Wizard #1',
  image: '/images/themes/wizard1.png',
  description: 'A stunning cyberpunk warrior adorned with intricate neon armor, standing against a backdrop of a futuristic cityscape. The piece showcases the perfect blend of organic and technological elements, creating a mesmerizing visual experience.',
  prompt: 'Cyberpunk warrior with glowing neon armor, detailed character design, science fiction',
  owner: '0xabcd...efgh',
  createdAt: '2025-01-06T08:49:43Z',
  parent: {
    id: 'base-1',
    name: 'Cyber Dreams Base',
    image: '/images/themes/wizardn.png',
  },
  collection: {
    id: 1,
    name: 'Mystical Wizards',
    description: 'A collection of AI-generated cyberpunk artworks exploring the intersection of technology and humanity.',
  },
  relatedNFTs: [
    {
      id: 'sub-2',
      name: 'Mystical Wizard #2',
      image: '/images/themes/wizard2.png',
      owner: '0x9876...5432',
      price: '1.23 ETH',
    },
    {
      id: 'sub-3',
      name: 'Mystical Wizard #3',
      image: '/images/themes/wizard3.png',
      owner: '0xijkl...mnop',
      price: '2.34 ETH',
    },
    {
      id: 'sub-4',
      name: 'Mystical Wizard #4',
      image: '/images/themes/wizard4.png',
      owner: '0xqrst...uvwx',
      price: '3.45 ETH',
    },
    {
      id: 'sub-5',
      name: 'Mystical Wizard #5',
      image: '/images/themes/wizard1.png',
      owner: '0xwxyz...abcd',
      price: '4.56 ETH',
    },
  ],
};

export default function NFTDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div>
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-800">
            <img
              src={nftData.image}
              alt={nftData.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-8">
          {/* NFT Info */}
          <div>
            <h1 className="text-4xl font-bold text-white">{nftData.name}</h1>
            <p className="mt-4 text-gray-300">{nftData.description}</p>
          </div>

          {/* Owner & Creation Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-400">Owned by</h3>
              <p className="mt-1 text-white font-medium">{nftData.owner}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Created</h3>
              <p className="mt-1 text-white font-medium">
                {new Date(nftData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Prompt */}
          {/* <div>
            <h3 className="text-lg font-medium text-white mb-2">Generation Prompt</h3>
            <p className="text-gray-300">{nftData.prompt}</p>
          </div> */}

          {/* Parent NFT */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Parent NFT</h3>
            <Link
              to={`/nft/${nftData.parent.id}`}
              className="block bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all duration-200"
            >
              <div className="p-4 flex items-center space-x-4">
                <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={nftData.parent.image}
                    alt={nftData.parent.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{nftData.parent.name}</h4>
                  <p className="text-sm text-gray-400">Parent NFT</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Collection Info */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Collection</h3>
            <Link
              to={`/collection/${nftData.collection.id}`}
              className="block bg-gray-800 rounded-lg p-4 hover:ring-2 hover:ring-primary-500 transition-all duration-200"
            >
              <h4 className="text-white font-medium">{nftData.collection.name}</h4>
              <p className="mt-1 text-sm text-gray-400">{nftData.collection.description}</p>
            </Link>
          </div>
        </div>
      </div>

      {/* More From This Collection */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-8">More From This Collection</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {nftData.relatedNFTs.map((nft) => (
            <Link key={nft.id} to={`/nft/${nft.id}`} className="group">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm text-white">{nft.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary-400">{nft.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
