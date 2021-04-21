import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Button, Container, Icon, Menu, Segment, Sidebar, Visibility } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const DesktopContainer = (props) => {
  const { user, logout } = useContext(AuthContext); 
  const pathname = window.location.pathname;
  
  const path = pathname === '/' ? 'projects' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
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
              style={{ minHeight: 10, padding: '1em 0em' }}
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
                  <Menu.Item
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                  />
                  <Menu.Item as='a'>Company</Menu.Item>
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item as='a'>Contact</Menu.Item>

                  {user ? 
                  <Menu.Menu position='right'>
                  <Menu.Item
                    name={user.username}
                    active={activeItem === 'profile'}
                    as={Link}
                    to='/'
                    inverted={!isFixed}
                  />
                    <Menu.Item
                      name='logout'
                      onClick={logout}
                      inverted={!isFixed}
                      primary={!isFixed}
                    />
                  </Menu.Menu> 
                  : 
                  <Menu.Menu position='right'>
                    <Menu.Item
                      name='login'
                      active={activeItem === 'login'}
                      onClick={handleItemClick}
                      as={Link}
                      to='/login'
                      inverted={!isFixed}
                    />
                      <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/register'
                        inverted={!isFixed}
                        primary={isFixed}
                      />
                    </Menu.Menu>
                    }
                  
                </Container>
              </Menu>
            </Segment>
          </Visibility>
          {children}
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
                style={{ minHeight: 10, padding: '1em 0em' }}
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