async function GetDataOnPhaseChange(EmpID, TimesheetId,ProjectCode, Phase, baseUrl) {

console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",EmpID, TimesheetId, Phase, baseUrl);

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "timesheetData": {
          "Action": 9,
          "EmployeeNo": EmpID,
          "ProjectCode":ProjectCode,
          "Phase": Phase,
          "TimesheetId": TimesheetId
         
        }
}

    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/GetDataOnPhaseChange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { GetDataOnPhaseChange };
  