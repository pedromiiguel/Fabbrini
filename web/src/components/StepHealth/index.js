import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import api from '../../services/api';
import { SymptonContext } from '../../context/SymptonContext';
import SymptomDiscriminators from '../SymptomDiscriminators';
import { useHistory } from 'react-router-dom';

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
    height: '332px',
  },
  link: {
    textDecoration: 'none',
    color: '#2196F3',
  },
  stepOne: {
    width: '100%',
    // backgroundColor: 'yellow',
  },
  formLabelLegend: {
    fontWeight: '600',
    color: '#000000',
    fontSize: '18px',
    marginBottom: '10px',
    marginLeft: '24px',
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
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    borderTop: '1px solid #E0E0E0',
    // backgroundColor: 'blue',
  },
  buttons: {
    padding: '16px 32px',
  },
}));

function StepIdentification() {
  const history = useHistory();
  const classes = useStyles();
  const [activeColor, setActiveColor] = useState(0);
  const {
    setActiveStep,
    disease,
    handleBack,
    specification,
    setSpecification,
    synmtomQuestions,
    color,
    setSymptom,
    symptom,
  } = useContext(SymptonContext);

  const handleNextColor = () => {
    setActiveColor((prevActiveColor) => prevActiveColor + 1);
  };

  const handleBackColor = () => {
    setActiveColor((prevActiveColor) => prevActiveColor - 1);
  };

  function getStepColor(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <SymptomDiscriminators data={synmtomQuestions.red} color={'red'} />
        );
      case 1:
        return (
          <SymptomDiscriminators
            data={synmtomQuestions.orange}
            color={'orange'}
          />
        );
      case 2:
        return (
          <SymptomDiscriminators
            data={synmtomQuestions.yellow}
            color={'yellow'}
          />
        );
      case 3:
        return (
          <SymptomDiscriminators
            data={synmtomQuestions.green}
            color={'green'}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = Object.values(specification);

    const data = {
      ...symptom,
      color: color,
      query: false,
      discriminators: specification,
      user_id: '611862cf21fdc01b4819b7a5',
    };

    const discriminatorTrue = result.includes('true');

    if (discriminatorTrue) {
      api
        .post('screening', data)
        .then(() => {
          console.log('bd');
        })
        .catch((err) => {
          console.log(err);
        });
      setSymptom({});
      setActiveStep(0);
      setSpecification({});

      history.push('/triagem');
      console.log(data);
    }
    if (!discriminatorTrue) {
      handleNextColor();
    }
    if (!discriminatorTrue && activeColor === 3) {
      data.color = 'blue';
      api
        .post('screening', data)
        .then(() => {
          console.log('bd');
        })
        .catch((err) => {
          console.log(err);
        });
      setSymptom({});
      setSpecification({});
      setActiveStep(0);

      history.push('/modal');
    }
  }
  return (
    <Box>
      <Typography className={classes.instructions}>
        Forneça as informações abaixo de acordo com o que está sentindo.
      </Typography>
      <form
        id="formHealth"
        noValidate
        autoComplete="off"
        className={classes.inputField}
        onSubmit={handleSubmit}
      >
        <Typography component="legend" className={classes.formLabelLegend}>
          {disease}
        </Typography>

        <div className={classes.stepOne}>{getStepColor(activeColor)}</div>
      </form>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttons}>
          <Button
            onClick={() => {
              activeColor !== 0 ? handleBackColor() : handleBack();
            }}
          >
            Voltar
          </Button>
          <Button
            form="formHealth"
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
