/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, Alert, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogoutCurve, Profile2User, SearchFavorite1 } from 'iconsax-react-native';
import axios from 'axios';

const MessageScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]); // Thêm state này để lưu trữ danh sách cuộc trò chuyện đã lọc
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.1.10:8000/conversation', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConversations(response.data.conversations);
      setFilteredConversations(response.data.conversations); // Ban đầu, danh sách cuộc trò chuyện đã lọc giống với danh sách gốc
    } catch (error) {
      console.error('Error fetching conversations:', error);
      Alert.alert('Error', 'Đã xảy ra lỗi khi tải danh sách cuộc trò chuyện. Vui lòng thử lại sau.');
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    const filtered = conversations.filter(conversation =>
      conversation.chatName.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredConversations(filtered);
  };

  const handleAddChat = () => {
    navigation.navigate('AddChat', { conversations });
  };

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5EFFF' }}>
        <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }} />
        <Text style={{ fontSize: 20, marginLeft: 8, fontWeight: '900', }}>{item.chatName}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToChat = (conversations) => {
    navigation.navigate('ChatScreen', { conversations });
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#27B1D5', paddingVertical: 10 }}>
        <SearchFavorite1 size={25} color="#FF8A65" />
        <TextInput
          placeholderTextColor="white"
          placeholder="Tìm kiếm"
          style={{ flex: 1, marginHorizontal: 10, color: 'white' }}
          onChangeText={handleSearch}
          value={searchKeyword}
        />
        <TouchableOpacity onPress={handleAddChat}>
          <Profile2User size={32} color="#FF8A65" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredConversations}
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
