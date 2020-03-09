import React from 'react';
import { Formik, Form } from 'formik';
import { Input, InputGroup, Icon } from 'rsuite';

const Search = ({ onChange = () => {} }) => {
  return (
    <Formik
      initialValues={{ search: '' }}
      onSubmit={values => onChange(values.search)}
    >
      {props => (
        <Form style={{ maxWidth: 220 }}>
          <InputGroup>
            <Input
              onChange={value => props.setFieldValue('search', value)}
              value={props.values.search}
              placeholder="Suchbegriff eingeben..."
              name="search"
            />
            {props.values.search.length > 0 && (
              <InputGroup.Addon>
                <Icon
                  onClick={() => {
                    props.setFieldValue('search', '');
                    onChange('');
                  }}
                  icon="close"
                />
              </InputGroup.Addon>
            )}
            <InputGroup.Addon>
              <Icon icon="search" />
            </InputGroup.Addon>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
