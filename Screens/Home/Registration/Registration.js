import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {globalStyle} from '../../../styles/globalStyle';
import Input from '../../../Components/Input/Input';
import {useState} from 'react';
import {Header} from '../../../Header/Header';
import {Button} from '../../../Components/Button/Button';
import BackButton from '../../../Components/BackButton/BackButton';
import {createUser} from '../../../api/user';
import React from 'react';

const Registration = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setFullName] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  return (
    <View style={(globalStyle.backgroundwhite, globalStyle.flex)}>
      <View style={styles.backbutton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Hello and Welcome!'} />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            label={'First & Last Name'}
            placeholder={'Enter your full name...'}
            onChangeText={value => setFullName(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            keyboardType={'email-address'}
            label={'Email'}
            placeholder={'Enter your email...'}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            secureTextEntry={true}
            label={'Password'}
            placeholder={'******'}
            onChangeText={value => setPassword(value)}
          />
        </View>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        {success.length > 0 && <Text style={styles.success}>{success}</Text>}
        <View style={globalStyle.marginBottom24}>
          <Button
            isDisabled={
              name.length <= 2 || email.length <= 5 || password.length <= 8
            }
            title={'Registration'}
            onPress={async () => {
              let user = await createUser(name, email, password);
              if (user.error) {
                setError(user.error);
              } else {
                setError('');
                setSuccess('You have successfully registered');
                setTimeout(() => navigation.goBack(), 3000);
              }
            }}
          />
        </View>
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
  backbutton: {
    marginLeft: 14,
    marginTop: 7,
  },
  error: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 24,
  },
  success: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#28a745',
    marginBottom: 24,
  },
});

export default Registration;
