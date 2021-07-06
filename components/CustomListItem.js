import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from "react-native-elements";

import {db} from "../firebase"

const CustomListItem = ({id, chatName, enterChat}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        db
        .collection("chats")
        .doc(id)
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
    }, [])

    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar
                rounded
                source={{
                    uri: messages[0]?.data.photoURL || ""
                }}
            />

            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>

                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {messages[0]?.data.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
