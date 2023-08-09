import {StyleSheet, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const BackButton = (props) => {
  return (
    <Pressable onPress={() => props.onPress()} style={styles.container}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Pressable>
  );
};

BackButton.PropTypes = {
  onPress: PropTypes.func.isRequired,
};



export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        borderRadius: 26,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
});



export default BackButton;
