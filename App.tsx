import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import StaffScreen from './screens/StaffScreen';
import AdminScreen from './screens/AdminScreen';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native-paper';

interface Props {
  // Define props here
}

const App: React.FC<Props> = (
  {
    /* destructure props here */
  },
) => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<ActivityIndicator color="#55BCF6" size={40} />}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Staff" component={StaffScreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
