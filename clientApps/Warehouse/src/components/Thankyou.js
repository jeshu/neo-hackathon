import React from 'react';
import {connect } from  'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Header, Segment, Divider } from 'semantic-ui-react';
import { APP_TITLE } from '../Consts';

const Thankyou = (props) => {
  if(props.isLoggedIn !== true) {
    return <Redirect />
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
        <Header as='h1' color='blue' textAlign='center'>
          {APP_TITLE}
        </Header>
        <Divider color='violet' />
        <Header as='h3' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Warehouse and dispatch details.
        </Header>
        <Segment.Group attached='top' textAlign="left">
          <Segment textAlign='left'>Batch ID : {props.batchId}</Segment>
          <Segment textAlign='left'>Warehouse ID : {props.warehouseId}</Segment>
          <Segment textAlign='left'>Package recive date : {props.warehouseReciveDate}</Segment>
          <Segment textAlign='left'>Retail Invoice ID : {props.retailInvoiceId}</Segment>
          <Segment textAlign='left'>Retail Transport ID : {props.retailTransportId}</Segment>
        </Segment.Group>

        <Divider color='violet' />
        <Link to='/'><i aria-hidden="true" className="add icon" color="blue"></i>Add more data</Link>
        <br />
        <br />
        <a href='http://localhost:3013/'><i aria-hidden="true" className="shop icon" color="blue"></i>Visit Retail site</a>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) =>({
  ...state.rawMaterial,
  isLoggedIn: state.login.isLoggedIn 
})
export default connect(mapStateToProps)(Thankyou);
