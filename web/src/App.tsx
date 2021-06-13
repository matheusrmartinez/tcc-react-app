import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/index';

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
