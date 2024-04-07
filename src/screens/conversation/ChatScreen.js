/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const ChatScreen = ({ route }) => {
//     const { conversations } = route.params;
//     console.log(conversations);
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');

//     useEffect(() => {
//         // fetchMessages();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const fetchMessages = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const response = await axios.get(`http://172.20.10.6:8000/messages/text/${conversations._id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setMessages(response.data.messages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//             Alert.alert('Error', 'Đã xảy ra lỗi khi tải tin nhắn. Vui lòng thử lại sau.');
//         }
//     };

//     const sendMessage = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             const response = await axios.post(`http://172.20.10.6:8000/messages/text/${conversations._id}`, {
//                 content: messageInput
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setMessages([...messages, response.data.message]);
//             setMessageInput('');
//         } catch (error) {
//             console.error('Error sending message:', error);
//             Alert.alert('Error', 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.');
//         }
//     };

//     const renderMessageItem = ({ item }) => (
//         <View style={{ padding: 10 }}>
//             <Text>{item.senderName}: {item.content}</Text>
//         </View>
//     );

//     return (
//         <View style={{ flex: 1 }}>
//             <FlatList
//                 data={messages}
//                 renderItem={renderMessageItem}
//                 keyExtractor={(item) => item._id}
//                 ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có tin nhắn nào.</Text>}
//                 inverted // To show the latest messages at the bottom
//             />
//             <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
//                 <TextInput
//                     value={messageInput}
//                     onChangeText={setMessageInput}
//                     placeholder="Nhập tin nhắn..."
//                     style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8 }}
//                 />
//                 <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10 }}>
//                     <Text style={{ color: '#27B1D5', fontWeight: 'bold' }}>Gửi</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DirectRight } from 'iconsax-react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ChatScreen = ({ route }) => {
    const { conversations } = route.params;
    const [messages, setMessages] = useState({}); // Đối tượng lưu trữ tin nhắn theo ID cuộc trò chuyện
    const [messageInput, setMessageInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // Thêm state để lưu trữ hình ảnh đã chọn

    useEffect(() => {
        fetchMessagesFromStorage(); // Tải tin nhắn từ AsyncStorage khi mở màn hình tin nhắn
    }, []);

    // Function to fetch messages from AsyncStorage
    const fetchMessagesFromStorage = async () => {
        try {
            const storedMessages = await AsyncStorage.getItem('messages');
            if (storedMessages !== null) {
                setMessages(JSON.parse(storedMessages)); // Cập nhật tin nhắn từ AsyncStorage
            }
        } catch (error) {
            console.error('Error fetching messages from AsyncStorage:', error);
        }
    };

    // Function to send a message
    const sendMessage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`http://192.168.1.11:8000/message/text/${conversations._id}`, {
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
            updatedMessages[conversationId].unshift(response.data.message);

            setMessages(updatedMessages);
            setMessageInput('');

            await AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.');
        }
    };

    // Function to select an image from device
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
    // Function to send the selected image to server
    const sendImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: selectedImage.uri,
                type: selectedImage.type,
                name: selectedImage.fileName,
            });

            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`http://192.168.1.11:8000/message/file/${conversations._id}`, formData, {
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
            updatedMessages[conversationId].unshift(response.data.message);

            setMessages(updatedMessages);
            setSelectedImage(null); // Reset selected image after sending
            await AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error('Error sending image:', error);
            Alert.alert('Error', 'Failed to send image. Please try again later.');
        }
    };

    const renderMessageItem = ({ item }) => (
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 20, color: 'green', textAlign: 'right', padding: 10 }}>{item.content}</Text>
        </View>
    );

    const currentConversationMessages = messages[conversations._id] || [];

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={currentConversationMessages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>chưa có tin nhắn nào.</Text>}
                inverted
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ccc', marginBottom: 10 }}>
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
                    style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8 }}
                />
                <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10 }}>
                    <Text style={{ color: '#27B1D5', fontWeight: 'bold' }}>Gửi</Text>
                </TouchableOpacity>
                {selectedImage && (
                    <TouchableOpacity onPress={sendImage} style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#27B1D5', fontWeight: 'bold' }}>Gửi ảnh</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default ChatScreen;
