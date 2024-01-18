import {View, Text, Button, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/header';
import {
  Calendar,
  Image,
  User,
  UserCirlceAdd,
  UserOctagon,
} from 'iconsax-react-native';
import Option from '../components/option';
import colors from '../styles/colors';
import styles from '../styles/screen/account_information';
import font from '../styles/font';
const AccountInformation = ({route, navigation}) => {
  const {userInfor} = route.params;
  console.log(userInfor);
  useEffect(() => {
    if(route.params){
    }
  }, [route.params]);
  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <Header
        goBack={() => navigation.goBack()}
        isBack={true}
        title={'Thông tin cá nhân'}
        isSearch={false}
      />
      {/* Avatar */}
      <View style={styles.imageBox}>
        {userInfor.imageUrl === null ? (
          <View style={styles.nullAvatar} />
        ) : (
          <Image
            style={styles.image}
            source={userInfor.imageUrl}
            resizeMode="stretch"
          />
        )}
      </View>
      <Option
        icon={<UserOctagon color={colors.arrow} />}
        title={'Tên QChat'}
        infor={userInfor.name}
      />
      <Option
        icon={<Calendar color={colors.arrow} />}
        title={'Ngày sinh'}
        infor={userInfor.date}
      />
      <Option
        icon={<User color={colors.arrow} />}
        title={'Giới tính'}
        infor={userInfor.sex === true ? 'Nam' : 'Nữ'}
      />
      <Pressable
        onPress={() => {
          navigation.navigate('EditInformationScreen', {
            userInfor: userInfor,
          });
        }}
        style={styles.button}>
        <Text style={font.sencond}>Chỉnh sửa</Text>
      </Pressable>
    </View>
  );
};

export default AccountInformation;
