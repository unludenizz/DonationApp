import {View, Text, Pressable, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export const Button = props => {
  return (
    <Pressable
      disabled={props.isDisabled}
      style={[styles.button, props.isDisabled && styles.disabled]}
      onPress={() => {
        props.onPress()
      }}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};

Button.default = {
  isDisabled: false,
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2979F2',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: 'white',
  },
  disabled: {
    opacity: 0.5,
  },
});
