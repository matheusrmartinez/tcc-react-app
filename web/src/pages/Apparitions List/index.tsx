import "./styles.scss";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Image, Room } from '@material-ui/icons';
import TableStyle from '../../components/Shared/Table';
import Loader from '../../components/Shared/Loader';
import Apparitions from '../../actions/apparitionsActions';
import ModalImage from "../../components/Shared/ModalImage";

import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

const ApparitionsList: React.FC = () => {
  const [ apparitionList, setApparitionList] = useState([]);
  const [ isLoading, setIsLoading] = useState(true);
  const [ isModalImageOpen, setModalImageOpen] = useState(false);

  const dispatchApparitionList = async () => {
    const apparitionList = await Apparitions.getApparitions();
    setApparitionList(apparitionList);
    setIsLoading(false);
  }

  useEffect( () => {
    dispatchApparitionList()
  }, [])

  const handleOpenGoogleMapsWithCoordinates = async (lat: any, lng: any) => {
    localStorage.setItem('latitude', lat);
    localStorage.setItem('longitude', lng);

    window.location.href='/map'
  }

  return (
    <>
      <div className='ApparitionsList'>
        <h3 className='__title'>
          Lista de Aparições
          <span>Listagem de todas as aparições já cadastradas. </span>

        </h3>
        <br />
        <br />
        <br />

        <TableStyle>
          <Table className='_table'>
            <TableHead>
              <TableCell>Nome</TableCell>
              <TableCell>Nome Popular</TableCell>
              <TableCell>Nome Especifico</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Data Cadastros</TableCell>
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
                apparitionList?.map((apparition: any) => (
                  <TableRow>
                    <TableCell>{apparition?.name}</TableCell>
                    <TableCell>{apparition?.popular_name}</TableCell>
                    <TableCell>{apparition?.scientific_name}</TableCell>
                    <TableCell>{apparition?.latitude}</TableCell>
                    <TableCell>{apparition?.longitude}</TableCell>
                    <TableCell>{apparition?.created_at}</TableCell>
                    <TableCell>
                      <Button
                        data-tip='Visualizar imagem do animals'
                        onClick={() => setModalImageOpen(true)}
                      >
                        <Image />
                      </Button>
                      <Button
                        data-tip='Visualizar no Mapa as coordenadas'
                        onClick={
                          () => handleOpenGoogleMapsWithCoordinates(
                            apparition?.latitude,
                            apparition?.longitude
                          )
                        }
                      >
                        <Room />
                      </Button>
                    </TableCell>

                    <ReactTooltip place='top' type='dark' effect='solid' className='tooltip' />
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

export default React.memo(ApparitionsList);
