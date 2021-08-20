import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import medicine from '../../assets/images/undraw_medicine.svg';
import Menu from '../../components/Menu';


function Fabbrini() {
  // const classes = useStyles();
  return (
    <div className="container">
      <Menu />
      <main>
        <div className="content">
          <h1>Bem vindo ao Fabbrini!</h1>
          <div className="subtitle">
            <p>Sua saúde não deve ter obstáculos!</p>
          </div>
         
          <div className="description">
            <p>
              Falar um pouco sobre o Fabbrini como um todo e oferecer a opção de
              efetuar uma autotriagem de emergência clicando no botão abaixo.
            </p>
          </div>

          <Link to="/autotriagem">Urgência</Link>
        </div>
        <img src={medicine} alt="" />
      </main>
    </div>
  );
}

export default Fabbrini;
