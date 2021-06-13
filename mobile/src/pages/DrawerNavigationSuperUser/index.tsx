import 'react-native-gesture-handler';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ApparitionsPendingApproval from '../ApparitionsPendingApproval';
import AnimalRegistry from '../AnimalRegistry';
import ApparitionRegistry from '../ApparitionRegistry';
import Catalog from '../Catalog';
import History from '../History';
import HomeScreen from '../HomeScreen';
import Map from '../Map';
import DetailsApparitionPending from '../DetailsApparitionPending';
import SpecieDetails from '../SpecieDetails';

import { useAuth } from '../../hooks/auth';

const Drawer = createDrawerNavigator();

const DetailsApparitionPendingStack = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <DetailsApparitionPendingStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Aparições Pendentes"
    >
      <DetailsApparitionPendingStack.Screen
        name="ApparitionsPendingApproval"
        component={ApparitionsPendingApproval}
      />
      <DetailsApparitionPendingStack.Screen
        name="DetailsApparitionPending"
        component={DetailsApparitionPending}
      />
    </DetailsApparitionPendingStack.Navigator>
  );
};

const CatalogStack: React.FC = () => {
  return (
    <DetailsApparitionPendingStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Catálogo"
    >
      <DetailsApparitionPendingStack.Screen
        name="Catálogo"
        component={Catalog}
      />
      <DetailsApparitionPendingStack.Screen
        name="SpecieDetails"
        component={SpecieDetails}
      />
    </DetailsApparitionPendingStack.Navigator>
  );
};

const CustomDrawer: React.FC = (props) => {
  const { signOut } = useAuth();
  return (
    <>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
        <DrawerItem label="Sair" onPress={signOut} />
      </DrawerContentScrollView>
    </>
  );
};

const DrawerNavigationSuperUser: React.FC = () => {
  return (
    <>
      <NavigationContainer independent>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} key="Home" />
          <Drawer.Screen name="Historia" component={History} />
          <Drawer.Screen name="Catálogo" component={CatalogStack} />
          <Drawer.Screen name="Cadastro de Animal" component={AnimalRegistry} />
          <Drawer.Screen
            name="Cadastro de Aparição"
            component={ApparitionRegistry}
          />
          <Drawer.Screen name="Aparições Pendentes" component={AppStack} />
          <Drawer.Screen name="Mapa" component={Map} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};
export default DrawerNavigationSuperUser;
