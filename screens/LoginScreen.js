import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import {Button, Input, Image} from "react-native-elements";

import {auth} from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth
                            .onAuthStateChanged((authUser) => {
                                if (authUser) {
                                    navigation.replace('Home')
                                } 
                            });
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch((err) => alert(err));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Image 
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png"
                }}
                style={{width: 200, height: 200}}
            />

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus 
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)} 
                />

                <Input 
                    placeholder="Password" 
                    type="password" 
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                    onSubmitEditing={signIn} 
                />
            </View>

            <Button 
                containerStyle={styles.button} 
                title='Login'
                onPress={signIn} 
            />

            <Button 
                containerStyle={styles.button} 
                type="outline" 
                title='Register'
                onPress={() => navigation.navigate('Register')} 
            />

            <View style={{height: 20}} />
        </KeyboardAvoidingView>
    )
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
        padding: 20,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
});
