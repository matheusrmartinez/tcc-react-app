import styled from 'styled-components/native';
import { Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px 1px;
  background: #a38970;
`;

export const EmptyContainer = styled.View`
  background: #a38970;
  height: 378px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 32px 0 24px;
  align-self: center;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

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
  margin-left: 20px;
`;
