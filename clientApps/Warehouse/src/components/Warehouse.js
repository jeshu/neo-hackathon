import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import N3Helper from '../utils/N3Helper';
import { contract } from '../utils/N3Utils';
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
import { APP_TITLE } from '../Consts';

const RawMaterialSubmissionForm = (props) => {
  const dispatch = useDispatch();
  const [loggedIn, setisLoggedIn] = useState(props.isLoggedIn);
  const [batchId, setBatchId] = useState();
  const [warehouseId, setWarehouseId] = useState();
  const [retailInvoiceId, setRetailInvoiceId] = useState();
  const [retailTransportId, setTransportId] = useState();

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
        value: warehouseId,
      },
    ]);
    neoHelper.contractInvoke('setMilkpowderCert', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: retailInvoiceId,
      },
    ]);
    neoHelper.contractInvoke('setButterCert', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: retailTransportId,
      },
    ]);
    dispatch(SAVE_DATA({ retailInvoiceId,retailTransportId, batchId, warehouseId }));
  };

  const onSubmitHanlder = async () => {
    if (batchId && warehouseId && retailInvoiceId && retailTransportId) {
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
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' color='blue' textAlign='center'>
          {APP_TITLE}
        </Header>
        <Divider />
        <Header as='h3' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Warehouse and retail data update
        </Header>
        <Form size='large'>
          <Segment raised textAlign="left">
            Batch ID
            <Form.Input
              fluid
              icon='box'
              iconPosition='left'
              placeholder='Please enter batch Id'
              onChange={(e) => {
                setBatchId(e.target.value);
              }}
            />
            Warehouse ID
            <Form.Input
              fluid
              icon='warehouse'
              iconPosition='left'
              placeholder='Please enter warehouse ID'
              onChange={(e) => {
                setWarehouseId(e.target.value);
              }}
            />
            Shipment ID
            <Form.Input
              fluid
              icon='inbox'
              iconPosition='left'
              placeholder='Please enter shipment ID'
              onChange={(e) => {
                setRetailInvoiceId(e.target.value);
              }}
            />
            Shipment Transport ID
            <Form.Input
              fluid
              icon='truck'
              iconPosition='left'
              placeholder='Please enter transport ID'
              onChange={(e) => {
                setTransportId(e.target.value);
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
