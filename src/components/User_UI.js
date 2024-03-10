/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';


const User_UI = ({ navigation }) => {
    return (
        <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'white', justifyContent: "center", alignItems: 'center' }}>
            <View style={{ width: '80%', height: '100%', flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                <Image source={require('../assets/LOGO.png')} style={{ width: '90%', height: 200, marginLeft: 30, }} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ width: 140, height: 60, borderRadius: 20, marginTop: 50, justifyContent: 'center', alignItems: "center", backgroundColor: "#093DF4" }}>
                    <Text style={{ fontWeight: '700', fontSize: 18, color: 'white' }}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 140, height: 60, borderRadius: 20, marginTop: 20, justifyContent: 'center', alignItems: "center", backgroundColor: "#D9D9D9" }}>
                    <Text style={{ fontWeight: '700', fontSize: 18, color: 'black' }}>Đăng kí</Text>
                </TouchableOpacity>


            </View>

        </View>
    )
}

export default User_UI