import './App.css';
import LoginView from './components/LoginView';
import 'semantic-ui-css/semantic.min.css';
import Thankyou from './components/Thankyou';
import { BrowserRouter, Route } from 'react-router-dom';
import Warehouse from './components/Warehouse';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' component={Warehouse } />
        <Route exact path='/thanks' component={Thankyou} />
        <Route exact path='/login' component={LoginView} />
      </BrowserRouter>
    </div>
  );
}

export default App 
