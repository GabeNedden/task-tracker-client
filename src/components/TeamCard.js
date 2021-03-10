import React, { useContext } from 'react';
import { Button, Card, Feed, Form, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';


function TeamCard({ teammembers }) {

  const { user } = useContext(AuthContext);
  const [teamView, setTeamView] = React.useState(true)
  const hideTeam = () => setTeamView(false)

  const Team = () => (
    <Card>
        <Card.Content>
            <Icon onClick={hideTeam} style={{float:"right", cursor:'pointer'}} name='close' />
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
                <Feed.Event>
                        <Feed.Label>
                            <img alt={user} src='https://react.semantic-ui.com/images/avatar/small/laura.jpg' />
                        </Feed.Label>
                        <Feed.Content>
                            <Form>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="New Teammember!"
                                        name="task"
                                    />
                                    <Button circular
                                        icon="add"
                                        as="div"
                                        color="orange"
                                        type="submit"
                                    >
                                    </Button>
                                </div>
                            </Form>
                        </Feed.Content>
                    </Feed.Event>
            </Feed>
        </Card.Content>
    </Card>
  )

    return (
        <div>
            { teamView ? <Team /> : null }
        </div>
    )

}
  
  export default TeamCard;