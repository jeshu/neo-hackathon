import './App.css';
import logo from './logo.svg';
import { useEffect } from 'react';
import N3Helper from './utils/N3Helper';
import { contract } from './utils/N3Utils';
import * as N3Constanst from './constansts/Const';



function App() {
  useEffect(() => {
    const neoHelper = new N3Helper(
      contract(
        N3Constanst.scriptHash,
        N3Constanst.rpcAddress,
        N3Constanst.userPvtKey,
      ),
    );
    neoHelper.contractInvoke('addRawMaterialQualityCert',[
      {
        type: 'String',
        value: 'BatchIdTest1',
      },{
        type: 'String',
        value: 'AZ-123456789',
      },
    ]);
    neoHelper.contractInvoke('getRawMaterialQualityCert',[
      {
        type: 'String',
        value: 'BatchIdTest1',
      }
    ]);
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
