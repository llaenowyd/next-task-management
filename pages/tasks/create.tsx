import React from 'react';
import PageContainer from '../../components/PageContainer';
import CreateTaskForm from '../../components/CreateTaskForm';

const CreateTasksPage: React.FC<void> = () => (
  <PageContainer>
    <CreateTaskForm />
  </PageContainer>
);

export default CreateTasksPage;
