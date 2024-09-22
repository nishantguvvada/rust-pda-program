"use client";

import { getProgram } from "@/utils/program";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import toast from 'react-hot-toast';
import { useEffect, useMemo, useState } from "react";

export const CreatePDA = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [pda, setPda] = useState("");
    const [key, setKey] = useState("");

    useEffect(()=>{
        setKey(key);
    },[wallet.publicKey]);

    const program = useMemo(() => {
        if(wallet.publicKey){
            setKey(wallet.publicKey.toBase58());
            return getProgram(connection, wallet);
        } else {
            setKey("");
            setPda("");
        }
    },[connection, wallet]);

    const generatePDA = async () => {

        const [PDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("data"), wallet.publicKey.toBuffer()],
            program.programId,
        );

        console.log(`PDA ${PDA}`);

        try {
            const transaction = await program.methods.initialize().accounts({
                user: wallet.publicKey,
                pdaAccount: PDA,
                systemProgram: SystemProgram.programId
            }).transaction();
    
            console.log("Transaction", transaction);
    
            // set fee payer
            transaction.feePayer = wallet.publicKey;
            // get latest blockhash
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            // sign transaction
            const signedTx = await wallet.signTransaction(transaction);
            console.log("Signed Transaction", signedTx);
            // send transaction
            const txId = await connection.sendRawTransaction(signedTx.serialize());
            console.log("Transaction ID", txId);
            // confirmTransaction returns a signature
            const signature = await connection.confirmTransaction(txId, "confirmed");
      
            setPda(PDA.toBase58());
            console.log("Transaction signature", txId.slice(0, 5));
            toast.success("PDA Generated!")
        } catch(err) {
            toast.error("PDA already exists!")
            console.log("Error: ",err);
        }
        
    }

    return <div className="grid h-full place-items-center gap-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Create a PDA for any account!</h1>
        <div>
            <p className="text-lg text-gray-500">Connect your wallet to generate a PDA from it!</p>
        </div>
        <input value={pda} readOnly className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PDA Key" required />
        <h6 className="text-lg font-bold dark:text-white">Connected Wallet : {key ? key : "None"}</h6>
        <button onClick={generatePDA} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate PDA</button>
    </div>
}