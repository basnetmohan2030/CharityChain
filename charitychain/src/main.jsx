import React, {StrictMode} from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { Web3Provider } from './utils/Web3Provider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </StrictMode>
)

