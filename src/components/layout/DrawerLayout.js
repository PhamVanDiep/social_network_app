import {
  Dimensions,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import ArrowLeftIcon from '../../../assets/icon/ArrowLeftIcon';
import {View} from 'react-native-ui-lib';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// direction : h (horizontal) | v (vertical)
const DrawerLayout = ({setOpen, children, direction}) => {
  if (direction === 'h')
    return <HorizontalLayout setOpen={setOpen} children={children} />;
  if (direction === 'v')
    return <VerticalLayout setOpen={setOpen} children={children} />;
};

const HorizontalLayout = ({setOpen, children}) => {
  const windowWidth = Dimensions.get('window').width;
  const range = useRef(new Animated.Value(1)).current;
  const left = range.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowWidth],
  });
  const close = () => {
    Animated.timing(range, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  useEffect(() => {
    Animated.timing(range, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        left: left,
        zIndex: 2,
      }}>
      <TouchableHighlight
        underlayColor={'#e1e1e1'}
        onPress={() => {
          close();
        }}
        style={{
          padding: 12,
          borderRadius: 32,
        }}>
        <ArrowLeftIcon />
      </TouchableHighlight>
      {children}
    </Animated.View>
  );
};

const VerticalLayout = ({setOpen, children}) => {
  const windowHeight = Dimensions.get('window').height;
  let p = 0;
  const range = useRef(new Animated.Value(1)).current;
  const top = range.interpolate({
    inputRange: [0, 1],
    outputRange: [p, windowHeight],
  });
  const close = () => {
    Animated.timing(range, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };
  useEffect(() => {
    Animated.timing(range, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <TouchableWithoutFeedback
    // onPress={e => {
    //   if (e.nativeEvent.pageY < windowHeight / 2) close();
    // }}
    >
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(33,33,33,0.8)',
          flex: 1,
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            flex: 1,
            backgroundColor: 'white',
            width: '100%',
            height: windowHeight,
            top: top,
            zIndex: 2,
            // borderTopLeftRadius: 24,
            // borderTopRightRadius: 24,
          }}>
          <TouchableHighlight
            onPress={() => {
              close();
            }}
            style={{
              padding: 12,
              borderRadius: 32,
              // marginTop: -40,
              zIndex: 2,
              right: 0,
              position: 'absolute',
            }}>
            <FontAwesomeIcon icon={faXmark} style={{color: 'white'}} />
          </TouchableHighlight>
          {children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default DrawerLayout;
