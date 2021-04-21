import React from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ProjectCard({ project: { name, description, tasks, createdAt, id, username }
  }) {

    return (
        <Card centered style={{height: 160}}>
    <Card.Content>
      <Card.Header style={{color: "white"}} as={Link} to={`/project/${id}`}>{name}</Card.Header>
    <Card.Meta style={{color: "white"}} as='div'>{moment(createdAt).fromNow()}</Card.Meta>
      <Card.Description style={{color: "white"}}>{description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button as={Link} to={`/project/${id}`} labelPosition='right'>
      <Button size="mini" color='grey'>
        <Icon name='fork' />
        View Tasks
      </Button>
      <Label as='a' basic color='grey' pointing='left'>
        {tasks.length}
      </Label>
    </Button>
    </Card.Content>
  </Card>
  )
}


export default ProjectCard;