import React from 'react';
import { Button, Grid, Popup } from 'semantic-ui-react';
import FScreen from '../components/FScreen';

const Matrix = () => {
  
    return (
      <Popup wide trigger={<Button content='Are you the one?' />} on='click'>
          <Grid divided columns='equal'>
            <Grid.Column>
              <Popup
                trigger={<Button><Button color='blue' content='Blue Pill' fluid /></Button>}
                content='The story ends. You wake up in your bed and believe whatever you want to believe.'
                position='top center'
                size='medium'
              />
            </Grid.Column>
            
            <Grid.Column>
              <Popup
                trigger={<Button><FScreen /></Button>}
                content='Stay in Wonderland, and I show you how deep the rabbit hole goes.'
                position='top center'
                size='medium'
              />
            </Grid.Column>
          </Grid>
        </Popup>
    );
};



export default Matrix;