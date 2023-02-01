import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/login';

import PersonalProfileScreen from '../views/personal-profile';
import TmpScreen from '../views/temporary';
import Register from '../views/register';
import CreatePost from '../views/createpost';
import PickImg from '../test/pickImage';
import Comment from '../views/Comment';
import Init from '../views/Init';
import InviteComponent from '../components/friends/invite/InviteComponent';
import ListFriendComponent from '../components/friends/list/ListFriendComponent';
import FriendshipComponent from '../components/friends/FriendshipComponent';
import Homepage from '../views/Homepage';
import { UploadImage } from '../test/upload';
import DetailPost from '../components/detail_post';

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
        <Stack.Screen name='ListInvitations' component={ InviteComponent } options={options} />
        <Stack.Screen name='ListFriends' component={ListFriendComponent} options={options} />
        <Stack.Screen name='Friends' component={FriendshipComponent} options={options} />
        <Stack.Screen name="TopTop" component={TmpScreen} />
        <Stack.Screen name="UploadImageTest" component={UploadImage} options={options} />
        <Stack.Screen name="CommentPage" component={Comment} options={options} />
        <Stack.Screen name="LogIn" component={Login} options={options} />
        <Stack.Screen name="SignUp" component={Register} options={options} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={options} />
        <Stack.Screen name='DetailPost' component={DetailPost} options={options} />
        <Stack.Screen name="PickImg" component={PickImg} options={options} />
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
