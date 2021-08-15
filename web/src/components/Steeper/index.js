import React, { useContext } from 'react';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { ThemeProvider } from '@material-ui/core/';

import StepIdentification from '../StepIdentification';
import StepSymptom from '../StepSymptom';
import StepHealth from '../StepHealth';

import { SymptonContext } from '../../context/SymptonContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  bord: {
    paddingTop: theme.spacing(5),
    borderBlockEnd: '1px solid #E0E0E0',
    writingMode: 'horizontal-tb',
  },
  steeper: {
    width: '100%',
    height: '100%',
  },
}));

function getSteps() {
  return ['Identificação', 'Motivo consulta', 'Saúde'];
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const steps = getSteps();

  const { activeStep } = useContext(SymptonContext);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepIdentification />;
      case 1:
        return <StepSymptom />;
      case 2:
        return <StepHealth />;
      default:
        return 'Unknown stepIndex';
    }
  }

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
          <div className={classes.steeper}>{getStepContent(activeStep)}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
