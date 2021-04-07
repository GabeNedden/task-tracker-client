import gql from 'graphql-tag';

export const FETCH_PROJECTS_QUERY = gql`
    {
        getProjects{
        id
        name
        description
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
            createdAt
            username
            comments{
                id
                body
                username
                createdAt
            }
            
        }
  }
    }
`