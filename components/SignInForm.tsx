import React from 'react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

import { useApi, useUserStore } from './hooks';
import ErrorMessage from './ErrorMessage';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

const SignInForm = () => {
  const userStore = useUserStore();
  const router = useRouter();
  const { signIn } = useApi();

  const goToSignUp = () => router.push('/signup');
  const goToTasks = () => router.push('/tasks');
  const setAccessToken = (accessToken) => {
    window.localStorage.setItem('accessToken', accessToken);
    userStore.setAccessToken(accessToken);
  };

  const submit = async () => {
    setState({ ...state, errorMessage: null });
    const { username, password } = state;

    try {
      setAccessToken(await signIn(username, password));
      await goToTasks();
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.message;
      setState({ ...state, errorMessage });
    }
  };

  const [state, setState] = React.useState({
    username: '',
    password: '',
    errorMessage: null,
  });

  return (
    <FormContainer>
      <Heading>Hello!</Heading>
      <p>Fill in your username and password to sign in.</p>

      {state.errorMessage && <ErrorMessage message={state.errorMessage} />}

      <div>
        <FormField
          id="outlined-name"
          label="Username"
          margin="dense"
          variant="outlined"
          onChange={(e) => setState({ ...state, username: e.target.value })}
        />
      </div>
      <div>
        <FormField
          id="outlined-password"
          label="Password"
          margin="dense"
          variant="outlined"
          type="password"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
      </div>
      <hr />
      <div>
        <Button
          style={{ marginBottom: '10px' }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={submit}
        >
          SIGN IN
        </Button>

        <Button fullWidth onClick={goToSignUp}>
          Don't have an account? Sign up now!
        </Button>
      </div>
    </FormContainer>
  );
};

export default SignInForm;
