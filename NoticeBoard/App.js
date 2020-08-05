import * as React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Login from './src/Component/Login';
import Signup from './src/Component/Signup';
import Profile from './src/Component/Profile';
import Notice from './src/Component/Notice';
import DeleteEditNotice from './src/Component/DeleteEditNotice';
import EditForm from './src/Component/EditFrom';
import Logout from './src/Component/Logout';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: 'blue',
                alignItems: 'center',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: 'SignUp',
              headerLeft: null,
              headerStyle: {
                backgroundColor: 'blue',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: 'My Notice Board',
              headerLeft: null,
              headerStyle: {
                backgroundColor: 'blue',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Notice"
            component={Notice}
            options={{
              title: 'Add new Notice',
              headerLeft: null,

              headerStyle: {
                backgroundColor: 'blue',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="DeleteEditNotice"
            component={DeleteEditNotice}
            options={{
              title: 'Delete And Edit Notice',
              headerLeft: null,

              headerStyle: {
                backgroundColor: 'blue',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="EditForm"
            component={EditForm}
            options={{
              title: 'Edit Form',
              headerLeft: null,

              headerStyle: {
                backgroundColor: 'blue',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {},
});

export default App;
