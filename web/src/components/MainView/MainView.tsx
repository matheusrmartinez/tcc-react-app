import React from 'react';
import * as s from './MainView.styles';

const MainView: React.FC<any> = ( { children } ) => {
  return (
    <s.MainViewContainer>
      {children}
    </s.MainViewContainer>
  );
};

export default MainView;