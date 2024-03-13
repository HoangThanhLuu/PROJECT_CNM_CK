/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { ArrowRight } from 'iconsax-react-native';


const ResgisterAccount = ({ navigation }) => {
    const [name, setName] = useState('');
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Tạo tài khoản",
            headerStyle: {
                backgroundColor: "#0091FF",
                color: 'white',

            },
            headerTitleStyle: {
                color: 'white',
            }
        })
    })

    const handleNext = async () => {
        try {
            // Gửi dữ liệu name lên máy chủ
            const response = await axios.post('http://your-backend-url/api/register', {
                name: name
            });
            // Chuyển đến màn hình tiếp theo
            //  navigation.navigate('ResgisterPhone');
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <View style={{ width: '80%', height: '100%', alignItems: 'center', flexDirection: "column st" }}>
                <View style={{ width: '100%', marginVertical: 20 }}>
                    <Text style={{ color: 'black', fontWeight: '700', fontSize: 25 }}>Tên Zalo</Text>
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, marginVertical: 20 }}>
                    <TextInput
                        placeholder="Nhập tên của bạn"
                        onChangeText={text => setName(text)}
                        value={name}
                    />
                </View>
                <Button title="Tiếp theo" onPress={() => {
                    navigation.navigate('ResgisterPhone');//test tạm thời
                    handleNext();
                }} />
                {/* <View  style={{ backgroundColor: '#37A6F4', position: 'absolute', bottom: 7, right: 3, width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <ArrowRight size="35" color="#2ccce4" style={{}} />

                </View> */}

            </View>




        </View>
    );
};

export default ResgisterAccount;
