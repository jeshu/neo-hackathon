import React from 'react';
import {connect } from  'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Header, Segment, Divider } from 'semantic-ui-react';

const Thankyou = (props) => {
  if(props.isLoggedIn !== true) {
    return <Redirect />
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }} textAlign='left'>
        <Header as='h1' color='blue' textAlign='center'>
          Raw Material Supplier
        </Header>
        <Divider color='violet' />
        <Header as='h3' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Certificates are update successfully
        </Header>
        <Segment.Group attached='top'>
          <Segment textAlign='left'>Batch ID: {props.batchId}</Segment>
          <Segment textAlign='left'>Dry Fruit certificateId: {props.dryFruitCert}</Segment>
          <Segment textAlign='left'>Milk certificateId: {props.milkCert}</Segment>
          <Segment textAlign='left'>Flavor certificateId: {props.flavorCert}</Segment>
          <Segment textAlign='left'>Suger certificateId: {props.sugerCert}</Segment>
        </Segment.Group>

        <Divider color='violet' />
        <Link to='/'><i aria-hidden="true" className="add icon" color="blue"></i>Add more data</Link>
        <br />
        <br />
        <a href='http://localhost:3011'><i aria-hidden="true" className="factory icon" color="blue"></i>Visit Manufacturing Uint site</a>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) =>({
  ...state.rawMaterial,
  isLoggedIn: state.login.isLoggedIn 
})
export default connect(mapStateToProps)(Thankyou);
