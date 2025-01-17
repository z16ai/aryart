import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';


const popularCollections = [
  {
    id: 1,
    name: 'Mystical Wizards',
    thumbnail: '/images/themes/wizardn.png',
    creator: 'GH7ygR...2ZEq',
    description: 'A collection of powerful wizards with unique magical abilities',
  },
  {
    id: 2,
    name: 'Doge Universe',
    thumbnail: '/images/themes/dogen.png',
    creator: 'DKm9nX...8vPj',
    description: 'Much wow, very NFT! A collection of the internet\'s favorite dog',
  },
  {
    id: 3,
    name: 'Crypto Frogs',
    thumbnail: '/images/themes/frog.png',
    creator: 'Aq4wLp...9mNr',
    description: 'Rare Pepes and magical frogs from the crypto pond',
  },
  {
    id: 4,
    name: 'Crypto Monkeys',
    thumbnail: '/images/themes/monkey.png',
    creator: 'Bx5kHt...3yRs',
    description: 'Join the monkey business in the NFT jungle',
  },
];

const features = [
  {
    name: 'Create NFTs using AI Agents',
    description: 'Anyone can create and mint NFTs, and use the AryArt NFT AI Agent for free.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    name: 'Customize the collection',
    description: 'Anyone can create collections, set the creative style, as well as the quantity and distribution method.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    name: 'Trade NFTs and benefit together',
    description: 'Creators, Parent NFT holders, and Collection Creators can all obtain the proceeds from the transactions, jointly promoting the influence of the collections.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Stake $Ary',
    description: 'By staking $Ary tokens, you contribute to the development and expansion of the AI ​​agent. AryArt transaction fees will be distributed to stakers.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7zM9 11V4L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyAddress = async () => {
    const address = '******';
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <>
      <SEO 
        title="AryArt - Create Unique NFTs with AI Technology"
        description="Discover and create unique NFT collections powered by AI on AryArt. Mint, trade, and collect digital art in a vibrant community of creators."
      />
      <div className="space-y-32 mt-8">
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-8 lg:px-8">
          <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Co-create an NFT Collection with AI Agents
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              Create or choose a theme and jointly create an NFT Collection with others, which is driven by AI Agents. Select a Parent NFT and make it a sequel. Generate, mint and trade your NFTs in a seamless experience and earn profits. 
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/creating"
                  className="rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-primary-500 hover:to-secondary-500"
                >
                  Start Creating
                </Link>
                <Link 
                  to="/token"
                  className="rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                >
                  Buy $AryArt
                </Link>
              </div>
                      {/* Contract Address */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <div 
            className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 cursor-pointer hover:bg-white/10 transition-all"
            onClick={handleCopyAddress}
          >
            <span className="text-gray-400">Contract Address: </span>
            <span className="text-gray-200">******</span>
            {copySuccess ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            )}
          </div>
          {copySuccess && (
            <span className="text-sm text-green-500 mt-2">Address copied!</span>
          )}
        </div>
            </div>
          </div>
        </div>



        {/* Popular Collections */}
        <div className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Popular Collections
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Discover unique AI-generated artworks from our community
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {popularCollections.map((collection) => (
                  <div
                    key={collection.id}
                    className="relative rounded-lg border border-gray-800 bg-gray-900 p-4 hover:border-gray-700 transition-all duration-200"
                  >
                    <div className="aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden">
                      <img
                        src={collection.thumbnail}
                        alt={collection.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-white">
                        {collection.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        by {collection.creator}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="px-6 lg:px-8 mb-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center mb-16">
              AryArt NFT Launchpad
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        

        {/* Additional spacing before footer */}
        <div className="h-4"></div>
      </div>
    </>
  );
}
