import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailPost from '../components/detail_post';
import Settings from '../views/settings_page';
import Login from '../views/login';

import PersonalProfileScreen from '../views/personal-profile';
import TmpScreen from '../views/temporary';
import Register from '../views/register';
import CreatePost from '../views/createpost';
import PickImg from '../test/pickImage';

import EmojiTest from '../test/emoji_test';
import Comment from '../views/Comment';
import Init from '../views/Init';
import InviteComponent from '../components/friends/invite/InviteComponent';
import ListFriendComponent from '../components/friends/list/ListFriendComponent';
import FriendComponent from '../components/friends/list/FriendComponent';
import FriendshipComponent from '../components/friends/FriendshipComponent';
import Chat from '../views/Chat/Chats';
import Message from '../views/Chat/Message';
import SingleChat from '../components/chat/SingleChat';
import { TouchableOpacity } from 'react-native-ui-lib';
import NewConversation from '../views/Chat/NewConversation';
import Homepage from '../views/HomePage';
import { UploadImage } from '../test/upload';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const options = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen name='HomePage' component={Homepage} options={options} />
        <Stack.Screen name="Init" component={Init} options={options} />
        <Stack.Screen name='ListInvitations' component={InviteComponent} options={options} />
        <Stack.Screen name='ListFriends' component={ListFriendComponent} options={options} />
        <Stack.Screen name='Friends' component={FriendshipComponent} options={options} />
        <Stack.Screen name="TopTop" component={TmpScreen} />
        <Stack.Screen name="UploadImageTest" component={UploadImage} options={options} />
        <Stack.Screen name="CommentPage" component={Comment} options={options} />
        <Stack.Screen name="LogIn" component={Login} options={options} />
        <Stack.Screen name="SignUp" component={Register} options={options} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={options} />
        <Stack.Screen name="PickImg" component={PickImg} options={options} />
        <Stack.Screen name="Chat" component={Chat} options={options} />
        <Stack.Screen name="Message" component={Message} options={options} />
        <Stack.Screen name="NewConversation" component={NewConversation} options={options} />
        <Stack.Screen name="Settings" component={Settings} options={options} />
        <Stack.Screen
          name="PersonalProfileScreen"
          component={PersonalProfileScreen}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
