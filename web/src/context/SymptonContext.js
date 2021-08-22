import { createContext, useEffect, useState } from 'react';
import asma from '../json/asma.json';
import agressao from '../json/agressao.json';
import bebeChorando from '../json/bebe_chorando.json';
import diabetes from '../json/diabetes.json';
import diarreia_vomito from '../json/diarreia_vomito.json';
import doenca_sexual from '../json/doenca_sexual.json';
import dor_garganta from '../json/dor_garganta.json';
import api from '../services/api';

export const SymptonContext = createContext({});

export default function SymptonContextProvider({ children }) {
  const [activeStep, setActiveStep] = useState(0);
  const [explication, setExplication] = useState({});
  const [synmtomQuestions, setSynmtomQuestions] = useState({});
  const [disease, setDisease] = useState('');
  const [user, setUser] = useState();
  const [localData, setlocalData] = useState();
  const [open, setOpen] = useState(false);
  const [symptom, setSymptom] = useState({});
  const [specification, setSpecification] = useState({});
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const diseaseArray = [
    asma,
    agressao,
    bebeChorando,
    diabetes,
    diarreia_vomito,
    doenca_sexual,
    dor_garganta,
  ];

  useEffect(() => {
    const storageUser = localStorage.getItem('@RNAuth:user_id');
    setlocalData(JSON.parse(storageUser));
    setLoading(false);
  }, [loading]);

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

  function setData(data) {
    localStorage.setItem('@RNAuth:user_id', JSON.stringify(data));
    setLoading(true);
  }

  function removeData() {
    setLoading(true);
    localStorage.removeItem('@RNAuth:user_id');
  }

  function onSubmit(data) {
    diseaseArray.forEach((doenca) => {
      if (
        data.symptom.toLowerCase().trim() ===
        doenca.disease.toLowerCase().trim()
      ) {
        setExplication(doenca.explication);
        setDisease(doenca.disease);
        setSynmtomQuestions(doenca);
      }
    });

    api.get(`/user/${user.cpf}`).then((response) => {
      setData(response.data);
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
        explication,
        color,
        setColor,
        setUser,
        user,
        setData,
        removeData,
        localData,
      }}
    >
      {children}
    </SymptonContext.Provider>
  );
}
