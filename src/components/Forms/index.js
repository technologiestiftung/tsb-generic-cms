import React from 'react';
import styled from 'styled-components';
import { Panel } from 'rsuite';

import FormFieldFactory from './FormFieldFactory';

const PanelWrapper = styled(Panel)`
  &:before {
    content: '';
    border: none !important;
  }

  h3.rs-panel-title {
    font-size: 1.2em;
  }

  h4.rs-panel-title {
    font-size: 1em;
    color: #777;
  }

  .rs-panel-heading {
    padding-left: 0;
  }

  margin-bottom: 10px;
`;

const PanelContent = styled.div``;

const FormFields = ({
  schema,
  level = 0,
  readonly = false,
  appendTitle = '',
}) => {
  return schema.map(item => {
    if (item.children) {
      const LevelHeadline = React.createElement(
        `h${level + 3}`,
        null,
        item.label + appendTitle
      );

      return (
        <PanelWrapper
          header={LevelHeadline}
          collapsible={level !== 0 && !readonly}
          defaultExpanded={level === 0 || readonly}
          bodyFill
          key={item.name}
        >
          <PanelContent>
            <FormFields
              level={level + 1}
              schema={item.children}
              readonly={readonly}
            />
          </PanelContent>
        </PanelWrapper>
      );
    }

    const Field = FormFieldFactory(item.component);

    return (
      <Field
        key={item.name}
        {...item}
        options={item.componentOptions}
        readonly={readonly}
      />
    );
  });
};

export default FormFields;
