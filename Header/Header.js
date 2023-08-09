import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export const Header = props => {
  return (
    <View>
      <Text
        style={[styleToApply(props), props.color && {color: props.color}]}
        numberOfLines={props.numberOfLines ? props.numberOfLines : null}>
        {props.title}
      </Text>
    </View>
  );
};

Header.default = {
  title: '',
  type: 1,
  color: '#000000',
};

const styleToApply = props => {
  switch (props.type) {
    case 1:
      return styles.title1;
    case 2:
      return styles.title2;
    case 3:
      return styles.title3;
    default:
      return styles.title1;
  }
};

Header.PropTypes = {
  title: PropTypes.string,
  types: PropTypes.number,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
};

export const styles = StyleSheet.create({
  title1: {
    fontFamily: 'Inter',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '600',
  },
  title2: {
    color: 'Black',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  },
  title3: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
  },
});
