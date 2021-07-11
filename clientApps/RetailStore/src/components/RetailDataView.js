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

const RetailDataView = (props) => {
  const dispatch = useDispatch();
  const [loggedIn, setisLoggedIn] = useState(props.isLoggedIn);
  const [batchId, setBatchId] = useState();
  const [retailStoreId, setRetailStoreId] = useState();
  const [reciveDate, setReciveDate] = useState();

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
    neoHelper.contractInvoke('setRetailStoreId', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: retailStoreId,
      },
    ]);
    neoHelper.contractInvoke('setRetailReciveDate', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: reciveDate,
      },
    ]);
    dispatch(SAVE_DATA({ reciveDate, batchId,  retailStoreId }));
  };

  const onSubmitHanlder = async () => {
    if (batchId && retailStoreId && reciveDate) {
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
      <Grid.Column style={{ maxWidth: 450 }} textAlign='left'>
        <Header as='h1' color='blue' textAlign='center'>
          {APP_TITLE}
        </Header>
        <Divider />
        <Header as='h3' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Retail data update
        </Header>
        <Form size='large'>
          <Segment raised textAlign='left'>
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
            Retail Store ID
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter retail store ID'
              onChange={(e) => {
                setRetailStoreId(e.target.value);
              }}
            />
            Batch Recive Date
            <Form.Input
              fluid
              type='date'
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter batch revice date'
              onChange={(e) => {
                setReciveDate(e.target.value);
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

export default connect(mapStateToProps, null)(RetailDataView);
