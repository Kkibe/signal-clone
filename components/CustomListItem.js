import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
//import { ListItem, Avatar } from 'react-native-elements';
import { db } from "../firebase";
import { Alert } from 'react-native';

const CustomListItem = ({chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            );

        return unsubscribe;
    });

    return (
        <View
            //onPress={() => enterChat(id, chatName)} enterChat is not defined
            onPress={() => {alert("item pressed")}}
            bottomDivider
            style={styles.container}
        >
            {/*DP THAT UPDATES WITH THE LAST CHAT*/}
            <Image
                source={{
                    uri:
                        chatMessages?.[0]?.photoURL ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                }}
            />
            <View style={styles.wrapper}>
                <Text style={{ fontWeight: "800" }}>
                    {chatName}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                    This is a test Subtitle
                </Text>
            </View>
        </View>
    )
}

export default CustomListItem;

const styles = StyleSheet.create({
    container: {

    },
    avatar: {
        width: 40,
        height: 40,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    wrapper: {
    
    },
    text: {
        
    }
});