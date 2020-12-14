import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utilities/hooks';

function ProjectForm(){

    const { values, onChange, onSubmit } = useForm(createProjectCallback, {
        name: ''
    });

    const [createProject, { error }] = useMutation(CREATE_PROJECT_MUTATION, {
        variables: values,
        update(_, result){
            console.log(result)
            values.name = '';
        }
    });

    function createProjectCallback(){
        createProject();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Start a New Project:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi"
                    name="name"
                    onChange={onChange}
                    value={values.name}
                    />
                <Button type="submit" color="yellow">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_PROJECT_MUTATION = gql`
    mutation createProject($name: String!){
        createProject(name: $name){
            id
            name
            createdAt
            username
            tasks{
                id
            }
        }
    }
`

export default ProjectForm;