import React from 'react';
import { Container, Header, Grid, List, Segment } from 'semantic-ui-react';

//force footer to bottom of page?

function Footer() {
    return (
        <Segment vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header as='h4' content='About' />
              <List link>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h4' content='Services' />
              <List link>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite Movies</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4'>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
    )
}

export default Footer;