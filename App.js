import React from "react";
import { View } from "react-native-ui-lib";
import Login from "./src/test/login";
import Register from "./src/views/register";
import { UploadImage } from "./src/test/upload";

export default function App() {
  return(
    <View>
      {/* <Register></Register> */}
      {/* <Login></Login> */}
      <UploadImage/>
    </View>
  );
}