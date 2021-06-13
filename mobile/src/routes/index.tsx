import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthRoutes from './auth.routes';
import AppSuperUserRoutes from './app.superuserroutes';
import AppUserRoutes from './app.userroutes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if (user) {
    const { superuser } = user;
    return superuser ? <AppSuperUserRoutes /> : <AppUserRoutes />;
  }

  return <AuthRoutes />;
};

export default Routes;
