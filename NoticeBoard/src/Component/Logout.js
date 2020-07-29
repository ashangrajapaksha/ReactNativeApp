// components/dashboard.js

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import Firebase from '../Firebase/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Logout extends Component {
  signOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <TouchableOpacity onPress={this.signOut}>
        <Icon style={styles.logoutBtn} name="sign-out" size={30} color="#900" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
