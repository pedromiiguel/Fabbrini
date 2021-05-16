import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { withStyles } from '@material-ui/core/styles';
import { DataUsageSharp } from '@material-ui/icons';

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
    height: '280px',
    paddingBottom: '60px',
  },
  formLabelLegend: {
    fontWeight: '600',
    color: '#000000',
    fontSize: '18px',
    marginBottom: '10px',
    marginTop: '20px',
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
  },
  buttons: {
    padding: '20px',
  },
}));

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

function StepIdentification({ handleNext }) {
  const classes = useStyles();
  const [specification, setSpecification] = useState({
    questionOne: '',
    questionTwo: '',
    questionThree: '',
    questionFour: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    const {
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
    } = specification;

    const data = {
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
    };

    console.log(data);
    handleNext();
  }
  return (
    <Box className={classes.stepOne}>
      <Typography className={classes.instructions}>
        Forneça as informações abaixo de acordo com o que está sentindo.
      </Typography>
      <form
        noValidate
        autoComplete="off"
        className={classes.inputField}
        onSubmit={handleSubmit}
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <Typography component="legend" className={classes.formLabelLegend}>
            Perda de Conciência:
          </Typography>
          <Typography>O paciente perdeu a consciência?</Typography>
          <RadioGroup
            defaultValue="female"
            aria-label="gender"
            name="customized-radios"
            row
            onChange={(event) => {
              setSpecification({
                ...specification,
                questionOne: event.target.value,
              });
              // console.log(event.target.value)
            }}
          >
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Sim"
            />
            <FormControlLabel
              control={<StyledRadio value="Não" />}
              label="Não"
            />
            <FormControlLabel
              control={<StyledRadio value="Não sei" />}
              label="Não sei"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <Typography>O paciente ainda está inconsciente?</Typography>
          <RadioGroup
            defaultValue="female"
            aria-label="gender"
            name="customized-radios"
            row
            onChange={(event) => {
              setSpecification({
                ...specification,
                questionTwo: event.target.value,
              });
              // console.log(event.target.value)
            }}
          >
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Sim"
            />
            <FormControlLabel
              control={<StyledRadio value="Não" />}
              label="Não"
            />
            <FormControlLabel
              control={<StyledRadio value="Não sei" />}
              label="Não sei"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <Typography>Cheque se ele está respirando:</Typography>
          <RadioGroup
            defaultValue="female"
            aria-label="gender"
            name="customized-radios"
            row
            onChange={(event) => {
              setSpecification({
                ...specification,
                questionThree: event.target.value,
              });
              // console.log(event.target.value)
            }}
          >
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Sim"
            />
            <FormControlLabel
              control={<StyledRadio value="Não" />}
              label="Não"
            />
            <FormControlLabel
              control={<StyledRadio value="Não sei" />}
              label="Não sei"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <Typography>Cheque se ele tem pulso:</Typography>
          <RadioGroup
            defaultValue=""
            aria-label="gender"
            name="customized-radios"
            row
            onChange={(event) => {
              setSpecification({
                ...specification,
                questionFour: event.target.value,
              });
              // console.log(event.target.value)
            }}
          >
            <FormControlLabel
              control={<StyledRadio value="Sim" />}
              label="Sim"
            />
            <FormControlLabel
              control={<StyledRadio value="Não" />}
              label="Não"
            />
            <FormControlLabel
              control={<StyledRadio value="Não sei" />}
              label="Não sei"
            />
          </RadioGroup>
        </FormControl>

        <div className={classes.buttonsContainer}>
          <div className={classes.buttons}>
            <Button>Back</Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              id="finishButton"
              type="submit"
              onSubmit={handleSubmit}
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
