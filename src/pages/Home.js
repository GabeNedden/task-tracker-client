import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Dimmer, Grid, Image, Loader, Segment, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, data: { getMyProjects: projects } = {} } = useQuery(FETCH_MY_PROJECTS_QUERY);
    
    return (
        <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 400, padding: '1em 0em' }}
              vertical
            >
        <Grid stackable centered>
            <Grid.Row className="page-title">
                {user ? (
                    <>
                        <h1>Projects</h1>
                        <p></p>
                    </> 
                    ) : (
                        <>
                        <h1>Home</h1>
                        <p>Sign in to get started</p>
                    </> 
                    )}
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column width={3}>
                        <ProjectForm />
                    </Grid.Column>
                )}
            {loading && user ? (
                <div>
                <Segment>
                  <Dimmer active>
                    <Loader indeterminate>Connecting to Database</Loader>
                  </Dimmer>
            
                  <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>
              </div>
            ) : (
                <Transition.Group>
                    {projects && projects.map(project => (
                    <Grid.Column width={3} key={project.id} style={{ marginBottom: 30 }}>
                        <ProjectCard project={project}/>
                    </Grid.Column>
                ))}
                </Transition.Group>
            )}

            </Grid.Row>
        </Grid>
        </Segment>
    );
};

const FETCH_MY_PROJECTS_QUERY = gql `
    query{
        getMyProjects{
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

export default Home;