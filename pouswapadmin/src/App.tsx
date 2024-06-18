import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Users from './components/Users/Users';
import Admins from './components/Admins/Admins';
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount } from '@web3modal/ethers/react'
import ConnectButton from './asset/hooks/connectWallet';
import { useContext } from 'react';
import { AdminContext } from './asset/hooks/isAdmin';
import PendingTx from './components/PendingTx/PendingTx';
import Tokens from './components/Tokens/Tokens';

// 1. Get projectId
const projectId = 'c4c9fb94605ef75f7878b0f8f7452e7d'

// 2. Set chains
const chains = [{
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: process.env.REACT_APP_RPC_URL!
}]

// 3. Create a metadata object
const metadata = {
  name: 'PouSwap Admin',
  description: 'Pouswap admin dashboard',
  url: 'https://pouswap-admin.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  defaultChainId: 11155111, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: chains,
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
        <div className='w-5/6 h-screen overflow-y-scroll overflow-x-hidden bg-colors-gray1 rounded-s-3xl'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/fees" element={<div />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/pending" element={<PendingTx />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
