import { StyleSheet, ScrollView, Text, FlatList } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase";
import CustomListItem from "../components/CustomListItem";
//import { Avatar } from "react-native-elements"; use Image from react-native 
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { onSnapshot } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        signOutUser(auth).then(() => {
            navigation.replace("Login");
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, []);



    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroungColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "80",
                        marginRight: "20",
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("AddChat")}
                        activeOpacity={0.5}
                    >
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>

                </View>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            {
                //use flatlist instead
                /*<ScrollView style={styles.container}>
                    {chats.map(({ id, data: { chatName } }) => (
                        <CustomListItem key={id} id={id} chatName={chatName} />
                    ))}
                </ScrollView>*/
                <FlatList
                data={chats}
                renderItem={CustomListItem}
                keyExtractor={(item) => item.id}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              />
            }
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});