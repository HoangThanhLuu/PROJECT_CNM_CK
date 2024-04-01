/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React from 'react';
import { View, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogoutCurve, Profile2User, SearchFavorite1 } from 'iconsax-react-native';

const MessageScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Xóa token khỏi bộ lưu trữ
      await AsyncStorage.removeItem('token');

      // Thông báo đăng xuất thành công
      Alert.alert('Success', 'Đăng xuất thành công');

      // Chuyển hướng đến trang đăng nhập
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', }}>
      <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#27B1D5' }}>
          <SearchFavorite1 style={{ marginTop: 10 }} size="25" color="#FF8A65" />
          <View style={{ flex: 1, marginHorizontal: 10 }}><TextInput placeholderTextColor="white" placeholder='Tìm kiếm' /></View>
          <Profile2User style={{ marginTop: 10 }} size="32" color="#FF8A65" />
        </View>

        {/* Sử dụng TouchableOpacity để tạo một biểu tượng đăng xuất */}
        <TouchableOpacity onPress={handleLogout}>
          <LogoutCurve size="32" color="#FF8A65" />
        </TouchableOpacity>


      </View>
    </View>
  );
};

export default MessageScreen;
