import React from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';

import {Card, Header} from 'react-native-elements';
import Firebase from '../Firebase/Firebase';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Notice extends React.Component {
  state = {
    noticeTittle: '',
    notice: '',

    noticeTittleError: '',
    noticeError: '',
  };

  validate = () => {
    // console.log('dfsjvilc');

    let isError = false;
    const errors = {
      noticeTittleError: '',
      noticeError: '',
    };

    if (this.state.noticeTittle.length < 1) {
      isError = true;
      errors.noticeTittleError = 'Tittle is required *';
    }

    if (this.state.notice.length < 1) {
      isError = true;
      errors.noticeError = 'Notice Content is required *';
    }

    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  saveNotice = () => {
    //console.log(this.state.notice);
    const err = this.validate();

    if (!err) {
      this.setState({
        noticeTittleError: '',
        noticeError: '',
      });

      let date = new Date();

      const addNotice = Firebase.database().ref('notices');
      addNotice.push().set({
        noticeTittle: this.state.noticeTittle,
        notice: this.state.notice,
        dates: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      });

      this.setState({
        noticeTittle: '',
        notice: '',
      });

      this.props.navigation.navigate('Profile');
    }
  };
  
  signOut = () => {
    //  console.log('djncsjd');
    Firebase.auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <View>
          <TouchableOpacity onPress={this.signOut}>
            <Text style={styles.lgbtn}>LogOut</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Card style={styles.crdStyle}>
            <Text style={styles.title}>Add New Notice</Text>

            <TextInput
              style={styles.inputBox}
              value={this.state.noticeTittle}
              onChangeText={(noticeTittle) => this.setState({noticeTittle})}
              placeholder="Notice Tittle"
            />
            <Text style={styles.error}>{this.state.noticeTittleError}</Text>

            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.inputarea}
              value={this.state.notice}
              onChangeText={(notice) => this.setState({notice})}
              placeholder="Notice"
            />
            <Text style={styles.error}>{this.state.noticeError}</Text>

            <Button title="Add Notice" width="25" onPress={this.saveNotice} />
          </Card>
        </View>

        <View style={styles.container1}>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() =>
                this.props.navigation.navigate('DeleteEditNotice')
              }>
              Delete And Edit Your Notices
            </Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'stretch',
  },

  container1: {
    flex: 1,
  },

  inputBox: {
    width: '100%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    color: 'black',
  },
  inputarea: {
    width: '100%',
    height: 100,
    paddingLeft: 10,
    paddingTop: -5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    color: 'black',
  },

  crdStyle: {
    padding: 15,
    marginTop: 300,
    width: 100,
    height: 20,
    marginBottom: 5,
  },

  title: {
    fontSize: 25,
    paddingBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 1,
    marginLeft: 5,
  },

  button: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 55,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 8,
    width: 250,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  lgbtn:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:270,
    marginTop:8,
    backgroundColor: 'orange',
    width:80,
    paddingLeft:6,
    borderRadius:10,
  },
});
export default Notice;
