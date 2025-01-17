import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styled from 'styled-components';

const WalletButtonWrapper = styled.div`
  .wallet-adapter-button {
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #45a049;
    }
    
    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }

  .wallet-adapter-button-trigger {
    background-image: linear-gradient(to right, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
    --tw-gradient-from: #4f46e5;
    --tw-gradient-to: #9333ea;
  }
`;

const WalletConnect = () => {
  const { wallet, connect, disconnect, connecting, connected } = useWallet();

  return (
    <WalletButtonWrapper>
      <WalletMultiButton className="!bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500">
        {!wallet ? 'Connect Wallet' : null}
      </WalletMultiButton>
    </WalletButtonWrapper>
  );
};

export default WalletConnect;
