import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import asma from '../../asma.json';
import api from '../../services/api';
import { SymptonContext } from '../../context/SymptonContext';
import SynptomDiscriminators from '../SynptomDiscriminators';
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
  },
  link: {
    textDecoration: 'none',
    color: '#2196F3',
  },
  stepOne: {
    width: '100%',
    height: '250px',
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
    marginTop: '20px',
    // backgroundColor: 'blue',
  },
  buttons: {
    padding: '20px',
  },
}));

function StepIdentification() {
  const history = useHistory();
  const classes = useStyles();
  const [activeColor, setActiveColor] = useState(0);
  const {
    setActiveStep,
    disease,
    handleNext,
    handleBack,
    specification,
    setSpecification,
    synmtomQuestions,
    color,
    setColor,
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
          <SynptomDiscriminators data={synmtomQuestions.red} color={'red'} />
        );
      case 1:
        return (
          <SynptomDiscriminators
            data={synmtomQuestions.orange}
            color={'orange'}
          />
        );
      case 2:
        return (
          <SynptomDiscriminators
            data={synmtomQuestions.yellow}
            color={'yellow'}
          />
        );
      case 3:
        return (
          <SynptomDiscriminators
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
      user_id: '60f586d54771b7170cc29de0',
    };

    const teste = result.includes('true');

    if (teste) {
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

      history.push('/modal');
      console.log(data);
    }
    if (!teste) {
      handleNextColor();
    }
    if (!teste && activeColor === 3) {
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
            Back
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
