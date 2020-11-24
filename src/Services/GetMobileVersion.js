async function GetMobileVersion(userName, baseUrl) {
    const payload = {
        "inputData":
        {
          "ActionId": "2",
          "androidVersionCode": "7",
          "iosVersionCode": "1"
          }
    };
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Login/GetMobileVersion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
    const responseJson = await response.json();
    return responseJson;
  }
  
  export { GetMobileVersion };
  