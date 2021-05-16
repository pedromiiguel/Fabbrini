import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
    height: '280px',
    paddingBottom: '60px',
    writingMode: 'horizontal-tb',
  },
  textBold: {
    fontWeight: 'bold',
    color: '#333333',
  },
  formControl: {
    width: '100%',
    paddingLeft: '26px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginTop: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    borderTop: '1px solid #E0E0E0',
    marginTop: '20px',
  },
  buttons: {
    padding: '20px'
  },
}));

const BlueCheckbox = withStyles({
  root: {
    color: '#2196F3',
    margin: 0,
    '&$checked': {
      color: '#2196F3',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function StepIdentification({ handleNext, handleBack }) {
  const [reason, setReason] = useState({
    percaConciencia: false,
    dorPeito: false,
    dorAbdomen: false,
    faltaAr: false,
    percaForça: false,
    reacaoAlergica: false,
    trauma: false,
    dorAnalgesico: false,
    outrosMotivos: false,
  });


  const handleChange = (event) => {
    setReason({ ...reason, [event.target.name]: event.target.checked });
  };

  const {
    percaConciencia,
    dorPeito,
    dorAbdomen,
    faltaAr,
    percaForça,
    reacaoAlergica,
    trauma,
    dorAnalgesico,
    outrosMotivos,
  } = reason;

  const classes = useStyles();

  function backStep() {
    handleBack();
  }

  function handleSubmit(event) {
    event.preventDefault();

    // const data = {
    //   sexo,
    //   idade,
    //   peso,
    //   altura,
    // };

    console.log(reason);

    handleNext();
    
  }

  return (
    <Box className={classes.stepOne}>
      <Typography className={classes.instructions}>
        <span className={classes.textBold}>ATENÇÃO:</span> Leia TODOS os itens
        abaixo e indique qual mais se aproxima no motivo da consulta:
      </Typography>
      <form
        noValidate
        autoComplete="off"
        className={classes.formContainer}
        onSubmit={handleSubmit}
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={percaConciencia}
                onChange={handleChange}
                name="percaConciencia"
              />
            }
            label="Perda da Conciência"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={dorPeito}
                onChange={handleChange}
                name="dorPeito"
              />
            }
            label="Dor no peito / tórax:"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={dorAbdomen}
                onChange={handleChange}
                name="dorAbdomen"
              />
            }
            label="Dor na abdomem (barriga):"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={faltaAr}
                onChange={handleChange}
                name="faltaAr"
              />
            }
            label="Falta de ar:"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={percaForça}
                onChange={handleChange}
                name="percaForça"
              />
            }
            label="Perda de força / dificuldade de falar / perda de sensibilidade / formigamento:"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={reacaoAlergica}
                onChange={handleChange}
                name="reacaoAlergica"
              />
            }
            label="Reação alérgica:"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={trauma}
                onChange={handleChange}
                name="trauma"
              />
            }
            label="Trauma / Hemorragia:"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                onChange={handleChange}
                checked={dorAnalgesico}
                name="dorAnalgesico"
              />
            }
            label="Outra dor que não foi controlada com analgésico:"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={outrosMotivos}
                onChange={handleChange}
                name="outrosMotivos"
              />
            }
            label="Outros motivos:"
          />
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>
        <div className={classes.buttonsContainer}>
          <div className={classes.buttons}>
            <Button
              onClick={backStep}
            >Back</Button>
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
