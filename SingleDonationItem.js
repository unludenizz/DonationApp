import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {globalStyle} from './styles/globalStyle';
import BackButton from './Components/BackButton/BackButton';
import {Badge} from './Components/Button/Badge';
import {Header} from './Header/Header';
import { Button } from './Components/Button/Button';

const SingleDonationItem = ({navigation, route}) => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );

  const categoryInformation = route.params.categoryInformation;
  return (
    <View style={[globalStyle.backgroundwhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Image
          source={{uri: donationItemInformation.image}}
          style={styles.image}
        />
        <View style={styles.badge}>
          <Badge title={categoryInformation.name} />
        </View>
        <Header title={1} title={donationItemInformation.name} />
        <Text style={styles.description}>
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
        </Text>
      </ScrollView>
      <View style={styles.button}>
        <Button  title={'Donate'}/>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 7,
  },
  image: {
    marginTop: 12,
    marginBottom: 24,
    width: '100%',
    height: 240,
    borderRadius: 5,
  },
  badge: {
    marginBottom: 16,
  },
  description: {
    marginTop:7,
    marginHorizontal: 7,
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    marginHorizontal:20,
  },
});

export default SingleDonationItem;
