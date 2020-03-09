import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Sidenav, Nav, Icon } from 'rsuite';

const UserMenu = () => {
  const handleLogout = useStoreActions(actions => actions.user.logout);
  const userRole = useStoreState(state => state.user.role);
  const location = useLocation(null);

  return (
    <Sidenav.Body>
      <Nav activeKey={location.pathname}>
        <Link to="/">
          <Nav.Item
            componentClass="div"
            active={location.pathname === '/'}
            icon={<Icon icon="dashboard" />}
          >
            Dashboard
          </Nav.Item>
        </Link>
        {config.routes
          .filter(route => !route.roles || route.roles.includes(userRole))
          .map(route => (
            <Link to={route.endpoint} key={route.endpoint}>
              <Nav.Item
                componentClass="div"
                active={location.pathname.includes(route.endpoint)}
                icon={route.icon && <Icon icon={route.icon} />}
              >
                {route.name}
              </Nav.Item>
            </Link>
          ))}
        <Nav.Item componentClass="div" onClick={handleLogout}>
          Logout
        </Nav.Item>
      </Nav>
    </Sidenav.Body>
  );
};

export default UserMenu;
