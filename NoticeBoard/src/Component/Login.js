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
  LayoutAnimation,
} from 'react-native';
import {Card} from 'react-native-paper';
import Firebase from '../Firebase/Firebase';

import BG from '../image/login.jpg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    //isLoading: false,
    errorMessage: null,
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
        .catch((error) => this.setState({errorMessage: error.message}));
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

    LayoutAnimation.easeInEaseOut();
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

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
              SIGNIN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={styles.sinuptxt}
              onPress={() => this.props.navigation.navigate('Signup')}>
              Don't have an account? Click here to signup
            </Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },

  crd: {
    height: 180,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#94C5EC',
  },

  inputBox: {
    width: '95%',
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    color: '#795548',
  },
  button: {
    marginTop: 5,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'blue',

    borderWidth: 1,

    width: '95%',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
  header: {
    fontSize: 30,
    color: 'yellow',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    color: 'red',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  sinuptxt: {
    fontSize: 14,
    color:'blue',
  },
  
});
export default Login;
