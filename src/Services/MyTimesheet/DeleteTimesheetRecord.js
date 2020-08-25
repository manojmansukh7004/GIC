async function DeleteTimesheetRecord(EmpID, TimesheetId, TimesheetEntryId, baseUrl) {

    const payload = {
        "loginDetails":
        {
          "LoginEmpID": EmpID,
          "LoginEmpCompanyCodeNo": ""
        },
        "timesheetData": {
          "Action": 11,
         "TimesheetEntryId": TimesheetEntryId,
          "TimesheetId": TimesheetId
        }
}
console.log(payload);

    const formBody = JSON.stringify(payload, (key, value) => {
      if (value !== null) {
        return value;
      }
      return {};
    });
  
    const response = await fetch(`${baseUrl}/api/Timesheet/DeleteTimesheetRecord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    });
  
    const responseJson = await response.json();
  
    return responseJson;
  }
  
  export { DeleteTimesheetRecord };
  