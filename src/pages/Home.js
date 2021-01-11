import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Dimmer, Grid, Image, Loader, Segment, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import { FETCH_PROJECTS_QUERY } from '../utilities/graphql';

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, data: { getProjects: projects } = {} } = useQuery(FETCH_PROJECTS_QUERY);

    console.log(projects)
    
    return (
        <Grid stackable centered>
            <Grid.Row className="page-title">
                {!user && !loading && (
                    <>
                        <h1>Projects</h1>
                        <p>Please register to start a project</p>
                    </> 
                    )}
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column width={3}>
                        <ProjectForm />
                    </Grid.Column>
                )}
            {loading ? (
                <div>
                <Segment>
                  <Dimmer inverted active>
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
    );
};

export default Home;