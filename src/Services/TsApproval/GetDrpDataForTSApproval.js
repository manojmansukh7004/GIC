async function GetDrpDataForTSApproval(EmpID, baseUrl) {
console.log("mmmmm",EmpID, baseUrl);

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "timesheetData": {
          "Action": 14,
          "EmployeeNo": EmpID,
        }
}
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/GetDrpDataForTSApproval`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();  
    return responseJson;
  }
  
  export { GetDrpDataForTSApproval };
  