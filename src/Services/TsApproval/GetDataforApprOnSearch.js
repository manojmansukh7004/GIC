async function GetDataforApprOnSearch(EmpID,type, empNo,timesheet, client, projet,baseUrl) {
    
        const payload = {
            "loginDetails":
            {
              "LoginEmpID": EmpID,
              "LoginEmpCompanyCodeNo": ""
            },
            "timesheetData": {
                "Action": 12,
                "EmployeeNo": empNo,
                "TimesheetId": timesheet,
                "ClientCode": client.toString(),
                "ProjectCode": projet.toString(),
                "Status": type
            }
    }
        const formBody = JSON.stringify(payload, (key, value) => {
          if (value !== null) {
            return value;
          }
          return {};
        });
      
        const response = await fetch(`${baseUrl}/api/Timesheet/GetDataforApprOnSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formBody,
        });
      
        const responseJson = await response.json();  
        return responseJson;
      }
      
      export { GetDataforApprOnSearch };
      