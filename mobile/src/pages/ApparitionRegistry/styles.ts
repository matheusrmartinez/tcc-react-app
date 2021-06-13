import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px 1px;
  background: #a38970;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 32px 0 24px;
  align-self: center;
`;

export const Scroll = styled.ScrollView`
  background: #a38970;
  padding: 0 10px;
`;
