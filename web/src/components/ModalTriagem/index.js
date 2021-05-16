import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import FaceIcon from '@material-ui/icons/Face';
import { ThemeProvider } from '@material-ui/core/';
import DoneIcon from '@material-ui/icons/Done';

import './styles.css';
import { EventSharp } from '@material-ui/icons';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    info: {
      main: '##e5e5e5'
    }
  },
});

export default function ModalTriagem() {
  function handleDelete(event) {
    event.preventDefault();
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="overlay">
        <div className="container-modal">
          <header>
            <h1>O que fazer!</h1>
          </header>
          <p className="description">
            De acordo com as informações fornecidas por você:
          </p>
          <div className="state">
            <p>Seu estado é:</p>
            <div className="chip-container">
              <Chip
                color="primary"
                icon={<FaceIcon />}
                label="Dor de cabeça"
                deleteIcon={<DoneIcon />}
                deleteIcon={<DoneIcon />}
                onDelete={handleDelete}
              />
              <Chip
                color="secondary"
                icon={<FaceIcon />}
                label="Emergência"
                deleteIcon={<DoneIcon />}
                deleteIcon={<DoneIcon />}
                onDelete={handleDelete}
              />
            </div>
          </div>
          <div className="position">
            <p>Sua posição na fila é: </p>
            <Chip
              onDelete={handleDelete}
              icon={<FaceIcon />}
              label="Número 1"
            />
          </div>

          <div className="recommendation">
            <div className="recommendation-content">
              <h3>O Fabrinni recomenda que você:</h3>
              <p>
                Procure um médico com tal especialidade e faça a medição da sua
                temperatura.
              </p>
              <p>
                Deseja ver a lista de especialista que você precisa no fabrinni?
              </p>

              <div className="buttons-container">
              <Button color="gray">Não</Button>
              <Button color="primary">Sim</Button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
