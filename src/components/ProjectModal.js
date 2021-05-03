import React, { useState } from 'react';
import { Button, Form, Header, Image, Modal } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function ProjectModal(props) {

  const initialState = {
        projectId: props.project.id,
        name: props.project.name,
        description: props.project.description
    }
    const [values, setValues] = useState(initialState);
    const onChange = (event) => {
            setValues({...values, [event.target.name]: event.target.value});
        };
    const onSubmit = (event) => {
            event.preventDefault();
            updateProject();
        }
    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION, {
        variables: {
            projectId: values.projectId,
            name: values.name,
            description: values.description
        }
      });

  const [firstOpen, setFirstOpen] = React.useState(false)

  return (
    <>
      <Button style={{marginTop: 10}} size="mini" floated='right' color='grey' onClick={() => setFirstOpen(true)}>Edit</Button>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size='small'
      >
        <Modal.Header>Edit your project name or description</Modal.Header>
        <Modal.Content image>
            <Image size='medium' src='https://ic.pics.livejournal.com/z3000/8983861/2025363/2025363_original.jpg' wrapped />
            <Modal.Description>
                <Header>Current Project Nameeeeeeeeeeeeee</Header>
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

const UPDATE_PROJECT_MUTATION = gql`
    mutation updateProject($projectId: ID!, $name: String!, $description: String!){
        updateProject(projectId: $projectId, name: $name, description: $description){
            id
            name
            description
        }
    }
`


export default ProjectModal;