import { Link } from 'react-router-dom';
import { actionTypes } from '../context/form';
import useFormContext from '../hook/use-form-hook';

function SurveyNew() {
  const { state, dispatch } = useFormContext();
  const classes = {
    section: 'flex items-center border border-gray-150 p-3',
    label: 'mr-5',
  };

  const handleFieldChange = (action) => (evt) => {
    dispatch({
      type: action,
      payload: evt.target.value,
    });
  };

  return (
    <div className='flex flex-col justify-center'>
      <h1 className='text-3xl my-10'>Enter Survey Details: </h1>
      <form
        className='bg-gray-200 rounded-sm'
        onSubmit={(evt) => evt.preventDefault()}
      >
        <div className={classes.section}>
          <label className={classes.label} htmlFor='tile'>
            Title:
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={state.title}
            required
            onChange={handleFieldChange(actionTypes.SET_TITLE)}
          />
        </div>
        <div className={classes.section}>
          <label className={classes.label} htmlFor='subject'>
            Subject:
          </label>
          <input
            type='text'
            name='subject'
            id='subject'
            value={state.subject}
            required
            onChange={handleFieldChange(actionTypes.SET_SUBJECT)}
          />
        </div>
        <div className={classes.section}>
          <label className={classes.label} htmlFor='body'>
            Body:
          </label>
          <textarea
            type='text'
            name='body'
            id='body'
            value={state.body}
            required
            onChange={handleFieldChange(actionTypes.SET_BODY)}
          />
        </div>
        <div className={classes.section}>
          <label className={classes.label} htmlFor='recipients'>
            Recipients:
          </label>
          <textarea
            type='text'
            name='recipients'
            id='recipients'
            value={state.recipients}
            required
            onChange={handleFieldChange(actionTypes.SET_RECIPIENTS)}
          />
        </div>
        <div className='flex justify-start items-center p-5'>
          <button className='rounded-lg text-white bg-red-400 py-2 px-5 mr-10'>
            <Link to={'/surveys'}>Cancel</Link>
          </button>
          <button className='rounded-lg text-white bg-green-400 py-2 px-5'>
            <Link to={'/surveys/verify'}>Next</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SurveyNew;
