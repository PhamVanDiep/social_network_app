import React, {useState, useEffect} from 'react';

import {
  Animated,
  StatusBar,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {TabView, SceneMap, ViewPagerBackend} from 'react-native-tab-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Avatar} from 'react-native-ui-lib';

import Feed from '../components/home/Feed';
import HeaderSearch from '../components/header-search/HeaderSearch';
import Notification from '../utils/Notification';
import PostService from '../helper/services/PostService';
import UserService from '../helper/services/UserService';
import FriendService from '../helper/services/FriendService';
import { Alert } from 'react-native';
import ButtonFunction from '../components/personal-profile/button-function';

const styles = {
  Container: {
    flex: 1,
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

const SearchPage = ({navigation}) => {
  const [searchPageType, setSearchPageType] = useState('post');
  const [keyword, setKeyword] = useState('');
  const [navbarItemActiveIndex, setNavbarItemActiveIndex] = useState(0);
  const sortFnc = (a, b) => (b.createdAt > a.createdAt ? 1 : -1);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  if (searchPageType === 'post') {
    useEffect(() => {
      PostService.search({keyword: ''})
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchPosts(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage('Đã xảy ra lỗi khi tìm kiếm bài viết');
        });
    }, []);
  } else {
    useEffect(() => {
      UserService.search({keyword: ''})
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
    }, []);
  }

  const searchFuntion = keyword => {
    if (searchPageType === 'post') {
      PostService.search({keyword: keyword})
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchPosts(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage('Đã xảy ra lỗi khi tìm kiếm bài viết');
        });
    } else {
      UserService.search({keyword: keyword})
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
    }
  };

  const PostList = () => {
    return (
      <ScrollView>
        {searchPosts.sort(sortFnc).length > 0 &&
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
          ))}
      </ScrollView>
    );
  };

  const handleAvatarPress = id => {
    navigation.navigate('ProfileScreen', {userId: id});
  };

  const User = ({id, username, address, avatar}) => {
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
        FriendService.sendRequest({user_id: id})
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
        FriendService.cancelSendRequest({user_id: id})
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
      <View style={{marginTop: 10}}>
        <View style={styles.Row}>
          <Avatar
            source={{uri: avatar}}
            size={36}
            onPress={() => handleAvatarPress(id)}
          />
          <View style={{paddingLeft: 10}}>
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
        {searchUsers.sort(sortFnc).length > 0 &&
          searchUsers.map(item => (
            <View key={item._id}>
              <User
                id={item._id}
                username={item.username}
                address={item.address ? item.address : null}
                avatar={item.avatar}
              />
            </View>
          ))}
      </ScrollView>
    );
  };

  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      {
        key: 'post',
        title: 'Bài viết',
      },
      {
        key: 'user',
        title: 'Mọi người',
      },
    ],
  });

  const renderScene = SceneMap({
    post: PostList,
    user: UserList,
  });

  // _renderTabbar = (props) => {
  //     const inputRange = props.navigationState.routes.map((x, i) => i);
  //     return (
  //         <View style={styles.tabBar}>
  //             {props.navigationState.routes.map((route, i) => {
  //             const opacity = props.position.interpolate({
  //                 inputRange,
  //                 outputRange: inputRange.map((inputIndex) =>
  //                 inputIndex === i ? 1 : 0.5
  //                 ),
  //             });

  //             return (
  //                 <TouchableOpacity
  //                 style={styles.tabItem}
  //                 onPress={() => this.setState({ index: i })}>
  //                 <Animated.Text style={{ opacity, color: '#7E41BB' }}>{route.title}</Animated.Text>
  //                 </TouchableOpacity>
  //             );
  //             })}
  //         </View>
  //     );
  // }

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <HeaderSearch
        navigation={navigation}
        setSearchKeyword={setKeyword}
        actionFn={() => searchFuntion(keyword)}
      />
      <View style={styles.Container}>
        <TabView
          navigationState={navigationState}
          renderScene={renderScene}
          onIndexChange={index => {
            setNavigationState({...navigationState, index: index});
            setSearchPageType(navigationState.routes[index].key);
          }}
          // renderTabBar={this._renderTabbar}
          renderPager={props => (
            <ViewPagerBackend {...props} transitionStyle="curl" />
          )}
        />
      </View>
    </>
  );
};

export default SearchPage;
