import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router'

import * as s from '../../App.styles'
import * as Palette from '../../colors'

import Sidebar from '../../components/Sidebar/Sidebar'
import MainView from '../../components/MainView/MainView'
import { isLogged } from '../../util/auth'

const CustomRoute: React.FC<any> = ({path, isPublic, isNotFound, component: Component , ...rest}) => {
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const [ isLoading, setIsLoading] = useState(true);

  const checkAuthentication = async () => {
    const loggedUser = await isLogged();
    setIsAuthenticated(loggedUser);
    setIsLoading(false);
  }

  useEffect( () => {
    checkAuthentication()
  }, [])

  if (isLoading) {
    return <h3> Carregando... </h3>
  }

  if (isPublic) {
    return <Route path={path} component={Component}/>
  }

  if (isNotFound) {
    return <Route path={path} component={Component}/>
  }

  return ( isAuthenticated ?
    <Route
      {...rest}
      path={path} render={props => (
        <AuthLayout>
          <Component {...props} />
        </AuthLayout>
      )}
    />
    : <Redirect to='/login'/>
  );
};

const backgroundImage = 'images/mountain.jpg';
const sidebarHeader = {
  fullName: 'Projeto Xenarthras',
  shortName: 'Xenarthras'
};

const menuItems = [
  {name: 'Home', to: '/home', icon: 'icons/home.svg', subMenuItems: [] },
  {name: 'Aparições Pendentes', to: '/apparition-pendent-list', icon: 'icons/home.svg', subMenuItems: [] },
  {name: 'Catálogo de Animais', to: '/animal-catalog', icon: 'icons/home.svg', subMenuItems: [] },
  {name: 'Lista de Aparições', to: '/apparition-list', icon: 'icons/home.svg', subMenuItems: [] },
  {name: 'Mapa', to: '/map', icon: 'icons/home.svg', subMenuItems: [] },
  {name: 'Registro de Animais', to: '/animal-registration', icon: 'icons/home.svg', subMenuItems: [] },
  {name: 'Registro de Aparições', to: '/apparition-record', icon: 'icons/home.svg', subMenuItems: [] },
];

const fonts = {
  header: 'ZCOOL KuaiLe',
  menu: 'Poppins'
}

const AuthLayout: React.FC<any> = ({ children }) => {
  return (
    <s.App>
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette.brown}
        />

      <MainView>
        {children}
      </MainView>
    </s.App>
  );
}

export default CustomRoute
