import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FactoryProvider } from './utils/hooks/Factory';
import { SimpleTokenProvider } from './utils/hooks/SimpleTokens';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <FactoryProvider>
    <SimpleTokenProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </SimpleTokenProvider>
  </FactoryProvider>
);