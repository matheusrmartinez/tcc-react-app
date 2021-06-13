import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Form } from '@unform/mobile';
import { typography } from '../../theme/typography';

import { Title, Container, EmptyContainer, Scroll } from './styles';

const History: React.FC = () => {
  return (
    <>
      <Scroll>
        <Container>
          <Title
            style={{
              flex: 1,
              position: 'relative',
              fontSize: 30,
              alignSelf: 'center',
            }}
          >
            História
          </Title>
          <Text
            style={{
              fontFamily: typography.fontFamilies.RobotoSlabRegular,
              fontSize: 20,
              textAlign: 'justify',
            }}
          >
            Os Xenartros (Xenarthra, do grego xenos "estranho", e arthros
            "articulação") são uma superordem de mamíferos placentários,
            anteriormente designada como Edentata, que inclui os animais ditos
            desdentados. O grupo é nativo do continente americano e surgiu no
            Terciário, há cerca de 60 milhões de anos.Esses animais tem a
            distribuição geográfica que vai do Centro sul da América do Norte,
            passando pelas América Central até o sul da América do Sul,ou seja,
            eles estão ocupando varias partes do mundo. O nome da ordem advém da
            estrutura das vértebras destes animais, bastante distinta dos
            restantes mamíferos. As vértebras dorso-lombares apresentam, além
            das articulações comuns, uma articulação acessória (xenartria). De
            um modo geral, os membros do grupo têm os dentes molares pouco
            desenvolvidos, o que lhes deu o nome popular de desdentados.
          </Text>
          <EmptyContainer />
        </Container>
      </Scroll>
    </>
  );
};

export default History;
