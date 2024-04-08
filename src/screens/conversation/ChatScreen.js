/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DirectRight } from 'iconsax-react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ChatScreen = ({ route }) => {
    const { conversations } = route.params;
    const [messages, setMessages] = useState({});
    const [messageInput, setMessageInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null); // Thêm state để lưu trữ ID của người dùng hiện tại

    useEffect(() => {
        fetchMessagesFromStorage();
        getCurrentUserId(); // Lấy ID của người dùng hiện tại khi màn hình được load
    }, []);

    const getCurrentUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            setCurrentUserId(userId);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const fetchMessagesFromStorage = async () => {
        try {
            const storedMessages = await AsyncStorage.getItem('messages');
            if (storedMessages !== null) {
                setMessages(JSON.parse(storedMessages));
            }
        } catch (error) {
            console.error('Error fetching messages from AsyncStorage:', error);
        }
    };

    const sendMessage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`http://192.168.1.10:8000/message/text/${conversations._id}`, {
                content: messageInput
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const conversationId = conversations._id;
            const updatedMessages = { ...messages };
            if (!updatedMessages[conversationId]) {
                updatedMessages[conversationId] = [];
            }

            // Thêm thông tin về người gửi vào tin nhắn
            const newMessage = { ...response.data.message, sender: currentUserId };
            updatedMessages[conversationId].unshift(newMessage);

            setMessages(updatedMessages);
            setMessageInput('');

            await AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.');
        }
    };

    const selectImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                multiple: false,
            });
            setSelectedImage(image);
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    const sendImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: selectedImage.uri,
                type: selectedImage.type,
                name: selectedImage.fileName,
            });

            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`http://192.168.1.10:8000/message/file/${conversations._id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const conversationId = conversations._id;
            const updatedMessages = { ...messages };
            if (!updatedMessages[conversationId]) {
                updatedMessages[conversationId] = [];
            }

            // Thêm thông tin về người gửi vào tin nhắn
            const newMessage = { ...response.data.message, sender: currentUserId };
            updatedMessages[conversationId].unshift(newMessage);

            setMessages(updatedMessages);
            setSelectedImage(null);
            await AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error('Error sending image:', error);
            Alert.alert('Error', 'Failed to send image. Please try again later.');
        }
    };

    const renderMessageItem = ({ item }) => {
        // Kiểm tra xem tin nhắn được gửi từ bạn hay không
        const isMe = item.sender === currentUserId;

        // Chọn kiểu hiển thị dựa trên người gửi
        const messageStyle = isMe ? { fontSize: 20, color: 'green', textAlign: 'right', padding: 10 } : { fontSize: 20, color: 'blue', textAlign: 'left', padding: 10 };

        return (
            <View style={{ flexDirection: 'column' }}>
                <Text style={messageStyle}>{item.content}</Text>
            </View>
        );
    };

    const currentConversationMessages = messages[conversations._id] || [];

    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <FlatList
                data={currentConversationMessages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>chưa có tin nhắn nào.</Text>}
                inverted
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ccc', marginBottom: 10, backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={selectImage} style={{ marginRight: 10 }}>
                    <Text style={{ color: '#27B1D5', fontWeight: 'bold' }}>Chọn ảnh</Text>
                </TouchableOpacity>
                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage.uri }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                    />
                )}
                <TextInput
                    value={messageInput}
                    onChangeText={setMessageInput}
                    placeholder="Nhập tin nhắn..."
                    style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginRight: 10, backgroundColor: '#fff' }}
                />
                <TouchableOpacity onPress={sendMessage} style={{ marginRight: 10 }}>
                    <Text style={{ color: '#27B1D5', fontWeight: 'bold' }}>Gửi</Text>
                </TouchableOpacity>
                {selectedImage && (
                    <TouchableOpacity onPress={sendImage}>
                        <Text style={{ color: '#27B1D5', fontWeight: 'bold', marginRight: 10 }}>Gửi ảnh</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default ChatScreen;
