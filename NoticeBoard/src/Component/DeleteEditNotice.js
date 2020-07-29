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
import Icon from 'react-native-vector-icons/FontAwesome';
import {cos} from 'react-native-reanimated';

class DeleteEditNotice extends React.Component {
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
            key,
          };
        });

        const arr = [];
        for (let a = 0; a < dataList.length; a++) {
          arr.push([
            dataList[a].key,
            dataList[a].val.notice,
            dataList[a].val.noticeTittle,
            dataList[a].time,
          ]);
        }
        console.log(arr);
        this.setState({
          noticeList: arr,
        });
      });
  }

  handleDelete(key) {
    console.log(key);
    Firebase.database()
      .ref('/notices/' + key)
      .remove();
  }
  render() {
    return (
      <React.Fragment>
        <ScrollView>
          {this.state.noticeList.map((notice, i) => (
            <Card>
              <Text>
                <TouchableOpacity onPress={() => this.handleDelete(notice[0])}>
                  <Icon
                    style={styles.deltebtn}
                    name="trash"
                    size={20}
                    color="#900"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('EditForm')}>
                  <Icon
                    style={styles.editbtn}
                    name="edit"
                    size={18}
                    color="#900"
                  />
                </TouchableOpacity>
              </Text>
              <Text style={styles.title}>{notice[2]}</Text>
              <Text>{notice[3]}</Text>
              <Text>{notice[1]}</Text>
            </Card>
          ))}
        </ScrollView>
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
  container0: {
    flex: 6,
  },

  container1: {
    // flex:1,
    marginBottom: 15,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deltebtn: {
    paddingLeft: 250,
  },
  editbtn: {
    paddingLeft: 10,
  },
});
export default DeleteEditNotice;
