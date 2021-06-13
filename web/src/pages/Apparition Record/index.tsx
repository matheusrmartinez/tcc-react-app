import "./styles.scss";
import React, { useState, useCallback, useRef } from "react";
import { Button, MenuItem } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import TextFormField from "../../components/Shared/TextFormField";
import Apparition from "../../actions/apparitionsActions";

const ApparitionRecord: React.FC = () => {
  const file = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = useCallback(
    async (values: any) => {
      values.approved = true;
      values.animal_id = null;

      const formData = new FormData();
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);
      formData.append("animal_id", values.animal_id);
      formData.append("approved", values.approved);
      formData.append("user", "33c2d773-7026-4f3b-b578-0ebb81ceb6cb");
      formData.append("image", file?.current);
      formData.append("apparition_name", values.name);
      formData.append("address", "address");

      const animalsList = await Apparition.postApparitions(formData);
      setIsLoading(false);
    },
    [file]
  );

  const initialValues = {
    latitude: "",
    longitude: "",
    image: "",
    type: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <div className="default-table">
          <h3 className="__title">
            Cadastro de Aparições
            <span>Tela para cadastro de aparições. </span>
          </h3>

          <br />
          <br />
          <br />

          <div>
            <Field
              component={TextFormField}
              type="text"
              name="latitude"
              label="Latitude"
              required
            />
          </div>

          <br />

          <div>
            <Field
              component={TextFormField}
              type="text"
              name="longitude"
              label="Longitude"
              required
            />
          </div>

          <div>
            <Field
              component={TextFormField}
              type="text"
              name="name"
              label="Nome da aparição"
              required
            />
          </div>

          <br />

          <div>
            <Field
              component={TextFormField}
              type="text"
              name="type"
              label="Familia"
              select
              required
            >
              <MenuItem value="1">Preguiça</MenuItem>
              <MenuItem value="2">Tatu</MenuItem>
              <MenuItem value="3">Tamanduá</MenuItem>
            </Field>
          </div>

          <div>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                file.current = e.currentTarget.files?.item(0);
              }}
            ></input>
          </div>

          <br />
          <br />
          <br />

          <div>
            <Button type="submit" className="button-success">
              Cadastrar Aparição
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default React.memo(ApparitionRecord);
