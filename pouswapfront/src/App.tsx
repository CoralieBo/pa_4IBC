import './styles/app.scss';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/404/404';
import Home from './components/Home/Home';
import Swap from './components/Swap/Swap';
import Tokens from './components/Tokens/Tokens';
import Pools from './components/Pools/Pools';

function App() {
  return (
    <div className='min-h-screen bg'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/tokens" element={<Tokens />} />
        <Route path="/pools" element={<Pools />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
