import "./styles.scss";

import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Image } from '@material-ui/icons';
import ReactTooltip from 'react-tooltip';
import TableStyle from '../../components/Shared/Table';
import Loader from '../../components/Shared/Loader';
import Animals from '../../actions/animalsActions';
import ModalImage from "../../components/Shared/ModalImage";

import React, { useEffect, useState } from "react";

const AnimalCatalog: React.FC = () => {
  const [ animalsList, setAnimalsList] = useState([]);
  const [ isLoading, setIsLoading] = useState(true);
  const [ isModalImageOpen, setModalImageOpen] = useState(false);

  const dispatchAnimalsList = async () => {
    const animalsList = await Animals.getAnimals();
    setAnimalsList(animalsList);
    setIsLoading(false);
  }

  useEffect( () => {
    dispatchAnimalsList()
  }, [])

  return (
    <>
      <div className='AnimalsList'>
        <h3 className='__title'>
          Lista de Registros Animais
          <span>Listagem de todas os registros de animais. </span>
        </h3>

        <br />
        <br />
        <br />

        <TableStyle>
          <Table className='_table'>
            <TableHead>
              <TableCell>Espécie</TableCell>
              <TableCell>Nome Popular</TableCell>
              <TableCell>Nome Científico</TableCell>
              <TableCell>Ações</TableCell>
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={1000}>
                    <Loader />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                animalsList?.map((animal: any) => (
                  <TableRow>
                    <TableCell>{animal?.specie}</TableCell>
                    <TableCell>{animal?.popular_name}</TableCell>
                    <TableCell>{animal?.scientific_name}</TableCell>
                    <TableCell>
                      <Button
                        data-tip='Visualizar Imagem do animal'
                        onClick={() => setModalImageOpen(true)}
                      >
                        <Image />
                      </Button>

                      <ReactTooltip place='top' type='dark' effect='solid' className='tooltip' />
                    </TableCell>

                  </TableRow>
                )
               )}
            </TableBody>
          </Table>
        </TableStyle>
      </div>

      {isModalImageOpen && <ModalImage setIsModalImageOpen={() => setModalImageOpen( !isModalImageOpen)} />}
    </>
  );
};

export default React.memo(AnimalCatalog);


