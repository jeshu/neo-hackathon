import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Divider
} from 'semantic-ui-react';

const LoginView = () => {
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
        <Divider color='violet' />
        <Header as='h3' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Log-in to your account
        </Header>
        <Form size='large'>
          <Segment raised>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(e)=>{setPassword(e.target.value)}}
            />

            <Button color='blue' fluid size='large' onClick={onSubmitHanlder}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
export default LoginView;
