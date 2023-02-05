import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import React from 'react';
import ArrowLeftIcon from '../../../assets/icon/ArrowLeftIcon';
import { useState } from 'react';
import InputBar from '../input-bar';

const HeaderSearch = ({setSearchKeyword, actionFn}) => {
  
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={'#e1e1e1'}
        onPress={() => {
          // navigation.goBack();
        }}
        style={{
          padding: 12,
          borderRadius: 32,
        }}>
        <ArrowLeftIcon />
      </TouchableHighlight>
      <InputBar
          placeholder={'Tìm kiếm'}
          setInput={setSearchKeyword}
          actionFn={actionFn}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e1e1e1',
    flex: 1,
    borderRadius: 50,
  },
});
export default HeaderSearch;
