import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from '../pages/DrawerNavigation';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="DrawerNavigation" component={DrawerNavigation} />
  </App.Navigator>
);

export default AppRoutes;
