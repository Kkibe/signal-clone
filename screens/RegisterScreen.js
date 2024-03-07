import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Button, TextInput, Text } from 'react-native';
//import { KeyboardAvoidingView } from 'react-native';
//import { Button, Input, Text } from 'react-native-elements';
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        });
    }, [navigation]);

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    photoURL:
                        imageUrl ||
                        "https://cenup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                });
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
        /*auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL:
                        imageUrl ||
                        "https://cenup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                });
            })
            .cath((error) => alert(error.message));*/
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text style={{ marginBottom: 50 }}>
                Create a Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Full Name"
                    autofocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    placeholder="Profile picture URL (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title="Register"
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        b
    }
})