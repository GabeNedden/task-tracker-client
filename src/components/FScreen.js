import React from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'

function FScreen() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      dimmer="blurring"
      size='small'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='red' >Red Pill</Button>}
    >
      <Modal.Content image>
        <Image fluid style={{height: '100%', width: '100%'}} src='https://techcrunch.com/wp-content/uploads/2014/12/matrix.jpg?w=730&crop=1' wrapped />
      </Modal.Content>
    </Modal>
  )
}

export default FScreen;