import React from 'react';
import { withRouter } from 'react-router-dom';

import useApi from '~/hooks/useApi';

import EditView from '~/components/EditView';
import ChangeView from '~/components/ChangeView';
import UserEdit from '~/components/UserEdit';
import PageWrapper from './PageWrapper';

const editViews = {
  default: EditView,
  UserEdit,
  ChangeView,
};

function getEditComponent(config) {
  if (!config.editComponent) {
    return editViews.default;
  }

  return editViews[config.editComponent]
    ? editViews[config.editComponent]
    : editViews.default;
}

const ApiEditPage = ({ routeConfig, match }) => {
  const { id } = match.params;
  const endpoint = `${routeConfig.endpoint}/${id}?fields=[]&pastdates=true`;
  const schemaEndpoint = `${routeConfig.endpoint}/schema`;
  const { data } = useApi(endpoint, { authenticate: routeConfig.authenticate });
  const EditComponent = getEditComponent(routeConfig);

  return (
    <PageWrapper title={routeConfig.name}>
      <EditComponent
        endpoint={endpoint}
        schemaEndpoint={schemaEndpoint}
        data={data}
        routeConfig={routeConfig}
      />
    </PageWrapper>
  );
};

export default withRouter(ApiEditPage);
