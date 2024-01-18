import {StyleSheet} from 'react-native';
import colors from '../colors';
const styles = StyleSheet.create({
    nullAvatar: {
        width: 100,
        height: 100,
        backgroundColor: colors.arrow,
        borderRadius:50
      },
      imageBox:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:30
      },
      image:{
        width: 100,
        height: 100,
        borderRadius:50
      },
      button:{
        marginHorizontal:20,
        backgroundColor:colors.arrow,
        opacity:0.5,
        height:30,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
      }
})
export default styles;