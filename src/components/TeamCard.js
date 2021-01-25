import React, { useContext } from 'react';
import { Button, Card, Feed } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';


function TeamCard({ teammembers }) {

  const { user } = useContext(AuthContext);

    return (
        <Card>
            <Card.Content>
                <Card.Header>Team Members</Card.Header>
            </Card.Content>
            <Card.Content>
                <Feed>
                    {teammembers.map(teammember => (
                        <Feed.Event>
                            <Feed.Label>
                                <img alt={user} src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                            </Feed.Label>
                            <Feed.Content>
                                {teammember.username}
                            </Feed.Content>
                            <Feed.Content>
                            <Button circular
                                icon="terminal"
                                as="div"
                                color="orange"
                                floated="right"
                            />
                            </Feed.Content>
                        </Feed.Event>
                    ))}
                </Feed>
            </Card.Content>
        </Card>
    )
}
  
  export default TeamCard;