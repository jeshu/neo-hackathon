import React from 'react';
import {connect } from  'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Header, Segment, Divider } from 'semantic-ui-react';
import { APP_TITLE } from '../Consts';

const Thankyou = (props) => {
  if(props.isLoggedIn !== true) {
    return <Redirect to="/login"/>
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
        <Header as='h1' color='blue' textAlign='center'>
          {APP_TITLE}
        </Header>
        <Divider color='violet' />
        <Header as='h3' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Certificates are update successfully
        </Header>
        <Segment.Group attached='top'>
          <Segment textAlign='left'>Batch ID: {props.batchId}</Segment>
          <Segment textAlign='left'>Manufacturing Date: {props.manufactureDate}</Segment>
          <Segment textAlign='left'>Expiry Date: {props.expiryDate}</Segment>
          <Segment textAlign='left'>Shipment Id: {props.shipmentId}</Segment>
          <Segment textAlign='left'>Shipment Transport Id: {props.shipmentTransportId}</Segment>
          <Segment textAlign='left'>Shipment Date: {props.shipmentDate}</Segment>
        </Segment.Group>
        <Divider color='violet' />
        <Link to='/'><i aria-hidden="true" className="box icon" color="blue"></i> Add more data</Link>
        <br />
        <br />
        <Link to='/'><i aria-hidden="true" className="warehouse icon" color="blue"></i> Visit Warehouse site</Link>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) =>({
  ...state.rawMaterial,
  isLoggedIn: state.login.isLoggedIn 
})
export default connect(mapStateToProps)(Thankyou);
