import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
  {/* <HashRouter> */}

    <App />
  {/* </HashRouter> */}
  </BrowserRouter>
  // </React.StrictMode> */}
);

