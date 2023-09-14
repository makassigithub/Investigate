import { useContext } from 'react';
import FormContext from '../context/form';

function useFormContext() {
  return useContext(FormContext);
}

export default useFormContext;
