import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import InputImagePicker from '../../components/InputImagePicker';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Scroll, Title } from './styles';

interface AuthState {
  token: string;
  user: object;
}
interface CadastroAparicaoFormData {
  apparition_name: string;
  longitude: number;
  latitude: number;
  image: IImageProps;
  user: string;
  specie_id: string;
  animal_id: any;
  approved: boolean;
  address: string;
  uri: string;
}

interface IImageProps {
  uri: string;
  type: any;
  name: any;
}

const ApparitionRegistry: React.FC = () => {
  const [image, setImage] = useState<IImageProps>({} as IImageProps);
  const addressRef = useRef<any>(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { user } = useAuth();
  const { id } = user;
  const formRef = useRef<FormHandles>(null);
  const longitudeRef = useRef<any>(null);
  const latitudeRef = useRef<any>(null);
  const apparitionNameRef = useRef<any>(null);
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (!isFocused) {
        formRef?.current?.reset();
        setLongitude('');
        setLatitude('');
        setImage({ uri: '', type: '', name: '' });
      }
    }, [isFocused]),
  );

  useEffect(() => {
    setImage({ uri: '', type: '', name: '' });
  }, []);

  const handleGetCoordinatesGPS = useCallback(async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        formRef?.current?.setFieldValue(
          'latitude',
          latitude || location.latitude.toString(),
        );

        formRef?.current?.setFieldValue(
          'longitude',
          longitude || location.longitude.toString(),
        );

        Geocoder.init('AIzaSyDcPvA-LAqrgeknACYyPLa9b2JbTeeOJAk');
        Geocoder.from(
          formRef?.current?.getFieldValue('latitude'),
          formRef?.current?.getFieldValue('longitude'),
        ).then((json) =>
          formRef.current?.setFieldValue(
            'address',
            String(
              json.results[0].address_components.map(
                ({ short_name }) => short_name,
              ),
            ),
          ),
        );
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, [latitude, longitude]);

  function clearFields(value: string, isLatitudeValue: boolean): void {
    formRef?.current?.clearField('address');
    isLatitudeValue ? setLatitude(value) : setLongitude(value);
  }

  const handleCreateApparitionRecord = useCallback(
    async (data: CadastroAparicaoFormData) => {
      try {
        data.animal_id = null;
        data.approved = false;
        data.user = id;
        data.image = image;
        data.uri = image.uri;

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          apparition_name: Yup.string().required(
            'Nome da aparição obrigatória.',
          ),
          uri: Yup.string().required('Envio de imagem obrigatório.'),
          latitude: Yup.number()
            .required(
              'Informe uma latitude válida. Valor esperado: Maior que -90 e menor ou igual a 90.',
            )
            .moreThan(-91)
            .lessThan(91),
          longitude: Yup.number()
            .required(
              'Informe uma longitude válida. Valor esperado: Maior que -180 e menor ou igual a 180.',
            )
            .moreThan(-181)
            .lessThan(181),
          address: Yup.string().required('Endereço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const formData = new FormData();
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);
        formData.append('animal_id', data.animal_id);
        formData.append('approved', data.approved);
        formData.append('user', data.user);
        formData.append('image', data.image);
        formData.append('apparition_name', data.apparition_name);
        formData.append('address', data.address);

        await api.post('/apparitions', formData);
        formRef.current?.reset();
        setLongitude('');
        setLatitude('');
        setImage({ uri: '', type: '', name: '' });

        Alert.alert('Aparição cadastrada com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          const { uri } = errors;

          if (uri) {
            Alert.alert(uri);
          }

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro da apiração',
          'Ocorreu um erro ao tentar cadastrar a aparição, tente novamente',
        );
      }
    },
    [id, image],
  );

  return (
    <>
      <Scroll>
        <View />
        <Container>
          <Title style={{ flex: 1, position: 'relative', fontSize: 30 }}>
            Cadastro de aparição
          </Title>
          <Form
            ref={formRef}
            onSubmit={handleCreateApparitionRecord}
            style={{ flex: 1, width: '100%', height: '100%' }}
          >
            <Input
              editable
              ref={apparitionNameRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              name="apparition_name"
              placeholder="Nome da aparição"
              icon="edit"
              returnKeyType="send"
              onSubmitEditing={() => {
                latitudeRef.current?.focus();
              }}
            />
            <Input
              editable
              ref={latitudeRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="numeric"
              name="latitude"
              placeholder="Latitude"
              icon="map-pin"
              returnKeyType="send"
              onChangeText={(value) => clearFields(value, true)}
              onSubmitEditing={() => {
                longitudeRef.current?.focus();
              }}
            />
            <Input
              ref={longitudeRef}
              editable
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="numeric"
              name="longitude"
              placeholder="Longitude"
              icon="map-pin"
              returnKeyType="send"
              onChangeText={(value) => clearFields(value, false)}
            />
            <TextArea
              editable={false}
              ref={addressRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              name="address"
              placeholder="Endereço"
              icon="map-pin"
              returnKeyType="send"
              numberOfLines={2}
            />
            <InputImagePicker
              setImage={setImage}
              icon="check"
              name="check"
              isFilled={image.uri !== ''}
            >
              <Text>Inserir imagem da espécie</Text>
            </InputImagePicker>

            <Button
              style={{ marginBottom: 40, marginTop: 3 }}
              onPress={handleGetCoordinatesGPS}
            >
              Obter coordenadas do GPS
            </Button>
            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </Container>
      </Scroll>
    </>
  );
};

export default ApparitionRegistry;
