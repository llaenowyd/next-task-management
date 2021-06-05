const isJsonContent = (response) =>
  response.headers.get('Content-Type')?.startsWith('application/json') ?? false;

const isEmpty = (response) => {
  const contentLengthValue = response.headers.get('Content-Length');

  if (!contentLengthValue) {
    return true;
  }

  const contentLength = parseInt(contentLengthValue, 10);

  return contentLength === 0;
};

export const drainContent = async (response) => {
  if (isEmpty(response)) {
    return '';
  }

  const isJson = isJsonContent(response);

  return await (isJson ? response.json() : response.text());
};
