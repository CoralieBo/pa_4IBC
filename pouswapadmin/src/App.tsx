import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="bg-colors-green1 w-full h-screen flex">
      <Navbar />
      <div className='w-5/6 h-screen overflow-scroll bg-colors-gray1 rounded-s-3xl'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<div />} />
          <Route path="/tokens" element={<div />} />
          <Route path="/fees" element={<div />} />
          <Route path="/admins" element={<div />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
