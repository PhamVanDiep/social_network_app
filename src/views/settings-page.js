import React, { Component, useState } from 'react'
import { TextInput, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Incubator, View, RadioGroup, RadioButton, Text, Checkbox, Colors, Button, Icon, Assets, Image, TouchableOpacity } from 'react-native-ui-lib';
import _ from 'lodash';
import { StyleCustom } from './assets/styles';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

StyleCustom();

const { TextField } = Incubator;
const options = ['Nam', 'Nữ'];

const Settings = () => {
    const [notify, setNotify] = useState("Turn off Notification");
    const [login, setLogin] = useState("Logout");

    function changeNotify() {
        if(notify === "Turn on Notification") {
            setNotify("Turn off Notification");
        }
        else setNotify("Turn on Notification");
    }

    function changeAuth() {
        if(login === "Login") {
            setLogin("Logout");
        }
        else setLogin("Login");
    }

    return (
        <View>
            <View paddingT-5 bg-white 
            flex spread
            style={{height:windowHeight}}>
            <View>
                <View style={{
                        borderBottomWidth: 2,
                        borderColor: '#f0f0f1'
                    }}>
                    <View sh30 flex-apply row centerV paddingH-10>
                        <TouchableOpacity onPress={() => console.log('pressed')}>
                            <Icon source={require('../assets/icons/arrow_left.png')} size={24}></Icon>
                        </TouchableOpacity>
                        
                        <Text h3 marginL-20 style={{fontWeight:'bold'}}>
                            Cài Đặt
                        </Text>
                    </View>
                </View>
                <View marginT-10>
                    <TouchableOpacity flex-apply row paddingH-20 paddingV-10
                    onPress={changeNotify}>
                        <Icon source={require('../assets/icons/arrow_left.png')} size={24}></Icon>
                        <Text marginL-20>{notify}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity flex-apply row paddingH-20 paddingV-10
                    onPress={changeAuth}>
                        <Icon source={require('../assets/icons/arrow_left.png')} size={24}></Icon>
                        <Text marginL-20>{login}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity bg-redButton
            marginH-20
            paddingH-20 paddingV-10 br40
            flex-apply center marginB-30
            onPress={() => console.log('pressed')}>
                <Text white>Thoát ứng dụng</Text>
            </TouchableOpacity>
        </View>

        </View>
    );
}

export default Settings;