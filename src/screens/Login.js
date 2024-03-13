/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        checkToken(); // Kiểm tra token khi màn hình được tải
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            // Nếu token đã tồn tại, điều hướng đến màn hình khác
            navigation.navigate('ResgisterAccount');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                phoneNumber: phone,
                password: password,
            });
            const { token } = response.data;

            // Lưu token vào AsyncStorage
            await AsyncStorage.setItem('token', token);

            Alert.alert('Đăng nhập thành công!');

            // Sau khi đăng nhập thành công, điều hướng đến màn hình chính hoặc màn hình khác
            // navigation.navigate('ResgisterAccount');
        } catch (error) {
            console.log(error);
            Alert.alert('Đăng nhập không thành công!');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Số điện thoại"
                style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}
                onChangeText={text => setPhone(text)}
                value={phone}
            />
            <TextInput
                placeholder="Mật khẩu"
                style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}
                onChangeText={text => setPassword(text)}
                value={password}
            //secureTextEntry
            />
            <Button title="Đăng nhập" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
