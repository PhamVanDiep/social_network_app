import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import DrawerLayout from '../layout/DrawerLayout';

const BackgroundOption = () => {
  return (
    <View>
      <TouchableHighlight>
        <Text>Xem ảnh bìa</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text>Upload ảnh bìa</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text>Chọn ảnh từ thư viện</Text>
      </TouchableHighlight>
    </View>
  );
};

export default BackgroundOption;
