
async function CreateNewTimesheet(EmpID, date, baseUrl) {
console.log("mmmmmmmmm",EmpID, date, baseUrl);

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "timesheetData": {
          "Action": 3,
          "EmployeeNo": EmpID,
          "Date": date,
          "Status": "Saved"
        }
}
    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/CreateNewTimesheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { CreateNewTimesheet };
  