/* eslint-disable prettier/prettier */
import { View, Text, Image } from 'react-native';
import React from 'react';
import Header from '../components/header';
import { ArrowRight2 } from 'iconsax-react-native';
import styles from '../styles/screen/acc_ser_style';
import colors from '../styles/colors';

const AccountAndSercurityScreen = () => {
  return (
    <View>
      <Header isBack={true} title={'Tài khoản và bảo mật'} isSearch={false} />
      <Text>Tài khoản</Text>
      <View style={styles.infoBox}>
        <View>
          <Image />
          <View>
            <Text>Thông tin cá nhân</Text>
            <Text>Văn Ngọc</Text>
          </View>
        </View>
        <ArrowRight2 color={colors.arrow} />
      </View>
    </View>
  );
};

export default AccountAndSercurityScreen;
