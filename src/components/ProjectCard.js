import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';

function ProjectCard({ project: { name, description, tasks, createdAt, id, username }
  }) {

    const { user } = useContext(AuthContext);


    return (
        <Card fluid>
    <Image src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header as={Link} to={`/project/${id}`}>{name}</Card.Header>
    <Card.Meta as='div'>{moment(createdAt).fromNow()}</Card.Meta>
      <Card.Description>{description}</Card.Description>
      {user && user.username === username && (
      <div>This is your project!</div>
    )}
    </Card.Content>
    <Card.Content extra>
    <Button as={Link} to={`/project/${id}`} labelPosition='right'>
      <Button color='yellow'>
        <Icon name='fork' />
        View Tasks
      </Button>
      <Label as='a' basic color='yellow' pointing='left'>
        {tasks.length}
      </Label>
    </Button>
    </Card.Content>
  </Card>
)
}


export default ProjectCard;