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
import IoTHandler from '../utils/IotHandler';

const ManufacturingForm = (props) => {
  const dispatch = useDispatch();
  const [loggedIn, setisLoggedIn] = useState(props.isLoggedIn);
  const [batchId, setBatchId] = useState();
  const [manufactureDate, setManufactureDate] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [shipmentId, setShipmentId] = useState();
  const [shipmentTransportId, setShipmentTransportId] = useState();
  const [shipmentDate, setShipmentDate] = useState();

  const [quality1OK, setQuality1OK] = useState(false);
  const [quality2OK, setQuality2OK] = useState(false);
  const [quality3OK, setQuality3OK] = useState(false);
  const [temperature, setTemperature] = useState(false);

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
    neoHelper.contractInvoke('setManufactureDate', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: manufactureDate,
      },
    ]);
    neoHelper.contractInvoke('setExpiryDate', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: expiryDate,
      },
    ]);
    neoHelper.contractInvoke('setShipmentId', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: shipmentId,
      },
    ]);
    neoHelper.contractInvoke('setShipmentDate', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: shipmentDate,
      },
    ]);
    neoHelper.contractInvoke('setShipmentTransportId', [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'String',
        value: shipmentTransportId,
      },
    ]);
    dispatch(
      SAVE_DATA({
        batchId,
        expiryDate,
        manufactureDate,
        shipmentId,
        shipmentDate,
        shipmentTransportId,
      }),
    );
  };

  const onSubmitHanlder = async () => {
    if (batchId && manufactureDate && expiryDate && shipmentId) {
      setError('');
      saveBlockChainData();
      setDataSaved(true);
      IoTHandler('temperature/warehouseshipment', batchId);
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

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' color='blue' textAlign='center'>
          {APP_TITLE}
        </Header>
        <Divider />
        <Header as='h3' color='violet' textAlign='center'>
          Manufacturing data update
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
            Manufacturing date
              <Segment.Group>
              <Segment.Group horizontal>
              <Segment style={{ width: '50%' }}>
                <Button  fluid
                  color={!quality1OK ? 'blue' : 'teal'}
                  {...((!batchId || quality1OK) && { disabled: 'disabled' })}
                  onClick={async ()=>{
                    const data = await IoTHandler('mixing', batchId);
                    if(!data.error) {
                      setQuality1OK(true);
                    }
                  }}
                >Mixing Quality</Button>
              </Segment>
              <Segment style={{ width: '50%' }}>
                <Button fluid
                  color={!quality2OK ? 'blue' : 'teal'}
                  {...((!batchId ||  quality2OK) && { disabled: 'diabled' })}
                  onClick={async ()=>{
                    const data = await IoTHandler('viscosity', batchId);
                    if(!data.error) {
                      setQuality2OK(true);
                    }
                  }}>Viscosity Quality</Button>
              </Segment>
              </Segment.Group>
              <Segment.Group horizontal>
              <Segment style={{ width: '50%' }}>
                <Button fluid
                  color={!quality3OK ? 'blue' : 'teal'}
                  {...((!batchId || quality3OK) && { disabled: 'disabled' })}
                  onClick={async ()=>{
                    const data = await IoTHandler('packing', batchId);
                    if(!data.error) {
                      setQuality3OK(true);
                    }
                  }}>Packing Quality</Button>
              </Segment>
              <Segment style={{ width: '50%' }}>
                <Button fluid
                  color={!temperature ? 'blue' : 'teal'}
                  {...((!batchId || temperature) && { disabled: 'diabled' })}
                  onClick={async ()=>{
                    const data = await IoTHandler('temperature/manufacture', batchId);
                    if(!data.error) {
                      setTemperature(true);
                    }
                  }}
                >Temerature</Button>
              </Segment>
              </Segment.Group>
              </Segment.Group>
            <Form.Input
              fluid
              type='date'
              icon='thumbs up'
              iconPosition='left'
              placeholder='Please enter manufacturing date'
              onChange={(e) => {
                setManufactureDate(e.target.value);
              }}
            />
            Expiry date
            <Form.Input
              fluid
              type='date'
              icon='thumbs down'
              iconPosition='left'
              placeholder='Please enter expiry date'
              onChange={(e) => {
                setExpiryDate(e.target.value);
              }}
            />
            Shipment ID
            <Form.Input
              fluid
              icon='factory'
              iconPosition='left'
              placeholder='Please enter shipmentId'
              onChange={(e) => {
                setShipmentId(e.target.value);
              }}
            />
            Shipment Transport ID
            <Form.Input
              fluid
              icon='truck'
              iconPosition='left'
              placeholder='Please enter shipmentTransportId'
              onChange={(e) => {
                setShipmentTransportId(e.target.value);
              }}
            />
            Shipment date
            <Form.Input
              fluid
              type='date'
              icon='boxes'
              iconPosition='left'
              placeholder='Please enter shipmentId'
              onChange={(e) => {
                setShipmentDate(e.target.value);
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

export default connect(mapStateToProps, null)(ManufacturingForm);
