import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import Firebase from '../Firebase/Firebase';

import BG from '../image/login.jpg';

class Login extends React.Component {
  
  state = {
    email: '',
    password: '',
    //isLoading: false,
  };

  handleLogin = () => {
    const {email, password} = this.state;

    if (!email) {
      alert('email is required');
    } else if (!password) {
      alert('password is required');
    } else {
      // this.setState({
      //   isLoading: true,
      // });

      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Profile'))
        .catch((error) => console.log(error));
    }
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E" />
    //     </View>
    //   );
    // }
    return (
      <ImageBackground style={styles.container} source={BG}>
        <Text style={styles.header}>Notice Board</Text>
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.handleLogin}>
            Login
          </Text>
        </TouchableOpacity>
        <Button
          title="Don't have an account yet? Sign up"
          onPress={() => this.props.navigation.navigate('Signup')}
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
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    color: '#fff',
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
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
  header: {
    fontSize: 30,
    color: 'yellow',
  },
});
export default Login;
