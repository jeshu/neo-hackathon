import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Divider
} from 'semantic-ui-react';

const RawMaterialSubmissionForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHanlder = ()=>{
    if(email && password) {
      console.log('login success');
    } else {
      console.log('login failed...');
    }
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
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
            <Form.Input
              fluid
              icon='box'
              iconPosition='left'
              placeholder='Please enter batch Id'
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter dry fruits quality certificate ID'
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter milk quality certificate ID'
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Form.Input
              fluid
              icon='certificate'
              iconPosition='left'
              placeholder='Please enter butter quality certificate ID'
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Button color='blue' fluid size='large' onClick={onSubmitHanlder}>
              Submit
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
export default RawMaterialSubmissionForm;
