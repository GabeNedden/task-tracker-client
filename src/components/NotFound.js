import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Segment inverted vertical style={{ minHeight: 400, padding: '1em 0em' }}>
            <Grid stackable centered>
                <Grid.Row className="page-title">
                    <h1>404 : Page Not Found</h1>
                    <p>If you believe this is an error, please contact the administrator</p>
                    <Button 
                        as={Link}
                        to='/contact'
                    > Contact
                    </Button>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default NotFound;