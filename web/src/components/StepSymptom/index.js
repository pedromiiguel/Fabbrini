import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { SymptonContext } from '../../context/SymptonContext';

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
    height: '300px',
    writingMode: 'horizontal-tb',
    // backgroundColor: 'yellow',
  },
  textBold: {
    fontWeight: 'bold',
    color: '#333333',
  },
  formControl: {
    width: '100%',
    padding: '16px'
  },
  radioGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    width: '100%',
    // marginTop: '50px',
    // paddingLeft: '26px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    // backgroundColor: 'blue',
    borderTop: '1px solid #E0E0E0',
    marginTop: '20px',
  },
  buttons: {
    padding: '20px',
  },
}));

function StepIdentification() {
  const { handleBack, handleSubmit, handleChange } = useContext(SymptonContext);

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
  })((props) => <Radio color="default" {...props} />);

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
        onSubmit={handleSubmit}
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="gender"
            name="customized-radios"
            onChange={handleChange}
            className={classes.radioGroup}
          >
            <FormControlLabel
              control={<StyledRadio value="Agressão" />}
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
              control={<StyledRadio value="Diarreia e/ou Vômitos" />}
              label="Diarreia e/ou Vômitos"
            />
            <FormControlLabel
              control={<StyledRadio value="Doença sexualmente transmissível" />}
              label="Doença sexualmente transmissível"
            />
            <FormControlLabel
              control={<StyledRadio value="Dor de garganta" />}
              label="Dor de garganta"
            />
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Bebê chorando"
            />
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Bebê chorando"
            />
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Bebê chorando"
            />
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Bebê chorando"
            />
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Bebê chorando"
            />
            <FormControlLabel
                control={<StyledRadio value="Sim" />}
                label="Bebê chorando"
              /><FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Bebê chorando"
            /><FormControlLabel
            control={<StyledRadio value="Sim" />}
            label="Bebê chorando"
          /><FormControlLabel
          control={<StyledRadio value="Sim" />}
          label="Bebê chorando"
        />
        <FormControlLabel
                control={<StyledRadio value="Sim" />}
                label="Bebê chorando"
              /><FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Bebê chorando"
            />
          </RadioGroup>
        </FormControl>
      </form>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttons}>
          <Button onClick={handleBack}>Back</Button>
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
