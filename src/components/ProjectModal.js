import React, { useState } from 'react';
import { Button, Container, Form, Grid, Image, Modal, Radio } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import ToggleButton from '../components/ToggleButton';

function ProjectModal(props) {

  const initialState = {
        projectId: props.project.id,
        name: props.project.name,
        description: props.project.description,
        privacy: props.project.privacy
    }
    const [values, setValues] = useState(initialState);
    const onChange = (event) => {
            setValues({...values, [event.target.name]: event.target.value});
        };
    const onSubmit = (event) => {
            event.preventDefault();
            updateProject();
            setFirstOpen(false);
        }
    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION, {
        variables: {
            projectId: values.projectId,
            name: values.name,
            description: values.description
        }
      });

      const [togglePrivacy] = useMutation(TOGGLE_PRIVACY_MUTATION, {
        variables: {
            projectId: values.projectId
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
        <Modal.Header>Modify project settings</Modal.Header>
        <Modal.Content >
            <Container>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Image size='medium' src='https://ic.pics.livejournal.com/z3000/8983861/2025363/2025363_original.jpg' wrapped />
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Form float="right" onSubmit={onSubmit}>
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
                                    <Form.Field>
                                        <Radio
                                            label='Allow Teammembers'
                                            toggle
                                            name='radioGroup'
                                            value={values.privacy}
                                            checked={values.privacy === 'On'}
                                            onChange={togglePrivacy}
                                            style={{marginBottom: 15}}
                                        />
                                    </Form.Field>
                                    <ToggleButton user={props.user} project={props.project} />
                                    <Button floated="left" size="mini" type="submit" color="grey">
                                        Update
                                    </Button>
                                    
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
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

const TOGGLE_PRIVACY_MUTATION = gql`
    mutation togglePrivacy($projectId: ID!){
        togglePrivacy(projectId: $projectId){
            id
            name
            privacy
        }
    }
`


export default ProjectModal;