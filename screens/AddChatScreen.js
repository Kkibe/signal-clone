import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
//import { Button, Input } from "react-native-elements";
import { db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigator.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);

    const createChat = async () => {

        //db is not defined
        await db
            .collection("chats")
            .add({
                chatName: input,
            })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => alert(error));
    };


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter a Chat Name"
                value={input}
                onChangeText={(text) => setInput(text)}
                //onSubmitEditing={createChat}
                leftIcon={
                    //Icon not defined, ude @expo/vector-icons instead
                    <AntDesign name="wechat" size={24} color="black" />
                }
            />
            <Button disabled={!input} onPress={ createChat} title="Create a new chat"/>
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
}); 