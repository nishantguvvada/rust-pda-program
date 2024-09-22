"use client";
import '@solana/wallet-adapter-react-ui/styles.css';
import dynamic from "next/dynamic"
const WalletMultiButtonDynamic = dynamic(
    async () => (await import ("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);
const WalletDisconnectButtonDynamic = dynamic(
    async () => (await import ("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
    { ssr: false }
);

export const Wallet = () => {
    return (
        <div className="flex flex-col gap-2 place-items-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Connect Wallet</h5>
            <WalletMultiButtonDynamic/>
            <WalletDisconnectButtonDynamic/>
        </div>
    )
}