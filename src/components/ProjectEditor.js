import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';
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
        }

    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION, {
        variables: {
            projectId: values.projectId,
            name: values.name,
            description: values.description
        }
      });

    return (
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
                        <Button floated="right" size="mini" type="submit" color="grey">
                            Update
                        </Button>
                    </Form.Field>
                </Form>
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