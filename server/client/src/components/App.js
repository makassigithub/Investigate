import { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useFetchCurrentUserQuery } from '../store';
import { setIsAuthenticated } from '../store/reducers/authReducer';

import Header from './Header';
import SurveyNew from './SurveyNew';
import Landing from './Landing';
import Dashboard from './Dashboard';

function App() {
  const { data, error, isFetching } = useFetchCurrentUserQuery();
  console.log(data);

  return (
    <div className='px-5'>
      <BrowserRouter>
        <div>
          <Header user={data} />
          <Routes>
            <Route exact path='/' Component={Landing} />
            <Route exact path='/surveys' Component={Dashboard} />
            <Route path='/surveys/new' Component={SurveyNew} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
