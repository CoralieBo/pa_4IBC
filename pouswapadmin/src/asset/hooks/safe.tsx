import { ContractTransactionReceipt, ethers } from 'ethers'
import SafeApiKit, { SignatureResponse } from '@safe-global/api-kit'
import Safe, { AddOwnerTxParams, EthersAdapter, RemoveOwnerTxParams } from '@safe-global/protocol-kit'
import { createContext, useEffect, useState } from 'react'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { SafeMultisigTransactionResponse } from '@safe-global/safe-core-sdk-types';
import { sign } from 'crypto';

const SafeContext = createContext({
    accountAddress: null as string | null,
    addAdmin: async (params: { ownerAddress: string }) => { },
    removeAdmin: async (params: { ownerAddress: string }): Promise<boolean> => false,
    getPendingTransactions: async () => [] as SafeMultisigTransactionResponse[] | undefined,
    executeTransaction: async (safeTxHash: string) => undefined as ContractTransactionReceipt | null | undefined
});

function SafeContextProvider({ children }: { children: React.ReactNode }) {
    const { walletProvider } = useWeb3ModalProvider();
    const { address } = useWeb3ModalAccount();
    const safeAddress = process.env.REACT_APP_SAFE_ADDRESS!;

    const [protocolKit, setProtocolKit] = useState<Safe | null>(null)
    const [apiKit, setApiKit] = useState<SafeApiKit | null>(null)
    const [accountAddress, setAccountAddress] = useState<string | null>(null)

    async function addAdmin({ ownerAddress }: { ownerAddress: string }) {
        if (!protocolKit || !apiKit) return
        try {
            const params: AddOwnerTxParams = {
                ownerAddress
            }
            const safeTransaction = await protocolKit.createAddOwnerTx(params)
            const safeTxHash = await protocolKit.getTransactionHash(safeTransaction)
            const senderSignature = await protocolKit.signHash(safeTxHash)
            await apiKit.proposeTransaction({
                safeAddress,
                safeTransactionData: safeTransaction.data,
                safeTxHash,
                senderAddress: address!,
                senderSignature: senderSignature.data,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async function removeAdmin({ ownerAddress }: { ownerAddress: string }): Promise<boolean> {
        if (!protocolKit || !apiKit) return false;
        try {
            const params: RemoveOwnerTxParams = {
                ownerAddress,
                threshold: 2
            }
            const safeTransaction = await protocolKit.createRemoveOwnerTx(params)
            const safeTxHash = await protocolKit.getTransactionHash(safeTransaction)
            const senderSignature = await protocolKit.signHash(safeTxHash)
            await apiKit.proposeTransaction({
                safeAddress,
                safeTransactionData: safeTransaction.data,
                safeTxHash,
                senderAddress: address!,
                senderSignature: senderSignature.data,
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async function getPendingTransactions(): Promise<SafeMultisigTransactionResponse[] | undefined> {
        if (!apiKit) return
        return (await apiKit.getPendingTransactions(safeAddress)).results;
    }

    async function executeTransaction(safeTxHash: string): Promise<ContractTransactionReceipt | null | undefined> {
        if (!protocolKit || !apiKit) return
        try {
            const safeTransaction = await apiKit.getTransaction(safeTxHash)
            const executeTxResponse = await protocolKit.executeTransaction(safeTransaction)
            const receipt = await executeTxResponse.transactionResponse?.wait()
            return receipt;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    useEffect(() => {
        async function initSafe() {
            if (!walletProvider) return

            const provider = new ethers.BrowserProvider(walletProvider)
            const signer = await provider.getSigner(0)

            const ethAdapter = new EthersAdapter({
                ethers,
                signerOrProvider: signer
            })
            if (await ethAdapter.getChainId() !== ethers.toBigInt(11155111)) {
                return;
            }
            const protocolKit = await Safe.create({ ethAdapter, safeAddress })
            setProtocolKit(protocolKit)

            const apiKit = new SafeApiKit({
                chainId: ethers.toBigInt(await ethAdapter.getChainId())
            })
            setApiKit(apiKit)

            const address = await protocolKit.getAddress()
            setAccountAddress(address)
        }
        initSafe()
    }, [walletProvider])

    return (
        <SafeContext.Provider value={{ accountAddress, addAdmin, removeAdmin, getPendingTransactions, executeTransaction }}>
            {children}
        </SafeContext.Provider>
    )
}

export { SafeContext, SafeContextProvider }