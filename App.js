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
import Login from "./src/screens/Login";
import User_UI from "./src/components/User_UI";
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
        <Stack.Screen name="BottomTab" component={BottomTabs} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen
          name="AccountAndSercurity"
          component={AccountAndSercurityScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
