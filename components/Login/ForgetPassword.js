/* eslint-disable prettier/prettier */
// Trong component ForgetPassword

import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";


const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("luuhoang06102002@gmail.com");
    const [password, setPassword] = useState("1234567@Luu");
    const [confirmPassword, setConfirmPassword] = useState('1234567@Luu');
    console.log(email);
    const handleResetPassword = async () => {

    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Nhập mật khẩu mới"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Nhập lại mật khẩu mới"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
            />
            <Button title="Đặt lại mật khẩu" onPress={handleResetPassword} />
        </View>
    );
};

export default ForgetPassword;
