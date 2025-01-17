import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ 
  title = 'AryArt - AI-Driven NFT Creation Platform',
  description = 'Create, mint, and trade unique NFTs with AI technology on AryArt. Join our community of creators and collectors in the next generation of digital art.',
  image = '/images/aryart-logon.png',
  url = 'https://aryart.xyz'
}) {
  if (!url) {
    url = 'https://aryart.xyz'
  }

  const siteMetadata = {
    siteUrl: 'https://aryart.xyz',
    title: 'AryArt',
    description: 'AI-Driven NFT Creation Platform',
    image: '/images/aryart-logon.png',
    twitterUsername: '@AryArt_xyz',
  };

  const metaDescription = description || siteMetadata.description;
  const metaImage = `${siteMetadata.siteUrl}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Additional SEO tags */}
      <meta name="keywords" content="NFT, AI Art, Digital Art, Blockchain, Crypto Art, Web3, Digital Collectibles, AI NFT" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
