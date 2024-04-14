import { BrowserProvider, ethers } from 'ethers'
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import coin from "../../asset/images/wallet.png"
import { useEffect } from 'react'
import User from '../../services/User'

export default function ConnectButton() {
    const { open } = useWeb3Modal()
    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        async function signedMessage() {
            if (!address) return;
            try {
                const provider = new BrowserProvider(walletProvider as any)
                const randomBytes = ethers.hexlify(ethers.randomBytes(16));
                const now = new Date();
                const message = `By signing this message, I allow the PouSwap App to save your public key.\n\nNonce: ${randomBytes} - ${now.toISOString()}`;
                const signer = await provider.getSigner();
                const signature = await signer?.signMessage(message);
                if (signature) {
                    try {
                        const user = await new User().getOneByPublicKey(address);
                        console.log(user);
                    } catch (error) {
                        disconnect();
                        console.log(error)
                    }
                }
            } catch (error) {
                disconnect();
                console.log(error)
            }
        }
        if (isConnected) {
            signedMessage();
        }
    }, [isConnected, address])

    return (
        <button className='text-white' onClick={() => open()}>
            {
                isConnected ?
                    <span className='flex items-center gap-1 py-1.5 px-4'>
                        <img className='h-8' src={coin} alt='logo' />
                        {address?.slice(0, 5)}...{address?.slice(address.length - 5)}
                    </span>
                    :
                    <span className='flex items-center gap-1 py-3 px-6'>Connect wallet</span>
            }
        </button>
        //   <button className='' onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    )
}