import React, { useEffect, useState } from 'react';
import { createTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import api from '../../services/api';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { ThemeProvider } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '../../components/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Medicine from '../../assets/images/result_medicine.svg';
import './styles.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#D32F2F',
    },
    inherit: {
      main: '#0d47a1',
    },
  },
});

export default function ModalTriagem() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const localData = localStorage.getItem('@RNAuth:user_id');

  function recommendationForColor(color) {
    const recommendation = {
      red: {
        message:
          'Chame imediatamente uma ambulância, e comunique uma pessoa próxima.',
        state: '#d32f2f',
        contrast: '#fff',
      },
      orange: {
        message:
          'Chame imediatamente uma ambulância, e comunique uma pessoa próxima.',
        state: '#ff5722',
        contrast: '#fff',
      },

      yellow: {
        message: 'Assim que possível se encaminhe para um hospital.',
        state: '#fdd835',
        contrast: '#000',
      },

      green: {
        message: 'Se cadastre em nosso sistema e agende sua consulta.',
        state: '#388e3c',
        contrast: '#fff',
      },
      blue: {
        message: 'Se cadastre em nosso sistema e agende sua consulta.',
        state: '#0d47a1',
        contrast: '#fff',
      },
    };

    return recommendation[color];
  }

  const ResultScreening = recommendationForColor(data.color);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const { latitude, longitude, accuracy } = pos.coords;

    console.log('Sua posição atual é:');
    console.log('Latitude : ' + latitude);
    console.log('Longitude: ' + longitude);
    console.log('Mais ou menos ' + accuracy + ' metros.');

    window.open(
      `https://www.google.com/maps/search/encontrar+hospitais+mais+pr%C3%B3ximos/@${latitude},${longitude},14z`,
      '_blank'
    );
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  useEffect(() => {
    setTimeout(() => {
      const data = JSON.parse(localData);

      api.get(`/screening/result/${data._id}`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    }, 300);
  }, [localData]);

  return (
    <ThemeProvider theme={theme}>
      <main className="container">
        <Menu />

        <div className="screening-container">
          <div className="screening-image">
            <img src={Medicine} alt="" />
          </div>
          {isLoading ? (
            <div className="progress">
              <CircularProgress />
            </div>
          ) : (
            <div className="screening-content">
              <header>
                <h1>O que fazer ?</h1>
              </header>
              <div className="screening-space">
                <h4 className="screening-description">
                  De acordo com as informações fornecida por você:
                </h4>
                <div className="screening-state">
                  <p>Seu estado é:</p>
                  <Box
                    style={{
                      background: `${ResultScreening?.state}`,
                      color: `${ResultScreening?.contrast}`,
                    }}
                    className="chip"
                  >
                    <span>{data.triagemResult}</span>
                  </Box>
                </div>
                <div className="screening-queue">
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

                <div className="screening-data">
                  <p>
                    Preencha alguns dados complementares, enquanto aguarda sua
                    consulta:
                  </p>
                  <Button variant="contained" color="primary">
                    Dados complementares
                  </Button>
                </div>

                <div className="recommendation-content">
                  <h3>O Fabrinni recomenda que você:</h3>
                  <p>{ResultScreening?.message}</p>
                  {data.color === 'red' || data.color === 'orange' ? (
                    <div className="buttons-container">
                      <Button
                        variant="contained"
                        color="secondary"
                        href="tel:192"
                        startIcon={<LocalHospitalIcon />}
                      >
                        Chamar ambulância
                      </Button>
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => getCurrentPosition()}
                        startIcon={<LocationOnIcon />}
                      >
                        Encontrar hospitais próximos
                      </Button>
                    </div>
                  ) : (
                    <div className="buttons-container">
                      <Button
                        variant="contained"
                        color="primary"
                        target="_blank"
                        href="https://fabbrini.herokuapp.com/"
                      >
                        Marcar consulta
                      </Button>
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => getCurrentPosition()}
                        startIcon={<LocationOnIcon />}
                      >
                        Encontrar hospitais próximos
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}
