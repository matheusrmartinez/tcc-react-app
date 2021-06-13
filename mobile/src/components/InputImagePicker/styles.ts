import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const ContainerSpecieInput = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #f4ede8;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #a38970;
  flex-direction: row;
  align-items: center;
`;

export const TextSpecieInput = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
