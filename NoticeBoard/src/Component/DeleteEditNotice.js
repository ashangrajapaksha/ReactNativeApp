import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import {Card} from 'react-native-elements';
import Firebase from '../Firebase/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
//import {cos} from 'react-native-reanimated';

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
            dataList[a].val.dates,
            dataList[a].val.time,
          ]);
        }
        console.log(arr);
        this.setState({
          noticeList: arr,
        });
      });
  }

  handleDelete(key) {
    // console.log(key);
    Firebase.database()
      .ref('/notices/' + key)
      .remove();
  }

  editNotice = (id, title, notice, date, time) => {
    // console.log('AassssAAAAAAAAA', id);
    this.props.navigation.navigate('EditForm', {
      id: id,
      title: title,
      notice: notice,
      date: date,
      time: time,
    });
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
                  onPress={() =>
                    this.editNotice(
                      notice[0],
                      notice[2],
                      notice[1],
                      notice[3],
                      notice[4],
                    )
                  }>
                  <Icon
                    style={styles.editbtn}
                    name="edit"
                    size={18}
                    color="#900"
                  />
                </TouchableOpacity>
              </Text>
              <Text style={styles.title}>{notice[2]}</Text>
              <Text style={styles.date}>
                {notice[3]} {notice[4]}
              </Text>
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
});
export default DeleteEditNotice;
