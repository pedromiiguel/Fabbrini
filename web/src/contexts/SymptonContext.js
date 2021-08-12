import { createContext, useState } from 'react';
import asma from '../asma.json';
import agressao from '../agressao.json';
import api from '../services/api';
export const SymptonContext = createContext({});

export default function SymptonContextProvider({ children }) {
  const [activeStep, setActiveStep] = useState(0);
  const [synmtomQuestions, setSynmtomQuestions] = useState({});
  const [disease, setDisease] = useState('');
  const [open, setOpen] = useState(false);
  const diseaseArray = [asma, agressao];
  const [symptom, setSymptom] = useState();
  const [specification, setSpecification] = useState({});
  const [color, setColor] = useState('');
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
    setSymptom({flowchart: event.target.value});
  };

  function handleSubmit(event) {
    event.preventDefault();

    diseaseArray.forEach((doenca) => {
      if (symptom.flowchart.toLowerCase().trim() === doenca.disease.toLowerCase().trim())
        setDisease(doenca.disease);

      setSynmtomQuestions(doenca);
    });

    // api
    //   .post('sympton', { symptom })
    //   .then(() => {
    //     alert('Realizado com sucesso!');
    //   })
    //   .catch((err) => console.log(err));
    console.log(symptom)
    handleNext();
  }

  return (
    <SymptonContext.Provider
      value={{
        activeStep,
        handleNext,
        handleBack,
        handleSubmit,
        handleChange,
        symptom,
        synmtomQuestions,
        disease,
        open,
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
