/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
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
        <View style={{ width: '100%', height: '100%', alignItems: "center" }}>
            <View style={{ width: '90%', height: '100%', alignItems: "center", }}>
                <View style={{ width: '90%', height: 60, justifyContent: "center", borderBottomWidth: 1 }}>
                    <TextInput
                        placeholder="Số điện thoại"
                        style={{ fontSize: 20, fontWeight: '700' }}
                        onChangeText={text => setPhone(text)}
                        value={phone}
                    />
                </View>

                <View style={{ width: '90%', height: 60, justifyContent: "center", borderBottomWidth: 1, marginBottom: 30 }}>
                    <TextInput
                        placeholder="Mật khẩu"
                        style={{ fontSize: 20, fontWeight: '700' }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                    /></View>
                <View style={{ width: '90%', marginBottom: 30 }}>
                    <Text style={{ fontSize: 15, color: '#37A6F4' }}>Lấy lại mật khẩu ?    </Text>
                </View>

                <Button title="Đăng nhập" onPress={handleLogin} />
            </View>
        </View>
    );
};

export default LoginScreen;
