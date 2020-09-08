
async function CheckPreviousEmpTSStatus(EmpID, timesheetId, baseUrl) {
    
        const payload = {
            "loginDetails":
            {
              "LoginEmpID": EmpID,
              "LoginEmpCompanyCodeNo": ""
            },
            "timesheetData": {
              "Action": 15,
              "EmployeeNo": EmpID,
              "TimesheetId": timesheetId
            }
    }
        const formBody = JSON.stringify(payload, (key, value) => {
          if (value !== null) {
            return value;
          }
          return {};
        });
      
        const response = await fetch(`${baseUrl}/api/Timesheet/CheckPreviousEmpTSStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formBody,
        });
      
        const responseJson = await response.json();
      
        return responseJson;
      }
      
      export { CheckPreviousEmpTSStatus };
      