import React from 'react';
import { View, ViewStyle, StyleProp, ScrollView } from 'react-native';

import RadioButton from '../RadioButton';
import styles from './styles';

type RadioButtonGroupProps = {
  selectedValue: string;
  setSelectedValueFunction: (value: string) => void;
  options: string[];
  display: 'horizontal' | 'vertical';
  dark?: boolean;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  selectedValue,
  setSelectedValueFunction,
  options,
  display,
  dark,
}: RadioButtonGroupProps) => {
  function getFlexDirectionStyleProps(): StyleProp<ViewStyle> {
    return { flexDirection: display === 'horizontal' ? 'row' : 'column' };
  }

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={getFlexDirectionStyleProps()}>
          {options.map((option) => (
            <RadioButton
              key={option}
              title={option}
              checked={option === selectedValue}
              dark={dark}
              onPress={() => setSelectedValueFunction(option)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RadioButtonGroup;
