/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFriendByPhoneScreen = ({ route }) => {
    const { conversations } = route.params;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [friend, setFriend] = useState(null);
    const [content, setContent] = useState('hello bạn')

    const handleSearchFriend = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://192.168.1.10:8000/friend/find/${phoneNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setFriend(response.data.friend);
                console.log(response.data.friend);
            } else {
                setFriend(null);
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error searching friend by phone:', error);
            setFriend(null);
            Alert.alert('Error', 'An error occurred while searching for the phone number');
        }
    };

    const handleAddFriend = async () => {
        try {
            if (!friend) {
                Alert.alert('Error', 'Please search for a friend first');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                `http://192.168.1.10:8000/friend/add/${friend._id}`,
                { content: content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert('Success', 'Friend request sent successfully');
            } else {
                Alert.alert('Error', 'Failed to send friend request');
            }
        } catch (error) {
            console.error('Error adding friend by phone:', error);
            Alert.alert('Error', 'An error occurred while processing your request');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                placeholder="Enter friend's phone number"
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
            />
            <Button title="Search Friend" onPress={handleSearchFriend} />
            {friend && (
                <>
                    <Text>Friend found: {friend.name}</Text>
                    <Button title="Add Friend" onPress={handleAddFriend} />
                </>
            )}
        </View>
    );
};

export default AddFriendByPhoneScreen;
