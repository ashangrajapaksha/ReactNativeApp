import React, { Component } from 'react'
import Firebase from '../Firebase/Firebase';
import {
     View,
     Text,
     ActivityIndicator,
     StyleSheet,
     TouchableOpacity,
     ImageBackground,
   } from 'react-native';
import BG from '../image/login.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';

class Loading extends Component {

     // componentDidMount() {
     //      Firebase.auth().onAuthStateChanged(user => {
     //        this.props.navigation.navigate(user ? 'Profile' : 'Login')
     //      })
     //    }

        checkUserState = () => {
          Firebase.auth().onAuthStateChanged(user => {
               this.props.navigation.navigate(user ? 'Profile' : 'Login')
             })
        }

     render() {
          return (
               <ImageBackground style={styles.container} source={BG}>
               <View style={styles.container}>
               
               <TouchableOpacity style={styles.button} onPress={this.checkUserState} >
             
            <Text className ="fab fa-android"  style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
             </View>
             </ImageBackground>
          )
     }
}

const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
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
          height:50,
        },
        buttonText: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
          paddingTop:3,
        },
   })

export default Loading
