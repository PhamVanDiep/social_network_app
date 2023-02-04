import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Animated,
  Dimensions,
} from 'react-native';
import React, {memo, useState, useEffect, useRef} from 'react';
import CameraIcon from '../../../assets/icon/CameraIcon';
import defaultAvatar from '../../../assets/images/default-avatar-profile.jpg';
import defaultCoverBackground from '../../../assets/images/default-cover-background.png';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons/faEllipsis';
import {Image} from 'react-native-ui-lib';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ArrowLeftIcon from '../../../assets/icon/ArrowLeftIcon';
import DrawerLayout from '../layout/DrawerLayout';
const PersonalProfileHeader = ({userInfo}) => {
  const [avt, setAvt] = useState(
    '../../../assets/images/default-avatar-profile.jpg',
  );
  const [cb, setCb] = useState(
    '../../../assets/images/default-cover-background.png',
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAvt(userInfo.avatar);
    setCb(userInfo.cover_image);
  }, [userInfo]);
  return (
    <>
      <View style={styles.coverBackground}>
        <View>
          <Image
            style={styles.coverBackgroundImage}
            source={{
              uri: cb,
            }}
            resizeMode="cover"
          />
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image
              source={{uri: avt}}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%',
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.cameraIcon}>
            <CameraIcon />
          </View>
        </View>
        <View style={[styles.cameraIcon, {bottom: 10, right: 16}]}>
          <CameraIcon />
        </View>
        <TouchableHighlight
          style={[styles.cameraIcon, {top: 10, right: 16}]}
          onPress={() => {
            setOpen(true);
          }}>
          <FontAwesomeIcon icon={faEllipsis} />
        </TouchableHighlight>

        <View style={styles.profileName}>
          <Text style={styles.name}>{userInfo.username}</Text>
        </View>
      </View>

      {open ? <DrawerLayout setOpen={setOpen} direction={'vertical'} /> : <></>}
    </>
  );
};

const styles = StyleSheet.create({
  coverBackground: {
    width: '100%',
    height: 200,
    position: 'relative',
    marginBottom: 100,
  },

  coverBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#fefefe',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  cameraIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  profileName: {
    position: 'relative',
    marginTop: 60,
    bottom: 0,
    left: 16,
  },
  name: {
    color: '#212121',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default memo(PersonalProfileHeader);
