import React from 'react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

import { useApi } from './hooks';
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

const SignUpForm = () => {
  const { signUp } = useApi();
  const router = useRouter();

  const [state, setState] = React.useState({
    username: '',
    password: '',
    errorMessage: null,
  });

  const submit = async () => {
    const { username, password } = state;

    try {
      await signUp(username, password);
      await router.push('/signin');
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.message;
      setState({ ...state, errorMessage });
    }
  };

  return (
    <FormContainer>
      <Heading>Join us!</Heading>
      <p>Start managing tasks easily.</p>

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
      <p>
        Passwords must contain at least 1 upper case letter, 1 lower case letter
        and one number OR special character.
      </p>
      <hr />
      <div>
        <Button fullWidth variant="contained" color="primary" onClick={submit}>
          SIGN UP
        </Button>
      </div>
    </FormContainer>
  );
};

export default SignUpForm;
