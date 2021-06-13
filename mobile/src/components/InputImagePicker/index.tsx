import React, { useCallback, useState } from 'react';
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputProps } from 'react-native';
import { ContainerSpecieInput, TextSpecieInput, Icon } from './styles';

interface IImageProps {
  uri: string;
  type: any;
  name: any;
}
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  children: any;
  isFilled: boolean;
  setImage: (image: IImageProps) => void;
}

const InputImagePicker: React.FC<InputProps> = ({
  children,
  icon,
  setImage,
  isFilled,
}: InputProps) => {
  const options: ImagePickerOptions = {
    title: 'Selecione uma opção',
    chooseFromLibraryButtonTitle: 'Escolher da biblioteca...',
    takePhotoButtonTitle: 'Tirar foto...',
    cancelButtonTitle: 'Cancelar',
    storageOptions: {
      skipBackup: true,
      path: 'pictures',
    },
    mediaType: 'photo',
  };

  function handleOpenImagePicker() {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.data) await handleUploadImage(response);
    });
  }

  async function handleUploadImage(response: ImagePickerResponse) {
    const image: IImageProps = {
      uri: response.uri,
      type: response.type,
      name: response.fileName,
    };

    setImage(image);
  }

  return (
    <ContainerSpecieInput>
      <Icon name={icon} size={20} color={isFilled ? '#32CD32' : '#f4ede8'} />
      <TouchableOpacity onPress={handleOpenImagePicker}>
        <TextSpecieInput>{children}</TextSpecieInput>
      </TouchableOpacity>
    </ContainerSpecieInput>
  );
};

export default InputImagePicker;
