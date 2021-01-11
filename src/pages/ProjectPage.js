import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, Form, Grid, Image } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';

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
        const { name, description, username, tasks, createdAt } = getProject;

        projectMarkup = (
            <Grid columns="12">
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Image
                         src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png'
                         size='medium'
                         float='right'
                         />

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                                <Card.Meta>Project owned by {username}</Card.Meta>
                                <Card.Meta>Created {moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{description}</Card.Description>
                                <div>testing</div>
                            </Card.Content>
                        </Card>
                        
                        {user && user.username === username && (
                        <Card fluid>
                            <Card.Content>
                            <p>Create a Task</p>
                            <Form>
                                <div className="ui action input fluid">
                                    <input  type="text"
                                            placeholder="Name your task"
                                            name="task"
                                            value={task}
                                            onChange={event => setTask(event.target.value)}
                                            ref={taskInputRef}
                                            />
                                    <button className="ui button yellow"
                                            disabled={task.trim() === ''}
                                            type="submit"
                                            onClick={createTask}
                                            >
                                                Submit
                                            </button>
                                </div>
                            </Form>
                            </Card.Content>
                        </Card>
                        )}

                        {tasks.map(task => (
                            <Card fluid key={task.id}>
                                <Card.Content>
                                    <Card.Header>{task.name}</Card.Header>
                                    <Card.Meta>Unassigned Task</Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
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
            tasks{
                id
                name
                username
            }
        }
    }
`

export default ProjectPage;