import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet} from 'react-native';
import {Pressable, TextInput} from 'react-native';
import {useRef, useState} from 'react';
import PropTypes from 'prop-types';

export const Search = props => {
  const textInputRef = useRef(null);
  const [search, setSearch] = useState('');

  const handleSearch = searchvalue => {
    setSearch(searchvalue);
    props.onSearch(searchvalue);
  };

  const handleFocus = () => {
    textInputRef.current;
  };

  return (
    <Pressable style={styles.searchInputContainer} onPress={handleFocus}>
      <FontAwesomeIcon icon={faSearch} color={'#25C0FF'} size={25} />
      <TextInput
        placeholder={props.placeholder}
        style={styles.searchInput}
        value={search}
        onChangeText={value => handleSearch(value)}
      />
    </Pressable>
  );
};

Search.defaultProps = {
  onSearch: () => {},
  placeholder: 'Search',
};

Search.porpTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    marginLeft: 6,
    height: '100%',
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 14,
    color: '#686C7A',
  },
  searchInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#F3F5F9',
    height: 50,
    alignItems: 'center',
    borderRadius: 15,
  },
});
