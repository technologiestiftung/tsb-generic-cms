import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidenav, Nav } from 'rsuite';

const routes = [
  {
    to: '/login',
    label: 'Login',
  },
  {
    to: '/signup',
    label: 'Signup',
  },
];

const LoggedOutMenu = () => {
  const location = useLocation(null);

  return (
    <Sidenav.Body>
      <Nav>
        {routes.map(route => (
          <Link to={route.to} key={route.to}>
            <Nav.Item
              componentClass="div"
              active={location.pathname.includes(route.to)}
            >
              {route.label}
            </Nav.Item>
          </Link>
        ))}
      </Nav>
    </Sidenav.Body>
  );
};

export default LoggedOutMenu;
