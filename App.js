/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { View, Text } from 'react-native';
import React from "react";
import SettingScreen from "./src/screens/setting";
// eslint-disable-next-line prettier/prettier
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// eslint-disable-next-line prettier/prettier
import { NavigationContainer } from '@react-navigation/native';
import AccountAndSercurityScreen from "./src/screens/account_and_sercurity";
import BottomTabs from "./src/components/bottomTab";
import Login from "./src/screens/login/Login";
import User_UI from "./src/components/User_UI";
import ResgisterAccount from "./src/screens/resgister/ResgisterAccount";
import ResgisterOPT from "./src/screens/resgister/ResgisterOPT";
import Addchat from "./src/screens/conversation/AddChat";

// eslint-disable-next-line quotes
import ForgetPassword from "./src/screens/forgetPassword/ForgetPassword"
import AddChat from './src/screens/conversation/AddChat';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="User_UI"
        // eslint-disable-next-line prettier/prettier
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="User_UI" component={User_UI} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ResgisterAccount"
          component={ResgisterAccount}
          options={{ headerShown: true }}
        />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: true }} />
        {/* <Stack.Screen
          name="ResgisterPhone"
          component={ResgisterPhone}
          options={{ headerShown: true }}
        /> */}

        <Stack.Screen name="BottomTab" component={BottomTabs} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen
          name="AccountAndSercurity"
          component={AccountAndSercurityScreen}
        />
        <Stack.Screen name="ResgisterOPT" component={ResgisterOPT} />
        <Stack.Screen name="AddChat" component={AddChat} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
