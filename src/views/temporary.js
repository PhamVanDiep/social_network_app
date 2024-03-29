import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, selectAuth} from '../store/auth/authSlice';
const TmpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(selectAuth);
  return (
    <ScrollView>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('ProfileScreen', {
            userId: user._id,
          });
        }}>
        <Text style={styles.text}>ProfileScreen</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('LogIn');
        }}>
        <Text style={styles.text}>LogIn</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('HomePage');
        }}>
        <Text style={styles.text}>Homepage</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.text}>SignUp</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('CreatePost');
        }}>
        <Text style={styles.text}>CreatePost</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('PickImg');
        }}>
        <Text style={styles.text}>PickImg</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('Friends');
        }}>
        <Text style={styles.text}>Friends Tab</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('ListInvitations');
        }}>
        <Text style={styles.text}>List invitations</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('CommentPage', {
            postId: '639db920e1077b28b889119f',
          });
        }}>
        <Text style={styles.text}>Comment Page</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('UploadImageTest');
        }}>
        <Text style={styles.text}>Upload Image Test</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <Text style={styles.text}>Settings</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('Chat');
        }}>
        <Text style={styles.text}>Chat</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('SearchPage');
        }}>
        <Text style={styles.text}>SearchPage</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.alertButton}
        onPress={() => {
          dispatch(logoutUser());
          navigation.navigate('LogIn');
        }}>
        <Text style={styles.text}>Logout</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 12,
    padding: 12,
    backgroundColor: 'blue',
  },
  alertButton: {
    margin: 12,
    padding: 12,
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TmpScreen;
