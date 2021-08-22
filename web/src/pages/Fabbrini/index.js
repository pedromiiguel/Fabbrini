import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import medicine from '../../assets/images/undraw_medicine.svg';
import Menu from '../../components/Menu';

function Fabbrini() {
  return (
    <div className="home-container">
      <Menu />
      <main>
        <div className="content">
          <h1>Bem vindo ao Fabbrini!</h1>
          <div className="subtitle">
            <p>Sua saúde não deve ter obstáculos!</p>
          </div>

          <div className="description">
            <p>
              Estar se sentido mal? Faça sua autotriagem no botão abaixo, receba uma orientação e consulte com um de nossos médicos.
            </p>
          </div>

          <Link to="/autotriagem">Urgência</Link>
        </div>
        <div className="image-container">
          <img src={medicine} alt="" />
          <small>
             Este sistema não substitui uma avaliação de um médico.
          </small>
        </div>
      </main>
    </div>
  );
}

export default Fabbrini;
