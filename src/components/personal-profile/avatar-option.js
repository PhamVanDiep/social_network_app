import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import DrawerLayout from '../layout/DrawerLayout';

const AvatarOption = () => {
  return (
    <View>
      <TouchableHighlight>
        <Text>Xem ảnh đại diện</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text>Upload ảnh đại diện</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text>Chọn ảnh từ thư viện</Text>
      </TouchableHighlight>
    </View>
  );
};

export default AvatarOption;
