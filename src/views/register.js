import React, { Component } from 'react'
import { TextInput, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Incubator, View, RadioGroup, RadioButton, Text, Checkbox, Colors, Button } from 'react-native-ui-lib';
import _ from 'lodash';
const { TextField } = Incubator;
const options = ['Nam', 'Nữ']

class Register extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        name: '',
        gender: 'Nam',
        phonenumber: '',
        password: '',
        confirm: ''
    }

    renderRadioButton(value, text, props) {
        return (
            <View row marginR-10>
                <RadioButton value={value} label={text} {...props} />
            </View>
        );
    }

    render() {
        return (

            <View centerV paddingH-20 paddingT-50>
                <View centerH>
                    <Avatar source={{ uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg' }} />
                </View>
                <View>
                    <TextField
                        fieldStyle={{ borderBottomWidth: 1, padding: 2 }}
                        containerStyle={{ border: 1, borderRadius: 10 }}
                        placeholder='Họ tên'
                        floatingPlaceholder
                        onChangeText={(value) => this.setState({ name: value })}
                        enableErrors
                        validate={['required', 'text']}
                        validateOnBlur
                        validationMessage={['Field is required', 'Name is invalid']}
                        maxLength={30}
                    />
                </View>
                <View row>
                    <RadioGroup row initialValue={this.state.value} onValueChange={(value) => this.setState({ gender: value })}>
                        <Text text70 marginR-20 $textDefault>
                            Giới tính:
                        </Text>
                        <View row>
                            {this.renderRadioButton('Nam', 'Nam', { marginLeft: 5 })}
                            {this.renderRadioButton('Nữ', 'Nữ', { marginLeft: 5 })}
                            {this.renderRadioButton('Khác', 'Khác', true)}
                        </View>
                    </RadioGroup>
                </View>
                <View>
                    <TextField fieldStyle={{ borderBottomWidth: 1, padding: 2 }}
                        placeholder={'Số điện thoại'}
                        floatingPlaceholder
                        onChangeText={(value) => this.setState({ phonenumber: value })}
                        enableErrors
                        validate={['required', 'number', (value) => value.length >= 10]}
                        validateOnBlur
                        validationMessage={['Field is required', 'Only numbers are valid', 'Phone number is too short']}
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

                <View>
                    <TextField fieldStyle={{ borderBottomWidth: 1, padding: 2 }}
                        placeholder={'Xác nhận mật khẩu'}
                        floatingPlaceholder
                        onChangeText={() => console.log('changed')}
                        enableErrors
                        validate={['required', 'text', (value) => value.length >= 6, (value) => (value === this.state.password)]}
                        validateOnBlur
                        validationMessage={['Field is required', 'Email is invalid', 'Password is too short', 'Confirmation password does not match']}
                        maxLength={30}
                    />
                </View>

                <View row marginT-10>
                    <Text marginR-10>
                        Tôi đông ý với <Text>điều khoản sử dụng</Text>
                    </Text>
                    <Checkbox
                        value={this.state.value2}
                        onValueChange={value2 => this.setState({ value2 })}
                        borderRadius={5}
                        size={25}
                        color={Colors.purple30}
                    />
                </View>

                <View marginT-20>
                    <Button borderRadius={50} label="Đăng ký" onPress={() => Alert.alert(this.state.name + this.state.gender)} />
                </View>

                <View centerH row marginT-20>
                    <Text>
                        Bạn đã có tài khoản?
                    </Text>
                    <Button marginL-10 text80 link label="Đăng nhập"></Button>
                </View>
            </View>

        );
    }
}

export default Register;