import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import api from '../../services/api';

import { Title, Container, Scroll } from './styles';

interface IApparitionData {
  id: string;
  latitude: number;
  longitude: number;
  popular_name: string;
  scientific_name: string;
  specie_id: string;
}

const Catalogo: React.FC = () => {
  const [tamandua, setTamandua] = useState<IApparitionData[]>(
    [] as IApparitionData[],
  );
  const [tatu, setTatu] = useState<IApparitionData[]>([] as IApparitionData[]);
  const [bichoPreguica, setBichoPreguica] = useState<IApparitionData[]>(
    [] as IApparitionData[],
  );

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getApparitionsApproved = useCallback(async () => {
    await api
      .get('/apparitions/approved')
      .then((res) => {
        setTamandua(
          res.data.filter(
            (apparition: IApparitionData) =>
              apparition.specie_id === 'Tamanduá',
          ),
        );
        setBichoPreguica(
          res.data.filter(
            (apparition: IApparitionData) =>
              apparition.specie_id === 'Bicho-preguiça',
          ),
        );
        setTatu(
          res.data.filter(
            (apparition: IApparitionData) => apparition.specie_id === 'Tatu',
          ),
        );
      })
      .catch((error) =>
        Alert.alert(`Falha ao recuperar as aparições. Retorno: ${error}`),
      );
  }, []);

  useEffect(() => {
    getApparitionsApproved();
  }, [isFocused]);

  const Item = ({ title, onPress }) => (
    <Button
      onPress={onPress}
      style={{ width: 350, borderRadius: 20, alignSelf: 'center' }}
    >
      {title}
    </Button>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.popular_name}
      onPress={() => navigation.navigate('SpecieDetails', item)}
    />
  );

  return (
    <>
      <Scroll>
        <Container>
          <Title
            style={{
              flex: 1,
              fontSize: 30,
              alignSelf: 'center',
            }}
          >
            Catálogo
          </Title>
          <Title
            style={{
              fontSize: 30,
            }}
          >
            Tamanduá
            <FlatList
              data={tamandua}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </Title>
          <Title style={{ fontSize: 30 }}>Bicho-preguiça</Title>
          <FlatList
            data={bichoPreguica}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <Title style={{ fontSize: 30 }}>Tatu</Title>
          <FlatList
            data={tatu}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Container>
      </Scroll>
    </>
  );
};

export default Catalogo;
