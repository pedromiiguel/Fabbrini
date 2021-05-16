import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Autotriagem from './pages/Autotriagem/index';
import Fabbrini from './pages/Fabbrini/index';
import Modal from './components/ModalTriagem/index'
import './styles/global.css';


//Configurações das rotas 
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Fabbrini}/>
        <Route exact path="/autotriagem" component={Autotriagem}/>
        <Route exact path="/modal" component={Modal}/>
        <Route  component={() => <h1>Page 404</h1> }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
