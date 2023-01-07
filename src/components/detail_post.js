import React, { Component, useState } from 'react'
import { TextInput, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Incubator, View, RadioGroup, RadioButton, Text, Checkbox, Colors, Button, Icon, Assets, Image, TouchableOpacity } from 'react-native-ui-lib';
import _ from 'lodash';
import { StyleCustom } from '../views/assets/styles';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

StyleCustom();

var imgArray = [];
const { TextField } = Incubator;
const options = ['Nam', 'Nữ'];
const images = [
    require('../assets/icons/image.png'),
    require('../assets/icons/image.png'),
    require('../assets/icons/image.png'),
    require('../assets/icons/image.png'),
];

const showImage = () => {
    var i = 0;
    images.forEach(img => {
        console.log(img);
        imgArray.push(
            <Image source={img} 
            margin-5 key={i}
            style={{width:null, borderRadius:10}}></Image>
        );
        i++;
    });
}
showImage();

const DetailPost = () => {

    var [like, setLike] = useState('Like');
    var [likeImg, setLikeImg] = useState(require('../assets/icons/like.jpg'));

    function changeLike() {
        if(like === 'Like') {
            setLike('Liked');
            setLikeImg(require('../assets/icons/liked.png'));
        }
        else {
            setLike('Like');
            setLikeImg(require('../assets/icons/like.jpg'));
        }
    }
    return (
       <ScrollView bg-white style={{backgroundColor: '#fff'}}>
            <View paddingH-20>
                {/* ten nguoi dang */}
                <View flex-apply spread row center>
                    <View flex row paddingT-10>
                        <Avatar source={require('../assets/icons/avatar.png')}
                        style={{width:40, height:40, borderRadius:5}}></Avatar>
                        <View marginL-8>
                            <Text h4>
                                Bui Khac Dat
                            </Text>
                            <Text style={{opacity: 0.5}}>
                                10h
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Icon source={require('../assets/icons/arrow_left.png')} size={24}></Icon>
                    </View>
                </View>

                {/* content post */}
                <View paddingB-4 marginT-16
                style={{borderBottomWidth:1, borderColor: '#f0f0f1'}}>
                    <Text marginB-8 normalSize>
                        This is content of this post.
                    </Text>

                    <View flex-apply row spread>
                        <View flex-apply row center>
                            <Icon source={require('../assets/icons/like.jpg')} size={12} /> 
                            <Text marginL-4>567</Text>                           
                        </View>
                        <View flex-apply row >
                            <Text>30</Text>
                            <Text marginL-4>binh luan</Text>
                        </View>
                    </View>
                </View>

                {/* like + comment */}
                <View flex-apply row spread>
                    <TouchableOpacity flex-apply row center
                    style={{width: '50%'}}
                    onPress={changeLike}>
                        <Icon source={likeImg} size={30} />
                        <Text marginL-4 style={{opacity:0.5}}>{like}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity flex-apply row center
                    style={{width: '50%', opacity:0.5}}
                      onPress={function() {
                        console.log("click")
                    }}>
                        <Icon source={require('../assets/icons/comment.png')} size={20} />
                        <Text marginL-4>Comments</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {imgArray}
            </View>
       </ScrollView>
    );
}

export default DetailPost;