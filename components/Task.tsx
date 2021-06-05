import React from 'react';
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
import { useApi, useTasksStore } from './hooks';

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

const Task = ({ id, title, description, status }) => {
  const tasksStore = useTasksStore();
  const { deleteTask, updateTaskStatus } = useApi();

  const handleDeleteTask = () => {
    (async () => {
      await deleteTask(id);
      tasksStore.removeTask(id);
    })();
  };

  const handleStatusChange = (e) => {
    const nextStatus = e.target.value;

    (async () => {
      try {
        await updateTaskStatus(id, nextStatus);
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
              <IconButton onClick={handleDeleteTask}>
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
