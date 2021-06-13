import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import * as Yup from 'yup';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalPicker from '../../components/ModalPicker';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Title } from './styles';

interface CadastroAparicaoFormData {
  id: string;
  longitude: number;
  latitude: number;
  image: string;
  specie_id: string;
  animal_id: string;
  popular_name: string;
  scientific_name: string;
  approved: boolean;
}

interface IRouteProps {
  id: string;
}

interface IApparitionData {
  latitude: number;
  longitude: number;
  address: string;
  image_url: string;
}

interface IAnimalData {
  popular_name: string;
  scientific_name: string;
  id: string;
}

const DetailsApparitionPending: React.FC<IRouteProps> = ({ route }) => {
  const { id } = route.params;
  const [idApparition] = useState<string>(id);
  const [animals, setAnimals] = useState<IAnimalData[]>([] as IAnimalData[]);
  const [animalsDescription, setAnimalsDescription] = useState<string[]>(
    {} as string[],
  );
  const [apparitionRecord, setApparitionRecord] = useState<IApparitionData>(
    {} as IApparitionData,
  );
  const [specie, setSpecie] = useState('');
  const [animal, setAnimal] = useState('');
  const approvation = useRef(false);
  const longitudeRef = useRef<any>(null);
  const latitudeRef = useRef<any>(null);
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  useEffect(() => {
    async function getApparitionById(
      idApparitionRecord: string,
    ): Promise<void> {
      await api
        .get(`/apparitions/${idApparitionRecord}`)
        .then((res) => {
          setApparitionRecord({
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            address: res.data.address,
            image_url: res.data.image_url,
          });

          longitudeRef.current = apparitionRecord.longitude;
          latitudeRef.current = apparitionRecord.latitude;
        })

        .catch((error) =>
          Alert.alert(`Falha ao obter as aparições pendentes. ${error}`),
        );
    }

    async function getAnimals(): Promise<void> {
      await api.get('/animals').then((res) => {
        setAnimals(() =>
          res?.data?.map(({ id, popular_name, scientific_name }) => ({
            id,
            popular_name,
            scientific_name,
          })),
        );
        setAnimalsDescription(() =>
          res?.data?.map(({ popular_name }) => popular_name ?? ''),
        );
      });
    }

    getApparitionById(idApparition);
    getAnimals();
  }, [apparitionRecord.latitude, apparitionRecord.longitude, idApparition]);

  const handleApprovalApparition = useCallback(
    async (data: CadastroAparicaoFormData) => {
      try {
        data.id = idApparition;
        data.approved = approvation.current;
        data.latitude = apparitionRecord.latitude;
        data.longitude = apparitionRecord.longitude;
        const animalFiltered = animals?.filter(
          (line) => line.popular_name === animal,
        );
        data.specie_id = specie ?? null;
        data.animal_id = animalFiltered[0]?.id;
        data.popular_name = animalFiltered[0]?.popular_name;
        data.scientific_name = animalFiltered[0]?.scientific_name;

        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          specie_id: Yup.string().required('Espécie obrigatória.'),
          animal_id: Yup.string().required('Animal obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.patch(`apparitions/approvation/${data.approved}`, data);
        Alert.alert('Aparição aprovada com sucesso');
        navigation.navigate('ApparitionsPendingApproval');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          const { animal_id, specie_id } = errors;
          if (animal_id || specie_id) {
            Alert.alert(specie_id || animal_id);
          }

          return;
        }

        Alert.alert(
          'Erro ao aprovar a apiração',
          'Ocorreu um erro ao tentar aprovar a aparição, tente novamente',
        );
      }
    },
    [
      idApparition,
      animal,
      animals,
      specie,
      apparitionRecord?.latitude,
      apparitionRecord?.longitude,
      navigation,
    ],
  );

  const handleDesapprovalApparition = useCallback(
    async (data: CadastroAparicaoFormData) => {
      try {
        formRef.current?.setErrors({});

        data.id = idApparition;
        data.approved = approvation.current;
        data.latitude = apparitionRecord.latitude;
        data.longitude = apparitionRecord.longitude;
        const animalFiltered = animals?.filter(
          (line) => line.popular_name === animal,
        );
        data.specie_id = specie ?? null;
        data.animal_id = animalFiltered[0]?.id;
        data.popular_name = animalFiltered[0]?.popular_name ?? '';
        data.scientific_name = animalFiltered[0]?.scientific_name ?? '';

        await api.patch(`apparitions/approvation/${data.approved}`, data);
        Alert.alert('Aparição reprovada com sucesso');
        navigation.navigate('ApparitionsPendingApproval');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert(`${errors}`);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao rejeitar a apiração',
          'Ocorreu um erro ao tentar rejeitar a aparição, tente novamente',
        );
      }
    },
    [
      idApparition,
      animal,
      animals,
      specie,
      apparitionRecord?.latitude,
      apparitionRecord?.longitude,
      navigation,
    ],
  );

  const handleDecisionApparition = useCallback(
    async (data: CadastroAparicaoFormData) => {
      approvation.current
        ? handleApprovalApparition(data)
        : handleDesapprovalApparition(data);
    },
    [handleApprovalApparition, handleDesapprovalApparition],
  );

  return (
    <>
      <ScrollView>
        <Container>
          <Form
            ref={formRef}
            onSubmit={handleDecisionApparition}
            style={{ width: '100%', height: '100%' }}
          >
            <Title style={{ fontSize: 30, textAlign: 'center' }}>
              Aparição
            </Title>
            <Image
              style={{
                width: 325,
                height: 350,
                marginBottom: 10,
                borderRadius: 300,
              }}
              source={{
                uri: `http://10.0.2.2:3333/${apparitionRecord.image_url}`,
              }}
              resizeMode="stretch"
            />
            <Title style={{ fontSize: 30, textAlign: 'center' }}>
              Localização
            </Title>
            <Input
              value={apparitionRecord?.latitude?.toString()}
              ref={latitudeRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="numeric"
              name="latitude"
              icon="map-pin"
              editable={false}
              placeholder="Latitude"
              returnKeyType="send"
              onSubmitEditing={() => {
                longitudeRef.current?.focus();
              }}
            />
            <Input
              ref={longitudeRef}
              value={apparitionRecord?.longitude?.toString()}
              autoCorrect={false}
              icon="map-pin"
              autoCapitalize="none"
              keyboardType="numeric"
              name="longitude"
              editable={false}
              placeholder="Longitude"
              returnKeyType="send"
            />
            <TextArea
              editable={false}
              value={apparitionRecord.address}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              name="address"
              placeholder="Endereço"
              icon="map-pin"
              returnKeyType="send"
              numberOfLines={2}
              autoFocus
            />
            <ModalPicker
              title="Escolha a espécie"
              children="Escolha a espécie"
              value={specie}
              data={['Tamanduá', 'Bicho-preguiça', 'Tatu']}
              setValueFunction={setSpecie}
              widthInput="85%"
            />
            <ModalPicker
              title="Escolha o animal"
              children="Escolha o animal"
              value={animal}
              data={animalsDescription}
              setValueFunction={setAnimal}
              widthInput="85%"
            />
            <Button
              style={{ marginTop: 40 }}
              onPress={() => {
                approvation.current = true;
                formRef.current?.submitForm();
              }}
            >
              Aprovar
            </Button>
            <Button
              onPress={() => {
                approvation.current = false;
                formRef.current?.submitForm();
              }}
            >
              Rejeitar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </>
  );
};

export default DetailsApparitionPending;
