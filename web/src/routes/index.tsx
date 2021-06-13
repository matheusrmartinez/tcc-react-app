import React from "react";
import { Switch } from "react-router-dom";

import AnimalCatalog from "../pages/Animal Catalog";
import AnimalRegistration from "../pages/Animal Registration";
import ApparitionPendentList from "../pages/Apparition Pendent List";
import ApparitionRecord from "../pages/Apparition Record";
import ApparitionsList from "../pages/Apparitions List";
import Home from "../pages/Home";
import Maps from "../pages/Map";
import Login from "../pages/Login";
import SignUp from "../pages/Sign Up";
import NotFound from "../pages/NotFound";

import CustomRoute from '../components/CustomRoute'

const Routes = () => (
  <Switch>
    <CustomRoute isPublic path="/login" component={Login} />
    <CustomRoute isPublic path="/user-registration" component={SignUp} />

    <CustomRoute exact path="/home" component={Home} />
    <CustomRoute exact path="/animal-registration" component={AnimalRegistration} />
    <CustomRoute exact path="/apparition-record" component={ApparitionRecord} />
    <CustomRoute exact path="/animal-catalog" component={AnimalCatalog} />
    <CustomRoute exact path="/map" component={Maps} />
    <CustomRoute exact path="/apparition-list" component={ApparitionsList} />
    <CustomRoute exact path="/apparition-pendent-list" component={ApparitionPendentList} />
    <CustomRoute isNotFound path='*' component={NotFound} />
  </Switch>
);

export default Routes;
