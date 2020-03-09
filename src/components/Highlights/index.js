import React from 'react';
import { Grid, Row, Col, Panel } from 'rsuite';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import useApi from '~/hooks/useApi';
import Loader from '~/components/Loader';

const CardImage = styled.div`
  background-size: cover;
  background-image: url(${props => props.src});
  background-position: center center;
  height: 125px;
`;

const Card = styled(Panel).attrs(() => ({
  shaded: true,
  bordered: true,
  bodyFill: true,
}))`
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.06);
  }

  .rs-panel-heading {
    padding-bottom: 0;
  }
`;

const LoaderWrapper = styled.div`
  height: 200px;
  position: relative;
`;

const Wrapper = styled(Grid).attrs(() => ({ fluid: true }))`
  margin: 20px 0;
  min-height: 100px;
`;

const apiPath =
  '/events?general={"isHighlight":true}&limit=5&fields=["general.title","general.subtitle","media.images"]';

export default withRouter(({ history }) => {
  const { data } = useApi(apiPath);

  if (!data || !data.data) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  const onCardClick = id => {
    history.push(`events/${id}`);
  };

  return (
    <Wrapper>
      <h3>Aktuelle Highlights</h3>
      <Row gutter={10}>
        {data.data.map(d => (
          <Col xs={12} md={8} key={d._id}>
            <Card onClick={() => onCardClick(d._id)}>
              <CardImage src={d.media.images[0].url} alt={d.title} />
              <Panel header={d.general.title} style={{ height: 120 }}>
                <p>
                  <small>{d.general.subtitle}</small>
                </p>
              </Panel>
            </Card>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
});
