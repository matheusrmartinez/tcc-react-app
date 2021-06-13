import "./styles.scss";

import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import TextFormField from '../../components/Shared/TextFormField';
import Animals from '../../actions/animalsActions';

const AnimalRegistration: React.FC = () => {
  const [ isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (values: any) => {
    const data = {
      scientific_name: values.scientificName,
      popular_name: values.popularName,
      image: values.image,
      specie: values.type,
      user: 'd7e57db3-76f2-4700-b929-ebd9d2491006'
    }

    const animalsList = await Animals.postAnimals(data);
    setIsLoading(false);
  }

  const initialValues = {
    scientificName: '',
    popularName: '',
    family: '',
    type: ''
  };

  return (
    <Formik initialValues={initialValues} onSubmit={values => handleSubmit(values)}>
      <Form >
          <div className="default-table">
            <h3 className='__title'>
              Cadastro de animais
              <span>Tela para cadastro de animais. </span>
            </h3>


            <br />
            <br />
            <br />

            <div>
              <Field
                component={TextFormField}
                type='text'
                name='scientificName'
                label='Nome Científico'
                required
              />
            </div>

            <br />

            <div>
              <Field
                component={TextFormField}
                type='text'
                name='popularName'
                label='Nome Popular'
                required
              />
            </div>

            <br />

            <div>
              <Field
                component={TextFormField}
                type='text'
                name='type'
                label='Familia'
                select
                required
              >
                <MenuItem value='Preguica'>Preguiça</MenuItem>
                <MenuItem value='Tatu'>Tatu</MenuItem>
                <MenuItem value='Tamandua'>Tamanduá</MenuItem>
              </Field>
            </div>


            <br />


            <div>
              <Field
                component={TextFormField}
                type='text'
                name='story'
                multiline
                rows={1}
                rowsMax={4}
                label='História'
                required
              />
            </div>

            <br />

            <div>
              <Field
                component={TextFormField}
                type='file'
                name='image'
                label='Imagem'
                required
              />
            </div>

            <br />
            <br />
            <br />

              <div>
                <Button
                  type='submit'
                  className='button-success'
                >
                  Cadastrar Animal
                </Button>
              </div>
            </div>

      </Form>
    </Formik>
  );
};

export default React.memo(AnimalRegistration);
