import { FieldProps, getIn } from 'formik';
import React from 'react';
import { TextField } from '@material-ui/core';

import './styles.scss';

interface IProps extends FieldProps {
  isNotEditable?: boolean;
}

const TextFormField: React.FC<IProps> = ({ field, form, isNotEditable, ...props }) => {
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <TextField
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
      {...(isNotEditable && {
        disabled: true,
        className: 'isNotEditable'
      })}
    />
  );
};

export default TextFormField;
