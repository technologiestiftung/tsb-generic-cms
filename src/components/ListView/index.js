/* eslint-disable no-alert */
import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import useApi from '~/hooks/useApi';
import Table from '~/components/Table';
import { remove } from '~/services/DataApi';

const ListView = ({
  endpoint,
  columns,
  history,
  authenticate,
  params = {},
}) => {
  const initialPage = { index: 0, size: 10, total: 1 };
  const [page, setPage] = useState(initialPage);
  const [sort, setSort] = useState({ sortColumn: '', sortType: 'descend' });
  const [tableData, setTableData] = useState([]);
  const userRole = useStoreState(state => state.user.role);

  const { data } = useApi(endpoint, {
    authenticate,
    params: {
      // fields,
      limit: page.size,
      skip: page.index * page.size,
      ...params,
      sort: sort.sortColumn,
      order: sort.sortType,
    },
  });

  useEffect(() => {
    if (data && data.data) {
      setTableData(data.data);
      setPage(page => ({ ...page, total: data.count }));
    }
  }, [data]);

  useEffect(() => {
    setPage(page => ({ ...page, index: 0 }));
  }, [params.q]);

  const onPageChange = useCallback(({ pageSize, pageIndex }) => {
    setPage(page => ({ ...page, index: pageIndex, size: pageSize }));
  }, []);

  const pageCount = Math.ceil(page.total / page.size);

  const onRowClick = (id = null) => {
    if (!id) {
      return false;
    }

    return history.push(`${endpoint}/${id}`);
  };

  const onRowDelete = (id = null) => {
    if (!id) {
      return false;
    }

    const isConfirmed = window.confirm(
      'Wollen Sie dieses Element wirklich löschen?'
    );

    if (isConfirmed) {
      remove(`${endpoint}/${id}`);
      setTableData(data => data.filter(d => d.id !== id));
    }

    return true;
  };

  const onSortChange = (sortColumn, sortType) =>
    setSort({
      sortColumn,
      sortType: sortType === 'asc' ? 'ascend' : 'descend',
    });

  return (
    <div>
      <Table
        loading={!data}
        data={tableData}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        onRowClick={onRowClick}
        onRowDelete={onRowDelete}
        pageCount={pageCount}
        pageSize={page.size}
        pageIndex={page.index}
        sortColumn={sort.sortColumn}
        sortType={sort.sortType}
        total={page.total}
        columns={columns}
        deleteable={userRole === 'ADMIN'}
      />
    </div>
  );
};

export default withRouter(ListView);
