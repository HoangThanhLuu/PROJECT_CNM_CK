import {StyleSheet} from 'react-native';
import colors from '../colors';
const styles = StyleSheet.create({
  nullAvatar: {
    width: 100,
    height: 100,
    backgroundColor: colors.arrow,
    borderRadius: 50,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    width:'30%'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.header,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    color: colors.arrow,
  },
  inputFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sexButton:{
    width:30,
    height:30,
    backgroundColor:colors.arrow,
    marginHorizontal:10,
    borderRadius:15
  },
  sexButtonActive:{
    width:30,
    height:30,
    backgroundColor:colors.header,
    marginHorizontal:10,
    borderRadius:15
  }
});
export default styles;
