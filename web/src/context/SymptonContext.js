import { createContext, useState } from 'react';
import asma from '../json/asma.json';
import agressao from '../json/agressao.json';
import bebeChorando from '../json/bebe_chorando.json';
import diabetes from '../json/diabetes.json';
import diarreia_vomito from '../json/diarreia_vomito.json';
import doenca_sexual from '../json/doenca_sexual.json';
import dor_garganta from '../json/dor_garganta.json';

export const SymptonContext = createContext({});

export default function SymptonContextProvider({ children }) {
  const [activeStep, setActiveStep] = useState(1);
  const [synmtomQuestions, setSynmtomQuestions] = useState({});
  const [disease, setDisease] = useState('');
  const [open, setOpen] = useState(false);
  const [symptom, setSymptom] = useState({});
  const [specification, setSpecification] = useState({});
  const [color, setColor] = useState('');
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

  function onSubmit(data) {
    diseaseArray.forEach((doenca) => {
      if (
        data.symptom.toLowerCase().trim() ===
        doenca.disease.toLowerCase().trim()
      ) {
        setDisease(doenca.disease);
        setSynmtomQuestions(doenca);
      }
    });

    handleNext();
  }

  return (
    <SymptonContext.Provider
      value={{
        activeStep,
        setActiveStep,
        handleNext,
        handleBack,
        onSubmit,
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
