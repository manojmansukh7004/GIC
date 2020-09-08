async function GetDataOnClientChange(EmpID, DeliveryTypeId,ProjectGroup, ClientCode, baseUrl) {

  const payload = {
    "loginDetails":
    {
      "LoginEmpID": EmpID,
      "LoginEmpCompanyCodeNo": ""
    },
    "timesheetData": {
      "Action": 7,
      "ProjectGroup": ProjectGroup.toString(),
      "DeliveryTypeId": DeliveryTypeId.toString(),
      "ClientCode": ClientCode.toString(),
      "Flag": "2"
    }
  }
  const formBody = JSON.stringify(payload, (key, value) => {
    if (value !== null) {
      return value;
    }
    return {};
  });

  const response = await fetch(`${baseUrl}/api/Timesheet/GetDataOnClientChange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formBody,
  });

  const responseJson = await response.json();
  return responseJson;
}

export { GetDataOnClientChange };
