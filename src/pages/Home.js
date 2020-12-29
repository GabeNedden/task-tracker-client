import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import { FETCH_PROJECTS_QUERY } from '../utilities/graphql';

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, data: { getProjects: projects } = {} } = useQuery(FETCH_PROJECTS_QUERY);

    console.log(projects)
    
    return (
        <Grid centered columns={5}>
            <Grid.Row className="page-title">
                <h1>Projects</h1>
                {!user && <p>Please register to create projects</p>}
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <ProjectForm />
                    </Grid.Column>
                )}
            {loading ? (
                <h1>Loading Projects...</h1>
            ) : (
                <Transition.Group>
                    {projects && projects.map(project => (
                    <Grid.Column key={project.id} style={{ marginBottom: 30 }}>
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