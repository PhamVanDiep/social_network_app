import { useState, useEffect } from "react";
import FriendComponent from "./FriendComponent";
import FriendService from "../../../helper/services/FriendService";
import Notification from "../../../utils/Notification";
import { ScrollView, View, Text, TextInput } from "react-native";
import { COLOR } from "../../../constants/constants";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ActionSheet } from "react-native-ui-lib";
import UserService from "../../../helper/services/UserService";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.background,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    totalFriends: {
        fontFamily: 'Roboto',
        fontSize: 25,
        fontWeight: 'bold',
        color: COLOR.text,
        marginTop: 10
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBEDEF',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    searchIcon: {
        padding: 10
    },
    searchInput: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#EBEDEF',
        color: COLOR.text,
        fontSize: 18,
        fontFamily: 'Roboto'
    },
    scrollStyle: {
        width: '100%',
        backgroundColor: COLOR.background,
    },
    option: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: '600'
    },
    cancelFriendship: {
        color: '#E74C3C'
    }
})
const ListFriendComponent = () => {
    const [friends, setFriends] = useState([]);
    const [tmp, setTmp] = useState([]);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState();
    const [profile, setProfile] = useState({});
    const [blockDiary, setBlockDiary] = useState([]);

    useEffect(() => {
        FriendService.getFriends()
            .then(res => {
                setFriends(res.data.data.friends);
                setTmp(res.data.data.friends);
            })
            .catch(error => {
                Notification.showErrorMessage('???? x???y ra l???i khi l???y danh s??ch b???n b??');
            })
        UserService.getCurrentUser()
            .then(res => {
                setProfile(res.data.data);
                setBlockDiary(res.data.data.blocked_diary);
            })
            .catch(error => {
                Notification.showErrorMessage('???? x???y ra l???i khi l???y th??ng tin ng?????i d??ng')
            })
    }, []);

    const filtFriends = (value) => {
        let temp = [];
        tmp.forEach(element => {
            if ((element.username + '').toUpperCase().includes((value + '').toUpperCase())) {
                temp.push(element);
            }
        });
        setFriends(temp);
    }

    const blockAction = () => {
        let body = {
            user_id: selectedFriend,
            type: !blockDiary.includes(selectedFriend)
        }
        UserService.blockDiary(body)
            .then(res => {
                setProfile(res.data.data);
                setBlockDiary(res.data.data.blocked_diary);
                Notification.showSuccessMessage(body.type ? '???? ch???n ng?????i d??ng xem nh???t k??' : '???? b??? ch???n ng?????i d??ng th??nh c??ng');
            })
            .catch(err => {
                Notification.showErrorMessage('???? x???y ra l???i khi g???i y??u c???u');
            })
    }

    const cancelAction = () => {
        FriendService.remove({
            user_id: selectedFriend
        })
            .then(res => {
                if (res.data.success) {
                    Notification.showSuccessMessage(res.data.message);
                    let temp = [];
                    tmp.forEach(element => {
                        if (element._id != selectedFriend) {
                            temp.push(element);
                        }
                    });
                    setFriends(temp);
                    setTmp(temp);
                } else {
                    Notification.showErrorMessage(res.data.message);
                }
            })
            .catch(err => {
                Notification.showErrorMessage('???? x???y ra l???i khi x??a b???n b??.')
            })
    }

    handlePress = (friendId) => {
        setSelectedFriend(friendId);
        setShowActionSheet(true);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollStyle}>
                <View style={styles.searchContainer}>
                    <FontAwesomeIcon size={24} icon={faSearch} color={COLOR.text} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={'T??m ki???m...'}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => filtFriends(value)}
                    />
                </View>
                <Text style={styles.totalFriends}>{friends.length > 0 ? friends.length + ' b???n b??' : 'Kh??ng c?? b???n b?? n??o.'}</Text>
                {
                    friends.map(item => (
                        <View key={item._id}>
                            <FriendComponent
                                friendId={item._id}
                                isBlocked={blockDiary?.includes(item._id)}
                            />
                        </View>
                    ))
                }
            </ScrollView>
            <ActionSheet
                cancelButtonIndex={3}
                destructiveButtonIndex={0}
                useNativeIOS={false}
                migrateDialog
                options={[
                    {
                        label: blockDiary?.includes(selectedFriend) ? 'B??? ch???n ng?????i d??ng' : 'Ch???n ng?????i d??ng',
                        color: COLOR.text, onPress: () => blockAction()
                    },
                    { label: 'H???y k???t b???n', color: '#E74C3C', onPress: () => cancelAction() },
                ]}
                visible={showActionSheet}
                onDismiss={() => setShowActionSheet(false)}
            />
        </View>
    );
}

export default ListFriendComponent;