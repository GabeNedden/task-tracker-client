import React, { useState } from 'react';
import { Button, Card, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function ProjectEditor(props){
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
            console.log(values)
        }

    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION, {
        variables: {
            projectId: values.projectId,
            name: values.name,
            description: values.description
        }
      });

    return (
        <Card fluid>
    <Card.Content>
      <Card.Header>Update your project</Card.Header>
    </Card.Content>
    <Card.Content >
    <Form onSubmit={onSubmit}>
            <Form.Field>
                <Form.Input
                    label="Name"
                    placeholder="Update proj name"
                    name="name"
                    onChange={onChange}
                    value={values.name}
                    />
                <Form.Input
                    label="Description"
                    placeholder="Update proj desc"
                    name="description"
                    onChange={onChange}
                    value={values.description}
                    />
                <Button type="submit" color="grey">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    </Card.Content>
  </Card>
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

export default ProjectEditor;