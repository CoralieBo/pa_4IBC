import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, ethers } from "ethers";
import { createContext } from "react";
import factoryContractABI from "../asset/abi/FactoryContractABI.json";

interface FactoryContextType {
    addLiquidity: (params: { token1: string, token2: string, amount1: bigint, amount2: bigint }) => Promise<ethers.TransactionResponse | null>,
    getAllPools: () => Promise<string[]>,
}

const FactoryContext = createContext<FactoryContextType | undefined>(undefined)

function FactoryProvider({ children }: { children: React.ReactNode }) {
    const { walletProvider } = useWeb3ModalProvider();

    async function addLiquidity({ token1, token2, amount1, amount2 }: { token1: string, token2: string, amount1: bigint, amount2: bigint }): Promise<ethers.TransactionResponse | null> {
        console.log("Adding liquidity to factory");
        const provider = new BrowserProvider(walletProvider as any);
        const signer = await provider.getSigner();
        const factoryContract = new ethers.Contract(process.env.REACT_APP_FACTORY_ADDRESS!, factoryContractABI, signer);
        try {
            const tx = await factoryContract.createPool(token1, token2, amount1, amount2);
            await tx.wait();
            return tx;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function getAllPools(): Promise<string[]>{
        const provider = new BrowserProvider(walletProvider as any);
        const factoryContract = new ethers.Contract(process.env.REACT_APP_FACTORY_ADDRESS!, factoryContractABI, provider);
        try {
            const pools = await factoryContract.getPairsAddresses();
            return pools;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    return (
        <FactoryContext.Provider value={{ addLiquidity, getAllPools }}>
            {children}
        </FactoryContext.Provider>
    );
}

export { FactoryContext, FactoryProvider };