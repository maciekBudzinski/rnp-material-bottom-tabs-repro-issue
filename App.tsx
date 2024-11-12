import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const LoggedInContext = createContext({
  loggedIn: false,
  setLoggedIn: (_: boolean) => {},
});

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

const CrashScreen = () => {
  const {setLoggedIn} = React.useContext(LoggedInContext);
  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      // This line causes crash
      removeClippedSubviews={true}>
      <Button onPress={() => setLoggedIn(false)}>Logout</Button>
    </View>
  );
};

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Crash" component={CrashScreen} />
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
