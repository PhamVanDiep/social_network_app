import React, { Component } from 'react'
import { TextInput, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Incubator, View, RadioGroup, RadioButton, Text, Checkbox, Colors, Button } from 'react-native-ui-lib';
import _ from 'lodash';
const { TextField } = Incubator;


class Login extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',
        password: ''
    }
    render() {
        return (

            <View centerV paddingH-20 paddingT-50 marginT-350>
                <View centerH>
                    <Avatar source={{ uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg' }} />
                </View>
                <View>
                    <TextField
                        fieldStyle={{ borderBottomWidth: 1, padding: 2 }}
                        containerStyle={{ border: 1, borderRadius: 10 }}
                        placeholder='Họ tên'
                        floatingPlaceholder
                        onChangeText={(value) => this.setState({ username: value })}
                        enableErrors
                        validate={['required', 'text']}
                        validateOnBlur
                        validationMessage={['Field is required', 'Name is invalid']}
                        maxLength={30}
                    />
                </View>
                <View>
                    <TextField fieldStyle={{ borderBottomWidth: 1, padding: 2 }}
                        placeholder={'Mật khẩu'}
                        floatingPlaceholder
                        onChangeText={(value) => this.setState({ password: value })}
                        enableErrors
                        validate={['required', (value) => value.length >= 6]}
                        validateOnBlur
                        validationMessage={['Field is required', 'Password is too short']}
                        maxLength={30}
                    />
                </View>

                <View centerH row marginT-20>
                    <Button marginL-10 text100 link label="Đăng nhập"></Button>
                </View>
            </View>

        );
    }
}

export default Login;