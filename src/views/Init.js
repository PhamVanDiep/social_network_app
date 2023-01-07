import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LoadingDots from "react-native-loading-dots";
import { Avatar } from "react-native-ui-lib";
import { useDispatch } from "react-redux";
import { CreateTable, getFirstUsers, getAllUsers } from "../helper/sqlite/user_query";
import { loadToken, loadUser } from "../store/auth/authSlice";

const Init = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await CreateTable();
            const userData = await dispatch(loadUser()).unwrap();
            console.log(userData);
            if (userData.user) {
                // const user = await dispatch(loadUser()).unwrap();
                navigation.navigate('TopTop');
            } else {
                navigation.navigate('LogIn');
            }
        }
        fetchData();
    }, []);
    return (
        <View style={styles.loadingScreen}>
            <Avatar source={require('../../assets/images/logo.png')} size={100} />
            <View style={styles.dotsWrapper}>
                <LoadingDots dots={5} size={15} colors={[]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    dotsWrapper: {
        marginTop: 10,
        width: '30%'
    },
});

export default Init;