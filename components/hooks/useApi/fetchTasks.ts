import queryString from 'query-string';

import { drainContent } from './util';

const apiEndpoint = '/api/tasks';

const makeRequestOptions = (accessToken) => ({
  headers: {
    ['Authorization']: `Bearer ${accessToken}`,
  },
});

const elideValueWhenEmpty = (key, maybeValue) =>
  maybeValue ? { [key]: maybeValue } : null;

const elideEmptyFilters = ({ search, status }) => ({
  ...elideValueWhenEmpty('search', search),
  ...elideValueWhenEmpty('status', status),
});

const fetchTasks = (accessToken, handle401) => async (filters, setStore) => {
  const queryStr = queryString.stringify(elideEmptyFilters(filters));

  const res = await fetch(
    apiEndpoint + (queryStr ? `?${queryStr}` : ''),
    makeRequestOptions(accessToken),
  );

  const content = await drainContent(res);

  if (!res.ok) {
    if (res.status === 401) {
      handle401();
    } else {
      throw new Error(content?.message ?? content);
    }
  } else {
    setStore(content);
  }
};

export default fetchTasks;
