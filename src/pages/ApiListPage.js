import React, { useState } from 'react';
import _get from 'lodash.get';
import { Button, Icon } from 'rsuite';
import { Link } from 'react-router-dom';

import ListView from '~/components/ListView';
import Search from '~/components/Search';
import Flex from '~/components/Flex';
import PageWrapper from './PageWrapper';

const ApiListPage = ({ routeConfig }) => {
  const [searchValue, setSearchValue] = useState('');
  const { endpoint, authenticate = true, params = {} } = routeConfig;

  const fields = routeConfig.list.columns.map(col => col.path);
  const columns = routeConfig.list.columns.map(col => ({
    ...col,
    accessor: row => _get(row, col.path),
  }));
  const createLink = routeConfig.createRoute
    ? routeConfig.createRoute
    : `${routeConfig.endpoint}/create`;

  if (searchValue !== '') {
    params.q = searchValue;
  }

  return (
    <PageWrapper title={routeConfig.name}>
      <Flex justifyContent="space-between" style={{ margin: '10px 0' }}>
        {routeConfig.createable && (
          <Link to={createLink}>
            <Button appearance="primary">
              <Icon icon="plus" /> Neu
            </Button>
          </Link>
        )}
        {routeConfig.searchable && (
          <Search onChange={searchValue => setSearchValue(searchValue)} />
        )}
      </Flex>
      <ListView
        endpoint={endpoint}
        fields={fields}
        columns={columns}
        authenticate={authenticate}
        params={params}
      />
    </PageWrapper>
  );
};

export default ApiListPage;
