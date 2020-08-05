//import React from 'react';
import {createAppContainer} from 'react-navigation';
//import {createStackNavigator} from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Profile from './Component/Profile';
import Notice from './Component/Notice';
import DeleteEditNotice from './Component/DeleteEditNotice';
import EditForm from './Component/EditFrom';
import Logout from './Component/Logout';

import {createDrawerNavigator} from 'react-navigation-drawer';

const screens = {
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
  Profile: {
    screen: Profile,
  },
  Notice: {
    screen: Notice,
  },
  DeleteEditNotice: {
    screen: DeleteEditNotice,
  },
  EditForm: {
    screen: EditForm,
  },
  Logout: {
    screen: Logout,
  },
};

const HomeStack = createStackNavigator(screens);

const DrowerNavigater = createDrawerNavigator({
  Profile: {
    screen: Profile,
  },
  DeleteEditNotice: {
    screen: DeleteEditNotice,
  },
  EditForm: {
    screen: EditForm,
  },
  Logout: {
    screen: Logout,
  },
});

const HomeDrower = createDrawerNavigator(screens);


export default createAppContainer(HomeStack, HomeDrower);
