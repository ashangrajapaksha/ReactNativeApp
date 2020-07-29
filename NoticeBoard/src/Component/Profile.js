import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import {Card, Header, ListItem} from 'react-native-elements';
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
            dataList[a].time,
          ]);
        }
        //console.log(arr);
        this.setState({
          noticeList: arr,
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <ScrollView>
          {this.state.noticeList.map((notice, i) => (
            <Card>
              <Text style={styles.title}>{notice[1]}</Text>
              <Text style={styles.notice}>{notice[2]}</Text>
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
});
export default Profile;
