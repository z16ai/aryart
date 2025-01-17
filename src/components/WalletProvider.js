import React, { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SUPPORTED_WALLETS, NETWORK } from '../config/wallet';

// Import wallet adapter styles
require('@solana/wallet-adapter-react-ui/styles.css');

export const WalletContextProvider = ({ children }) => {
  const network = NETWORK;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={SUPPORTED_WALLETS} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
