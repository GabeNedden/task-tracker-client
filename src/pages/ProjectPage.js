import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Form, Grid, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import ToggleButton from '../components/ToggleButton';
import TeamCard from '../components/TeamCard';
import ProjectEditor from '../components/ProjectEditor';

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

                    <Grid.Column width={4}>
                        <Card>
                            <Image
                            src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png'
                            size='medium'
                            float='right'
                            />
                        </Card>
                        <Transition.Group>
                            <TeamCard teammembers={teammembers} />
                        </Transition.Group>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                                <Card.Meta>Project owned by {username}{user && user.username === username && " (That's you!)"}</Card.Meta>
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