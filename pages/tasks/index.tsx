import React from 'react';
import PageContainer from '../../components/PageContainer';
import TasksView from '../../components/TasksView';

const TasksPage: React.FC<void> = () => (
  <PageContainer>
    <TasksView />
  </PageContainer>
);

export default TasksPage;
