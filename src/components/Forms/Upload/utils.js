export const getRequestData = formikData => {
  return Object.keys(formikData).reduce((res, item) => {
    if (formikData[item]) {
      res[item] = formikData[item];
    }
    return res;
  }, {});
};

export const getMetaFields = formikData => {
  return Object.keys(formikData).reduce(
    (res, item) => {
      if (formikData[item] && ['source', 'description'].includes(item)) {
        res.push(item);
      }
      return res;
    },
    ['imageType']
  );
};
