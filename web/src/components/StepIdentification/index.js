import React, { useContext, useState } from 'react';
import {
  TextField,
  Typography,
  Box,
  Button,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import api from '../../services/api';
import { SymptonContext } from '../../context/SymptonContext';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    paddingLeft: '26px',
  },
  inputField: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    width: '900px',
    gap: '30px',
    marginTop: '50px',
    paddingLeft: '26px',
  },
  link: {
    textDecoration: 'none',
    color: '#2196F3',
  },
  stepOne: {
    width: '100%',
    height: '250px',
    writingMode: 'horizontal-tb',
    // backgroundColor: 'yellow',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    // backgroundColor: 'blue',
    borderTop: '1px solid #E0E0E0',
    marginTop: '20px',
  },
  buttons: {
    padding: '20px',
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function StepIdentification() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [sex, setSex] = useState('');
  const [telephone, setTelephone] = useState('');

  const { handleNext } = useContext(SymptonContext);

  function handleSubmit(event) {
    event.preventDefault();

    const data = { name, cpf, birthDate, sex, telephone };

    api
      .post('/user/register', data)
      .then(() => {
        alert('Cadastro realizado com sucesso!');
      })
      .catch((err) => alert(err));

    handleNext();
  }

  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.instructions}>
        Já possui conta no Fabbrini, faça seu
        <a href="/" className={classes.link}>
          login
        </a>
        . Ou informe seus dados de identificação:
      </Typography>
      <form
        id="formIdentification"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.stepOne}
      >
        <div className={classes.inputField}>
          <TextField
            id="outlined-basic"
            label="Nome"
            type="text"
            variant="outlined"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="CPF"
            type="text"
            variant="outlined"
            value={cpf}
            onChange={(event) => {
              setCpf(event.target.value);
            }}
          />

          <TextField
            id="outlined-basic"
            label="Telefone"
            type="tel"
            variant="outlined"
            value={telephone}
            onChange={(event) => {
              setTelephone(event.target.value);
            }}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableFuture
              inputVariant="outlined"
              label="Data de nascimento"
              format="dd/MM/yyyy"
              value={birthDate}
              openTo="year"
              views={['year', 'month', 'date']}
              onChange={setBirthDate}
              invalidDateMessage="Data inválida"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Sexo</InputLabel>
            <Select
              native
              value={sex}
              onChange={(event) => {
                setSex(event.target.value);
              }}
              label="Sexo"
              inputProps={{
                name: 'Sexo',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
            </Select>
          </FormControl>
        </div>
      </form>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttons}>
          <Button
            form="formIdentification"
            variant="contained"
            color="primary"
            size="large"
            id="finishButton"
            type="submit"
          >
            Próximo
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default StepIdentification;
