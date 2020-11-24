async function UpdateMobileVersion(userName, baseUrl) {
    const payload = {
        "inputData":
        {
          "ActionId": "1",
          "androidVersionCode": "1.0.4",
          "iosVersionCode": "1"
          }
    };
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Login/UpdateMobileVersion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
    const responseJson = await response.json();
    return responseJson;
  }
  
  export { UpdateMobileVersion };
  