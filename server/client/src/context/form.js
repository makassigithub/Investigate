import { createContext, useReducer } from 'react';
import { useCreateSurveyMutation } from '../store';

export const actionTypes = {
  SET_TITLE: 'EDIT TITLE',
  SET_SUBJECT: 'SET_SUBJECT',
  SET_BODY: 'SET_BODY',
  SET_RECIPIENTS: 'SET_RECIPIENTS',
};

function formReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_TITLE:
      return { ...state, title: action.payload };
    case actionTypes.SET_SUBJECT:
      return { ...state, subject: action.payload };
    case actionTypes.SET_BODY:
      return { ...state, body: action.payload };
    case actionTypes.SET_RECIPIENTS:
      return { ...state, recipients: action.payload };
    default:
      return state;
  }
}

const FormContext = createContext();

function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, {
    title: '',
    subject: '',
    body: '',
    recipients: '',
  });

  const [createNewSurvey, newSurveyResult] = useCreateSurveyMutation(state);

  const submitForm = () => {
    createNewSurvey(state);
  };

  const sharedState = {
    state,
    dispatch,
    submitForm,
    createNewSurvey,
    newSurveyResult,
  };

  return (
    <FormContext.Provider value={sharedState}>{children}</FormContext.Provider>
  );
}

export { FormProvider };
export default FormContext;
