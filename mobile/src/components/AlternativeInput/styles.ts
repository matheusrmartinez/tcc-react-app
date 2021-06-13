import styled, { css } from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
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

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #312e38;
    `}
`;

export const Icon = styled(EntypoIcon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #312e38;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
