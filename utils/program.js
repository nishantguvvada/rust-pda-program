import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import IDL from "./IDL.json";

export const getProgram = (connection, wallet) => {
    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    setProvider(provider);

    const programId = new PublicKey("Fy9amj882SkBF9ANUM2nCjHUbFX8ogMte4CjFaW9fdLb");
    const program = new Program(IDL, programId, provider);

    return program;
}