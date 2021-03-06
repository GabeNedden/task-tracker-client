import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext); 
  const pathname = window.location.pathname;
  
  const path = pathname === '/' ? 'projects' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu stackable pointing secondary size='huge'>
          <Menu.Item
            name='projects'
            active={activeItem === 'projects'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          
          <Menu.Menu position='right'>
          <Menu.Item
            name={user.username}
            active={activeItem === 'profile'}
            as={Link}
            to='/'
          />
            <Menu.Item
              name='logout'
              onClick={logout}
            />
          </Menu.Menu>
        </Menu>
  ) : (
    <Menu pointing secondary size='massive'>
          <Menu.Item
            name='projects'
            active={activeItem === 'projects'}
            onClick={handleItemClick}
            as={Link}
            to='/'
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
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>
  )

    return menuBar 

  }

  export default MenuBar;
