import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  setRole,
  loginHandler,
  passwordInputHandler,
  emailInputHandler,
} from '../redux/attendanceSlice';
import {RootState} from '../redux/store';
interface Props {
  navigation: any;
  // Define props here
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const role = useSelector((state: RootState) => state.attendance.role);
  const email = useSelector((state: RootState) => state.attendance.email);
  const password = useSelector((state: RootState) => state.attendance.password);
  const dispatch = useDispatch();
  const loginPressHandler = () => {
    dispatch(loginHandler({navigation}));
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.innerText}>Login As </Text>
      </View>
      <RadioButton.Group
        onValueChange={(value: string) => dispatch(setRole(value))}
        value={role}>
        <View style={styles.radioContainer}>
          <RadioButton.Item label="Staff" value="Staff" />
          <RadioButton.Item label="Admin" value="Admin" />
        </View>
      </RadioButton.Group>
      <TextInput
        placeholder="Enter username"
        value={email}
        onChangeText={value => dispatch(emailInputHandler(value))}
      />
      <TextInput
        placeholder="Enter password"
        secureTextEntry
        keyboardType="numeric"
        value={password}
        onChangeText={value => dispatch(passwordInputHandler(value))}
      />
      <Button title="Login " onPress={loginPressHandler} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  innerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    margin: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
