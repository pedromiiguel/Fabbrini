import React, { useEffect, useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {Box}from '@material-ui/core';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { ThemeProvider } from '@material-ui/core/';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
  },
});

export default function ModalTriagem() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      api.get('/screening/result').then((response) => {

        setData(
          response.data
        )

        setIsLoading(false)

      });
    }, 200)
  }, []);
  function handleDelete(event) {
    event.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="overlay">
        {isLoading ? (
          <>
            <CircularProgress />
          </>
        ) : (
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
              <Box style={{background: data.color  }} className="chip" >{data.triagemResult}</Box>
                {/* <Box style={{background: '#2196F3' }} className="chip" >{data.discriminators[0]}</Box> */}
                <Box style={{background: '#2196F3' }} className="chip" >{data.flowchart}</Box>

              </div>
            </div>
            <div className="position">
              <p>Sua posição na fila é: </p>
              <Chip
              size="medium"
                icon={<QueryBuilderIcon />}
                label={`Número ${data.queueScreening}`}
              />
            </div>

            <div className="recommendation">
              <div className="recommendation-content">
                <h3>O Fabrinni recomenda que você:</h3>
                <p>
                  Procure um médico com tal especialidade e faça a medição da
                  sua temperatura.
                </p>
                <p>
                  Deseja ver a lista de especialista que você precisa no
                  fabrinni?
                </p>

                <div className="buttons-container">
                  <Link to="/" className="link" color="danger">
                    Não
                  </Link>
                  <Button color="primary">Sim</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
