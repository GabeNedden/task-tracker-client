import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, Container, Feed, Form, Grid, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import ToggleButton from '../components/ToggleButton';
import TeamModal from '../components/TeamModal';
import ProjectModal from '../components/ProjectModal';
import TaskModal from '../components/TaskModal';

function Account(props) {
    const { user } = useContext(AuthContext)
    const userId = props.match.params.userId;
    const { loading, data: { getMyProjects: projects } = {} } = useQuery(FETCH_MY_PROJECTS_QUERY);

    return (
        <Grid stackable centered>
            <Grid.Row className="page-title">
                {user.id === userId ? (
                    <>
                        <h1>Hello {user.username}</h1>
                        <p>{userId}</p>
                    </> 
                    ) : (
                        <>
                        <h1>Wait</h1>
                        <p>Something went wrong</p>
                    </> 
                    )}
            </Grid.Row>
        </Grid>
    )
}

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

export default Account;