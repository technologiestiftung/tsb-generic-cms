import React from 'react';

import PageWrapper from './PageWrapper';

const ChangeSuccess = () => {
  return (
    <PageWrapper title="Bestätigung">
      <div style={{ marginTop: 10 }}>
        Vielen Dank für die Einreichung / Änderung.
        <br />
        Sobald ein Admin die Einreichung / Änderung bestätigt hat, bekommen Sie
        eine E-Mail Bestätigung.
      </div>
    </PageWrapper>
  );
};

export default ChangeSuccess;
