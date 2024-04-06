/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native'
import React from 'react'

const AddChat = ({ route }) => {
    const { chatid } = route.params
    console.log(chatid);
    return (
        <View>
            <Text>AddChat</Text>
        </View>
    )
}

export default AddChat