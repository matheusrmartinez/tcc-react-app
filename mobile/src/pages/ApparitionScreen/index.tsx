import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsApparitionPending from '../DetailsApparitionPending';

const Apparition = createStackNavigator();

const ApparitionScreen: React.FC = () => (
  <Apparition.Navigator>
    <Apparition.Screen
      name="DetailsApparitionPending"
      component={DetailsApparitionPending}
    />
  </Apparition.Navigator>
);

export default ApparitionScreen;
