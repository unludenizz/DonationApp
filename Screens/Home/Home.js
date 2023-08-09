import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

import {SingleDonationItem} from '../../SingleDonationItem/SingleDonationItem';
import {useState, useEffect} from 'react';
import {globalStyle} from '../../styles/globalStyle';
import {useSelector, useDispatch} from 'react-redux';
import {Header} from '../../Header/Header';
import {Search} from '../../Search/Search';
import {Tab} from '../../Components/Button/Tab/Tab';
import {updateSelectedCategoryId} from '../../redux/reducers/Categories';
import {faL} from '@fortawesome/free-solid-svg-icons';
import Categories from '../../redux/reducers/Categories';
import {configureStore} from '@reduxjs/toolkit';
import {
  resetDonations,
  updateSelectedDonationId,
} from '../../redux/reducers/Donations';
import {Routes} from '../../MainNavigator/Routes';
import {resetToInitialState} from '../../redux/reducers/Users';
import {logOut} from '../../api/user';

export const Home = ({navigation}) => {
  const categories = useSelector(state => state.categories);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const donations = useSelector(state => state.donations);

  const [donationItems, setDonationItems] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(faL);
  const categoryPageSize = 4;

  useEffect(() => {
    setIsLoadingCategories(true);
    setCategoryList(
      pagination(categories.categories, categoryPage, categoryPageSize),
    );
    setCategoryPage(prev => prev + 1);
    setIsLoadingCategories(false);
  }, []);

  useEffect(() => {
    const items = donations.items.filter(value =>
      value.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(items);
  }, [categories.selectedCategoryId]);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  };

  return (
    <View style={[globalStyle.backgroundwhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerIntroText}>Hello, </Text>
            <View style={styles.username}>
              <Header title={user.displayName + ' 👋'} />
            </View>
          </View>
          <View>
            <Image
              source={{uri: user.profileImage}}
              style={styles.profileImage}
              resizeMode={'contain'}
            />
            <Pressable
              onPress={async () => {
                dispatch(resetToInitialState());
                await logOut();
              }}>
              <Header type={3} title={'Logout'} color={'#156CF7'} />
            </Pressable>
          </View>
        </View>
        <View style={styles.searchBox}>
          <Search />
        </View>
        <Pressable style={styles.highlightedImageContainer}>
          <Image
            style={styles.highlightedImage}
            source={require('../../highlighted_image.png')}
            resizeMode={'contain'}
          />
        </Pressable>
        <View style={styles.categoryHeader}>
          <Header title={'Select Category'} />
        </View>
        <View style={styles.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) {
                return;
              }

              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]);
                setCategoryPage(prevState => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({item}) => (
              <View style={styles.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId}
                  onPress={value => dispatch(updateSelectedCategoryId(value))}
                  title={item.name}
                  isInactive={item.categoryId !== categories.selectedCategoryId}
                />
              </View>
            )}
          />
        </View>
        {donationItems.length > 0 && (
          <View style={styles.donationItemsContainer}>
            {donationItems.map(value => {
              const categoryInformation = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              );
              return (
                <View
                  style={styles.singleDonationItem}
                  key={value.donationItemId}>
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      });
                    }}
                    donationItemId={value.donationItemId}
                    uri={value.image}
                    donationTitle={value.name}
                    badgeTitle={categoryInformation.name}
                    price={parseFloat(value.price)}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  singleDonationItem: {
    maxWidth: '49%',
    marginBottom: 23,
  },
  donationItemsContainer: {
    marginTop: 20,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  header: {
    marginTop: 20,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIntroText: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    color: '#636776',
  },
  username: {
    marginTop: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  searchBox: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  highlightedImageContainer: {
    marginHorizontal: 24,
  },
  highlightedImage: {
    width: '100%',
    height: 160,
    marginTop: 25,
  },
  categories: {
    marginLeft: 24,
    marginTop: 20,
  },
  categoryItem: {
    marginRight: 10,
  },
  categoryHeader: {
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 16,
  },
});
