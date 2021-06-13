import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, FlatList } from 'react-native';

import Button from '../../components/Button';
import AxiosResult from '../../models/axiosResult';
import api from '../../services/api';
import { Container, EmptyContainer, Scroll, Title } from './styles';

interface IApparitionData {
  id: string;
  name: string;
}

const ApparitionsPendingApproval: React.FC = () => {
  const [apparitions, setApparitions] = useState<IApparitionData[]>(
    [] as IApparitionData[],
  );
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getApparitionsNotApproved(): Promise<void> {
      await api
        .get('/apparitions')
        .then((res) => {
          let json: any;
          let response: any;
          const axiosResult = new AxiosResult();
          json = res.data;
          response = JSON.stringify(json);
          axiosResult.AddResponseData(response);

          const responseApi: IApparitionData[] = JSON.parse(
            axiosResult.GetResponseData(),
          );

          setApparitions(responseApi);
        })

        .catch((error) =>
          Alert.alert(`Falha ao obter as aparições pendentes. ${error}`),
        );
    }

    getApparitionsNotApproved();
  }, [isFocused]);

  const Item = ({ title, onPress }) => (
    <Button onPress={onPress} style={{ width: 350, borderRadius: 10 }}>
      {title}
    </Button>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.name}
      onPress={() =>
        navigation.navigate('DetailsApparitionPending', {
          id: item.id,
        })
      }
    />
  );
  return (
    <>
      <Scroll>
        <Container>
          <Title style={{ position: 'relative', fontSize: 30 }}>
            Aparições Pendentes
          </Title>
          <FlatList
            data={apparitions}
            renderItem={renderItem}
            keyExtractor={({ id }) => String(id)}
          />
          <EmptyContainer />
        </Container>
      </Scroll>
    </>
  );
};

export default ApparitionsPendingApproval;
