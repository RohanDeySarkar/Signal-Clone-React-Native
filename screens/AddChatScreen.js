import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import {auth, db} from '../firebase';

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats"
        })
    }, [navigation])

    const createChat = async () => {
        await db
        .collection("chats")
        .add({
            chatName: input 
        })
        .then(() => navigation.goBack())
        .catch((err) => alert(err))
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                <Icon name="wechat" type="antdeisgn" size={24} color="black" />
            }
                onSubmitEditing={createChat}
            />

            <Button 
                title="Create" 
                onPress={createChat} 
            />
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        height: "100%"
    },

})
