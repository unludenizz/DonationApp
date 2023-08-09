import {StyleSheet, View, ScrollView, Pressable, Text} from 'react-native';
import {globalStyle} from '../../styles/globalStyle';
import Input from '../../Components/Input/Input';
import {useState} from 'react';
import {Header} from '../../Header/Header';
import {Button} from '../../Components/Button/Button';
import {Routes} from '../../MainNavigator/Routes';
import React from 'react';
import {createUser, loginUser} from '../../api/user';
import {useDispatch} from 'react-redux';
import { logIn } from '../../redux/reducers/Users';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  return (
    <View style={(globalStyle.backgroundwhite, globalStyle.flex)}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Welcome Back'} />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            label={'Email'}
            keyboardType={'email-address'}
            placeholder={'Enter your email...'}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            secureTextEntry={true}
            label={'Password'}
            placeholder={'********'}
            onChangeText={value => setPassword(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Button
            onPress={async () => {
              let user = await loginUser(email, password);
              if (!user.status) {
                setError(user.error);
              } else {
                setError('');
                dispatch(logIn(user.data));
                navigation.navigate(Routes.Home);
              }
            }}
            title={'Login'}
            isDisabled={email.length < 5 || password.length < 8}
          />
        </View>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        <Pressable
          style={styles.registrationButton}
          onPress={() => navigation.navigate(Routes.Registration)}>
          <Header color={'#156CF7'} type={3} title={"Don't have an account?"} />
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  registrationButton: {
    alignItems: 'center',
  },
  error: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 24,
  },
});

export default Login;
