import React, { useContext } from 'react';
import {
  TextField,
  Typography,
  Box,
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { SymptonContext } from '../../context/SymptonContext';
import { useForm, Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import ptLocale from 'date-fns/locale/pt';

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
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    padding: '32px',
  },
  link: {
    textDecoration: 'none',
    color: '#2196F3',
  },
  stepOne: {
    width: '100%',
    height: '300px',
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
    padding: '32px 32px',
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    width: '100%',
  },
}));

function TelephoneMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[0-9]/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
    />
  );
}
function CPFMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0-9]/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
    />
  );
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(5, 'O campo nome deve ter mais de 5 caracteres')
    .max(100, 'O campo nome deve ter menos de 100 caracteres'),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(
      /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/,
      'CPF inválido'
    ),
  telephone: yup.string().required('Telefone é obrigatório'),
  birthDate: yup
    .string('Data de nascimento inválida')
    .required('Data de nascimento é obrigatório'),
  sex: yup.string().required('Sexo é obrigatório'),
});

function StepIdentification() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleNext } = useContext(SymptonContext);

  function onSubmit(data) {
    console.log(data);

    api
      .post('/user/register', data)
      .then(() => {
        console.log('ok')
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
          {' '}
          login
        </a>
        . Ou informe seus dados de identificação:
      </Typography>
      <form
        id="formIdentification"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={classes.stepOne}
      >
        <div className={classes.inputField}>
          <TextField
            label="Nome"
            type="text"
            variant="outlined"
            id="name"
            error={errors.name ? true : false}
            {...register('name')}
            helperText={errors.name && errors.name.message}
          />

          <TextField
            label="CPF"
            type="text"
            InputProps={{
              inputComponent: CPFMaskCustom,
            }}
            variant="outlined"
            id="cpf"
            error={errors.cpf ? true : false}
            {...register('cpf')}
            helperText={errors.cpf && errors.cpf.message}
          />
          <TextField
            label="Telefone"
            InputProps={{
              inputComponent: TelephoneMaskCustom,
            }}
            variant="outlined"
            id="telephone"
            error={errors.telephone ? true : false}
            {...register('telephone')}
            helperText={errors.telephone && errors.telephone.message}
          />
          <MuiPickersUtilsProvider locale={ptLocale} utils={DateFnsUtils}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <KeyboardDatePicker
                  {...field}
                  inputVariant="outlined"
                  disableFuture
                  format="dd/MM/yyyy"
                  openTo="year"
                  views={['year', 'month', 'date']}
                  id="birthDate"
                  label="Data de nascimento"
                  error={errors.birthDate ? true : false}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  helperText={errors.birthDate && errors.birthDate.message}
                />
              )}
            />
          </MuiPickersUtilsProvider>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <FormControl
                {...field}
                error={errors.sex ? true : false}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Sexo
                </InputLabel>
                <Select
                  native
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

                <FormHelperText>
                  {errors.sex && errors.sex.message}
                </FormHelperText>
              </FormControl>
            )}
          />
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
