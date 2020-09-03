
async function forgotPassword(userName, baseUrl) {
  const payload = {
    loginDetails:
      {
        loginEmpID: "",
        UserID: userName,
        loginEmpCompanyCodeNo: ''
      },
  };
  const formBody = JSON.stringify(payload, (key, value) => {
    if (value !== null) {
      return value;
    }
    return {};
  });

  const response = await fetch(`${baseUrl}/api/Login/SendPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formBody,
  });
  const responseJson = await response.json();
  return responseJson;
}

export { forgotPassword };
