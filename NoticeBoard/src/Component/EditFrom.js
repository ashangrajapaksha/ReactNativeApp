import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Card, Header} from 'react-native-elements';
import Firebase from '../Firebase/Firebase';

class EditForm extends React.Component {
  constructor(props) {
    // console.log('ccccccccc', props);

    super(props);

    this.state = {
      id: '',
      noticeTittle: '',
      notice: '',
      noticeTittleError: '',
      noticeError: '',
    };
  }

  componentDidMount() {
    const {id, title, notice} = this.props.route.params;

    this.setState({
      id: id,
      noticeTittle: title,
      notice: notice,
    });
  }

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

  updteNotice = () => {
    console.log(this.state.notice);
    const err = this.validate();
    var noticeTittle = this.state.noticeTittle;
    var notice = this.state.notice;

    let date = new Date();
    var dates = date.toLocaleDateString();
    var time = date.toLocaleTimeString();

    Firebase.database()
      .ref('/notices')
      .child(this.state.id)
      .update({noticeTittle, notice, dates, time})
      .then(() => this.props.navigation.navigate('Profile'));

    if (!err) {
      this.setState({
        noticeTittleError: '',
        noticeError: '',
      });

      this.setState({
        noticeTittle: '',
        notice: '',
      });
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
            <Text style={styles.title}>Update Notice</Text>

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

            <Button
              title="Update Notice"
              width="25"
              onPress={this.updteNotice}
            />
          </Card>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'stretch',
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
  },

  title: {
    fontSize: 25,
    paddingBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  crdStyle2: {},

  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 1,
    marginLeft: 5,
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
export default EditForm;
