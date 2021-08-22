import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { SymptonContext } from '../../context/SymptonContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    paddingLeft: '26px',
  },
  formContainer: {},
  link: {
    textDecoration: 'none',
    color: '#2196F3',
  },
  stepOne: {
    width: '100%',
    height: '332px',
    writingMode: 'horizontal-tb',
  },
  textBold: {
    fontWeight: 'bold',
    color: '#333333',
  },
  formControl: {
    width: '100%',
    padding: '16px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    borderTop: '1px solid #E0E0E0',
    margin: 'auto 0',
    '@media (max-width: 500px)': {
      backgroundColor: 'white',
    },
  },
  buttons: {
    padding: '24px 32px',
  },
}));

function StepIdentification() {

  const validationSchema = yup.object().shape({
    symptom: yup.string().required('Escolha uma opção'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleBack, onSubmit, handleChange } = useContext(SymptonContext);

  const classes = useStyles();

  const StyledRadio = withStyles({
    root: {
      color: '#2196F3',
      margin: 0,
      '&$checked': {
        color: '#2196F3',
      },
    },
    checked: {},
  })((props) => <Radio {...props} />);

  return (
    <Box>
      <Typography className={classes.instructions}>
        <span className={classes.textBold}>ATENÇÃO:</span> Leia TODOS os itens
        abaixo e indique qual mais se aproxima no motivo da consulta:
      </Typography>
      <form
        id="formSymptom"
        noValidate
        autoComplete="off"
        className={classes.stepOne}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="symptom"
          control={control}
          render={({ field }) => (
            <FormControl
              {...field}
              error={errors.symptom ? true : false}
              component="fieldset"
              className={classes.formControl}
            >
              <RadioGroup
                aria-label="gender"
                name="customized-radios"
                onChange={handleChange}
                className={classes.radioGroup}
              >
                <FormControlLabel
                  control={
                    <StyledRadio
                      value="Agressão"
                      error={errors.symptom ? true : false}
                    />
                  }
                  label="Agressão"
                />
                <FormControlLabel
                  control={<StyledRadio value="Asma" />}
                  label="Asma"
                />
                <FormControlLabel
                  control={<StyledRadio value="Bebê chorando" />}
                  label="Bebê chorando"
                />
                <FormControlLabel
                  control={<StyledRadio value="Diabetes" />}
                  label="Diabetes"
                />
                <FormControlLabel
                  control={<StyledRadio value="Diarréia e ou Vômitos" />}
                  label="Diarreia e/ou Vômitos"
                />
                <FormControlLabel
                  control={
                    <StyledRadio value="Doença sexualmente transmissível" />
                  }
                  label="Doença sexualmente transmissível"
                />
                <FormControlLabel
                  control={<StyledRadio value="Dor de garganta" />}
                  label="Dor de garganta"
                />
              </RadioGroup>
              <FormHelperText>
                {errors.symptom && errors.symptom.message}
              </FormHelperText>
            </FormControl>
          )}
        />
      </form>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttons}>
          <Button className={classes.backButton} onClick={handleBack}>
            Voltar
          </Button>
          <Button
            form="formSymptom"
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
