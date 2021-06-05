const proxy = async (baseUrl, endpoint, req, res) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: req.headers,
    method: req.method,
    body: JSON.stringify(req.body),
  });

  const content = await (res.headers?.['Content-Type']?.startsWith(
    'application/json',
  )
    ? response.json()
    : response.text());

  if (!response.ok) {
    res.status(response.status);
  }

  res.json(content);
};

export default proxy;
