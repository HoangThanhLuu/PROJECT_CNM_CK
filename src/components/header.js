import {View, Text} from 'react-native';
import React from 'react';
import {ArrowLeft, Back, SearchNormal} from 'iconsax-react-native';
import styles from '../styles/component/header'
import colors from '../styles/colors';
import font from '../styles/font';

const Header = ({title, isBack, isSearch}) => {
  return (
    <View style={styles.headerBox}>
      <View style={styles.box}>
        {isBack ? <ArrowLeft color={colors.primary} style={{marginRight:10}} /> : null}
        <Text style={font.primary}>{title}</Text>
      </View>
      {isSearch ? <SearchNormal color={colors.primary} /> : null}
    </View>
  );
};

export default Header;
