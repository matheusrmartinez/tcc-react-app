import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef, useState } from 'react';
import { ReactText } from 'react';
import { Alert, ScrollView, TextInputProps, View } from 'react-native';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalPicker from '../../components/ModalPicker';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, EmptyContainer, Title } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface AnimalRegisterFormData {
  scientific_name: string;
  popular_name: string;
  image: string;
  specie: ReactText;
  user: string;
}

const AnimalRegistry: React.FC<InputProps> = ({ icon }) => {
  const [specie, setSpecie] = useState('');
  const [response, setResponse] = useState('');
  const { user } = useAuth();
  const { id } = user;
  const formRef = useRef<FormHandles>(null);
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (!isFocused) {
        formRef.current?.reset();
        setSpecie('');
      }
    }, [isFocused]),
  );

  const handleAnimalRegister = useCallback(
    async (data: AnimalRegisterFormData) => {
      try {
        data.image = '';
        data.user = id;
        data.specie = specie;

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          scientific_name: Yup.string().required(
            'Nome científico obrigatório.',
          ),
          popular_name: Yup.string().required('Nome popular obrigatório.'),
          specie: Yup.string().required('Espécie obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setResponse(await api.post('/animals', data));

        formRef.current?.reset();
        setSpecie('');

        Alert.alert('Animal cadastrado com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          const { specie } = errors;
          if (specie) {
            Alert.alert(specie);
          }

          formRef.current?.setErrors(errors);

          return;
        }
        const errorMessage = err.toString();

        const isAnimalAlreadyRegistered =
          errorMessage === 'Error: Request failed with status code 401';

        const error = isAnimalAlreadyRegistered
          ? 'Já existe um animal cadastrado com o nome popular ou nome científico informados.'
          : err.toString();

        Alert.alert(
          'Erro no cadastro',
          `Ocorreu um erro ao fazer cadastro. Retorno: ${error} `,
        );
      }
    },
    [specie, id],
  );

  return (
    <>
      <ScrollView>
        <View />
        <Container>
          <Title style={{ flex: 1, position: 'relative', fontSize: 30 }}>
            Cadastro de animal
          </Title>
          <Form
            ref={formRef}
            onSubmit={handleAnimalRegister}
            style={{ flex: 1 }}
          >
            <Input
              editable
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              name="scientific_name"
              placeholder="Nome Científico"
              icon="edit"
            />
            <Input
              editable
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              name="popular_name"
              placeholder="Nome Popular"
              icon="edit"
            />
            <ModalPicker
              children="Escolha a espécie"
              title="Escolha a espécie"
              value={specie}
              data={['Tamanduá', 'Bicho-preguiça', 'Tatu']}
              setValueFunction={setSpecie}
              widthInput="85%"
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
            <EmptyContainer />
          </Form>
        </Container>
      </ScrollView>
    </>
  );
};

export default AnimalRegistry;
