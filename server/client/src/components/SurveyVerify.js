import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import useFormContext from '../hook/use-form-hook';

function SurveyVerify() {
  const navigate = useNavigate();
  const { state, submitForm, newSurveyResult } = useFormContext();

  if (newSurveyResult.data) navigate('/surveys');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitForm();
  };

  return (
    <div className='flex flex-col '>
      <h1 className='text-xl py-5'>Please Verify The Survey Records</h1>
      <form className='border border-gray-400 rounded py-5 px-2'>
        <div className='py-2'>
          <span className='font-bold mr-2'>Title: </span>
          {state.title}
        </div>
        <div className='py-2'>
          <span className='font-bold mr-2'>Subject: </span> {state.subject}
        </div>
        <div className='py-2'>
          <span className='font-bold mr-2'>Body: </span>
          {state.body}
        </div>
        <div className='py-2'>
          <span className='font-bold mr-2'> Recipients: </span>
          {state.recipients}
        </div>
        <div className='flex'>
          <button className='rounded-lg text-white bg-red-400 py-2 px-5 mr-10'>
            <Link to={'/surveys/new'}>Go Back</Link>
          </button>
          <button
            onClick={handleSubmit}
            className='rounded-lg text-white bg-green-400 py-2 px-5'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SurveyVerify;
