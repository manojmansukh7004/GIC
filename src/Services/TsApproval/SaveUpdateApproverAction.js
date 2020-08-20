async function SaveUpdateApproverAction(EmpID,employeeNo,tsEntryId, ApprRating1, ApprRating2, ApproverRemarks, apprAction,status, baseUrl) {
    console.log("SaveUpdateApproverAction",EmpID,employeeNo,tsEntryId.toString(), ApprRating1, ApprRating2, ApproverRemarks, apprAction,status,baseUrl);
    
        const payload = {
            "loginDetails":
            {
              "LoginEmpID": EmpID,
              "LoginEmpCompanyCodeNo": ""
            },
            "timesheetData": {
                "Action": 17,
                "EmployeeNo": employeeNo,
                "TimesheetEntryId": tsEntryId.toString(),
                "ApprRating1": ApprRating1,
                "ApprRating2": ApprRating2,
                "ApproverRemarks": ApproverRemarks,
                "ApproverAction": apprAction,
                "Status": status
            }
    }
    console.log("pppppp",payload);
    
        const formBody = JSON.stringify(payload, (key, value) => {
          if (value !== null) {
            return value;
          }
          return {};
        });
      
        const response = await fetch(`${baseUrl}/api/Timesheet/SaveUpdateApproverAction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formBody,
        });
      
        const responseJson = await response.json();  
        console.log(responseJson);
        return responseJson;
      }
      
      export { SaveUpdateApproverAction };
      