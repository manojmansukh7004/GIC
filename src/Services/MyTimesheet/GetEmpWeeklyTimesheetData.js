async function GetEmpWeeklyTimesheetData(EmpID, TimesheetId, baseUrl) {

    const payload = {
      "loginDetails":
      {
        "LoginEmpID": EmpID,
        "LoginEmpCompanyCodeNo": ""
      },
      "timesheetData": {
        "Action": 2,
        "EmployeeNo": EmpID,
        "TimesheetId": TimesheetId

      }
}
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/GetEmpWeeklyTimesheetData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { GetEmpWeeklyTimesheetData };
  