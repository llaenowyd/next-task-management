import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { TextField, FormControl, Button } from '@material-ui/core';
import { useApi, useTasksStore, useUserStore } from './hooks';
import ErrorMessage from './ErrorMessage';

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const CreateTaskForm = () => {
  const { createTask } = useApi();
  const router = useRouter();
  const tasksStore = useTasksStore();

  const [state, setState] = React.useState({
    title: '',
    description: '',
    errorMessage: null,
  });

  const handleSubmitTask = async () => {
    const { title, description } = state;

    try {
      const task = await createTask(title, description);

      tasksStore.addTask(task);

      await router.push('/tasks');
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? 'Unknown error';
      setState({ ...state, errorMessage });
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Create a new task</h1>
        <p>Provide information about the task you wish to complete.</p>

        {state.errorMessage && <ErrorMessage message={state.errorMessage} />}

        <FormControl fullWidth>
          <TextField
            label="Title"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Description"
            placeholder="Description"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />
        </FormControl>

        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmitTask}
        >
          CREATE TASK
        </Button>
      </FormContainer>
    </FormWrapper>
  );
};

export default CreateTaskForm;
