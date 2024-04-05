/* eslint-disable prettier/prettier */

import { View, Text } from 'react-native'
import React from 'react'

const PersonInfor = ({ infor, infor2 }) => {
    return (
        <View style={{ borderBottomWidth: 1, flexDirection: 'row', marginTop: 10, padding: 20, borderBottomColor: '#A1A1A1' }}>
            <Text style={{ fontSize: 18, marginRight: 40 }}>{infor}</Text>
            <Text style={{ fontSize: 18, color: 'black', }}>{infor2}</Text>
        </View>
    )
}

export default PersonInfor