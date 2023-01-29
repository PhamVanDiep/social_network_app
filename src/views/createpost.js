import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Avatar, Incubator, View, Button, PanningProvider, ModalProps } from 'react-native-ui-lib';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImageToFirebase } from '../utils/upload_image';
import { COLOR, FIREBASE_CONFIG } from '../constants/constants';
import PostService from '../helper/services/PostService';
import UserService from '../helper/services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage } from "@fortawesome/free-regular-svg-icons";
import ListImageComponent from '../components/ListImageComponent';
import Video from 'react-native-video';
import Notification from '../utils/Notification';
import {buttonColor} from '../constants/theme/config';


const { TextField } = Incubator;
const CreatePost = () => {
    const [user, setUser] = useState({});
    const [isVideo, setVideo] = useState(false);
    const [asset, setAsset] = useState([]);
    const [content, setContent] = useState('');
    const [dialogVisible, setVisible] = useState(false);
    // image uris after saving to firebase
    const [imageURI, setImageURI] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const modalProps = { supportedOrientations: ['portrait', 'landscape'] };
    const headerProps = { title: 'Lựa chọn phương thức' };

    const [widenInput, setWiden] = useState(false);

    useEffect(() => {
        UserService.getCurrentUser()
            .then(res => {
                console.log("res: " + res.data.data)
                setUser(res.data.data);
                console.log(res.data.data.avatar);
            })
            .catch(error => {
                Notification.showErrorMessage('Đã xảy ra lỗi khi lấy thông tin người dùng');
            })
    }, [])

    const removeImageOrVideo = (item) => {
        if (item.type.includes('video')) setVideo(false);
        setAsset(current => current.filter(value => {
            return value.uri !== item.uri;
        }));
    };

    const runCamera = async () => {
        let options = {
            mediaType: 'mixed',
            videoQuality: 'high',
            durationLimit: 10,
            selectionLimit: 0,
            presentationStyle: 'pageSheet'
        };
        let response = await launchImageLibrary(options);
        console.log("response", response);
        if (response) {
            console.log('asset length b4 add', asset.length);
            let notification = false;
            let list = response.assets;
            let hasVideo = false;
            if (isVideo) notification = true;
            else {
                if (asset.length >= 4) notification = true;
                else {
                    for (value of list) {
                        if (value.type.includes('video')) {
                            hasVideo = true;
                        }
                    }
                    if (hasVideo) {
                        console.log("list length", list.length == 1);
                        if (asset.length == 0 && list.length == 1) {
                            setAsset([...asset, ...list]);
                            setVideo(true);
                        }
                        else {
                            notification = true;
                        }
                    } else {
                        if ((asset.length + list.length) <= 4) {
                            setAsset([...asset, ...list]);
                        } else {
                            notification = true;
                        }
                    }
                }
            }
            if (notification) Notification.showWarningMessage('Chỉ được đăng 1 video hoặc tối đa 4 ảnh');
        }
        setVisible(false);

    };

    const runImageLibrary = async () => {
        let options = {
            mediaType: 'mixed',
            videoQuality: 'high',
            durationLimit: 10,
            selectionLimit: 0,
            presentationStyle: 'pageSheet'
        };
        let response = await launchImageLibrary(options);
        console.log("response", response);
        if (response) {
            console.log('asset length b4 add', asset.length);
            let notification = false;
            let list = response.assets;
            let hasVideo = false;
            if (isVideo) notification = true;
            else {
                if (asset.length >= 4) notification = true;
                else {
                    for (value of list) {
                        if (value.type.includes('video')) {
                            hasVideo = true;
                        }
                    }
                    if (hasVideo) {
                        console.log("list length", list.length == 1);
                        if (asset.length == 0 && list.length == 1) {
                            setAsset([...asset, ...list]);
                            setVideo(true);
                        }
                        else {
                            notification = true;
                        }
                    } else {
                        if ((asset.length + list.length) <= 4) {
                            setAsset([...asset, ...list]);
                        } else {
                            notification = true;
                        }
                    }
                }
            }
            if (notification) Notification.showWarningMessage('Chỉ được đăng 1 video hoặc tối đa 4 ảnh');
        }
        console.log(asset);
        setVisible(false);
    };

    const handleUploadPhoto = async () => {
        setLoading(true);
        console.log("asset before upload to firebase", asset);
        const images = await uploadImageToFirebase(asset, `${FIREBASE_CONFIG.IMAGES_STORAGE}` + `${user.phonenumber}`);
        // setImageURI([...imageURI, ...images]);
        // console.log(imageURI);
        if (!isVideo) {
            const requestBody = {
                described: content,
                images: images,
                videos: null,
            };
            await PostService.create(requestBody)
                .then(res => {
                    console.log(res.data.data);
                    Notification.showSuccessMessage('Tạo bài viết thành công');
                })
                .catch(err => {
                    console.log(err);
                    Notification.showErrorMessage('Lỗi khi tạo bài viết');
                });
        } else {
            const requestBody = {
                described: content,
                images: null,
                videos: images,
            };
            await PostService.create(requestBody)
                .then(res => {
                    console.log(res.data.data)
                    Notification.showSuccessMessage('Tạo bài viết thành công');
                })
                .catch(err => {
                    console.log(err);
                    Notification.showErrorMessage('Lỗi khi tạo bài viết');
                });
        }
        // console.log(images);
        // console.log(imageURI);
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View flex row style={styles.infoBar}>
                    <View flex row>
                        <Avatar source={{
                            uri: user.avatar,
                        }} size={60}></Avatar>
                        <View marginL-10>
                            <Text style={styles.userName}>{user.username}</Text>
                            <Text marginL-10>Chia sẻ cảm xúc của bạn</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.iconWrap} onPress={() => setVisible(true)}>
                        <FontAwesomeIcon size={30} icon={faImage} color={COLOR.icon} />
                    </TouchableOpacity>
                </View>
                <View flex style={styles.input}>
                    <View>
                        <TextInput
                            multiline={true}
                            // numberOfLines={widenInput?4:1}
                            onChangeText={text => setContent(text)}
                            style={styles.text}
                            placeholder='Bạn đang nghĩ gì?'
                            value={content}
                        // onFocus={() => setWiden(true)}
                        // onBlur={() => setWiden(false)}
                        />
                    </View>
                </View>

                {!isVideo && <ListImageComponent listImage={asset} isVideo={false} removeMethod={removeImageOrVideo} />}
                {isVideo && <ListImageComponent video={asset[0]} isVideo={true} removeMethod={removeImageOrVideo} />}
            </ScrollView>
            <Button margin-10 borderRadius={5} style={{height: 42}} color={buttonColor.color1} onPress={() => handleUploadPhoto()}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 18,
                    lineHeight: 18,
                }}>Đăng bài</Text>
                <ActivityIndicator style={{position: 'absolute', right: 10}} animating={isLoading} size="large" color={COLOR.icon} />
            </Button>
            <Incubator.Dialog
                visible={dialogVisible}
                onDismiss={() => setVisible(false)}
                panDirection={PanningProvider.Directions.UP}
                center
                modalProps={modalProps}
                headerProps={headerProps}
            >
                {
                    <View style={styles.dialog}>
                        <Button size={Button.sizes.medium}
                            label="Chụp ảnh"
                            borderRadius={0}
                            onPress={runCamera}
                            style={{ width: 100, height: 50, marginLeft: 10 }}
                        />
                        <Button size={Button.sizes.medium}
                            label="Chọn ảnh"
                            borderRadius={0}
                            onPress={runImageLibrary}
                            style={{ width: 100, height: 50 }} />

                    </View>
                }
            </Incubator.Dialog>
        </SafeAreaView>
    );
}

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        color: COLOR.background,
    },
    scrollView: {

    },
    infoBar: {
        paddingHorizontal: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#b9b9b9',
        paddingVertical: 10,
        alignItems: 'center',
    },
    input: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 80,
        paddingBottom: 10
        // borderBottomWidth: 1,
        // borderBottomColor: '#b9b9b9',
    },
    text: {
        paddingHorizontal: 10,
        fontSize: 20,
    },
    button: {
        padding: 10
    },
    userName: {
        fontSize: 20,
        fontWeight: '700'
    },
    dialog: {
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
