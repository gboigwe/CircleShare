'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';

// Define Base Sepolia Testnet
export const baseSepolia = defineChain({
  id: 84532,
  name: 'Base Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://sepolia.base.org',
        'https://base-sepolia.blockpi.network/v1/rpc/public',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://sepolia.basescan.org',
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: 'CircleShare',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [baseSepolia],
  ssr: true,
});