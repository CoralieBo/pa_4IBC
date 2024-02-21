import './styles/app.scss';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/404/404';

function App() {
  return (
    <div className='min-h-screen bg'>
      <Header />
      <Routes>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
