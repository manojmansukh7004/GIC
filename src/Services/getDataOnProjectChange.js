async function getDataOnProjectChange(EmpID, TimesheetId, ProjectCode, baseUrl) {

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "timesheetData": {
          "Action": 8,
          "EmployeeNo": EmpID,
          "ProjectCode": ProjectCode,
          "TimesheetId": TimesheetId
         
        }
}

    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/GetDataOnProjectChange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { getDataOnProjectChange };
  