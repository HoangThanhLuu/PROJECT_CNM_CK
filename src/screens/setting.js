import {View, Text} from 'react-native';
import React from 'react';
import Header from '../components/header';
import styles from '../styles/screen/setting';
import Option from '../components/option';
import {Lock1, Shield} from 'iconsax-react-native';
import colors from '../styles/colors';
const SettingScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Header isBack={true} title={'Cài đặt'} isSearch={true} />
      <Option
        isOnPress={() => {
          navigation.navigate('AccountAndSercurity', {
            userInfor: {
              name: 'Ngoc',
              phoneNumber: '0326492423',
              imageUrl: null,
              sex: true,
              date:'21/03/2002'
            },
          });
        }}
        icon={<Shield color={colors.header} />}
        title={'Tài khoản và cài đặt'}
        isIcon={true}
        color={colors.header}
      />
      <Option
        icon={<Lock1 color={colors.header} />}
        title={'Quyền riêng tư'}
        isIcon={true}
        color={colors.header}
      />
    </View>
  );
};

export default SettingScreen;