import { Link } from 'react-router-dom';
import { useFetchUserSurveysQuery } from '../store';

function Dashboard() {
  const { data, isFetching } = useFetchUserSurveysQuery();

  return (
    <div>
      {isFetching ? (
        <>Fetching...</>
      ) : (
        data.map((survey) => {
          return (
            <div
              className='border border-gray-400 shadow-sm p-5'
              key={survey._id}
            >
              <h2 className='text-2xl'>{survey.title}</h2>
              <h4>Number of Yes: {survey.yes}</h4>
              <h4>Number of No: {survey.no}</h4>
            </div>
          );
        })
      )}

      <div className=' flex justify-end fixed bottom-0 w-full'>
        <button className='w-20 h-20 bg-red-400 text-white text-2xl font-bold rounded-full mb-5 mr-10'>
          <Link to='/surveys/new'>+</Link>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
