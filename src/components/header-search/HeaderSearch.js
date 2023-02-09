import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { COLOR } from '../../constants/constants';

const HeaderSearch = () => {

  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => handleGoback()}>
        <FontAwesomeIcon size={28} icon={faArrowLeft} />
      </TouchableOpacity>
      <TextInput
        placeholder={'Tìm kiếm'}
        placeholderTextColor={COLOR.placeholder}
        style={{ color: COLOR.text, width: '75%', fontSize: 18 }}
        onChangeText={value => setKeyword(value)}
      />
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handleSearch(keyword)}>
        <FontAwesomeIcon size={24} icon={faSearch} color={COLOR.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLOR.background,
    justifyContent: 'space-between'
  },
});
export default HeaderSearch;
