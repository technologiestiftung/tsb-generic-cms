/* eslint-disable react/no-danger,react/jsx-curly-newline */
import React from 'react';
import { Table, Icon, IconButton, ButtonToolbar } from 'rsuite';
import _get from 'lodash.get';
import { format } from 'date-fns';

const { Column, HeaderCell, Cell, Pagination } = Table;

const TableView = ({
  data = [],
  columns,
  onPageChange,
  onSortChange,
  sortColumn,
  sortType,
  pageSize,
  pageIndex,
  total,
  loading,
  onRowClick,
  onRowDelete,
  deleteable,
}) => {
  return (
    <div>
      <Table
        loading={loading}
        onSortColumn={onSortChange}
        sortColumn={sortColumn}
        sortType={sortType === 'ascend' ? 'asc' : 'desc'}
        autoHeight
        data={data}
      >
        {columns.map(col => (
          <Column flexGrow={1} align="left" fixed sortable key={col.path}>
            <HeaderCell>{col.label}</HeaderCell>
            <Cell dataKey={col.sortKey || col.path}>
              {rowData => {
                const cellData = _get(rowData, col.path);

                if (typeof cellData === 'boolean') {
                  return cellData ? 'Ja' : 'Nein';
                }

                if (
                  col.dataType === 'date' &&
                  typeof cellData !== 'undefined'
                ) {
                  return format(new Date(cellData), 'dd.MM.yyyy');
                }

                return <span dangerouslySetInnerHTML={{ __html: cellData }} />;
              }}
            </Cell>
          </Column>
        ))}
        <Column flexGrow={1} align="left" fixed>
          <HeaderCell>Aktionen</HeaderCell>
          <Cell>
            {rowData => (
              <ButtonToolbar>
                <IconButton
                  onClick={() => onRowClick(rowData.id)}
                  icon={<Icon icon="pencil" />}
                  size="xs"
                />
                {deleteable && (
                  <IconButton
                    onClick={() => onRowDelete(rowData.id)}
                    icon={<Icon icon="trash" />}
                    size="xs"
                  />
                )}
              </ButtonToolbar>
            )}
          </Cell>
        </Column>
      </Table>
      <Pagination
        onChangeLength={pageSize => onPageChange({ pageSize, pageIndex })}
        onChangePage={pageIndex =>
          onPageChange({ pageSize, pageIndex: pageIndex - 1 })
        }
        maxButtons={5}
        activePage={pageIndex + 1}
        total={total}
        displayLength={pageSize}
        lengthMenu={[
          { label: '10', value: 10 },
          { label: '20', value: 20 },
          { label: '30', value: 30 },
        ]}
      />
    </div>
  );
};

export default TableView;
