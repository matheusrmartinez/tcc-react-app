import './styles.scss';

import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const table = ({ children }: IProps) => {
  return <div className='table'>{children}</div>;
};

export default table;
