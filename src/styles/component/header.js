import React from "react";
import { StyleSheet } from "react-native";
import colors from "../colors";
const styles = StyleSheet.create({
    headerBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        height:50,
        backgroundColor: colors.header,
    },
    box:{
        flexDirection:'row'
    }
})
export default styles;