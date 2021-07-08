import './App.css';
import { useEffect } from 'react';
import N3Helper from './utils/N3Helper';
import { contract } from './utils/N3Utils';
import * as N3Constanst from './constansts/Const';
import LoginView from './components/LoginView';
import 'semantic-ui-css/semantic.min.css';
import RawMaterialSubmissionForm from './components/RawMaterialSubmissionForm';
import Thankyou from './components/Thankyou';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  useEffect(() => {
    const neoHelper = new N3Helper(
      contract(
        N3Constanst.scriptHash,
        N3Constanst.rpcAddress,
        N3Constanst.userPvtKey,
      ),
    );
    neoHelper.contractInvoke('setDryfruitsCert', [
      {
        type: 'String',
        value: 'BatchIdTest1',
      },
      {
        type: 'String',
        value: 'dry-123456789',
      },
    ]);
    neoHelper.contractInvoke('setMilkpowderCert', [
      {
        type: 'String',
        value: 'BatchIdTest1',
      },
      {
        type: 'String',
        value: 'milk-123456789',
      },
    ]);
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/login' component={LoginView} />
        <Route path='/' component={RawMaterialSubmissionForm} />
        <Route exact path='/thanks' component={Thankyou} />
      </BrowserRouter>
    </div>
  );
}

export default App;
