import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Container, Icon, Menu, Segment, Sidebar, Visibility } from 'semantic-ui-react';
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
              style={{ minHeight: 10, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={isFixed ? 'top' : null}
                pointing={!isFixed}
                secondary={!isFixed}
                size='large'
              >
                {user ? 
                <Container>
                  <Menu.Item
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                  />
                  <Menu.Item
                    name='team'
                    active={activeItem === 'team'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/team'
                  />
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/contact'
                   />
                  
                  <Menu.Menu position='right'>
                  <Menu.Item
                    name={user.username}
                    active={activeItem === `/myaccount/${user.id}`}
                    as={Link}
                    to={`/myaccount/${user.id}`}
                  />
                    <Menu.Item
                      name='logout'
                      onClick={logout}
                      primary={!isFixed}
                    />
                  </Menu.Menu> 
                  </Container>
                  : 
                  <Container>
                  <Menu.Item
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                  > Home </Menu.Item>
                  <Menu.Item
                    name='team'
                    active={activeItem === 'team'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/team'
                  />
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/contact'
                   />

                  <Menu.Menu position='right'>
                    <Menu.Item
                      name='login'
                      active={activeItem === 'login'}
                      onClick={handleItemClick}
                      as={Link}
                      to='/login'

                    />
                      <Menu.Item
                        name='sign up'
                        active={activeItem === 'sign up'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/signup'
  
                        primary={isFixed}
                      />
                    </Menu.Menu>                  
                </Container>
                }
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

    const { user, logout } = useContext(AuthContext); 
    const pathname = window.location.pathname;
  
    const path = pathname === '/' ? 'projects' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);
  
    const handleItemClick = (e, { name }) => setActiveItem(name);
  
      const { children } = props
  
      return (
        <Media as={Sidebar.Pushable} at='mobile'>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
              onHide={handleSidebarHide}
              vertical
              visible={isSidebar}
            >
              {user ? 
                <div>
                  <Menu.Item
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                  />
                  <Menu.Item
                    name='team'
                    active={activeItem === 'team'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/team'
                  />
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/contact'
                   />

                  <Menu.Item
                    name={user.username}
                    active={activeItem === 'profile'}
                    as={Link}
                    to={`/myaccount/${user.id}`}
                  />
                    <Menu.Item
                      name='logout'
                      onClick={logout}
                    />
                  </div>
                  : 
                  <div>
                  <Menu.Item
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                  > Home </Menu.Item>
                  <Menu.Item
                    name='team'
                    active={activeItem === 'team'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/team'
                  />
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/contact'
                   />
                  <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/login'
                  />
                    <Menu.Item
                      name='sign up'
                      active={activeItem === 'sign up'}
                      onClick={handleItemClick}
                      as={Link}
                      to='/signup'
                    />                 
                </div>
                }
            </Sidebar>
  
            <Sidebar.Pusher dimmed={isSidebar}>
              <Segment

                textAlign='center'
                style={{ minHeight: 10, padding: '1em 0em' }}
                vertical
              >
                <Container>
                  <Menu pointing secondary size='large'>
                    <Menu.Item onClick={handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>

                    {user ? (
                      <Menu.Menu position='right'>
                      <Menu.Item
                    name={user.username}
                    active={activeItem === 'profile'}
                    as={Link}
                    to={`/myaccount/${user.id}`}
                  />
                    <Menu.Item
                      name='logout'
                      onClick={logout}
                    />
                      </Menu.Menu>
                    ) : (
                      <Menu.Menu position='right'>
                    <Menu.Item
                      name='login'
                      active={activeItem === 'login'}
                      onClick={handleItemClick}
                      as={Link}
                      to='/login'
                    />
                      <Menu.Item
                        name='sign up'
                        active={activeItem === 'sign up'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/signup'
                      />
                    </Menu.Menu>
                    )}
                    
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