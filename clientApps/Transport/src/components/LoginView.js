import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Divider,
} from 'semantic-ui-react';
import { LOGIN } from '../actions';

const LoginView = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loggedIn, setisLoggedIn] = useState(props.isLoggedIn);
  useEffect(()=>{
    setisLoggedIn(props.isLoggedIn)
  }, [props.isLoggedIn])

  const onSubmitHanlder = () => {
    if (email && password) {
      dispatch(LOGIN({isLoggedIn:true}));
    }
  };
  
  
  if (loggedIn === true) {
    return <Redirect to='/' />;
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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


const mapStateToProps = (state) => {
  console.log(state);
   return {isLoggedIn:state.login.isLoggedIn}
}


export default connect(mapStateToProps, null)(LoginView);
