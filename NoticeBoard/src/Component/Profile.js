import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import {Card} from 'react-native-elements';
import Firebase from '../Firebase/Firebase';
import {FAB} from 'react-native-paper';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noticeList: [],
    };
  }

  componentDidMount() {
    Firebase.database()
      .ref('/notices')
      .on('value', (data) => {
        const dataList = _.map(data.val(), (val, key) => {
          return {
            val,
            //key,
          };
        });

        const arr = [];
        for (let a = 0; a < dataList.length; a++) {
          arr.push([
            dataList[a].val.notice,
            dataList[a].val.noticeTittle,
            dataList[a].val.dates,
            dataList[a].val.time,
          ]);
        }
        //console.log(arr);
        this.setState({
          noticeList: arr,
        });
      });
  }

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

        <ScrollView>
          {this.state.noticeList.map((notice, i) => (
            <Card style={styles.crd}>
              <Text style={styles.title}>{notice[1]}</Text>
              <Text style={styles.date}>
                {notice[2]} {notice[3]}
              </Text>
              <Text>{notice[0]}</Text>
            </Card>
          ))}
        </ScrollView>

        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          theme={{colors: {accent: 'blue'}}}
          onPress={() => this.props.navigation.navigate('Notice')}
        />

        
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    width: '100%',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  notice: {
    fontSize: 16,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  date: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
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
  crd:{
    borderRadius:2,
  }
});
export default Profile;
