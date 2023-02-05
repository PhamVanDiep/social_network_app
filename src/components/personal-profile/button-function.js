import FriendService from '../../helper/services/FriendService';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons/faEllipsis';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons/faUserCheck';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState, useEffect, memo} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {ActionSheet} from 'react-native-ui-lib';
import MessengerIcon from '../../assets/svg/messenger';
import {app_color} from '../../constants/theme/config';
import Notification from '../../utils/Notification';
import UserService from '../../helper/services/UserService';
const ButtonFunction = ({userInfo, isGuest, navigation}) => {
  const [isFriend, setFriend] = useState(false);
  const [friendActionOpen, setFriendActionOpen] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  const addFriendRequest = add => {
    if (add) {
      FriendService.sendRequest({user_id: userInfo._id})
        .then(res => {
          // console.log('add', res.data);
          setSendRequest(true);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      FriendService.cancelSendRequest({userId: userInfo._id})
        .then(res => {
          // console.log('cancel', res.data);
          setSendRequest(false);
        })
        .catch(e => console.log(e));
    }
  };
  useEffect(() => {
    if (isGuest) checkFriend();
  }, [userInfo]);
  const checkFriend = () => {
    FriendService.getFriends()
      .then(res => {
        let friendsList = res.data.data.friends;
        friendsList.map(u => {
          if (u._id === userInfo._id) {
            setFriend(true);
            return;
          }
          return;
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
  const blockAction = () => {
    let body = {
      user_id: userInfo._id,
      type: true,
    };
    UserService.blockDiary(body)
      .then(res => {
        Notification.showSuccessMessage('Đã chặn người dùng xem nhật ký');
      })
      .catch(err => {
        Notification.showErrorMessage('Đã xảy ra lỗi khi gửi yêu cầu' + err);
      });
  };

  const cancelAction = () => {
    // console.log(userInfo._id);
    FriendService.remove({user_id: userInfo._id})
      .then(res => {
        if (res.data.success) {
          Notification.showSuccessMessage(res.data.message);
          setFriend(false);
        } else {
          Notification.showErrorMessage(res.data.message);
        }
      })
      .catch(err => {
        Notification.showErrorMessage('Đã xảy ra lỗi khi xóa bạn bè. ' + err);
      });
  };
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 20,
          paddingHorizontal: 16,
        }}>
        <TouchableHighlight
          underlayColor={'transparent'}
          style={{flex: 4}}
          onPress={() => {
            if (isGuest) {
              if (isFriend) {
                setFriendActionOpen(true);
              } else {
                addFriendRequest(!sendRequest);
              }
            } else {
            }
          }}>
          {isGuest ? (
            isFriend ? (
              <View
                style={[styles.buttonFunction, {backgroundColor: '#c0c0c0'}]}>
                <FontAwesomeIcon icon={faUserCheck} style={{marginRight: 10}} />
                <Text style={{fontWeight: 'bold', fontSize: 16}}>Bạn bè</Text>
              </View>
            ) : (
              <View
                style={[
                  styles.buttonFunction,
                  {backgroundColor: app_color.color1},
                ]}>
                <FontAwesomeIcon
                  icon={sendRequest ? faUserCheck : faUserPlus}
                  style={{color: 'white', marginRight: 10}}
                />
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  {sendRequest ? 'Hủy lời mời' : 'Thêm bạn'}
                </Text>
              </View>
            )
          ) : (
            <View
              style={[
                styles.buttonFunction,
                {backgroundColor: app_color.color1},
              ]}>
              <FontAwesomeIcon
                icon={faCirclePlus}
                style={{color: 'white', marginRight: 10}}
              />
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Thêm tin
              </Text>
            </View>
          )}
        </TouchableHighlight>

        <TouchableHighlight
          style={{flex: 3.5, marginHorizontal: 12}}
          underlayColor={'transparent'}
          onPress={() => {
            if (isGuest) {
            } else {
              navigation.navigate('UpdateInfoScreen', {userInfo: userInfo});
            }
          }}>
          {isGuest ? (
            <View
              style={[
                styles.buttonFunction,
                {backgroundColor: isFriend ? app_color.color1 : '#c0c0c0'},
              ]}>
              <MessengerIcon
                height={20}
                width={20}
                fill={isFriend ? 'white' : '#212121'}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: isFriend ? 'white' : '#212121',
                  marginLeft: 12,
                }}>
                Nhắn tin
              </Text>
            </View>
          ) : (
            <View style={[styles.buttonFunction, {backgroundColor: '#c0c0c0'}]}>
              <FontAwesomeIcon icon={faPen} style={{marginRight: 10}} />
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#212121'}}>
                Sửa thông tin
              </Text>
            </View>
          )}
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => {}}
          style={[
            styles.buttonFunction,
            {backgroundColor: '#c0c0c0', flex: 1},
          ]}>
          <FontAwesomeIcon icon={faEllipsis} />
        </TouchableHighlight>
      </View>
      <ActionSheet
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        useNativeIOS={false}
        migrateDialog
        options={[
          {
            label: 'Chặn người dùng',
            onPress: () => blockAction(),
          },
          {
            label: 'Hủy kết bạn',
            onPress: () => cancelAction(),
          },
        ]}
        visible={friendActionOpen}
        onDismiss={() => setFriendActionOpen(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    marginHorizontal: 16,
  },
  descriptionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#b9b9b9',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    paddingVertical: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  info: {
    marginLeft: 8,
    fontSize: 14,
  },
  buttonFunction: {
    height: 40,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ButtonFunction);
