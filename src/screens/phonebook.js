/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneBookScreen = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // Gửi yêu cầu lấy danh sách lời mời kết bạn khi màn hình được tạo
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.1.10:8000/friend/list/req', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFriendRequests(response.data.addFriendReqs);
      } else {
        console.error('Failed to fetch friend requests');
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const handleAcceptFriendRequest = async (friendRequestId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(
        `http://192.168.1.10:8000/friend/status/${friendRequestId}`,
        { status: true }, // Truyền trạng thái đồng ý
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Nếu cập nhật thành công, cập nhật lại danh sách lời mời kết bạn
        fetchFriendRequests();
        Alert.alert('Success', 'Friend request accepted successfully');
      } else {
        Alert.alert('Error', 'Failed to accept friend request');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      Alert.alert('Error', 'An error occurred while processing your request');
    }
  };

  const renderFriendRequest = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.senderName} wants to be your friend!</Text>
      <TouchableOpacity onPress={() => handleAcceptFriendRequest(item._id)}>
        <Text style={{ color: 'blue' }}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        renderItem={renderFriendRequest}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PhoneBookScreen;
