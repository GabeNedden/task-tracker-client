import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Form, Grid, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import ToggleButton from '../components/ToggleButton';
import TeamCard from '../components/TeamCard';

function ProjectPage(props){
    const projectId = props.match.params.projectId;
    const { user } = useContext(AuthContext);
    const taskInputRef = useRef(null);

    const [task, setTask] = useState('');

    const {
        data: { getProject } = {}
      } = useQuery(FETCH_PROJECT_QUERY, {
        variables: {
          projectId
        }
      });

    const [createTask] = useMutation(CREATE_TASK_MUTATION, {
        update(){
            setTask('');
            taskInputRef.current.blur();
        },
        variables: {
            projectId,
            name: task
        }
    })

    let projectMarkup;
    if(!getProject){
        projectMarkup = <p>Loading Project</p>
    } else {
        const { name, description, username, tasks, teammembers, createdAt } = getProject;

        projectMarkup = (
            <Grid>
                <Grid.Row>

                    <Grid.Column width={3}>
                        <Card>
                            <Image
                            src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png'
                            size='medium'
                            float='right'
                            />
                        </Card>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                                <Card.Meta>Project owned by {username}{user && user.username === username && " (That's you!)"}</Card.Meta>
                                <Card.Meta>Created {moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{description}</Card.Description>
                                
                                {user && user.username === username && (
                                    <>
                                    <ToggleButton user={user} project={getProject} />
                                    <Button
                                        style={{marginTop: 10}}
                                        as="div"
                                        color="orange"
                                        size="mini"
                                        onClick={() => console.log("Archive")}
                                    >
                                            Archive Project
                                    </Button>
                                    </>
                                )}
                            </Card.Content>
                        </Card>
                        {user && user.username === username && (
                        <Card fluid>
                            <Card.Content>
                            <Form>
                                <div className="ui action input fluid">
                                    <input
                                        type="text"
                                        placeholder="Add a new task!"
                                        name="task"
                                        value={task}
                                        onChange={event => setTask(event.target.value)}
                                        ref={taskInputRef}
                                    />
                                    <button 
                                        className="ui button yellow mini"
                                        disabled={task.trim() === ''}
                                        type="submit"
                                        onClick={createTask}
                                    >
                                            New Task
                                    </button>
                                </div>
                            </Form>
                            </Card.Content>
                        </Card>
                        )}
                        {tasks.map(task => (
                            <Card fluid key={task.id}>
                                <Card.Content>
                                    {user && user.username === username && (
                                    <Button
                                        as="div"
                                        color="yellow"
                                        size="small"
                                        floated='right'
                                        onClick={() => console.log("complete task")}
                                    >
                                        Complete
                                    </Button>
                                    )}
                                    <Card.Header>{task.name}</Card.Header>
                                    <Card.Meta>Unassigned Task</Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>

                    <Transition.Group>
                        <Grid.Column width={5}>
                            <TeamCard teammembers={teammembers} />
                        </Grid.Column>
                    </Transition.Group>
                            
                </Grid.Row>
            </Grid>
        )
    }
    return projectMarkup;
}

const CREATE_TASK_MUTATION = gql `
    mutation($projectId: ID!, $name: String!){
        createTask(projectId: $projectId, name: $name){
            id,
            tasks{
                id
                name
                description
                teammember
                createdAt
                username
            }
        }
    }
`

const FETCH_PROJECT_QUERY = gql `
    query($projectId: ID!){
        getProject(projectId: $projectId) {
            id
            name
            description
            createdAt
            username
            teammembers{
                username
            }
            tasks{
                id
                name
                username
            }
        }
    }
`

export default ProjectPage;