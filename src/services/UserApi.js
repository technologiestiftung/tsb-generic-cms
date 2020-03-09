import Store from '~/state/Store';

const client = apiConfig => {
  const json = r => r.json();
  const request = ({ url, body, authorization, headers = {} }) => method => {
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (authorization) {
      requestHeaders.authorization = authorization;
    }

    return fetch(`${apiConfig.user.base}${url}`, {
      method,
      body: JSON.stringify(body),
      headers: requestHeaders,
    }).then(json);
  };

  return {
    get: url => fetch(`${apiConfig.user.base}${url}`).then(r => r.json()),
    post: (url, body, authorization, headers) =>
      request({ url, body, authorization, headers })('POST'),
    put: (url, body, authorization, headers) =>
      request({ url, body, authorization, headers })('PUT'),
    delete: (url, body, authorization, headers) =>
      request({ url, body, authorization, headers })('DELETE'),
  };
};

const api = client(config.api);

export default {
  login: payload => api.post(config.api.user.login, payload),
  refreshToken: ({ token }) =>
    api.get(`${config.api.user.refreshToken}?token=${token}`),
  create: values => api.post('', values),
  update: (id, values) => {
    const {
      user: { token },
    } = Store.getState();
    return api.put(`/${id}`, values, token);
  },
  remove: id => {
    const {
      user: { token },
    } = Store.getState();
    return api.delete(`/${id}`, null, token);
  },
  confirmEmail: ({ email, token }) =>
    api.get(`${config.api.user.confirmEmail}?email=${email}&token=${token}`),
  requestPasswordReset: ({ email }) =>
    api.post(config.api.user.requestPasswordReset, { email }),
  changePassword: ({ email, password, token }) =>
    api.post(config.api.user.changePassword, { email, password, token }),
  resendConfirmationEmail: email =>
    api.post(config.api.user.resendConfirmationEmail, { email }),
  resendResetPasswordEmail: email =>
    api.post(config.api.user.resendResetPasswordEmail, { email }),
};
