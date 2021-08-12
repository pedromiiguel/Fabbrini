import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, Select, InputLabel, FormControl } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .required('O campo nome é obrigado')
    .min(3, 'O campo nome deve ter mais de 3 caracteres'),
  email: yup
    .string()
    .required('O campo email é obrigado')
    .email('Digite um email válido'),
  password: yup
    .string()
    .required('O campo senha é obrigado')
    .min(5, 'O campo nome deve ter mais de 5 caracteres'),
  cpf: yup
    .string()
    .required('O campo cpf é obrigado')
    .min(11, 'O campo cpf deve ter mais de 11 caracteres')
    .max(11, 'O campo cpf deve ter menos de 11 caracteres'),
  telephone: yup
    .string()
    .required('O campo telefone é obrigado')
    .min(11, 'O campo telefone deve ter mais de 11 caracteres')
    .max(11, 'O campo telefone deve ter menos de 11 caracteres'),
  birthDate: yup.string().required('O campo Data é obrigado'),
  confirmPassword: yup
    .string()
    .required('O campo confirmar senha é obrigado')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(5, 'O campo nome deve ter mais de 5 caracteres'),

});

export default function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [sex, setSex] = useState('');


  async function handleSignUp(data) {
    const dados = {
      name: data.name,
      email: data.email,
      password: data.password,
      telephone: data.telephone,
      birthDate: data.birthDate,
      cpf: data.cpf,
      sex: sex,
    };

    try {
      await api.post('/user/register', dados);
      return history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // error={errors.name ? true : false}
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register('name')}
                helperText={errors.name && errors.name.message}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error={errors.email ? true : false}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register('email')}
                helperText={errors.email && errors.email.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password ? true : false}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                // helperText={errors.password && errors.password.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.confirmPassword ? true : false}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar senha"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                {...register('confirmPassword')}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.telephone ? true : false}
                variant="outlined"
                required
                fullWidth
                name="telephone"
                label="Telefone"
                type="text"
                id="cpf"
                {...register('telephone')}
                helperText={errors.telephone && errors.telephone.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.cpf ? true : false}
                variant="outlined"
                required
                fullWidth
                name="cpf"
                label="cpf"
                type="text"
                id="cpf"
                {...register('cpf')}
                helperText={errors.cpf && errors.cpf.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.birthDate ? true : false}
                variant="outlined"
                fullWidth
                id="date"
                name="date"
                label="Data de nascimento"
                type="date"
                defaultValue="2017-05-24"
                {...register('birthDate')}
                helperText={errors.birthDate && errors.birthDate.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Sexo
                </InputLabel>
                <Select
                  value={sex}
                  onChange={(event) => {
                    setSex(event.target.value);
                  }}
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
              </FormControl>
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                error={errors.cpf ? true : false}
                variant="outlined"
                required
                fullWidth
                name="cpf"
                label="cpf"
                type="text"
                id="cpf"
                {...register('cpf')}
                helperText={errors.cpf && errors.cpf.message}
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Finalizar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
