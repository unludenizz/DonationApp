import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Image, View, Pressable} from 'react-native';
import {Badge} from '../Components/Button/Badge';
import {Header} from '../Header/Header';

export const SingleDonationItem = props => {
  return (
    <Pressable
      onPress={() => {
        props.onPress(props.donationItemId);
      }}>
      <View>
        <View style={styles.badge}>
          <Badge title={props.badgeTitle} />
        </View>
        <Image
          resizeMode={'cover'}
          source={{uri: props.uri}}
          style={styles.image}
        />
      </View>
      <View style={styles.donationInformation}>
        <Header title={props.donationTitle} type={3} color={'#0A043C'} numberOfLines={1}/>
        <View style={styles.price}>
          <Header
            title={'$' + props.price.toFixed(2)}
            type={3}
            color={'#156CF7'}
          />
        </View>
      </View>
    </Pressable>
  );
};

SingleDonationItem.defaultProps = {
  onPress: () => {},
};

SingleDonationItem.propTypes = {
  donationItemId: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  image: {
    width: 155,
    height: 170,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    zIndex: 1,
    top: 13,
    left: 10,
  },
  donationInformation: {
    marginTop: 16,
  },
  price: {
    marginTop: 5,
  },
});
