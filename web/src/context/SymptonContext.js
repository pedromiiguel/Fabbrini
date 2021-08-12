import { createContext, useState } from 'react';
import asma from '../asma.json';
import agressao from '../agressao.json';
import bebeChorando from '../bebe_chorando.json';
import diabetes from '../diabetes.json';
import diarreia_vomito from '../diarreia_vomito.json';
import doenca_sexual from '../doenca_sexual.json';
import dor_garganta from '../dor_garganta.json';

import api from '../services/api';
export const SymptonContext = createContext({});

export default function SymptonContextProvider({ children }) {
  const [activeStep, setActiveStep] = useState(0);
  const [synmtomQuestions, setSynmtomQuestions] = useState({});
  const [disease, setDisease] = useState('');
  const [open, setOpen] = useState(false);
  const [symptom, setSymptom] = useState({});
  const [specification, setSpecification] = useState({});
  const [color, setColor] = useState('');
  console.log(activeStep)
  const diseaseArray = [
    asma,
    agressao,
    bebeChorando,
    diabetes,
    diarreia_vomito,
    doenca_sexual,
    dor_garganta,
  ];


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    // setSymptom({ ...symptom, [event.target.name]: event.target.checked });
    setSymptom({ flowchart: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    diseaseArray.forEach((doenca) => {
      if (
        symptom.flowchart.toLowerCase().trim() ===
        doenca.disease.toLowerCase().trim()
      ){
        setDisease(doenca.disease);
        setSynmtomQuestions(doenca);

      }

    });

    // api
    //   .post('sympton', { symptom })
    //   .then(() => {
    //     alert('Realizado com sucesso!');
    //   })
    //   .catch((err) => console.log(err));
    console.log(symptom);
    handleNext();
  }

  return (
    <SymptonContext.Provider
      value={{
        activeStep,
        setActiveStep,
        handleNext,
        handleBack,
        handleSubmit,
        handleChange,
        symptom,
        synmtomQuestions,
        disease,
        open,
        setSymptom,
        handleOpen,
        handleClose,
        specification,
        setSpecification,
        color,
        setColor,
      }}
    >
      {children}
    </SymptonContext.Provider>
  );
}
