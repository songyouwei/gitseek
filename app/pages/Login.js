import React, {
  Component,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Octicons';
import LoadingIndicator from '../components/LoadingIndicator';
import Api from '../Api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._login = this._login.bind(this);
    this.state = {
      username: null,
      password: null,
      logining: false,
    };
  }

  componentWillMount() {
    Api.getLocalAccount().then(account => Alert.alert(null, JSON.stringify(account)));
    // Api.logined() && Actions.homeTabs();
  }

  _login() {
    const { username, password } = this.state;
    if (!username || !username.trim()) {
      Alert.alert(null, 'username is required!');
      return;
    } else if (!password || !password.trim()) {
      Alert.alert(null, 'password is required!');
      return;
    }
    this.setState({ logining: true });
    Api.login(username, password).then(user => {
      Actions.homeTabs();
    }, err => {
      Alert.alert(null, err);
    }).finally(() => {
      this.setState({ logining: false });
    });
  }

  render() {
    const { username, password, loading } = this.state;
    return (
      <View>
        <View style={styles.loginCard}>
          <View style={styles.up}>
            <Icon name="mark-github" size={50} />
            <Text style={styles.upText}>Sign in to GitHub</Text>
          </View>
          <View style={styles.down}>
            <Text style={styles.nameAndPwd}>
              Username (Not email address)
            </Text>
            <TextInput
              style={styles.textInput}
              returnKeyType={'next'}
              onChangeText={(text) => this.setState({ username: text })}
              defaultValue={username}
            />
            <Text style={styles.nameAndPwd}>
              Password
            </Text>
            <TextInput
              style={styles.textInput}
              returnKeyType={'done'}
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}
              defaultValue={password}
            />
            <TouchableHighlight
              style={styles.confirm}
              onPress={this._login}
              underlayColor="grey"
            >
              <Text style={[styles.nameAndPwd, { textAlign: 'center', color: 'white' }]}>
                Sign in {loading ? '...' : ''}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginCard: {
    margin: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'rgb(207,207,207)',
    borderRadius: 5,
  },
  up: {
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upText: {
    marginTop: 10,
    fontSize: 20,
  },
  introText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 18,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  indicator: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  down: {
    margin: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameAndPwd: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  textInput: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: 'rgb(207,207,207)',
    height: 30,
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
    padding: 3,
  },
  confirm: {
    flexDirection: 'column',
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: 'rgb(207,207,207)',
    height: 35,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
    borderRadius: 5,
  },
  errorDesc: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 40,
  },
});
