/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const LoggedInContext = createContext({
  loggedIn: false,
  setLoggedIn: (_: boolean) => {},
});

const Home = () => {
  const {setLoggedIn} = React.useContext(LoggedInContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => setLoggedIn(false)}>Logout</Button>
    </View>
  );
};

const Login = () => {
  const {setLoggedIn} = React.useContext(LoggedInContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => setLoggedIn(true)}>Login</Button>
    </View>
  );
};

const AuthGate = ({children}: {children: React.ReactNode}) => {
  const {loggedIn} = React.useContext(LoggedInContext);

  return loggedIn ? <>{children}</> : <Login />;
};

const MaterialBottomNavigation = () => {
  const BottomTabs = createMaterialBottomTabNavigator();

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={Home} />
    </BottomTabs.Navigator>
  );
};

const BottomNavigation = () => {
  const BottomTabs = createBottomTabNavigator();

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={Home} />
    </BottomTabs.Navigator>
  );
};

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* It does not work */}
        <Stack.Screen name="Bottom" component={MaterialBottomNavigation} />
        {/* It does work */}
        {/* <Stack.Screen name="Bottom" component={BottomNavigation} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <SafeAreaProvider>
      <LoggedInContext.Provider value={{loggedIn, setLoggedIn}}>
        <AuthGate>
          <Navigation />
        </AuthGate>
      </LoggedInContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
