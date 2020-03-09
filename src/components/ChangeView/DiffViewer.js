import React from 'react';
import { Message } from 'rsuite';
import { format } from 'date-fns';

import Loader from '~/components/Loader';
import useApi from '~/hooks/useApi';

import ChangeForm from './ChangeForm';
import SideBySideForm from './SideBySideForm';

const getChangeDescription = data => {
  const { meta, createdAt } = data;
  const createType = meta.create ? 'Neue Einreichung' : 'Änderung';
  const userName = meta.user.meta.name;
  const userInstitution = meta.user.meta.institutionName;
  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return `${createType} von ${userName} (${userInstitution}). Eingereicht am ${formattedDate}.`;
};

const DiffViewer = ({ data }) => {
  if (!data) {
    return <Loader />;
  }

  const schemaEndpoint = `/${data.meta?.type}/schema`;
  const { data: schema } = useApi(schemaEndpoint, { authenticate: true }); // eslint-disable-line

  const changeDescription = getChangeDescription(data);

  if (data.meta.create) {
    return (
      <>
        <Message type="warning" description={changeDescription} />
        <ChangeForm schema={schema} data={data.data} />
      </>
    );
  }

  return (
    <>
      <Message type="warning" description={changeDescription} />
      <SideBySideForm schema={schema} data={data} />
    </>
  );
};

export default DiffViewer;
