import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'rsuite';

import { create as apiPost } from '~/services/DataApi';

import StickyToolbar from '~/components/StickyToolbar';
import DiffViewer from './DiffViewer';
import RejectConfirm from './RejectConfirm';

const ChangeView = ({ data, history, routeConfig, match }) => {
  const [isLoading, setLoading] = useState(false);
  const [rejectConfirmVisible, setRejectConfirmVisible] = useState(false);
  const { id } = match.params;

  const handleResponse = response => {
    if (response.error) {
      Notification.error({
        title: 'Fehler',
        description: response.message,
        placement: 'topEnd',
      });
    } else {
      history.replace(routeConfig.endpoint);
    }
  };

  const handleApprove = async () => {
    setLoading(true);
    const acceptEnpoint = `${routeConfig.endpoint}/${id}/accept`;
    const acceptResponse = await apiPost(acceptEnpoint);
    handleResponse(acceptResponse);
    setLoading(false);
  };

  const handleReject = async payload => {
    setLoading(true);
    const rejectEndpoint = `${routeConfig.endpoint}/${id}/decline`;
    const rejectResponse = await apiPost(rejectEndpoint, payload);
    handleResponse(rejectResponse);
    setLoading(false);
  };

  const handleRejectButton = () => {
    setRejectConfirmVisible(true);
  };

  return (
    <div>
      <RejectConfirm
        isVisible={rejectConfirmVisible}
        onClose={() => setRejectConfirmVisible(false)}
        onConfirm={handleReject}
      />
      <DiffViewer data={data} />
      <StickyToolbar>
        <Button disabled={isLoading} onClick={() => history.goBack()}>
          <Icon icon="back-arrow" /> Abbrechen
        </Button>
        <Button color="red" disabled={isLoading} onClick={handleRejectButton}>
          <Icon icon="trash-o" /> Ablehnen
        </Button>
        <Button
          style={{ marginLeft: 'auto' }}
          appearance="primary"
          onClick={handleApprove}
          loading={isLoading}
        >
          <Icon icon="check" /> Annehmen
        </Button>
      </StickyToolbar>
    </div>
  );
};

export default withRouter(ChangeView);
