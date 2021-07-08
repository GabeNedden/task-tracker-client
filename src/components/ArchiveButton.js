import React, { useEffect, useState } from 'react';
import {Button} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

function ArchiveButton({ user, project: { id, status } }){
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if(user && status !== "Archived"){
            setOpen(true)
        } else setOpen(false)
    }, [user, status]);

    const [archiveProject] = useMutation(ARCHIVE_PROJECT_MUTATION, {
        variables: { projectId: id}
    });

    const renderButton = user &&
        open ? (
            <Button as={Link} to='/' floated='right' size="mini" color="grey" onClick={archiveProject}>
                Archive
            </Button>
        ) : (
            <Button floated='right' size="mini" color="grey" onClick={archiveProject} basic>
                Re-Open
            </Button>
        )

    return(
        <div>
            {renderButton}
        </div>
    )
}

const ARCHIVE_PROJECT_MUTATION = gql`
    mutation archiveProject($projectId: ID!){
        archiveProject(projectId: $projectId){
            id
            status
        }
    }
`;

export default ArchiveButton