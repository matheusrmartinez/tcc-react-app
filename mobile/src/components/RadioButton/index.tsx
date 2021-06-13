import React from 'react';
import { CheckBox } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from './styles';

type RadioButtonProps = {
  title: string;
  checked: boolean;
  dark?: boolean;
  onPress: () => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  title,
  checked,
  dark,
  onPress,
}: RadioButtonProps) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      checkedIcon={<FeatherIcon name="circle" size={14} color="#ff9000" />}
      uncheckedIcon={<FeatherIcon name="circle" size={14} color="#ff9000" />}
      onPress={onPress}
      textStyle={[dark ? styles.dark : styles.light, styles.checkbox]}
      containerStyle={styles.container}
    />
  );
};

export default RadioButton;
