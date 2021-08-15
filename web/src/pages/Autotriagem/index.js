import React from 'react';
// import Button from '@material-ui/core/Button';

import Menu from '../../components/Menu';
import Steeper from '../../components/Steeper';

import './styles.css';

function Autotriagem() {
  return (
    <div className="page-autotriagem">
      <Menu />
      <main className="page-autotriagem-content">
        <div className="page-autotriagem-info">
          <h1>Autotriagem</h1>
          <p className="description-autotriagem">
            Forneça as informações abaixo de acordo com o que está sentindo.
          </p>
        </div>
        <div className="form-triagem">
          <Steeper />
        </div>
      </main>
    </div>
  );
}

export default Autotriagem;
