import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import N3Helper from '../utils/N3Helper';
import { contract } from '../utils/N3Utils';
import { v4 as uuidv4 } from 'uuid';
import * as N3Constanst from '../constansts/Const';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Divider,
} from 'semantic-ui-react';
import { SAVE_DATA } from '../actions';

const RawMaterialSubmissionForm = (props) => {
  const dispatch = useDispatch();
  const [loggedIn, setisLoggedIn] = useState(props.isLoggedIn);
  const [batchId, setBatchId] = useState(uuidv4());
  const [dryFruitCert, setDryfruitsCert] = useState();
  const [milkCert, setMilkCert] = useState();
  const [butterCert, setButterCert] = useState();
  const [sugerCert, setSugerCert] = useState();

  const [error, setError] = useState();
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    setisLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  const saveBlockChainData = async () => {
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
        value: batchId,
      },
      {
        type: 'String',
        value: dryFruitCert,
      },
    ]);
    neoHelper.contractInvoke('setMilkpowderCert', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: milkCert,
      },
    ]);
    neoHelper.contractInvoke('setButterCert', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: butterCert,
      },
    ]);
    neoHelper.contractInvoke('setSugerCert', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: sugerCert,
      },
    ]);
    dispatch(SAVE_DATA({ butterCert, milkCert, batchId, dryFruitCert,sugerCert }));
  };

  const onSubmitHanlder = async () => {
    if (batchId && dryFruitCert && milkCert && butterCert && sugerCert) {
      setError('');
      saveBlockChainData();
      setDataSaved(true);
    } else {
      setError('Please enter all values');
    }
  };

  if (loggedIn !== true) {
    return <Redirect to='/login' />;
  }
  if(dataSaved === true) {
    return <Redirect to='/thanks' />;
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
        <Header as='h1' color='blue' textAlign='center'>
          Raw Material Supplier
        </Header>
        <Divider />
        <Header as='h3' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Raw materials certificate update
        </Header>
        <Form size='large'>
          <Segment raised>
            Batch ID : {batchId}
            <br/>
            <br/>
            Dry Fruits Certificate ID
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter dry fruits quality certificate ID'
              onChange={(e) => {
                setDryfruitsCert(e.target.value);
              }}
            />
            Milk Certificate ID
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter milk quality certificate ID'
              onChange={(e) => {
                setMilkCert(e.target.value);
              }}
            />
            Butter Certificate ID
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter butter quality certificate ID'
              onChange={(e) => {
                setButterCert(e.target.value);
              }}
            />

            Suger Certificate ID
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter suger quality certificate ID'
              onChange={(e) => {
                setSugerCert(e.target.value);
              }}
            />
            <Button color='blue' fluid size='large' onClick={onSubmitHanlder}>
              Submit
            </Button>
            {error ? <span color={'red'}>{error}</span> : ''}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: state.login.isLoggedIn };
};

export default connect(mapStateToProps, null)(RawMaterialSubmissionForm);
