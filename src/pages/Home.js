import React from 'react';
import { ButtonToolbar, IconButton, Icon } from 'rsuite';
import { useStoreState } from 'easy-peasy';
import styled from 'styled-components';

import PageWrapper from './PageWrapper';
import Highlights from '~/components/Highlights';

const HomeDescription = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
`;

const Card = styled.div`
  width: 33%;
  padding: 10px;
`;

const CardBody = styled.div`
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06), 0 4px 4px rgba(0, 0, 0, 0.12);
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`;

const CardHeadline = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const RouteCard = ({ route }) => (
  <Card>
    <CardBody>
      <CardHeadline>
        {route.icon && <Icon style={{ marginRight: 5 }} icon={route.icon} />}{' '}
        {route.name}
      </CardHeadline>
      {route.description && <div>{route.description}</div>}
      <ButtonToolbar style={{ marginTop: 'auto', paddingTop: 10 }}>
        <a href={route.endpoint}>
          <IconButton size="sm" color="blue" icon={<Icon icon="list" />}>
            alle anzeigen
          </IconButton>
        </a>
        {route.createable && (
          <a
            href={
              route.createRoute
                ? `/${route.createRoute}`
                : `${route.endpoint}/create`
            }
          >
            <IconButton size="sm" color="green" icon={<Icon icon="plus" />}>
              neu erstellen
            </IconButton>
          </a>
        )}
      </ButtonToolbar>
    </CardBody>
  </Card>
);

const Home = () => {
  const userRole = useStoreState(state => state.user.role);
  const isAdmin = userRole === 'ADMIN';

  return (
    <PageWrapper title="Dashboard">
      <HomeDescription>
        Hier kannst Du Veranstaltungen, Veranstaltungsorte und Institutionen
        anlegen und bearbeiten.
      </HomeDescription>
      <CardGrid>
        {config.routes
          .filter(route => !route.roles || route.roles.includes(userRole))
          .map(route => (
            <RouteCard key={route.name} route={route} />
          ))}
      </CardGrid>
      {isAdmin && <Highlights />}
    </PageWrapper>
  );
};

export default Home;
