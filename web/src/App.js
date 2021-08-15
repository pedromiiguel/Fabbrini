import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Autotriagem from './pages/Autotriagem/';
import Fabbrini from './pages/Fabbrini/';
import Modal from './pages/ResultTriagem/';

import SymptonContextProvider from './context/SymptonContext';

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <SymptonContextProvider>
        <Switch>
          <Route exact path="/" component={Fabbrini} />
          <Route exact path="/autotriagem" component={Autotriagem} />
          <Route exact path="/modal" component={Modal} />
          <Route component={() => <h1>Page 404</h1>} />
        </Switch>
      </SymptonContextProvider>
    </BrowserRouter>
  );
}

export default App;
