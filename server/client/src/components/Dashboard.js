import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      Dashbord
      <div className=' flex justify-end fixed bottom-0 w-full'>
        <button className='w-20 h-20 bg-red-400 text-white text-2xl font-bold rounded-full mb-5 mr-10'>
          <Link to='/surveys/new'>+</Link>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
