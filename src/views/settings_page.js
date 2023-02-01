import React from 'react'
import { BackHandler, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { faPowerOff, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { COLOR } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth/authSlice';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: COLOR.background,
        fontFamily: 'Roboto'
    },
    topContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    exitContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    },
    logoutContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderTopColor: '#D7DBDD',
        borderTopWidth: 1
    }
});

const Settings = ({ navigation }) => {

    const dispatch = useDispatch();

    const logoutAction = () => {
        Alert.alert('Thông báo', 'Bạn có thực sự muốn đăng xuất', [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            { 
                text: 'Có', 
                onPress: () => {
                    dispatch(logoutUser());
                    navigation.navigate('LogIn');
                } 
            },
        ]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={{
                    borderBottomWidth: 2,
                    borderColor: COLOR.placeholder
                }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLOR.text }}>
                            Thao tác
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.exitContainer} onPress={() => BackHandler.exitApp()}>
                    <FontAwesomeIcon icon={faPowerOff} size={24} />
                    <Text style={{ fontSize: 18, fontWeight: '500', color: COLOR.text, marginLeft: 10 }}>Thoát ứng dụng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutContainer} onPress={logoutAction}>
                    <FontAwesomeIcon icon={faSignOut} size={24} />
                    <Text style={{ fontSize: 18, fontWeight: '500', color: COLOR.text, marginLeft: 10 }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Settings;