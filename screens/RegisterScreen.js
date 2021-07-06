import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'

import { StatusBar } from 'expo-status-bar';

import {Button, Input, Text} from "react-native-elements";

import {auth} from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
    }, [navigation])

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1745180411.jpg"
            })
        })
        .catch((err) => alert(err.message))
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{marginBottom: 50}}>
                Create an Account
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Input
                    placeholder="Email"
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
                />

                <Input
                    placeholder="Profile Picture URL"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button
                containerStyle={styles.button}
                title="Register"
                onPress={register}
                raised
            />

            <View style={{height: 20}} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
    },
})
