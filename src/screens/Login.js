/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://...TênBackEnd/api/login', {
                phone,
                password,
            });
            const { token } = response.data;
            // Lưu token vào AsyncStorage hoặc SecureStorage để sử dụng sau này
            Alert.alert('Đăng nhập thành công!');
        } catch (error) {
            Alert.alert('Đăng nhập không thành công!');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Số điện thoại"
                onChangeText={text => setPhone(text)}
                value={phone}
            />
            <TextInput
                placeholder="Mật khẩu"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Đăng nhập" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
