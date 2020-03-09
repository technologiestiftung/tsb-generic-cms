import React from 'react';
import { Formik, Form } from 'formik';
import { PanelGroup } from 'rsuite';

import { parseSchema } from '~/services/utils';
import FormFields from '~/components/Forms';

const ChangeForm = ({ data, schema, appendTitle }) => {
  if (!data || !schema) {
    return null;
  }

  const [formConfig, formData] = parseSchema(schema, data);

  return (
    <Formik initialValues={formData}>
      <Form>
        <PanelGroup accordion style={{ overflow: 'visible' }}>
          <FormFields readonly schema={formConfig} appendTitle={appendTitle} />
        </PanelGroup>
      </Form>
    </Formik>
  );
};

export default ChangeForm;
