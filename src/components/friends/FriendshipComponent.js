import InviteComponent from "./invite/InviteComponent";
import ListFriendComponent from "./list/ListFriendComponent";
import { useState } from "react";
import { Tab, TabView, Text } from '@rneui/themed';
import { View } from "react-native";
import { COLOR } from "../../constants/constants";

const FriendshipComponent = () => {

    const [index, setIndex] = useState(0);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{ backgroundColor: COLOR.icon }}
                style={{ width: '100%' }}
            >
                <Tab.Item
                    title="Lời mời kết bạn"
                    titleStyle={{ fontSize: 18, color: COLOR.text }}
                />
                <Tab.Item
                    title="Bạn bè"
                    titleStyle={{ fontSize: 18, color: COLOR.text }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <InviteComponent />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <ListFriendComponent />
                </TabView.Item>
            </TabView>
        </View>
    );
}

export default FriendshipComponent;