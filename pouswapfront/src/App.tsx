import './styles/app.scss';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-screen bg'>
      <Header />
      <Routes>
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
