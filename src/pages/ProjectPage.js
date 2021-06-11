import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, Container, Feed, Form, Grid, Header, Image, List, Transition } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import TeamModal from '../components/TeamModal';
import ProjectModal from '../components/ProjectModal';
import TaskModal from '../components/TaskModal';

function ProjectPage(props){
    const projectId = props.match.params.projectId;
    const { user } = useContext(AuthContext);
    const taskInputRef = useRef("");

    const [task, setTask] = useState('');

    const { data: { getProject } = {} } = useQuery(FETCH_PROJECT_QUERY, { variables: { projectId }});

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
        const { name, description, status, username, privacy, tasks, teammembers, createdAt } = getProject;


        projectMarkup = (
            <Container>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                                <Card.Meta>Created {moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Meta>Project {status}</Card.Meta>
                                <Card.Description>{description}</Card.Description>
                                
                                {user && user.username === username && (
                                    <ProjectModal user={user} project={getProject}/>
                                )}
                            </Card.Content>
                        </Card>
                        {user && user.username === username && (
                            <>
                            <Header>Add a Task to your ongoing Project</Header>
                            <Form>
                                <div className="ui action input fluid">
                                    <input
                                        type="text"
                                        placeholder="Name your task"
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
                        </>
                        )}
                        <Header>Unassigned Tasks</Header>
                        <Transition.Group
                            as={List}
                            duration={200}
                            animated
                            relaxed='very'
                            divided
                            size='large'
                            verticalAlign='middle'
                            >
                            {tasks.filter(task => task.status !== "Complete").map(task => (
                                <List.Item key={task.id}>
                                <Image avatar src={'https://react.semantic-ui.com/images/avatar/small/christian.jpg'} />
                                <List.Content header={task.name} />
                                <TaskModal project={getProject} task={task}/>
                              </List.Item>
                            ))}
                        </Transition.Group>

                        {tasks.filter(task => task.status === "Complete").length > 0 && (
                            <Header>Completed Tasks</Header>
                        )}
                        <Transition.Group
                            as={List}
                            duration={200}
                            animated
                            relaxed='very'
                            divided
                            size='large'
                            verticalAlign='middle'
                            >
                            {tasks.filter(task => task.status === "Complete").map(task => (
                                <List.Item key={task.id}>
                                <Image avatar src={'https://react.semantic-ui.com/images/avatar/small/christian.jpg'} />
                                <List.Content header={task.name} />
                                <TaskModal project={getProject} task={task}/>
                              </List.Item>
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
                        
                        {user && privacy === "Off" && (
                        <Card fluid>
                            <Card.Content>
                                <TeamModal project={getProject} teammembers={teammembers}/>
                                <Card.Header style={{marginTop: 5}}>Team Members</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed>
                                    {teammembers.map(teammember => (
                                        <Feed.Event key={teammember.id}>
                                            <Feed.Label image={"https://react.semantic-ui.com/images/avatar/small/jenny.jpg"} />
                                            <Feed.Content>
                                                {teammember.username}
                                            </Feed.Content>
                                        </Feed.Event>
                                    ))}
                                </Feed>
                            </Card.Content>
                        </Card>
                        )}
                    </Grid.Column>
                            
                </Grid.Row>
            </Grid>
            </Container>
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
                role
            }
            tasks{
                id
                name
                description
                status

            }
        }
    }
`

export default ProjectPage;