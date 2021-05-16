import React from 'react';
import api from '../../services/api';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/';

import StepIdentification from '../StepIdentification';
import StepReason from '../StepReason';
import StepHealth from '../StepHealth';
import StepComplementaryData from '../StepComplementaryData';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  bord: {
    paddingTop: theme.spacing(5),
    borderBlockEnd: '1px solid #E0E0E0',
    writingMode: 'horizontal-tb',
  },
  inputField: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '20px',
    marginTop: '50px',
  },
  ButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '10px 30px',
    gap: '20px',
  },
}));

function getSteps() {
  return ['Identificação', 'Motivo consulta', 'Saúde', 'Dados Complementares'];
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <StepIdentification handleNext={handleNext} handleBack={handleBack} />
        );
      case 1:
        return <StepReason handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <StepHealth handleNext={handleNext} />;
      case 3:
        return <StepComplementaryData handleNext={handleNext} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleCreateUser = () => {
    const button = document.querySelector('#finishButton');
    if (button.textContent === 'Finish') {
      console.log('Deu certo');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.bord}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel color="primary" className={classes.palette}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Cadastro concluído!
              </Typography>
              {/* <Button onClick={handleReset}>Reset</Button> */}
            </div>
          ) : (
            <div>
              <div>{getStepContent(activeStep)}</div>
              {/* <div className={classes.ButtonGroup}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {handleNext(); handleCreateUser()}}
                  size="large"
                  id="finishButton"
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Próximo'}
                  {console.log(steps.length)}
                </Button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
