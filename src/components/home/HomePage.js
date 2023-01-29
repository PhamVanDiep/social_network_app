import React, { useState, useEffect, useRef } from 'react';

import { StatusBar, ScrollView, View, RefreshControl, ActivityIndicator } from 'react-native';

import AppBar from './AppBar';
import ToolBar from './ToolBar';
import Feed from './Feed';

import Notification from "../../utils/Notification";
import PostService from "../../helper/services/PostService";
import { isCloseToBottom } from '../../utils/utils';
import { COLOR } from '../../constants/constants';

const styles = {
    Container: {
        flex: 1,
        backgroundColor: COLOR.background
    }
}

const HomePageComponent = ({ navigation }) => {
    const [feeds, setFeeds] = useState([]);
    const [feedsTmp, setFeedsTmp] = useState([]);
    const scrollViewRef = useRef();
    const [refreshing, setRefreshing] = useState(false);
    const [bottomLoading, setBottomLoading] = useState(false);

    useEffect(() => {
        setRefreshing(true);
        loadData(0, 10);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabLongPress', (e) => {
            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        });
        return unsubscribe;
    }, [navigation]);

    const loadData = (skip, limit) => {
        PostService.getList('', skip, limit)
            .then(res => {
                setFeeds(res.data.data);
            })
            .catch(error => {
                Notification.showErrorMessage('Đã xảy ra lỗi khi lấy danh sách bài viết');
            })
            .finally(() => {
                setRefreshing(false);
            });
    }

    const onRefresh = () => {
        setRefreshing(true);
        loadData(0, feeds.length + 5);
    }

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

    const appendData = () => {
        setBottomLoading(true);
        PostService.getList('', feeds.length, 10)
            .then(res => {
                setFeedsTmp(res.data.data);
            })
            .catch(error => {
                Notification.showErrorMessage('Đã xảy ra lỗi khi lấy danh sách bài viết');
            });
        let tmp = [];
        feedsTmp.forEach(ee => {
            let hasPost = false;
            feeds.forEach(e => {
                if (ee._id == e._id) {
                    hasPost = true;
                }
            });
            if (!hasPost) {
                tmp.push(ee);
            }
        })
        setFeeds([...feeds, ...tmp]);
        // if (tmp.length <= 0) {
        //     Notification.showWarningMessage('Thông báo', 'Bạn đã xem hết tin');
        // } else {
        //     setFeeds([...feeds, ...tmp]);
        // }
        setBottomLoading(false);
    }

    return (
        <>
            <StatusBar
                backgroundColor="#FFFFFF"
                barStyle="dark-content"
            />
            <View style={styles.Container}>
                {
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={{ flexGrow: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                appendData();
                            }
                        }}
                    >
                        <AppBar />
                        <View style={{ width: '100%', height: 1, backgroundColor: '#AEB6BF' }} />
                        <ToolBar />
                        {
                            feeds.map(item => (
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
                        <ActivityIndicator size="small" color={COLOR.icon} animating={bottomLoading} />
                    </ScrollView>
                }
            </View>
        </>
    );
};



export default HomePageComponent;
