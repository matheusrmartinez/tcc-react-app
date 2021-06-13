import React, { Children, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { color } from 'react-native-reanimated';
import RadioButtonGroup from '../RadioButtonGroup';
import { styles } from './styles';
import { colors } from '../../theme/color';

type ModalPickerProps = {
  title: string;
  data: string[];
  value: string;
  label?: string;
  setValueFunction: (value: string) => void;
  widthInput?: string;
  disabled?: boolean;
  children: string;
};

const ModalPicker: React.FC<ModalPickerProps> = ({
  title,
  data,
  value,
  label,
  setValueFunction,
  widthInput,
  disabled = false,
  children,
}: ModalPickerProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View>
      <Overlay
        isVisible={visible}
        overlayStyle={
          children === 'Escolha a espécie'
            ? styles.overlaySpecie
            : styles.overlayAnimal
        }
        onBackdropPress={() => setVisible(false)}
      >
        <View>
          <Text style={styles.label}>{title}</Text>

          <RadioButtonGroup
            options={data}
            selectedValue={value}
            setSelectedValueFunction={(value) => {
              setValueFunction(value);
              setVisible(false);
            }}
            display="vertical"
          />
        </View>
      </Overlay>
      <View>
        {label ? <Text style={styles.text}>{label}</Text> : <></>}
        <View
          style={[
            styles.group,
            {
              width: wp(widthInput ?? '40%'),
              backgroundColor: colors.white,
            },
          ]}
        >
          <TextInput
            editable={false}
            style={[styles.input, { width: wp('75%') }]}
            placeholderTextColor={colors.black}
            placeholder={children}
            value={value}
          />
          <Button
            buttonStyle={styles.button}
            disabledStyle={styles.button}
            onPress={() => {
              setVisible(true);
            }}
            icon={
              <FeatherIcon name="arrow-down-circle" size={20} color="#ff9000" />
            }
            disabled={disabled}
          />
        </View>
      </View>
    </View>
  );
};

export default ModalPicker;
