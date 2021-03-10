import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Feed, Form, Grid, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import ToggleButton from '../components/ToggleButton';
import ProjectEditor from '../components/ProjectEditor';

function ProjectPage(props){
    const projectId = props.match.params.projectId;
    const { user } = useContext(AuthContext);
    const taskInputRef = useRef(null);
    const teamInputRef = useRef(null);

    const [task, setTask] = useState('');
    const [team, setTeam] = useState('');

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

    const [removeTeammember] = useMutation(REMOVE_TEAMMEMBER_MUTATION, {
        variables: {
            projectId,

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

                    <Grid.Column width={4}>
                        <Card>
                            <Image
                            src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png'
                            size='medium'
                            float='right'
                            />
                        </Card>
                        <Transition.Group>
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
                                                onClick={removeTeammember}
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
                                                            placeholder="New Teammember!!"
                                                            name="task"
                                                            value={team}
                                                            onChange={event => setTeam(event.target.value)}
                                                            ref={teamInputRef}
                                                        />
                                                        <Button circular
                                                            icon="add"
                                                            as="div"
                                                            color="orange"
                                                            type="submit"
                                                            onClick={addTeammember}
                                                        >
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Feed.Content>
                                        </Feed.Event>
                                </Feed>
                            </Card.Content>
                        </Card>
                        </Transition.Group>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                                <Card.Meta>Created {moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description floated='left'>{description}</Card.Description>
                                
                                {user && user.username === username && (
                                    <>
                                    <ToggleButton user={user} project={getProject} />
                                    <Button
                                        style={{marginTop: 10}}
                                        floated='right'
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
                                        className="ui button grey mini"
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
                                        color="grey"
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
                        {user && user.username === username && (
                                <ProjectEditor user={user} project={getProject} />
                            )}
                    </Grid.Column>
                            
                </Grid.Row>
            </Grid>
        )
    }
    return projectMarkup;
}

const ADD_TEAMMEMBER_MUTATION = gql `
    mutation($projectId: ID!, $teammember: String!){
        addTeammember(projectId: $projectId, teammember: $teammember){
            id
            teammembers{
                username
            }
        }
    }
`

const CREATE_TASK_MUTATION = gql `
    mutation($projectId: ID!, $name: String!){
        createTask(projectId: $projectId, name: $name){
            id,
            tasks{
                id
                name
                description
                createdAt
                username
            }
        }
    }
`

const REMOVE_TEAMMEMBER_MUTATION = gql `
    mutation($projectId: ID!, $teammemberId: ID!){
        removeTeammember(projectId: $projectId, teammemberId: $teammemberId) {
            id
            teammembers{
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
            status
            privacy
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