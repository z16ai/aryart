import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '1',
    title: 'Connect Your Wallet',
    description: 'Use a blockchain wallet to connect to the website, which can support chrome plug-ins Phantom, Metamask, and OKX.',
  },
  {
    number: '2',
    title: 'Create and Publish a Collection',
    description: 'Design and launch your unique NFT collection with our AI-powered tools.',
  },
  {
    number: '3',
    title: 'Mint New NFTs',
    description: 'Visit the Collection and select an NFT as the Parent in the Collection to mint a new NFT.',
  },
  {
    number: '4',
    title: 'Trade Your NFTs',
    description: 'Buy, sell, and transfer your NFT on our platform.',
  },
];

const useCases = [
  'Creating a co-created NFT culture for the project community',
  'NFT avatar creation',
  'Co-creating an NFT comic',
  'Any other creative scenarios',
];

export default function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">How It Works</h1>
        <p className="text-lg text-gray-400">Create, mint, and trade NFTs with AryArt's AI-powered platform</p>
      </div>

      {/* Steps */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-24">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative bg-gray-800 rounded-lg p-6 transition-transform hover:scale-105"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Use Cases */}
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">AryArt is suitable for:</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-700 rounded-lg p-4"
            >
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"></div>
              </div>
              <p className="text-white">{useCase}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link
          to="/creating"
          className="inline-flex items-center rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:from-primary-500 hover:to-secondary-500"
        >
          Start Creating
        </Link>
      </div>
    </div>
  );
}
