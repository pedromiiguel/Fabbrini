import React, { useContext, useEffect, useState } from 'react';
import { createTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { ThemeProvider } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';
import { Link } from 'react-router-dom';
import { SymptonContext } from '../../context/SymptonContext';
import RefreshIcon from '@material-ui/icons/Refresh';
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
  },
});

export default function ModalTriagem() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const { localData } = useContext(SymptonContext);
  const id = String(localData?._id);

  // function handImage(color) {
  //   const img = {
  //     red: hand_red,
  //     orange: hand_orange,
  //     yellow: hand_yellow,
  //     green: hand_green,
  //     blue: hand_blue,
  //   };

  //   return img[color];
  // }

  useEffect(() => {
    setTimeout(() => {
      api.get(`/screening/result/${id}`).then((response) => {
        setData(response.data);

        setIsLoading(false);
      });
    }, 200);
  }, [id]);

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
                <Box
                  style={{
                    background: `${data.color} linear-gradient(transparent 0, rgba(0, 0, 0, 0.20) 0%)`,
                  }}
                  className="chip"
                >
                  <span>{data.triagemResult}</span>
                </Box>
                <Box style={{ background: '#2196F3' }} className="chip">
                  <span>{data.flowchart}</span>
                </Box>
              </div>
            </div>
            <div className="position">
              <p>Sua posição na fila é: </p>
              <div className="queueContainer">
                <Chip
                  size="medium"
                  icon={<QueryBuilderIcon />}
                  label={`Número ${data.queueScreening}`}
                />
                <Chip
                  size="medium"
                  icon={<RefreshIcon />}
                  label={`Atualizar`}
                  onClick={() => {
                    window.location.reload();
                  }}
                />
              </div>
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
                  <Link to="/" target="_blank" className="link" color="danger">
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
