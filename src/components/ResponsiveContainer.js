import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Container, Icon, Menu, Segment, Sidebar, Visibility } from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const DesktopContainer = (props) => {
  const [isFixed, setFixed] = useState(false);
  
  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)
  
  const { children } = props
  
      return (
        <Media greaterThan='mobile'>
          <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={isFixed ? 'top' : null}
                inverted={!isFixed}
                pointing={!isFixed}
                secondary={!isFixed}
                size='large'
              >
                <Container>
                  <Menu.Item as='a' active>
                    Home
                  </Menu.Item>
                  <Menu.Item as='a'>Work</Menu.Item>
                  <Menu.Item as='a'>Company</Menu.Item>
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted={!isFixed}>
                      Log in
                    </Button>
                    <Button as='a' inverted={!isFixed} primary={isFixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
              {children}
            </Segment>
          </Visibility>
        </Media>
      )
  }
  
  DesktopContainer.propTypes = {
    children: PropTypes.node,
  }

  const MobileContainer = (props) => {
    const [isSidebar, setSidebar] = useState(false)
  
    const handleSidebarHide = () => setSidebar(false);
    const handleToggle = () => setSidebar(true);
  
      const { children } = props
  
      return (
        <Media as={Sidebar.Pushable} at='mobile'>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
              inverted
              onHide={handleSidebarHide}
              vertical
              visible={isSidebar}
            >
              <Menu.Item as='a' active>
                Home
              </Menu.Item>
              <Menu.Item as='a'>Work</Menu.Item>
              <Menu.Item as='a'>Company</Menu.Item>
              <Menu.Item as='a'>Careers</Menu.Item>
              <Menu.Item as='a'>Log in</Menu.Item>
              <Menu.Item as='a'>Sign Up</Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher dimmed={isSidebar}>
              <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 350, padding: '1em 0em' }}
                vertical
              >
                <Container>
                  <Menu inverted pointing secondary size='large'>
                    <Menu.Item onClick={handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <Button as='a' inverted>
                        Log in
                      </Button>
                      <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Container>
              </Segment>
  
              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Media>
      )
    }
  
  MobileContainer.propTypes = {
    children: PropTypes.node,
  }

  const ResponsiveContainer = ({ children }) => (
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
  )
  
  ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }

  export default ResponsiveContainer