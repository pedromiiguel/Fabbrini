import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import ModalTriagem from '../ModalTriagem';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    paddingLeft: '26px',
  },
  inputField: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: '#2196F3',
  },
  stepOne: {
    width: '100%',
    height: '280px',
    paddingBottom: '60px',
  },
  formLabelLegend: {
    fontWeight: '600',
    color: '#000000',
    fontSize: '18px',
    marginBottom: '10px',
    marginTop: '20px',
  },
  formControl: {
    width: '600px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    paddingLeft: '26px',
  },
  inputGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: '1fr 1fr',
    gap: '20px',
    width: '100%',
    paddingLeft: '26px',
    paddingRight: '26px',
    height: '100%',
    marginBottom: '70px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    borderTop: '1px solid #E0E0E0',
    marginTop: '20px',
    height: '50%',
  },
  buttons: {
    padding: '20px',
  },
}));

const StyledRadio = withStyles({
  root: {
    color: '#2196F3',
    margin: 0,
    '&$checked': {
      color: '#2196F3',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function StepIdentification({ handleNext }) {
  const classes = useStyles();
  const [complementaryData, setComplementaryData] = useState({
    peso: '',
    altura: '',
    frequenciaCardiaca: '',
    frequenciaRespiratoria: '',
    pressaoArterial: '',
    oximetria: '',
    email: '',
    senha: '',
  });

  const [isModalTriagem, setIsModalTriagem] = useState(false);

  function closeModalTriagem() {
    setIsModalTriagem(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // const {
    //   peso,
    //   altura,
    //   frequenciaCardiaca,
    //   frequenciaRespiratoria,
    //   pressaoArterial,
    //   oximetria,
    //   email,
    //   senha,
    // } = complementaryData;

    const data = {
      ...complementaryData,
    };

    console.log(complementaryData);
    api
      .post('complementaryData', data)
      .then(() => {
        alert('cadastro finalizado');
      })
      .catch((err) => {
        alert(err);
      });
    // handleNext();
    setIsModalTriagem(true);
  }
  return (
    <>
      <Box className={classes.stepOne}>
        <Typography className={classes.instructions}>
          Forneça as últimas informações para finalizar sua triagem.
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className={classes.inputField}
          onSubmit={handleSubmit}
        >
          <div className={classes.inputGroup}>
            <TextField
              id="outlined-basic"
              label="Peso"
              type="text"
              variant="outlined"
              value={complementaryData.peso}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  peso: event.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Altura"
              type="text"
              variant="outlined"
              value={complementaryData.altura}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  altura: event.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Frequência Cardíaca"
              type="text"
              variant="outlined"
              value={complementaryData.frequenciaCardiaca}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  frequenciaCardiaca: event.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Frequência Respiratória"
              type="text"
              variant="outlined"
              value={complementaryData.frequenciaRespiratoria}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  frequenciaRespiratoria: event.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Pressão Arterial"
              type="text"
              variant="outlined"
              value={complementaryData.pressaoArterial}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  pressaoArterial: event.target.value,
                });
              }}
            />

            <TextField
              id="outlined-basic"
              label="Oximetria"
              type="text"
              variant="outlined"
              value={complementaryData.oximetria}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  oximetria: event.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              type="text"
              variant="outlined"
              value={complementaryData.email}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  email: event.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              type="text"
              variant="outlined"
              value={complementaryData.senha}
              onChange={(event) => {
                setComplementaryData({
                  ...complementaryData,
                  senha: event.target.value,
                });
              }}
            />
          </div>

          <div className={classes.buttonsContainer}>
            <div className={classes.buttons}>
              <Button>Back</Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                id="finishButton"
                type=""
                onSubmit={handleSubmit}
              >
                Finalizar
              </Button>
            </div>
          </div>
        </form>
      </Box>
      {isModalTriagem && <ModalTriagem />}
    </>
  );
}

export default StepIdentification;
