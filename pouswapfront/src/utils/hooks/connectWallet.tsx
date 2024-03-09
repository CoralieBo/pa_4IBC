import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'
import "../../styles/index.scss"
import coin from "../asset/images/wallet.png";

export default function ConnectButton() {
    // 4. Use modal hook
    const { open } = useWeb3Modal()
    const { address, isConnected } = useWeb3ModalAccount();

    return (
        <button className='text-white' onClick={() => open()}>
            {
                isConnected ?
                    <span className='flex items-center gap-1 py-1.5 px-6'>
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