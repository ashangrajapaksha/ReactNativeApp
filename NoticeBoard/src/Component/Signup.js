import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Button,
  ActivityIndicator,
} from 'react-native';

import Firebase from '../Firebase/Firebase';
import BG from '../image/login.jpg';

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    isLoading: false,

    //declare error
    nameError: '',
    emailError: '',
    passwordError: '',
  };

  validate = () => {
    let isError = false;
    const errors = {
      nameError: '',
      emailError: '',
      passwordError: '',
    };

    if (this.state.name.length < 1) {
      isError = true;
      errors.nameError = 'Name is required *';
    }
    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      errors.emailError = 'Invalid email address *';
    }
    if (this.state.password.length < 1) {
      isError = true;
      errors.passwordError = 'Password is reqired*';
    } else if (this.state.password.length <= 5) {
      isError = true;
      errors.passwordError = 'Lenth grater than or equil six *';
    }
    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  handleSignUp = () => {
    const {email, password} = this.state;
    const err = this.validate();

    if (!err) {
      this.setState({
        nameError: '',
        emailError: '',
        passwordError: '',
      });

      this.setState({
        isLoading: true,
      });

      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Login'))
        .catch((error) => console.log(error));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <ImageBackground style={styles.container} source={BG}>
        <Text style={styles.header}>Notice Board</Text>

        <TextInput
          style={styles.inputBox}
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}
          placeholder="Full Name"
        />
        <Text style={styles.error}>{this.state.nameError}</Text>
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
          autoCapitalize="none"
        />
        <Text style={styles.error}>{this.state.emailError}</Text>
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Text style={styles.error}>{this.state.passwordError}</Text>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <Button
          title="Have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  preloader:{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  inputBox: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 2,
    borderRadius: 8,
    fontSize: 18,
    color: '#fff',
  },
  button: {
    marginTop: 6,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
    marginLeft: 5,
  },
  header: {
    //  flex:1,
    fontSize: 30,
    //fontFamily:''
    color: 'yellow',
    //  marginTop:50,
  },
});

export default Signup;
