import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import ProjectEditor from '../components/ProjectEditor';

function TeamModal(props) {
  const getProject = props.project;
  const user = props.user;
  console.log(props)

  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)

  return (
    <>
      <Button floated='right' color='grey' onClick={() => setFirstOpen(true)}>Edit Team</Button>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>Add or Remove Teammembers</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='users' />
          </div>
          <ProjectEditor user={user} project={getProject} />
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


export default TeamModal;