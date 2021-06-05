import React from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styled from 'styled-components';
import { useTasksStore, useUserStore } from './hooks';
import { updateTaskStatus } from './requests';

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

const Task = ({ id, title, description, status }) => {
  const router = useRouter();
  const tasksStore = useTasksStore();
  const userStore = useUserStore();

  const deleteTask = () => {
    tasksStore.deleteTask(id);
  };

  // tbd consolidate
  const routeToIndex = () => router.push('/');
  const handle401 = async () => {
    window.localStorage.removeItem('accessToken');
    await routeToIndex();
  };

  const handleStatusChange = (e) => {
    const nextStatus = e.target.value;

    (async () => {
      try {
        await updateTaskStatus(
          userStore.accessToken,
          id,
          nextStatus,
          handle401,
        );
        tasksStore.updateTaskStatus(id, nextStatus);
      } catch (error) {
        console.trace(error);
      }
    })();
  };

  return (
    <CardContainer>
      <Card>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          {description}
        </CardContent>
        <CardActions style={{ padding: '14px' }} disableSpacing>
          <Grid
            justify="space-between" // Add it here :)
            container
          >
            <Grid item>
              <FormControl style={{ width: '140px' }}>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  displayEmpty
                >
                  <MenuItem value={'OPEN'}>Open</MenuItem>
                  <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                  <MenuItem value={'DONE'}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <IconButton onClick={deleteTask}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </CardContainer>
  );
};

export default Task;
