/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        checkToken(); // Kiểm tra token khi màn hình được tải
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        // if (token) {
        //     // Nếu token đã tồn tại, điều hướng đến màn hình khác
        //     navigation.navigate('BottomTab');
        // }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://172.20.10.6:8000/auth/login', {
                phoneNumber: phone,
                password: password,
            });
            const { token } = response.data;

            // Lưu token vào AsyncStorage
            await AsyncStorage.setItem('token', token);

            // Hiển thị thông báo đăng nhập thành công
            Alert.alert('Success', 'Đăng nhập thành công!');

            // Điều hướng đến màn hình khác sau khi đăng nhập thành công
            navigation.navigate('BottomTab');
        } catch (error) {
            // Xử lý lỗi khi đăng nhập không thành công
            console.error('Error:', error);
            Alert.alert('Error', 'Đăng nhập không thành công!');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ flex: 1, width: '90%', height: '100%', alignItems: 'center', flexDirection: 'column' }}>


                    <Image style={{ width: 170, height: 130, marginVertical: 30 }} source={require('../../assets/chatchit.png')} />

                    <Text style={{ fontSize: 40, fontWeight: '900', marginVertical: 30 }}>Login</Text>



                    <View style={{ width: '100%', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, fontWeight: '800' }}>Nhập số điện thoại:</Text>
                        <View style={{ width: '100%', height: 50, borderWidth: 1, marginVertical: 20, justifyContent: 'center' }}>
                            <TextInput


                                onChangeText={text => setPhone(text)}
                                value={phone}
                            />
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: '800' }}>Nhập mật khẩu:</Text>
                        <View style={{ width: '100%', height: 50, borderWidth: 1, marginVertical: 20, justifyContent: 'center' }}>
                            <TextInput

                                secureTextEntry
                                onChangeText={text => setPassword(text)}
                                value={password}
                            />
                        </View>
                    </View>
                    <Button title="Đăng nhập" onPress={handleLogin} />

                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}><Text style={{ color: 'blue', marginTop: 15, fontSize: 15 }}>Quên mật khẩu?</Text></TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', marginTop: 15, fontSize: 15 }}>Bạn đã có tài khoản chưa?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ResgisterAccount')}><Text style={{ color: 'blue', marginTop: 15, fontSize: 15 }}>Đăng ký</Text></TouchableOpacity>
                    </View>



                </View>
            </View></ScrollView>
    );
};

export default LoginScreen;
