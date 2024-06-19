import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, ethers } from "ethers";
import { createContext } from "react";
import factoryContractABI from "../asset/abi/FactoryContractABI.json";

const FactoryCallerContext = createContext({
    addLiquidity: async (params: { token1: string, token2: string, amount1: number, amount2: number }) => Promise<ethers.TransactionResponse>,
});

function FactoryCallerProvider({ children }: { children: React.ReactNode }) {
    const { walletProvider } = useWeb3ModalProvider();

    async function addLiquidity({ token1, token2, amount1, amount2 }: { token1: string, token2: string, amount1: number, amount2: number }) {
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

    return (
        <FactoryCallerContext.Provider value={{ addLiquidity }}>
            {children}
        </FactoryCallerContext.Provider>
    );
}

export { FactoryCallerContext, FactoryCallerProvider };