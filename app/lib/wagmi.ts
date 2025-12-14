'use client';
import { http, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';
export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, sepolia],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_MAINNET!),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_SEPOLIA!),
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_POLYGON!),
    [optimism.id]: http(process.env.NEXT_PUBLIC_RPC_OPTIMISM!),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_RPC_ARBITRUM!)
  }
});
