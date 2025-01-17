import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

export const SUPPORTED_WALLETS = [
  new PhantomWalletAdapter(),
];

export const NETWORK = 'mainnet-beta'; // or 'devnet' for development
