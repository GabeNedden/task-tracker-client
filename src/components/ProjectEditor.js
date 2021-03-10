import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';

function ProjectEditor(props){
    const initialState = {
        projectId: props.project.id,
        name: props.project.name,
        description: props.project.description
    }

    const { user } = useContext(AuthContext);
    const { username } = props.user;
        
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
            <Card.Content >
            <Form onSubmit={onSubmit}>
                    <Form.Field>
                        <Form.Input
                            transparent 
                            size="big"
                            placeholder="Project Name"
                            name="name"
                            onChange={onChange}
                            value={values.name}
                            />
                        <Form.Input
                            transparent
                            placeholder="Project Description"
                            name="description"
                            onChange={onChange}
                            value={values.description}
                            />
                        <Button floated="left" size="mini" type="submit" color="grey">
                            Update
                        </Button>
                        {user && user.username === username && (
                                    <Button
                                        style={{marginTop: 10}}
                                        floated='right'
                                        as="div"
                                        color="orange"
                                        size="mini"
                                        onClick={() => console.log("Archive")}
                                    >
                                            Archive Project
                                    </Button>
                                )}
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