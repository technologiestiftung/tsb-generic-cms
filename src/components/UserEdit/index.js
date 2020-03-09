import React from 'react';
import EditView from '~/components/EditView';

const UserEdit = ({
  endpoint,
  schemaEndpoint,
  data,
  create = false,
  routeConfig,
}) => {
  return (
    <>
      {data && (
        <div style={{ marginBottom: 10 }}>
          {data.email} | {data.verified ? 'Verfiziert' : 'Nicht verifiziert'}
        </div>
      )}

      <EditView
        endpoint={endpoint}
        schemaEndpoint={schemaEndpoint}
        data={data}
        create={create}
        authenticate
        routeConfig={routeConfig}
      />
    </>
  );
};

export default UserEdit;
