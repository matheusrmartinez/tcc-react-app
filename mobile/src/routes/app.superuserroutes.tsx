import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigationSuperUser from '../pages/DrawerNavigationSuperUser';
import ApparitionScreen from '../pages/ApparitionScreen';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer independent>
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <App.Screen
        name="DrawerNavigationSuperUser"
        component={DrawerNavigationSuperUser}
      />
    </App.Navigator>
    <App.Screen name="ApparitionScreen" component={ApparitionScreen} />
  </NavigationContainer>
);

export default AppRoutes;
