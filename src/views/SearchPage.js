import React, { useState, useEffect } from 'react';
import { Tab, TabView } from '@rneui/themed';
import {
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Avatar } from 'react-native-ui-lib';

import Feed from '../components/home/Feed';
import HeaderSearch from '../components/header-search/HeaderSearch';
import Notification from '../utils/Notification';
import PostService from '../helper/services/PostService';
import UserService from '../helper/services/UserService';
import FriendService from '../helper/services/FriendService';
import { Alert } from 'react-native';
import { COLOR } from '../constants/constants';

const styles = {
  Container: {
    flex: 1,
    backgroundColor: COLOR.background
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  tabInnerText: {
    color: '#7E41BB',
  },
  Row: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  User: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222121',
    marginRight: 3,
  },
  Address: {
    fontSize: 10,
    color: '#747476',
    marginRight: 4,
  },
  BtnFn: {
    paddingLeft: 40,
    justifyContent: 'center',
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
};

const SearchPage = ({ navigation }) => {
  const sortFnc = (a, b) => (b.createdAt > a.createdAt ? 1 : -1);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [index, setIndex] = useState(0);

  const searchFuntion = keyword => {
    
    if (index) {
      UserService.search({ keyword: keyword })
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchUsers(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage(
            'Đã xảy ra lỗi khi tìm kiếm người dùng',
          );
        });
    } else {
      PostService.search({ keyword: keyword })
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchPosts(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage('Đã xảy ra lỗi khi tìm kiếm bài viết');
        });
    }
  };

  const PostList = () => {
    return (
      <ScrollView>
        {
          searchPosts.length > 0 
          ?
          searchPosts.map(item => (
            <View key={item._id}>
              <Feed
                id={item._id}
                described={item.described ? item.described : 'No description'}
                countComments={item.countComments}
                authorId={item.author}
                images={item.images}
                videos={item.videos}
                likes={item.like}
                createdAt={item.createdAt}
                isLike={item.isLike}
              />
            </View>
          ))
          :
          <Text style={{ color: COLOR.text, fontSize: 18, fontWeight: 'bold' }}>
            Không có bài viết nào được tìm thấy.
          </Text>
        }
      </ScrollView>
    );
  };

  const handleAvatarPress = id => {
    navigation.navigate('ProfileScreen', { userId: id });
  };

  const User = ({ id, username, address, avatar }) => {
    const [friendStatus, setFriendStatus] = useState('-1');
    try {
      FriendService.status(id).then(res => {
        setFriendStatus(res.data.data);
        console.log('Friend Status: ' + friendStatus);
      });
    } catch (e) {
      console.log(e);
    }

    let title;
    let btnFn = () => null;
    let isDisable = false;
    if (friendStatus.toString() === '-1') {
      title = 'Gửi lời mời kết bạn';
      btnFn = () => {
        FriendService.sendRequest({ user_id: id })
          .then(res => {
            Alert.alert(res.data.message);
          })
          .catch(e => {
            console.log(e);
          });
      };
    } else if (friendStatus.toString() === '0') {
      title = 'Hủy lời mời kết bạn';
      btnFn = () => {
        FriendService.cancelSendRequest({ user_id: id })
          .then(res => {
            Alert.alert(res.data.message);
          })
          .catch(e => {
            console.log(e);
          });
      };
    } else {
      title = 'Xem trang cá nhân';
      btn = () => handleAvatarPress(id);
    }

    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.Row}>
          <Avatar
            source={{ uri: avatar }}
            size={36}
            onPress={() => handleAvatarPress(id)}
          />
          <View style={{ paddingLeft: 10 }}>
            <TouchableOpacity onPress={() => handleAvatarPress(id)}>
              <Text style={styles.User}>{username}</Text>
            </TouchableOpacity>
            <Text style={styles.Address}>
              {address ? `Sống tại ${address}` : null}
            </Text>
          </View>
        </View>
        <View style={styles.BtnFn}>
          <Button title={title} onPress={btnFn} disabled={isDisable} />
        </View>
      </View>
    );
  };

  const UserList = () => {
    console.log(searchUsers);
    return (
      <ScrollView>
        {
          searchUsers.length > 0 
          ?
          searchUsers.map(item => (
            <View key={item._id}>
              <User
                id={item._id}
                username={item.username}
                address={item.address ? item.address : null}
                avatar={item.avatar}
              />
            </View>
          ))
          :
          <Text style={{ color: COLOR.text, fontSize: 18, fontWeight: 'bold' }}>
            Không có người dùng nào được tìm thấy.
          </Text>
        }
      </ScrollView>
    );
  };

  handleGoback = () => {
    navigation.goBack();
  }

  handleSearch = (keyword) => {
    if (keyword != null && keyword != undefined && keyword.length > 0) {
      searchFuntion(keyword);
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <HeaderSearch
        navigation={navigation}
      />
      <View style={styles.Container}>
        <View style={{ width: '100%', height: '100%' }}>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{ backgroundColor: COLOR.icon }}
            style={{ width: '100%', backgroundColor: '#E5E8E8' }}
          >
            <Tab.Item
              title="Bài viết"
              titleStyle={(active) => ({
                color: active ? COLOR.icon : COLOR.text,
                fontSize: 18,
                fontFamily: 'Roboto'
              })}
            />
            <Tab.Item
              title="Mọi người"
              titleStyle={(active) => ({
                color: active ? COLOR.icon : COLOR.text,
                fontSize: 18,
                fontFamily: 'Roboto'
              })}
            />
          </Tab>

          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ width: '100%' }}>
              <PostList />
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <UserList />
            </TabView.Item>
          </TabView>
        </View>
      </View>
    </>
  );
};

export default SearchPage;
