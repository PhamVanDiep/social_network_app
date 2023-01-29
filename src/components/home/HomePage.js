import React, { useState, useEffect } from 'react';

import { StatusBar, ScrollView, View } from 'react-native';

import AppBar from './AppBar';
import ToolBar from './ToolBar';
import Feed from './Feed';

import Notification from "../../utils/Notification";
import PostService from "../../helper/services/PostService";

const styles = {
    Container: {
        flex: 1,
    },
    NavBar: {
        width: '100%',
        height: 48,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    NavbarItem: {
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    NavbarItemActive: {
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1878f3',
        borderTopWidth: 2,
        borderTopColor: '#1878f3',
    },
    NavbarItemText: {
        color: '#333',
        fontSize: 10,
    },
    NoActiveNavbarIcon: {
        color: '#ccc',
        border: 1,
    }
}

const HomePageComponent = ({ navigation }) => {
    const [feeds, setFeeds] = useState([]);

    const sortFnc = (a, b) => b.createdAt > a.createdAt ? 1 : -1

    useEffect(() => {
        PostService.getList()
            .then(res => {
                setFeeds(res.data.data);
            })
            .catch(error => {
                Notification.showErrorMessage('Đã xảy ra lỗi khi lấy danh sách bài viết');
            })
    }, []);

    handleAvatarPress = () => {
        navigation.navigate('PersonalProfileScreen')
    }

    handleFocus = () => {
        navigation.navigate('CreatePost');
    }

    handleCommentPress = (postId) => {
        navigation.navigate('CommentPage', {
            postId: postId,
        });
    }

    return (
        <>
            <StatusBar
                backgroundColor="#FFFFFF"
                barStyle="dark-content"
            />
            <View style={styles.Container}>
                {
                    <ScrollView>
                        <AppBar />
                        <ToolBar />
                        {
                            feeds.sort(sortFnc).length > 0 && feeds.map(item => (
                                <View key={item._id}>
                                    <Feed
                                        id={item._id}
                                        described={item.described ? item.described : ""}
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
                        }
                    </ScrollView>
                }
            </View>
        </>
    );
};



export default HomePageComponent;
