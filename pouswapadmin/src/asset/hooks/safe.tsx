import { ethers } from 'ethers'
import SafeApiKit from '@safe-global/api-kit'
import Safe, { AddOwnerTxParams, EthersAdapter } from '@safe-global/protocol-kit'
import { createContext, useEffect, useState } from 'react'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { SafeMultisigTransactionResponse } from '@safe-global/safe-core-sdk-types';

const SafeContext = createContext({
    accountAddress: null as string | null,
    addAdmin: async (params: { ownerAddress: string }) => { },
    getPendingTransactions: () => { }
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
    }

    async function getPendingTransactions(): Promise<SafeMultisigTransactionResponse[] | undefined> {
        if (!apiKit) return
        return (await apiKit.getPendingTransactions(safeAddress)).results;
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
        <SafeContext.Provider value={{ accountAddress, addAdmin, getPendingTransactions }}>
            {children}
        </SafeContext.Provider>
    )
}

export { SafeContext, SafeContextProvider }