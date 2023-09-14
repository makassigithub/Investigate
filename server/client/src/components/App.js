import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useFetchCurrentUserQuery } from '../store';

import Header from './Header';
import SurveyNew from './SurveyNew';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyVerify from './SurveyVerify';

function App() {
  const { data, error, isFetching } = useFetchCurrentUserQuery();

  return (
    <div className='px-5'>
      <BrowserRouter>
        <div>
          <Header user={data} />
          <Routes>
            <Route exact path='/' Component={Landing} />
            <Route exact path='/surveys' Component={Dashboard} />
            <Route path='/surveys/new' Component={SurveyNew} />
            <Route path='/surveys/verify' Component={SurveyVerify} />
            {/* <Route path='/payment' Component={StripePayment} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
