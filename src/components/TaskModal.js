import React, { useState } from 'react';
import { Button, Form, Modal, Radio } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function TaskModal(props) {

    const [value, setValue] = useState(props.task.status);
    const handleChange = (event, {value}) => setValue(value);

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
            setFirstOpen(false)
        }
    const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
        variables: {
            projectId: values.projectId,
            taskId: values.taskId,
            name: values.name,
            description: values.description,
            status: value
        }
      });

      const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
        variables: {
            projectId: values.projectId,
            taskId: values.taskId
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
                <Form>
                    <Form.Field>
                        <Form.Input 
                            size="big"
                            placeholder="Task Name"
                            name="name"
                            onChange={onChange}
                            value={values.name}
                            />
                        <Form.TextArea
                            placeholder="Task Description"
                            name="description"
                            onChange={onChange}
                            value={values.description}
                            />
                        <Form.Field>
                            Status: <b>{value}</b>
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Open'
                                name='radioGroup'
                                value='Open'
                                checked={value === 'Open'}
                                onChange={handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='In Progress'
                                name='radioGroup'
                                value='In Progress'
                                checked={value === 'In Progress'}
                                onChange={handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Complete'
                                name='radioGroup'
                                value='Complete'
                                checked={value === 'Complete'}
                                onChange={handleChange}
                            />
                        </Form.Field>

                        <Button
                            style={{marginTop: 10}}
                            size="mini"
                            type="submit"
                            color="grey"
                            onClick={onSubmit}
                            >
                            Update
                        </Button>
                        <Button 
                            style={{marginTop: 10}}
                            negative floated="right"
                            size="mini"
                            onClick={deleteTask}
                        >
                            Delete
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
                description
                status
            }
        }
    }
`

const DELETE_TASK_MUTATION = gql`
    mutation deleteTask($projectId: ID!, $taskId: ID!){
        deleteTask(projectId: $projectId, taskId: $taskId){
            id
            name
            tasks{
                id
                name
                description
                status
            }
        }
    }
`

export default TaskModal;