import React, { useEffect, useState } from 'react';
import {Button} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

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
            <Button as={Link} to='/' floated='right' size="mini" color="grey" onClick={completeProject}>
                Complete
            </Button>
        ) : (
            <Button floated='right' size="mini" color="grey" onClick={completeProject} basic>
                Re-Open
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