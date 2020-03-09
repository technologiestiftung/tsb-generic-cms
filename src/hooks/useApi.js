import useSWR from 'swr';

import Store from '~/state/Store';
import { paramsToString } from '~/services/utils';

export const jsonFetcher = (url, authenticate) => {
  const { user } = Store.getState();
  const sendHeader = authenticate && user.token;

  const headers = sendHeader
    ? {
        authorization: user.token,
      }
    : {};

  return fetch(url, { headers }).then(r => r.json());
};

const useApi = (path, options = {}) => {
  const { params, authenticate } = options;
  const queryParams = paramsToString(params);
  const url = `${config.api.base}${path}${queryParams}`;

  const response = useSWR([url, authenticate], jsonFetcher, {
    revalidateOnFocus: true,
  });

  return response;
};

export default useApi;
