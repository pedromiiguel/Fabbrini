import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import api from '../../services/api';

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
    height: '280px',
    paddingBottom: '60px',
    writingMode: 'horizontal-tb',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    borderTop: '1px solid #E0E0E0',
    marginTop: '60px',
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

function StepIdentification({ handleNext, handleBack }) {
  // const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  // const date = new Date();
  // let dataAtual = date.toLocaleDateString('pt-br', options);
  // console.log(dataAtual);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [sex, setSex] = useState('');
  const [telephone, setTelephone] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      cpf,
      birthDate,
      sex,
      telephone,
    };

    // api.post('/users', {
    //     name,
    //     cpf,
    //     birthDate,
    //     sex,
    //     telephone,
    //   })
    //   .then(() => {
    //     alert('Cadastro realizado com sucesso!');
    //   })
    //   .catch((err) => alert(err));

    console.log(data);
    handleNext();
  }
  const classes = useStyles();

  return (
    <Box className={classes.stepOne}>
      <Typography className={classes.instructions}>
        Já possui conta no Fabbrini, faça seu{' '}
        <a href="/" className={classes.link}>
          login
        </a>
        . Ou informe seus dados de identificação:
      </Typography>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.formContainer}
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
        <div className={classes.buttonsContainer}>
          <div className={classes.buttons}>
            <Button>Back</Button>
            <Button
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
      </form>
    </Box>
  );
}

export default StepIdentification;
