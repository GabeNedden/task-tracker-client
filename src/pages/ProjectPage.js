import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Feed, Form, Grid, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import ToggleButton from '../components/ToggleButton';
import ProjectEditor from '../components/ProjectEditor';
import RemoveTeam from '../components/RemoveTeam';

function ProjectPage(props){
    const projectId = props.match.params.projectId;
    const { user } = useContext(AuthContext);
    const taskInputRef = useRef("");
    const teamInputRef = useRef("");

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

    let projectMarkup;
    if(!getProject){
        projectMarkup = <p>Loading Project</p>
    } else {
        const { id, name, description, username, tasks, teammembers, createdAt } = getProject;

        projectMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
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
                                        color="grey"
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
                        <Transition.Group>
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
                        </Transition.Group>
                        
                        {user && user.username === username && (
                                <ProjectEditor user={user} project={getProject} />
                            )}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Card fluid>
                            <Image
                            src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png'
                            size='medium'
                            float='right'
                            />
                        </Card>
                        
                        {user && user.username === username && (
                        <Transition.Group>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>Team Members</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed>
                                    {teammembers.map(teammember => (
                                        <Feed.Event key={teammember.id}>
                                            <Feed.Label>
                                                <RemoveTeam projectId={id} teammemberId={teammember.id}/>
                                            </Feed.Label>
                                            <Feed.Content>
                                                {teammember.username}
                                            </Feed.Content>
                                        </Feed.Event>
                                    ))}
                                    <Feed.Event>
                                            <Feed.Label>
                                                <img 
                                                    alt={user} 
                                                    src='https://react.semantic-ui.com/images/avatar/small/laura.jpg' 
                                                    as="div"
                                                    color="orange"
                                                    type="submit"
                                                    onClick={addTeammember}
                                                    />
                                            </Feed.Label>
                                            <Feed.Content>
                                                <Form>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="New Teammember"
                                                            name="task"
                                                            value={team}
                                                            onChange={event => setTeam(event.target.value)}
                                                            ref={teamInputRef}
                                                        />
                                                    </div>
                                                </Form>
                                            </Feed.Content>
                                        </Feed.Event>
                                </Feed>
                            </Card.Content>
                        </Card>
                        </Transition.Group>
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
            id,
            teammembers{
                id
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
                id
                username
            }
            tasks{
                id
                name
            }
        }
    }
`

export default ProjectPage;