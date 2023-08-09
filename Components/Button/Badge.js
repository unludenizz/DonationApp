import {useRef, useState} from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';



export const Badge = props => {
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);
  const paddingHorizontal = 10;
  const tabWidth = {
    width: paddingHorizontal * 2 + width,
  };
  return (
    <View
      style={[styles.badge, tabWidth]}>
      <Text
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        ref={textRef}
        style={[styles.title, props.isInactive && styles.inactiveTitle]}>
        {props.title}
      </Text>
    </View>
  );
};



Badge.propTypes = {
  title: PropTypes.string.isRequired,
};


const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#145855',
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
    color: 'white',
  },
});
