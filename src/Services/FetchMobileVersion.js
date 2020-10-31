
async function FetchMobileVersion(payload, baseUrl) {

  const formBody = JSON.stringify(payload, (key, value) => {
    if (value !== null) {      
      return value;
    }
    return {};
  });

  const response = await fetch(`${baseUrl}/api/login/GetMobileVersion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formBody,
  });
  const responseJson = await response.json();
  return responseJson;
}
export { FetchMobileVersion };
