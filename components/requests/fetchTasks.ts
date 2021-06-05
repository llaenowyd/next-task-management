import queryString from 'query-string';

const apiEndpoint = '/api/fetchTasks';

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

const fetchTasks = async (accessToken, filters, handle401, setStore) => {
  const queryStr = queryString.stringify(elideEmptyFilters(filters));

  const res = await fetch(
    apiEndpoint + (queryStr ? `?${queryStr}` : ''),
    makeRequestOptions(accessToken),
  );

  const isJson =
    res.headers.get('Content-Type')?.startsWith('application/json') ?? false;
  const content = await (isJson ? res.json() : res.text());

  if (!res.ok) {
    if (res.status === 401) {
      handle401();
    } else {
      throw new Error(isJson ? content.message : content);
    }
  } else {
    setStore(content);
  }
};

export default fetchTasks;
