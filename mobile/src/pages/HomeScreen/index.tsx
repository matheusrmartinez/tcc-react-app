import 'react-native-gesture-handler';

import React from 'react';
import { Image, StatusBar, View } from 'react-native';

import BackGroundImage from '../../assets/bicho_preguica.jpg';

const HomeScreen: React.FC = () => {
  return (
    <>
      <StatusBar hidden />
      <View style={{ flex: 1, alignItems: 'center', alignContent: 'center' }}>
        <Image
          source={BackGroundImage}
          resizeMode="cover"
          style={{ height: '100%', width: '100%' }}
        />
      </View>
    </>
  );
};
export default HomeScreen;
