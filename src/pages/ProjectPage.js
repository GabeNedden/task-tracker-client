import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card, Grid, Image } from 'semantic-ui-react';
import moment from 'moment';

function ProjectPage(props){
    const projectId = props.match.params.projectId;

    const {
        data: { getProject } = {}
      } = useQuery(FETCH_PROJECT_QUERY, {
        variables: {
          projectId
        }
      });

    let projectMarkup;
    if(!getProject){
        projectMarkup = <p>Loading Project</p>
    } else {
        const { name, description, createdAt } = getProject;

        projectMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                         src='https://icons-for-free.com/iconfiles/png/512/desk+furniture+lamp+office+table+work+icon-1320185905879312737.png'
                         size='small'
                         float='right'
                         />

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{description}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return projectMarkup;
}

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
                username
            }
        }
    }
`

export default ProjectPage;