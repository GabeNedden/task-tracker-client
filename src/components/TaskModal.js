import React, { useState } from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function TaskModal(props) {

  const initialState = {
        projectId: props.project.id,
        taskId: props.task.id,
        name: props.task.name,
        description: props.task.description,
        status: props.task.status
    }

    const [values, setValues] = useState(initialState);
    const onChange = (event) => {
            setValues({...values, [event.target.name]: event.target.value});
        };
    const onSubmit = (event) => {
            event.preventDefault();
            updateTask();
        }
    const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
        variables: {
            projectId: values.projectId,
            taskId: values.taskId,
            name: values.name,
            description: values.description,
            status: values.status
        }
      });

  const [firstOpen, setFirstOpen] = React.useState(false)

  return (
    <>
      <Button style={{marginTop: 10}} size="mini" floated='right' color='grey' onClick={() => setFirstOpen(true)}>Details</Button>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size='small'
      >
        <Modal.Header>Edit your Task Details</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Header>Task</Header>
                <Form onSubmit={onSubmit}>
                    <Form.Field>
                        <Form.Input 
                            size="big"
                            placeholder="Project Name"
                            name="name"
                            onChange={onChange}
                            value={values.name}
                            />
                        <Form.Input
                            placeholder="Project Description"
                            name="description"
                            onChange={onChange}
                            value={values.description}
                            />
                        <Button size="mini" type="submit" color="grey">
                            Update
                        </Button>
                    </Form.Field>
                </Form>
            </Modal.Description>
        </Modal.Content>
      </Modal>
    </>
  )
}

const UPDATE_TASK_MUTATION = gql`
    mutation updateTask($projectId: ID!, $taskId: ID!, $name: String!, $description: String!, $status: String!){
        updateTask(projectId: $projectId, taskId: $taskId, name: $name, description: $description, status: $status){
            id
            name
            tasks{
                id
                name
            }
        }
    }
`


export default TaskModal;