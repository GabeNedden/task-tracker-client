import React, { useContext } from 'react';
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

function Account(props) {
    const { user } = useContext(AuthContext)
    const userId = props.match.params.userId;
    // const { loading, data: { getMyProjects: projects } = {} } = useQuery(FETCH_MY_PROJECTS_QUERY);

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

// const FETCH_MY_PROJECTS_QUERY = gql `
//     query{
//         getMyProjects{
//             id
//             name
//             description
//             status
//             privacy
//             createdAt
//             username
//             teammembers{
//                 id
//                 username
//             }
//             tasks{
//                 id
//                 name
//             }
//         }
//     }
// `

export default Account;