import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function RemoveTeam({ projectId, teammemberId }){

    const teamInputRef = useRef(null);

    const [removeTeammember] = useMutation(REMOVE_TEAMMEMBER_MUTATION, {
        update(){
        },
        variables: {
            projectId,
            teammemberId
        }
    });

return (
    <img 
        alt="user" 
        src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' 
        as="div"
        color="orange"
        floated="right"
        onClick={removeTeammember}
        onMouseOver={e => (e.currentTarget.src = "https://i.pinimg.com/originals/38/72/5c/38725c4d7108aa08e385d413afd1690f.png")}
        onMouseOut={e => (e.currentTarget.src = "https://react.semantic-ui.com/images/avatar/small/jenny.jpg")}
        ref={teamInputRef}
    />
)
}

const REMOVE_TEAMMEMBER_MUTATION = gql `
    mutation($projectId: ID!, $teammemberId: ID!){
        removeTeammember(projectId: $projectId, teammemberId: $teammemberId) {
            id
            teammembers{
                username
            }
        }
    }
`

export default RemoveTeam;