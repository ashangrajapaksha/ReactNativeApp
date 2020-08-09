import React, {Component} from 'react';
import Firebase from '../Firebase/Firebase';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import BG from '../image/back.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-paper';

class Loading extends Component {
  checkUserState = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'Profile' : 'Login');
    });
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.container2}>
          <Image style={styles.img} source={BG} />
        </View>

        <View style={styles.container}>
          <Card style={styles.crd}>
            <Text style={styles.heder}>My Notice Board</Text>
            <Text style={styles.name}>P.A.G.Rajapaksha - 17001366</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.checkUserState}>
              <Text className="fab fa-android" style={styles.buttonText}>
                Get Started
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 4,
    backgroundColor: '#2196F3',
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    width: 250,
    height: 150,
    marginLeft: 55,
    borderRadius: 40,
    marginTop: 120,
  },

  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  button: {
    // marginTop: 0,
    marginBottom: 20,
    paddingVertical: 5,
    marginLeft: 130,
    alignItems: 'center',
    backgroundColor: '#0761A8',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 20,
    width: 180,
    height: 45,
  },
  buttonText: {
    fontSize: 20,
    //fontWeight: 'bold',
    color: '#fff',
    paddingTop: 3,
  },

  crd: {
    height: 150,
    width: '100%',
    marginTop: 28,
    //borderTopEndRadius:25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  heder: {
    color: '#0761A8',
    fontSize: 30,
    marginTop: 38,
    marginLeft: 35,
  },
  name: {
    //paddingTop:45,
    marginLeft: 35,
    color: '#0761A8',
    fontSize: 16,
  },
});

export default Loading;
