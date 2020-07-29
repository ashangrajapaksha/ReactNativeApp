//import React from 'react';
import {createAppContainer} from 'react-navigation';
//import {createStackNavigator} from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Profile from './Component/Profile';
import Notice from './Component/Notice';
import DeleteEditNotice from './Component/DeleteEditNotice';

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
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
