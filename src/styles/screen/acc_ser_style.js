import {StyleSheet} from 'react-native';
import colors from '../colors';
const styles = StyleSheet.create({
  infoBox: {
    height: 80,
    marginHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.arrow,
  },
  nullAvatar: {
    width: 50,
    height: 50,
    backgroundColor: colors.arrow,
    borderRadius:25
  },
  line:{
    height:2,
    marginTop:5,
    backgroundColor:colors.arrow,
  }
});
export default styles;
