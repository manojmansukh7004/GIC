async function GetEmpListForApproval(EmpID, Status,ClientCode,ProjectCode, baseUrl) {
    
        const payload = {
            "loginDetails":
            {
              "LoginEmpID": EmpID,
              "LoginEmpCompanyCodeNo": ""
            },
            "timesheetData": {
                "Action": 13,
                "Status": Status,
                "ClientCode": ClientCode.toString(),
                "ProjectCode": ProjectCode.toString()
            }
    }
        const formBody = JSON.stringify(payload, (key, value) => {
          if (value !== null) {
            return value;
          }
          return {};
        });
      
        const response = await fetch(`${baseUrl}/api/Timesheet/GetEmpListForApproval`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formBody,
        });
      
        const responseJson = await response.json();  
        return responseJson;
      }
      
      export { GetEmpListForApproval };
      