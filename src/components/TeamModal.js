import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Card, Feed, Form, Grid, Icon, Image, Modal } from 'semantic-ui-react';

function TeamModal(props) {

  const [targetUser, setTargetUser] = useState('');
  const [team, setTeam] = useState('');
  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const { id: projectId, teammembers } = props.project;

  const { loading, data: { getUsers } = {} } = useQuery(FETCH_USERS_QUERY);

  const onChange = (event) => {
    setTeam(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setTargetUser(getUsers.find(user => user.username === team || user.email === team));
    console.log(targetUser)
  }

  const [addTeammember] = useMutation(ADD_TEAMMEMBER_MUTATION, {
    update(){
    },
    variables: {
        projectId,
        teammemberId: targetUser.id
    }
  })

  return (
    <>
      <Button floated='right' color='grey' onClick={() => setFirstOpen(true)}>Edit Team</Button>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>Project Team Overview</Modal.Header>

        <Modal.Content>
          <Grid>
            <Grid.Column width={8}>
              <Feed>
                {teammembers.map(teammember => (
                    <Feed.Event key={teammember.id}>
                        <Feed.Label image={"https://react.semantic-ui.com/images/avatar/small/jenny.jpg"} />
                        <Feed.Content date={teammember.role} summary={teammember.username} />
                    </Feed.Event>
                ))}
              </Feed>
            </Grid.Column>

            <Grid.Column width={8}>
              <Form onSubmit={onSubmit}>
                <Form.Field>
                    <Form.Input 
                        loading={loading === true}
                        size="big"
                        placeholder="Username or Email"
                        name="team"
                        value={team}
                        onChange={onChange}
                        />
                    <Button size="mini" type="submit" color="grey">
                        Search
                    </Button>
                </Form.Field>
              </Form>

              {targetUser === '' ? (
                <div>
                </div>
              ) : (

                <Card fluid >
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                  />
                  <Card.Header>{targetUser.username}</Card.Header>
                  <Card.Meta>{targetUser.email}</Card.Meta>
                  <Card.Description>
                    Would you like to invite {targetUser.username} to your project?
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button
                      onClick={addTeammember}
                      basic
                      color='green'>
                      Approve
                    </Button>
                    <Button basic color='red'>
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              )}

            </Grid.Column>
          </Grid>
        
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={() => setSecondOpen(true)} primary>
            Proceed <Icon name='right chevron' />
          </Button>
        </Modal.Actions>

        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
        >
          <Modal.Header>Modal #2</Modal.Header>
          <Modal.Content>
            <p>That's everything!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='check'
              content='All Done'
              onClick={() => setSecondOpen(false)}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}

const FETCH_USERS_QUERY = gql `
    query{
        getUsers{
            id
            username
            email
        }
    }
`

const ADD_TEAMMEMBER_MUTATION = gql `
    mutation($projectId: ID!, $teammemberId: ID!){
        addTeammember(projectId: $projectId, teammemberId: $teammemberId){
            id
            name
            teammembers{
              id
              username
            }
        }
    }
`

export default TeamModal;