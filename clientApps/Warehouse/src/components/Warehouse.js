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
  Tab,
} from 'semantic-ui-react';
import { SAVE_DATA } from '../actions';
import { APP_TITLE } from '../Consts';

const Warehouse = (props) => {
  const dispatch = useDispatch();
  const [loggedIn, setisLoggedIn] = useState(props.isLoggedIn);
  const [batchId, setBatchId] = useState();
  const [warehouseId, setWarehouseId] = useState();
  const [warehouseReciveDate, setWarehouseReciveDate] = useState();
  const [retailInvoiceId, setRetailInvoiceId] = useState();
  const [retailTransportId, setTransportId] = useState();

  const [error, setError] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    setisLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  const neoHelper = new N3Helper(
    contract(
      N3Constanst.scriptHash,
      N3Constanst.rpcAddress,
      N3Constanst.userPvtKey,
    ),
  );
  const saveBlockChainData = async () => {
    try {
      neoHelper.contractInvoke('setWarehouseId', [
        {
          type: 'String',
          value: batchId,
        },
        {
          type: 'String',
          value: warehouseId,
        },
      ]);
      neoHelper.contractInvoke('setWarehouseReciveDate', [
        {
          type: 'String',
          value: batchId,
        },
        {
          type: 'String',
          value: retailInvoiceId,
        },
      ]);

      dispatch(
        SAVE_DATA({
          batchId,
          warehouseId,
          warehouseReciveDate,
        }),
      );
    } catch (error) {}
  };
  const saveBlockChainData2 = async () => {
    try {
      neoHelper.contractInvoke('setRetailTransportId', [
        {
          type: 'String',
          value: batchId,
        },
        {
          type: 'String',
          value: retailTransportId,
        },
      ]);
      neoHelper.contractInvoke('setRetailInvoice', [
        {
          type: 'String',
          value: batchId,
        },
        {
          type: 'String',
          value: retailInvoiceId,
        },
      ]);

      dispatch(
        SAVE_DATA({
          retailInvoiceId,
          retailTransportId,
          batchId,
        }),
      );
    } catch (error) {}
  };
  const handleTabChange = (e, { activeIndex }) => setActiveTab(activeIndex );

  const onSubmitHanlder = async () => {
    if (batchId && warehouseId && warehouseReciveDate) {
      setError('');
      saveBlockChainData();
      setActiveTab(1);
    } else {
      setError('Please enter all values');
    }
  };

  const onSubmitHanlder2 = async () => {
    if (batchId && retailInvoiceId && retailTransportId) {
      setError('');
      saveBlockChainData2();
      setDataSaved(true);
    } else {
      setError('Please enter all values');
    }
  };

  if (loggedIn !== true) {
    return <Redirect to='/login' />;
  }
  if (dataSaved === true) {
    return <Redirect to='/thanks' />;
  }

  const panes = [
    {
      menuItem: 'Package deliver',
      render: () => (
        <Tab.Pane>
          <Form size='large'>
            <Segment textAlign='left'>
              Batch ID
              <Form.Input
                fluid
                icon='box'
                iconPosition='left'
                placeholder='Please enter batch Id'
                value={batchId}
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
              Warehouse Recive Date
              <Form.Input
                fluid
                type='date'
                icon='calendar'
                iconPosition='left'
                placeholder='Please enter warehouse recive date'
                onChange={(e) => {
                  setWarehouseReciveDate(e.target.value);
                }}
              />
              <Button color='blue' fluid size='large' onClick={onSubmitHanlder}>
                Submit
              </Button>
              {error ? <span color={'red'}>{error}</span> : ''}
            </Segment>
          </Form>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Package sending',
      render: () => (
        <Tab.Pane>
          <Form size='large'>
            <Segment textAlign='left'>
              Batch ID
              <Form.Input
                fluid
                icon='box'
                iconPosition='left'
                placeholder='Please enter batch Id'
                value={batchId}
                onChange={(e) => {
                  setBatchId(e.target.value);
                }}
              />
              <div>Shipment ID
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
              <Button
                color='blue'
                fluid
                size='large'
                onClick={onSubmitHanlder2}
              >
                Submit
              </Button>
              {error ? <span color={'red'}>{error}</span> : ''}
                </div>
            </Segment>
          </Form>
        </Tab.Pane>
      ),
    },
  ];

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
        <Tab panes={panes} activeIndex={activeTab}  onTabChange={handleTabChange}/>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: state.login.isLoggedIn };
};

export default connect(mapStateToProps, null)(Warehouse);
