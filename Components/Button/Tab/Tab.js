import {useRef, useState} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';



export const Tab = props => {
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);
  const paddingHorizontal = 33;
  const tabWidth = {
    width: paddingHorizontal * 2 + width,
  };
  return (
    <Pressable
      style={[styles.tab, props.isInactive && styles.inactiveTab, tabWidth]}
      onPress={() => props.onPress(props.tabId)}>
      <Text
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        ref={textRef}
        style={[styles.title, props.isInactive && styles.inactiveTitle]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

//accidentally types default in the video, but should actually be defaultProps
Tab.defaultProps = {
  isInactive: false,
  onPress: () => {},
};

Tab.propTypes = {
  tabId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isInactive: PropTypes.bool,

};


const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#2979F2',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 17,
    color: 'white',
  },
  inactiveTab: {
    backgroundColor: '#F3F5F9',
  },
  inactiveTitle: {
    color: '#79869F',
  },
});
