import _set from 'lodash.set';
import _get from 'lodash.get';

export const parseSchemaEntry = (schema, basePath = '') => {
  const component = schema.metas?.[0]?.component;
  const label = schema.flags?.label;

  if (schema.keys && !component) {
    return Object.entries(schema.keys).map(([key, value]) => {
      const childComponent = value.metas?.[0]?.component;
      const childLabel = value.flags?.label;
      const name = `${basePath}.${key}`.replace(/^\./, '');

      if (value.keys && !childComponent) {
        return {
          name,
          label: childLabel,
          children: parseSchemaEntry(value, name),
        };
      }

      return {
        name,
        label: childLabel,
        component:
          childComponent || (value.type === 'array' ? value.type : null),
        componentOptions: value,
      };
    });
  }

  return [
    {
      name: basePath,
      label,
      component,
    },
  ];
};

const getFormData = (form, data, result = {}) => {
  form.forEach(item => {
    if (item.children) {
      return getFormData(item.children, data, result);
    }

    const value = _get(data, item.name);
    return _set(result, item.name, value);
  });

  return result;
};

export const parseSchema = (schema, data) => {
  const formConfig = parseSchemaEntry(schema);
  const formData = getFormData(formConfig, data);

  // console.log(formConfig, formData);

  return [formConfig, formData];
};

export const paramsToString = (params = {}) => {
  return Object.entries(params).reduce((str, param, i) => {
    const [key, value] = param;
    str += i === 0 ? '?' : '&';
    str += `${key}=${
      typeof value === 'string' ? value : JSON.stringify(value)
    }`;
    return str;
  }, '');
};

export const parseRules = (options = {}) => {
  const { rules = [] } = options;

  return rules.reduce((result, rule) => {
    result[rule.name] = rule.args;
    return result;
  }, {});
};

export default {
  parseSchema,
  parseSchemaEntry,
  paramsToString,
  parseRules,
};
