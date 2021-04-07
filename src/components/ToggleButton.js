import React, { useEffect, useState } from 'react';
import {Button} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function ToggleButton({ user, project: { id, status } }){
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if(user && status === "Open"){
            setOpen(true)
        } else setOpen(false)
    }, [user, status]);

    const [completeProject] = useMutation(COMPLETE_PROJECT_MUTATION, {
        variables: { projectId: id}
    });

    const completeButton = user &&
        open ? (
            <Button floated='right' style={{marginTop: 10}} size="mini" color="grey" onClick={completeProject}>
                Complete Project
            </Button>
        ) : (
            <Button floated='right' style={{marginTop: 10}} size="mini" color="grey" onClick={completeProject} basic>
                Re-Open Project
            </Button>
        )

    return(
        <div>
            {completeButton}
        </div>
    )
}

const COMPLETE_PROJECT_MUTATION = gql`
    mutation completeProject($projectId: ID!){
        completeProject(projectId: $projectId){
            id
            status
        }
    }
`;

export default ToggleButton