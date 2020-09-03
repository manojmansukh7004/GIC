
async function SendMAil(userName, baseUrl) {
    const payload = {
      loginDetails:
        {
          loginEmpID: userName,
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
  
    const response = await fetch(`${baseUrl}/Login/SendPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
    const responseJson = await response.json();
    return responseJson;
  }
  
  export { SendMAil };
  