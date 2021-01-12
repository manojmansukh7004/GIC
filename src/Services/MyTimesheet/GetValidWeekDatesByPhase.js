async function GetValidWeekDatesByPhase(EmpID, TimesheetId, ProjectCode, ClientCode, baseUrl) {

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "inputData": {
          "Action": 22,
          "EmployeeNo": EmpID,
          "ClientCode": ClientCode,
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
  
    const response = await fetch(`${baseUrl}/api/Timesheet/GetValidWeekDatesByPhase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { GetValidWeekDatesByPhase };
  