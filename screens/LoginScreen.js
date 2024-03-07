import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TextInput, Image } from 'react-native';
//import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password).catch((error) => alert(error));
    };

    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri:
                        "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <Button style={styles.button} onPress={signIn} title="Login" />
            <Button
                onPress={() => navigation.navigate("Register")}
                style={styles.button}
                type="outline"
                title="Register"
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});   