import React, { useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import imagemTwo  from '../../../assets/img/bicho-preguica2.jpg';
import imagemThree  from '../../../assets/img/bicho-preguica3.jpg';
import imagemFour  from '../../../assets/img/bicho-preguica4.jpg';
import imagemFive  from '../../../assets/img/bicho-preguica5.jpg';

const images = [
  { source: imagemTwo },
  { source: imagemThree },
  { source: imagemFour },
  { source: imagemFive },
];

const ModalImage: React.FC<{ setIsModalImageOpen(arg: boolean): void }> = ({ setIsModalImageOpen }) => {
  return (
    <ModalGateway>
        <Modal onClose={() => setIsModalImageOpen(false)}>
          <Carousel views={images} />
        </Modal>
    </ModalGateway>
  );
}

export default React.memo(ModalImage);