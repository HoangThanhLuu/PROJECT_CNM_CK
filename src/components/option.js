import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {ArrowRight, ArrowRight2, Icon} from 'iconsax-react-native';
import styles from '../styles/component/option';
import font from '../styles/font';
import colors from '../styles/colors';

const Option = ({icon, title, isIcon, isOnPress, color, infor, isInfor}) => {
  return (
    <Pressable onPress={isOnPress} style={styles.optionBox}>
      <View style={styles.box}>
        <View style={{marginRight:5}}>{icon}</View>
        <View style={{width:5}} />
        <Text style={font.sencond}>{title}</Text>
      </View>
      {isIcon ? <ArrowRight2 color={color} /> : null}
      {infor ? <Text style={font.sencond}>{infor}</Text> : null}
    </Pressable>
  );
};

export default Option;
