import {View, Text, Image} from 'react-native';
import React from 'react';
import Header from '../components/header';
import { ArrowRight2, Call, Code, Lock, Lock1, ScanBarcode } from 'iconsax-react-native';
import styles from '../styles/screen/acc_ser_style';
import colors from '../styles/colors';
import font from '../styles/font';
import Option from '../components/option';
import Phonenumber from '../components/phoneNumber';

const AccountAndSercurityScreen = ({route, navigation}) => {
  const {name, imageUrl, phoneNumber} = route.params;
  return (
    <View style={{flex:1, backgroundColor:colors.primary}}>
      <Header goBack={()=>navigation.goBack()} isBack={true} title={'Tài khoản và bảo mật'} isSearch={false} />
      <Text style={[font.sencond,{color:colors.header, margin:20}]}>Tài khoản</Text>
      <View style={styles.infoBox}>
        <View style={{flexDirection:'row'}}>
          {
            imageUrl === null ?
            <View style={styles.nullAvatar} />
            : <Image source={imageUrl} resizeMode='stretch' />
          } 
          <View style={{marginLeft:10, marginTop:5}}>
            <Text style={font.titleMedium}>Thông tin cá nhân</Text>
            <Text style={[font.titleMedium,{fontWeight:'500'}]}>{name}</Text>
          </View>
        </View>
        <ArrowRight2 color={colors.arrow} />
      </View>
      {/* Phone number */}
      <Phonenumber title={"Số điện thoại"} phoneNumber={phoneNumber} icon={<Call color={colors.arrow} />} isIcon={true} />
      {/* QR code */}
      <Option icon={<ScanBarcode color={colors.arrow} />} title={"Mã QR của tôi"} isIcon={true} color={colors.arrow} />
      <View style={styles.line}></View>
      {/* Sercutỉy */}
      <Text style={[font.sencond,{color:colors.header, marginHorizontal:20, marginTop:10}]}>Bảo mật</Text>
      <Option icon={<Lock1 color={colors.arrow} />} title={"Khóa QChat"} isIcon={true} color={colors.arrow} />
      <View style={styles.line}></View>
      {/* Login */}
      <Text style={[font.sencond,{color:colors.header, marginHorizontal:20, marginTop:10}]}>Đăng nhập</Text>
      <Option icon={<Lock color={colors.arrow} />} title={"Mật khẩu"} isIcon={true} color={colors.arrow} />
      <View style={styles.line}></View>
      {/* Delete account */}
      <Option title={"Xóa tài khoản"} isIcon={true} color={colors.arrow} />
      <View style={styles.line}></View>
        
    </View>
  );
};

export default AccountAndSercurityScreen;
