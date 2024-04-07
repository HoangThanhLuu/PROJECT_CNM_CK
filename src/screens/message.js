/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogoutCurve, Profile2User, SearchFavorite1 } from 'iconsax-react-native';
import axios from 'axios';

const MessageScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://192.168.1.11:8000/conversation', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConversations(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      Alert.alert('Error', 'Đã xảy ra lỗi khi tải danh sách cuộc trò chuyện. Vui lòng thử lại sau.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Success', 'Đăng xuất thành công');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.');
    }
  };

  const handleAddChat = () => {
    navigation.navigate('AddChat', { conversations });
  };

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.chatName}</Text>
        <Text>{item._id}</Text>

        {/* Hiển thị các thông tin khác của cuộc trò chuyện tùy thuộc vào cấu trúc dữ liệu */}
      </View>
    </TouchableOpacity>
  );

  const navigateToChat = (conversations) => {
    navigation.navigate('ChatScreen', { conversations });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#27B1D5', paddingVertical: 10 }}>
        <SearchFavorite1 size={25} color="#FF8A65" />
        <TextInput placeholderTextColor="white" placeholder="Tìm kiếm" style={{ flex: 1, marginHorizontal: 10, color: 'white' }} />
        <TouchableOpacity onPress={handleAddChat}>
          <Profile2User size={32} color="#FF8A65" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có cuộc trò chuyện nào.</Text>}
      />
      <TouchableOpacity onPress={handleLogout}>
        <LogoutCurve size={32} color="#FF8A65" />
      </TouchableOpacity>
    </View>
  );
};

export default MessageScreen;
