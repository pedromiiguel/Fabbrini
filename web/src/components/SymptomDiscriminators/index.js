import React, { useContext } from 'react';
import { SymptonContext } from '../../context/SymptonContext';
import {
  Box,
  makeStyles,
  Radio,
  withStyles,
  Typography,
  FormControlLabel,
  FormControl,
  RadioGroup,

} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: 'auto',
    height: '280px',
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

export default function SymptomDiscriminators({ data, color }) {
  const { specification, setSpecification, setColor } =
    useContext(SymptonContext);
  const classes = useStyles();



  return (
    <Box className={classes.container}>
      {data.map((sintoma, index) => (
        <FormControl
          key={sintoma}
          component="fieldset"
          className={classes.formControl}
        >
          <Typography>{sintoma}</Typography>{' '}
          <RadioGroup
            aria-label="gender"
            name="customized-radios"
            row
            onChange={(event) => {
              setSpecification({
                ...specification,
                [sintoma]: event.target.value,
              });
              setColor(color);
            }}
          >
            <FormControlLabel
              value="true"
              control={<StyledRadio />}
              label="Sim"
            />
            <FormControlLabel
              value="false"
              control={<StyledRadio />}
              label="Não"
            />
          </RadioGroup>
        </FormControl>
      ))}
    </Box>
  );
}
