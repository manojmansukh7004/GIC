async function GetEmpTimesheetList(EmpID, baseUrl) {

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "timesheetData": {
          "Action": 1,
          "EmployeeNo": EmpID,
        }
}
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/GetEmpTimesheetList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { GetEmpTimesheetList };
  