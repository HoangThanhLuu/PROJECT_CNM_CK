import React from "react";
import { StyleSheet } from "react-native";
import colors from "../colors";
const styles = StyleSheet.create({
    optionBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        height:50,
        backgroundColor: colors.primary,
    },
    box:{
        flexDirection:'row'
    }
})
export default styles;