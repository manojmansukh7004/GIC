async function FechDrawerMenu(empId, empRole, baseUrl) {
    const payload = {
      loginDetails:
        {
          loginEmpID: empId,
          LoginEmpRole: empRole,
          loginEmpCompanyCodeNo: ''
        },
    };
    console.log("paaaaaaa",payload, baseUrl);
    
    const formBody = JSON.stringify(payload, (key, value) => {
        if (value !== null) {      
          return value;
        }
        return {};
      });
    
      const response = await fetch(`${baseUrl}/api/login/GetMenus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formBody,
      });
      const responseJson = await response.json();
      return responseJson;
  }
  
  export { FechDrawerMenu };
  