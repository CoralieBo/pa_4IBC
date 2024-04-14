import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Users from './components/Users/Users';
import Admins from './components/Admins/Admins';

function App() {
  // 1. Get projectId at https://cloud.walletconnect.com
  // const projectId = 'c4c9fb94605ef75f7878b0f8f7452e7d' // METTRE DANS LE .ENV

  // // 2. Set chains
  // const mainnet = {
  //   chainId: 1,
  //   name: 'Ethereum',
  //   currency: 'ETH',
  //   explorerUrl: 'https://etherscan.io',
  //   rpcUrl: 'https://cloudflare-eth.com'
  // }

  // // 3. Create modal
  // const metadata = {
  //   name: 'PouSwap',
  //   description: 'PouSwap dapp',
  //   url: '', // origin must match your domain & subdomain
  //   icons: ['https://avatars.mywebsite.com/']
  // }

  // createWeb3Modal({
  //   ethersConfig: defaultConfig({ metadata }),
  //   chains: [mainnet],
  //   projectId,
  //   enableAnalytics: true, // Optional - defaults to your Cloud configuration
  //   themeVariables: {
  //     '--w3m-accent': "#EEEEEE",
  //   },
  //   themeMode: 'dark'
  // })

  return (
    <div className="bg-colors-green1 w-full h-screen flex">
      <>
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
      </>
    </div>
  );
}

export default App;
