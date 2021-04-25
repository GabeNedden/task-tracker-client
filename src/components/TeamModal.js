import React, { useRef, useState} from 'react';
import { Button, Feed, Form, Icon, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function TeamModal(props) {
  const teamInputRef = useRef("");
  const [team, setTeam] = useState('');

  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)

  const { id: projectId, teammembers } = props.project;

  const [addTeammember] = useMutation(ADD_TEAMMEMBER_MUTATION, {
    update(){
        setTeam('');
        teamInputRef.current.blur();
    },
    variables: {
        projectId,
        teammember: team 
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
        <Modal.Header>Add or Remove Teammembers</Modal.Header>

        <Modal.Content >
          <Feed>
            {teammembers.map(teammember => (
                <Feed.Event key={teammember.id}>
                    <Feed.Label image={"https://react.semantic-ui.com/images/avatar/small/jenny.jpg"} />
                    <Feed.Content date={teammember.role} summary={teammember.username} />
                </Feed.Event>
            ))}
          </Feed>
          <Form>
            <div className="ui action input fluid">
                <input
                    type="text"
                    placeholder="Add a new teammember"
                    name="team"
                    value={team}
                    onChange={event => setTeam(event.target.value)}
                    ref={teamInputRef}
                />
                <button 
                    className="ui button grey mini"
                    disabled={team.trim() === ''}
                    type="submit"
                    onClick={addTeammember}
                >
                        New Teammember
                </button>
            </div>
        </Form>
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

const ADD_TEAMMEMBER_MUTATION = gql `
    mutation($projectId: ID!, $teammember: String!){
        addTeammember(projectId: $projectId, teammember: $teammember){
            id,
            teammembers{
                id
                username
                role
            }
        }
    }
`


export default TeamModal;