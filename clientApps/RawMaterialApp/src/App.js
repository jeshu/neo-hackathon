import './App.css';
import LoginView from './components/LoginView';
import 'semantic-ui-css/semantic.min.css';
import RawMaterialSubmissionForm from './components/RawMaterialSubmissionForm';
import Thankyou from './components/Thankyou';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' component={RawMaterialSubmissionForm } />
        <Route exact path='/thanks' component={Thankyou} />
        <Route exact path='/login' component={LoginView} />
      </BrowserRouter>
    </div>
  );
}

export default App 
