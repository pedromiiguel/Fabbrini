import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Autotriagem from './pages/Autotriagem/index';
import Fabbrini from './pages/Fabbrini/index';
import Modal from './components/ModalTriagem/index';
import Login from './pages/Login/index';
import SignUp from './pages/SignUp/index';



import SymptonContextProvider from './context/SymptonContext';

import './styles/global.css';

//Configurações das rotas
function App() {
  return (
    <BrowserRouter>
      <SymptonContextProvider>
        <Switch>
          <Route exact path="/" component={Fabbrini} />
          <Route exact path="/autotriagem" component={Autotriagem} />
          <Route exact path="/modal" component={Modal} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={() => <h1>Page 404</h1>} />
        </Switch>
      </SymptonContextProvider>
    </BrowserRouter>
  );
}

export default App;
