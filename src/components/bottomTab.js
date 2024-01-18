import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Message, User, UserTag } from 'iconsax-react-native';
import colors from '../styles/colors';
import MessageScreen from '../screens/message'
import PhoneBookScreen from '../screens/phonebook'
import AccountScreen from '../screens/account'
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Tin nhắn' screenOptions={{headerShown:false}}>
      <Tab.Screen name='Tin nhắn' component={MessageScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Message color={focused ? colors.header : "#000"} />
          ),
          tabBarShowLabel: false,
        }} />
        <Tab.Screen name='Danh bạ' component={PhoneBookScreen} options={{
          tabBarIcon: ({ focused }) => (
            <UserTag color={focused ? colors.header : "#000"} />
          ),
          tabBarShowLabel: false,
        }} />
        <Tab.Screen name='Cá nhân' component={AccountScreen} options={{
          tabBarIcon: ({ focused }) => (
            <User color={focused ? colors.header : "#000"} />
          ),
          tabBarShowLabel: false,
        }} />
    </Tab.Navigator>
  )
}

export default BottomTabs