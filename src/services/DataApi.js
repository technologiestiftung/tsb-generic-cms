import Store from '~/state/Store';
import { paramsToString } from './utils';

export const get = async (endpoint, params = {}) => {
  const { user } = Store.getState();
  const { token } = user;

  const headers = {
    'content-type': 'application/json',
    authorization: token,
    'Access-Control-Request-Method': 'GET',
  };

  const queryParams = paramsToString(params);
  const response = await fetch(`${config.api.base}${endpoint}${queryParams}`, {
    method: 'GET',
    headers,
  });

  const data = await response.json();

  return data;
};

export const create = async (endpoint, data = {}, base = config.api.base) => {
  const { user } = Store.getState();
  const { token } = user;

  const headers = {
    'content-type': 'application/json',
    authorization: token,
    'Access-Control-Request-Method': 'POST',
  };

  const response = await fetch(`${base}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  });

  const responseData = await response.json();

  return responseData;
};

export const update = async (endpoint, data, base = config.api.base) => {
  const { user } = Store.getState();
  const { token } = user;

  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  const response = await fetch(`${base}${endpoint}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers,
  });

  return response;
};

export const remove = async (endpoint, base = config.api.base) => {
  const { user } = Store.getState();
  const { token } = user;

  const headers = {
    'content-type': 'application/json',
    authorization: token,
  };

  const response = await fetch(`${base}${endpoint}`, {
    method: 'DELETE',
    headers,
  });

  return response;
};

export default {
  get,
  create,
  update,
  remove,
};
