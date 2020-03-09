/* eslint-disable no-alert */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Button, PanelGroup, Notification, Icon } from 'rsuite';
import { Formik, Form } from 'formik';

import { parseSchema } from '~/services/utils';
import useApi from '~/hooks/useApi';
import FormFields from '~/components/Forms';
import Loader from '~/components/Loader';
import StickyToolbar from '~/components/StickyToolbar';

import {
  create as apiCreate,
  update as apiUpdate,
  remove as apiRemove,
} from '~/services/DataApi';

const EditView = ({
  endpoint,
  schemaEndpoint,
  history,
  data,
  create = false,
  authenticate = false,
  routeConfig,
}) => {
  const { data: schema } = useApi(schemaEndpoint, { authenticate });
  const [isLoading, setLoading] = useState(false);
  const userRole = useStoreState(state => state.user.role);

  if (!data || !schema) {
    return <Loader />;
  }

  const [formConfig, formData] = parseSchema(schema, data);

  const handleCreate = async data => {
    try {
      const response = await apiCreate(endpoint, data);

      if (response.isChange) {
        history.push('/change-success');
      } else if (response.id) {
        history.push(`${endpoint}/${response.id}`);
      }
      return response;
    } catch (err) {
      return {
        error: true,
        message: 'Ein unbekannter Fehler ist aufgetreten.',
      };
    }
  };

  const handleUpdate = async data => {
    try {
      const response = await apiUpdate(endpoint, data);
      const updateResponse = await response.json();

      if (updateResponse.isChange) {
        history.push('/change-success');
      }

      return updateResponse;
    } catch (err) {
      return {
        error: true,
        message: 'Ein unbekannter Fehler ist aufgetreten.',
      };
    }
  };

  const handleSubmit = async data => {
    setLoading(true);

    if (data.dates) {
      data.dates.sort((a, b) => {
        if (a.date.from < b.date.from) {
          return -1;
        }
        if (a.date.from > b.date.from) {
          return 1;
        }

        return 0;
      });
    }

    let response = null;

    if (create) {
      response = await handleCreate(data);
    } else {
      response = await handleUpdate(data);
    }

    setLoading(false);

    if (response.error) {
      return Notification.error({
        title: 'Fehler',
        description: response.message,
        placement: 'topEnd',
      });
    }

    return Notification.success({
      title: 'Speichern erfolgreich!',
      placement: 'topEnd',
    });
  };

  const onDelete = async () => {
    const isConfirmed = window.confirm(
      'Wollen Sie dieses Element wirklich löschen?'
    );

    if (isConfirmed) {
      const response = await apiRemove(endpoint);

      if (response) {
        history.push(routeConfig.endpoint);
      }
    }
  };

  return (
    <Formik initialValues={formData} onSubmit={handleSubmit}>
      <Form>
        <PanelGroup accordion style={{ overflow: 'visible' }}>
          <FormFields schema={formConfig} />
        </PanelGroup>
        <StickyToolbar>
          <Button disabled={isLoading} onClick={() => history.goBack()}>
            <Icon icon="back-arrow" /> Abbrechen
          </Button>
          {!create && userRole === 'ADMIN' && (
            <Button color="red" disabled={isLoading} onClick={onDelete}>
              <Icon icon="trash-o" /> Löschen
            </Button>
          )}
          <Button
            style={{ marginLeft: 'auto' }}
            appearance="primary"
            type="submit"
            loading={isLoading}
          >
            <Icon icon="check" /> Speichern
          </Button>
        </StickyToolbar>
      </Form>
    </Formik>
  );
};

export default withRouter(EditView);
