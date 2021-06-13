import React from 'react';
import { Image } from 'react-native';

interface IRouteProps {
  id: string;
}

const SpecieDetails: React.FC<IRouteProps> = ({ route }) => {
  const { image } = route.params;

  return (
    <>
      <Image
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
        source={{
          uri: `http://10.0.2.2:3333/files/${image}`,
        }}
        resizeMode="center"
      />
    </>
  );
};

export default SpecieDetails;
