import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Task from './Task';

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const TasksList = ({ tasks }) => {
  return !tasks || tasks.length === 0 ? (
    <EmptyTasksPlaceholder>
      No tasks available. Create one?
    </EmptyTasksPlaceholder>
  ) : (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
        />
      ))}
    </>
  );
};

export default observer(TasksList);
