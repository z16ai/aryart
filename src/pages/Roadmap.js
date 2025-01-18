import React from 'react';

const phases = [
  {
    title: 'Phase 1',
    items: [
      {
        main: 'Complete the MVP',
        sub: [
          'Connect Solana Wallet',
          'Create artworks with AI Agents',
          'Upload artworks to the IPFS network for permanent storage',
          'Browse all the generated artworks'
        ]
      },
      'Launch $Ary',
      'Create the AryArt Twitter and Telegram communities'
    ],
    status: 'in-progress'
  },
  {
    title: 'Phase 2',
    items: [
      'Create an NFT Collection and mint NFTs',
      'Claim AryArt OG NFTs',
      'Mint AryArt Open NFTs',
      'The number of NFTs created by users reaches 5,000',
    ],
    status: 'upcoming'
  },
  {
    title: 'Phase 3',
    items: [
      'NFT buying, selling, and transferring',
      'The number of Collections reaches 200+',
      'The number of NFTs reaches 20,000',
    ],
    status: 'upcoming'
  },
  {
    title: 'Phase 4',
    items: [
      'Launch $Ary Stake',
      'Initiate community governance',
      'Achieve full automation and decentralization',
      'Optimize and open source AI NFT Agent',
      'Build a more open ecological community'
    ],
    status: 'upcoming'
  }
];

export default function Roadmap() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Roadmap</h1>
        <p className="text-lg text-gray-400">Our journey to revolutionize NFT creation with AI</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-700 h-full"></div>

        {/* Phases */}
        <div className="space-y-24">
          {phases.map((phase, index) => (
            <div key={phase.title} className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}>
              {/* Phase content */}
              <div className={`lg:w-[calc(100%-2rem)] ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <div className="bg-gray-800 rounded-lg p-8 relative">
                  {/* Connector line */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-700
                    ${index % 2 === 0 ? 'right-[-2rem] lg:block hidden' : 'left-[-2rem] lg:block hidden'}"></div>

                  {/* Phase marker */}
                  <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full
                    ${phase.status === 'in-progress' ? 'bg-gradient-to-r from-primary-600 to-secondary-600' : phase.status === 'upcoming' ? 'bg-gray-700' : 'bg-gray-700'}
                    ${index % 2 === 0 ? 'right-[-3rem] lg:block hidden' : 'left-[-3rem] lg:block hidden'}`}></div>

                  <h2 className="text-2xl font-bold text-white mb-6">{phase.title}</h2>
                  <div className="space-y-4">
                    {phase.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex flex-col space-y-2">
                        {typeof item === 'string' ? (
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600"></div>
                            <p className="text-gray-300">{item}</p>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600"></div>
                              <p className="text-gray-300">{item.main}</p>
                            </div>
                            <div className="space-y-2 ml-6">
                              {item.sub.map((subItem, subIndex) => (
                                <div key={subIndex} className="flex items-start space-x-3">
                                  <span className="text-gray-400 text-sm">•</span>
                                  <p className="text-gray-400 text-sm">{subItem}</p>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
