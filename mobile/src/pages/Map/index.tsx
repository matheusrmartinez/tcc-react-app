import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Button from '../../components/Button';
import ModalPicker from '../../components/ModalPicker';
import { GetDateFormatedDateTimeFormat } from '../../models/date-helper';
import api from '../../services/api';
import { colors } from '../../theme/color';

interface IApparitionData {
  id: string;
  latitude: number;
  longitude: number;
  popular_name: string;
  specie_id: string;
  created_at: string;
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

const Map: React.FC = () => {
  const [specie, setSpecie] = useState<string>('');
  const [dataSpecie, setDataSpecie] = useState([
    'Todos',
    'Tamanduá',
    'Bicho-preguiça',
    'Tatu',
  ]);
  const [coordinates, setCoordinates] = useState<Coordinates>(
    {} as Coordinates,
  );
  const [apparitions, setApparitions] = useState<IApparitionData[]>(
    [] as IApparitionData[],
  );

  async function getApparitionsApprovedBySpecieId(): Promise<void> {
    await api
      .get(`/apparitions/approved/${specie}`)
      .then((res) => {
        setApparitions(res.data);
      })
      .catch((error) => Alert.alert(`Falha ao obter as aparições. ${error}`));
  }

  const getCoordinates = useCallback(async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setCoordinates({
          longitude: location.longitude,
          latitude: location.latitude,
        });
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {
    getCoordinates;
    getApparitionsApprovedBySpecieId();
  }, []);

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          borderColor: '#312e38',
          backgroundColor: colors.white,
        }}
      >
        <ModalPicker
          title="Escolha a espécie"
          children="Escolha a espécie"
          value={specie}
          data={dataSpecie}
          setValueFunction={setSpecie}
          widthInput="85%"
        />
      </View>
      <Button onPress={getApparitionsApprovedBySpecieId}>Filtrar</Button>
      <MapView
        style={{ height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coordinates.latitude ?? -23.5405,
          longitude: coordinates.longitude ?? -47.444,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {apparitions.map((marker) => (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={`Animal: ${
              marker.popular_name
            }. Data registro: ${GetDateFormatedDateTimeFormat(
              marker.created_at,
            )}`}
            key={marker.id}
          />
        ))}
      </MapView>
    </>
  );
};

export default Map;
