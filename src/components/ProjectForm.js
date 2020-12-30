import React from 'react';
import { Button, Card, Form, Image } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utilities/hooks';
import { FETCH_PROJECTS_QUERY } from '../utilities/graphql';

function ProjectForm(){

    const { values, onChange, onSubmit } = useForm(createProjectCallback, {
        name: ''
    });

    const [createProject, { error }] = useMutation(CREATE_PROJECT_MUTATION, {
        variables: values,
        update(proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_PROJECTS_QUERY,
          });
          proxy.writeQuery({
            query: FETCH_PROJECTS_QUERY,
            data: {
              getProjects: [result.data.createProject, ...data.getProjects],
            },
          });
          values.name = "";
        },
        onError(err) {
          return err;
        },
      });

    function createProjectCallback(){
        createProject();
    }

    return (
        <Card fluid>
    <Image style={{padding: 40}} src='https://cdn.onlinewebfonts.com/svg/img_219298.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header centered >Start a new project</Card.Header>
    </Card.Content>
    <Card.Content >
    <Form onSubmit={onSubmit}>
            <Form.Field>
                <Form.Input
                    placeholder="Name your project"
                    name="name"
                    onChange={onChange}
                    value={values.name}
                    error={error ? true : false}
                    />
                <Button type="submit" color="yellow">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{marginBottom: 20}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
    </Card.Content>
  </Card>
    )
}

const CREATE_PROJECT_MUTATION = gql`
    mutation createProject($name: String!){
        createProject(name: $name){
            id
            name
            description
            createdAt
            username
            tasks{
                id
            }
        }
    }
`

export default ProjectForm;