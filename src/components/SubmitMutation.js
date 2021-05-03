import React, { useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'semantic-ui-react';

function SubmitMutation(props){

    const [addTeammember] = useMutation(ADD_TEAMMEMBER_MUTATION, {
        update(){
            teamInputRef.current.blur();
        },
        variables: {
            projectId,
            teammemberId: data
        }
    })

    const onSubmit = (event) => {
        event.preventDefault();
        addTeammember();
    }

    return (
        <Button size="mini" type="submit" color="grey">
            Add Team
        </Button>
    )

}

const ADD_TEAMMEMBER_MUTATION = gql `
    mutation($projectId: ID!, $teammemberId: ID!){
        addTeammember(projectId: $projectId, teammemberId: $teammemberId){
            id
            name
            teammembers{
              id
              username
            }
        }
    }
`

export default SubmitMutation;