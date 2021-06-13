import "./styles.scss";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { ThumbUp, Room, Image } from '@material-ui/icons';
import TableStyle from '../../components/Shared/Table';
import Loader from '../../components/Shared/Loader';
import Apparitions from '../../actions/apparitionsActions';

import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import ModalImage from "../../components/Shared/ModalImage";

const ApparitionPendentList: React.FC = () => {
  const [ apparitionPendingList, setApparitionPendingList] = useState([]);
  const [ isLoading, setIsLoading] = useState(true);
  const [ isModalImageOpen, setModalImageOpen] = useState(false);

  const dispatchApparitionPendingList = async () => {
    const apparitionPendingList = await Apparitions.getApparitionsPending();
    setApparitionPendingList(apparitionPendingList);
    setIsLoading(false);
  }

  useEffect( () => {
    dispatchApparitionPendingList()
  }, [])

  const handleApproveApparition = async (apparition: any) => {
    const data = {
      id: apparition.id,
      specie_id: apparition.specie_id,
      animal_id: 'aac05974-3d88-410c-891d-a69f91e6bc98',
      popular_name: apparition.popular_name,
      scientific_name: apparition.scientific_name
    }

    await Apparitions.approveApparitions(data);
  }

  const handleOpenGoogleMapsWithCoordinates = async (lat: any, lng: any) => {
    localStorage.setItem('latitude', lat);
    localStorage.setItem('longitude', lng);

    window.location.href='/map'
  }

  return (
    <>
      <div className='ApparitionsPendingList'>
        <h3 className='__title'>
          Lista de Aparições Pendentes
          <span>Listagem de todas as aparições Pendentes. </span>
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
                apparitionPendingList?.map((apparitionPending: any) => (
                  <TableRow>
                    <TableCell>{apparitionPending?.name}</TableCell>
                    <TableCell>{apparitionPending?.popular_name}</TableCell>
                    <TableCell>{apparitionPending?.scientific_name}</TableCell>
                    <TableCell>{apparitionPending?.latitude}</TableCell>
                    <TableCell>{apparitionPending?.longitude}</TableCell>
                    <TableCell>{apparitionPending?.created_at}</TableCell>
                    <TableCell>

                      <Button
                        data-tip='Aprovar aparição'
                        onClick={() => handleApproveApparition(apparitionPending)}
                      >
                        <ThumbUp />
                      </Button>

                      <Button
                        data-tip='Visualizar Imagem'
                        onClick={() => setModalImageOpen(true)}
                      >
                        <Image />
                      </Button>

                      <Button
                        data-tip='Visualizar no Mapa as coordenadas'
                        onClick={
                          () => handleOpenGoogleMapsWithCoordinates(
                            apparitionPending?.latitude,
                            apparitionPending?.longitude
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

        {isModalImageOpen && <ModalImage setIsModalImageOpen={() => setModalImageOpen( !isModalImageOpen)} />}
      </div>
    </>
  );
};

export default React.memo(ApparitionPendentList);
