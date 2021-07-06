import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements';
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import {auth, db} from "../firebase";
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import firebase from "firebase/app";

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const unsubscribe = db
                            .collection("chats")
                            .doc(route.params.id)
                            .collection("messages")
                            .orderBy('timestamp', 'desc')
                            .onSnapshot((snapshot) => 
                                setMessages(
                                    snapshot.docs.map((doc) => ({
                                        id: doc.id,
                                        data: doc.data()
                                    }))
                                )
                            );
        return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}                
                >
                    <Avatar 
                        rounded 
                        source={{
                            uri: messages[0]?.data.photoURL || ""
                        }}
                    />

                    <Text
                        style={{
                            color: "white",
                            marginLeft: 10,
                            fontWeight: "700"
                        }}   
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () => (
                <View 
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });

        setInput("");
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar style="light" />
            
            <KeyboardAvoidingView
                // behavior={Platform.os === "ios" ? "padding" : "height"}
                behavior="padding"
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                    <ScrollView contentContainerStyle={{paddingTop: 15}}>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.currentUser}>
                                    <Avatar
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5
                                        }} 
                                       rounded
                                       size={30}
                                       position="absolute"
                                       bottom={-15}
                                       right={-5}
                                        source={{
                                            uri: data.photoURL
                                        }}
                                    />

                                    <Text style={styles.currentUserText}>
                                        {data.message}
                                    </Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.notCurrentUser}>
                                    <Avatar
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            left: -5
                                        }}   
                                        rounded
                                        size={30}
                                        position="absolute"
                                        bottom={-15}
                                        left={-5}
                                        source={{
                                            uri: data.photoURL
                                        }}
                                    />

                                    <Text style={styles.notCurrentUserText}>
                                        {data.message}
                                    </Text>

                                    <Text style={styles.notCurrentUserName}>
                                        {data.displayName}
                                    </Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    
                    <View style={styles.footer}>
                        <TextInput
                            placeholder="Enter Message"
                            style={styles.textInput}
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            onSubmitEditing={sendMessage}
                        />

                        <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                            <Ionicons name="send" size={24} color="#2868E6" />
                        </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        width: "100%"
    },

    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    },

    currentUser: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },

    currentUserText: {
        fontWeight: "500",
        marginLeft: 10,
    },

    notCurrentUser: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },

    notCurrentUserText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 5
    },

    notCurrentUserName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    }
})
