import React from 'react';
import { withRouter } from 'react-router-dom';

import EditView from '~/components/EditView';
import PageWrapper from './PageWrapper';

const ApiCreatePage = ({ routeConfig }) => {
  const data = {};
  const endpoint = `${routeConfig.endpoint}`;
  const schemaEndpoint = `${routeConfig.endpoint}/schema`;

  return (
    <PageWrapper title={routeConfig.name}>
      <EditView
        endpoint={endpoint}
        schemaEndpoint={schemaEndpoint}
        data={data}
        create
        routeConfig={routeConfig}
      />
    </PageWrapper>
  );
};

export default withRouter(ApiCreatePage);
