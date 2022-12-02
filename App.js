import React from "react";
import { View } from "react-native-ui-lib";
import Login from "./src/test/login";
import Register from "./src/views/register";

export default function App() {
  return(
    <View>
      <Register></Register>
      <Login></Login>
    </View>
  );
}