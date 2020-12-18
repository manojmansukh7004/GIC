import { View, StyleSheet, Button, Alert } from "react-native";
import React, { BackHandler } from 'react-native';

async function FetchMobileVersion(payload, baseUrl) {

  const formBody = JSON.stringify(payload, (key, value) => {
    if (value !== null) {      
      return value;
    }
    return {};
  });

  const response = await fetch(`${baseUrl}/api/login/GetMobileVersion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formBody,
  });
  console.log("response",response.status);
  if(response.status == '503'){
      // alert("HTTP Error 503. The service is unavailable")
      Alert.alert(
        "Service Unavailable",
        "HTTP Error 503. The service is unavailable",
        [
          {
            text: "Cancel",
            // onPress: () => BackHandler.exitApp(),
            style: "cancel"
          },
          { text: "OK", onPress: () => BackHandler.exitApp()}
        ],
        { cancelable: false }
      );
  }
  const responseJson = await response.json();
  return responseJson;
}
export { FetchMobileVersion };
