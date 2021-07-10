import React from 'react';
import {connect } from  'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Divider } from 'semantic-ui-react';

const Thankyou = (props) => {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
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
          <Segment textAlign='left'>Butter certificateId: {props.butterCert}</Segment>
        </Segment.Group>

        <Divider color='violet' />
        <Link to='/'><i aria-hidden="true" className="certificate icon" color="blue"></i>Add certificate for new batch</Link>
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state) =>({
  ...state.rawMaterial
})
export default connect(mapStateToProps)(Thankyou);
