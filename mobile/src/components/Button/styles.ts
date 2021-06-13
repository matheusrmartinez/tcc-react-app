import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 60px;
  background: #f4ede8;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 5px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
