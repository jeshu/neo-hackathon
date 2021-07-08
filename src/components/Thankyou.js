import React from 'react';
import { Icon, Grid, Header, Segment, Divider } from 'semantic-ui-react';

const Thankyou = () => {
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
          <Segment textAlign='left'>Batch ID: {}</Segment>
          <Segment textAlign='left'>Dry Fruit certificateId: {}</Segment>
          <Segment textAlign='left'>Milk certificateId: {}</Segment>
          <Segment textAlign='left'>Butter certificateId: {}</Segment>
        </Segment.Group>

        <Divider color='violet' />
        <a href="#"><i aria-hidden="true" class="certificate icon" color="blue"></i>Add certificate for new batch</a>
      </Grid.Column>
    </Grid>
  );
};
export default Thankyou;
