async function getDataOnClientChange(EmpID, TimesheetId, ClientCode, baseUrl) {

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "timesheetData": {
          "Action": 7,
          "EmployeeNo": EmpID,
          "ClientCode": ClientCode,
          "Flag": "1",
          "TimesheetId": TimesheetId
        }
}
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/GetDataOnClientChange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { getDataOnClientChange };
  