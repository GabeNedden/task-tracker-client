import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Container, Feed, Form, Grid, Image, Segment, Transition } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import ToggleButton from '../components/ToggleButton';
import RemoveTeam from '../components/RemoveTeam';
import TeamModal from '../components/TeamModal';
import ProjectModal from '../components/ProjectModal';

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
            <Segment
              inverted
              style={{ minHeight: 100, padding: '1em 0em' }}
              vertical
            >
            <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header style={{color: "white"}}>{name}</Card.Header>
                                <Card.Meta style={{color: "white"}}>Created {moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description style={{color: "white"}} floated='left'>{description}</Card.Description>
                                
                                {user && user.username === username && (
                                    <>
                                    <ProjectModal project={getProject}/>
                                    <ToggleButton user={user} project={getProject} />
                                    <Button
                                        style={{marginTop: 10}}
                                        floated='right'
                                        as="div"
                                        color="grey"
                                        size="mini"
                                        onClick={() => console.log("Archive")}
                                    >
                                            Archive
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
                                        <Card.Header style={{color: "white"}}>{task.name}</Card.Header>
                                        <Card.Meta style={{color: "white"}}>Unassigned Task</Card.Meta>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Transition.Group>

                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Card fluid>
                            <Image
                            src='https://ic.pics.livejournal.com/z3000/8983861/2025363/2025363_original.jpg'
                            //src='https://images.unsplash.com/photo-1493673272479-a20888bcee10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
                            float='right'
                            />
                        </Card>
                        
                        {user && user.username === username && (
                        <Card fluid>
                            <Card.Content>
                                <TeamModal user={user} project={getProject}/>
                                <Card.Header style={{color: "white", marginTop: 5}}>Team Members</Card.Header>
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
                        )}
                    </Grid.Column>
                            
                </Grid.Row>
            </Grid>
            </Container>
            </Segment>
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