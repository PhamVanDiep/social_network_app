import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import { Checkbox, View } from "react-native-ui-lib";
import {Button, Colors} from 'react-native-ui-lib';
import Register from "./src/views/register";
import Settings from "./src/views/settings-page";
import DetailPost from "./src/components/detail_post";

import { View } from "react-native-ui-lib";
import Login from "./src/test/login";
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
