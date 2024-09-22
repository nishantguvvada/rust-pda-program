"use client";
import { CreatePDA } from "@/components/CreatePDA";
import { Wallet } from "@/components/Wallet";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const endpoint = "https://api.devnet.solana.com";
  return (
    <div className="grid h-full place-items-center gap-4 mt-4">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Wallet/>
            <CreatePDA/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <Toaster/>
    </div>
  );
}
