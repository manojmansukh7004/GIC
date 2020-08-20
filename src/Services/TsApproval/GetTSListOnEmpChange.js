async function GetTSListOnEmpChange(EmpID,Status, resource,baseUrl) {
    
        const payload = {
            "loginDetails":
            {
              "LoginEmpID": EmpID,
              "LoginEmpCompanyCodeNo": ""
            },
            "timesheetData": {
              "Action": 16,
              "Status":Status,
              "EmployeeNo": resource,
            }
    }
        const formBody = JSON.stringify(payload, (key, value) => {
          if (value !== null) {
            return value;
          }
          return {};
        });
      
        const response = await fetch(`${baseUrl}/api/Timesheet/GetTSListOnEmpChange`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formBody,
        });
      
        const responseJson = await response.json();  
        return responseJson;
      }
      
      export { GetTSListOnEmpChange };
      