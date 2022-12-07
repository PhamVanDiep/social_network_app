import React from "react";
import { View } from "react-native-ui-lib";
import Login from "./src/test/login";
import Register from "./src/views/register";
import { UploadImage } from "./src/test/upload";
import SQLiteTest from "./src/test/sqlite";

export default function App() {
  return(
    <View>
      {/* <Register></Register> */}
      {/* <Login></Login> */}
      {/* <UploadImage/> */}
      <SQLiteTest />
    </View>
  );
}
