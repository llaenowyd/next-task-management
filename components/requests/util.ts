const isJsonContent = (response) =>
  response.headers.get('Content-Type')?.startsWith('application/json') ?? false;

export const drainContent = async (response) => {
  const isJson = isJsonContent(response);

  return await (isJson ? response.json() : response.text());
};
