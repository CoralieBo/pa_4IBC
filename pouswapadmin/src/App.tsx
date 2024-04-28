import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Users from './components/Users/Users';
import Admins from './components/Admins/Admins';
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount } from '@web3modal/ethers/react'
import ConnectButton from './asset/hooks/connectWallet';
import { useContext, useState } from 'react';
import { AdminContext } from './asset/hooks/isAdmin';

// 1. Get projectId
const projectId = 'c4c9fb94605ef75f7878b0f8f7452e7d'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

function App() {
  const { isConnected } = useWeb3ModalAccount();
  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  return (
    !isAdmin || !isConnected ?
      <div className='bg-colors-gray1 h-screen flex items-center justify-center'>
        <ConnectButton />
      </div>
      :
      <div className="bg-colors-green1 w-full h-screen flex">
        <Navbar />
        <div className='w-5/6 h-screen overflow-scroll bg-colors-gray1 rounded-s-3xl'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tokens" element={<div />} />
            <Route path="/fees" element={<div />} />
            <Route path="/admins" element={<Admins />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
