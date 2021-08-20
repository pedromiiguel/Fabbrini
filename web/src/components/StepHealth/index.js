import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, Popover, Link } from '@material-ui/core';
import api from '../../services/api';
import { SymptonContext } from '../../context/SymptonContext';
import SymptomDiscriminators from '../SymptomDiscriminators';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 24px',
    alignItems: 'center',
  },
  infoButton: {
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '24px',
    textDecoration: 'none',
  },
  popover: {
    padding: '24px',
  },
  key: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 0',
  },
  value: {
    fontSize: '14px',
    padding: '8px 0',
  },
}));

function StepIdentification() {
  const history = useHistory();
  const classes = useStyles();
  const [activeColor, setActiveColor] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { explication, localData } = useContext(SymptonContext);
  const exlicationArray = Object.entries(explication);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
    console.log(localData);
    const data = {
      ...symptom,
      color: color,
      query: false,
      discriminators: specification,
      user_id: localData._id,
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

      history.push('/triagem');
    }
  }
  return (
    <Box>
      <Box className={classes.header}>
        <Typography className={classes.instructions}>
          Forneça as informações abaixo de acordo com o que está sentindo.
        </Typography>

        <Link
          title="Clique para obter mais informações sobre os sintomas"
          aria-describedby={id}
          className={classes.infoButton}
          onClick={handleClick}
        >
          ?
        </Link>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.popover}>
            {exlicationArray.map((value, index) => (
              <p>
                <span className={classes.key}>{value[0]}</span> :{' '}
                <span className={classes.value}>{value[1]}</span>
              </p>
            ))}
          </Typography>
        </Popover>
      </Box>

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
