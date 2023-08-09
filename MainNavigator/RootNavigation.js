const {useSelector} = require('react-redux');
const {Authenticated, NonAuthenticated} = require('./MainNavigator');

export const RootNavigation = () => {
  const user = useSelector(state => state.user);
  return user.isLoggedIn ? <Authenticated /> : <NonAuthenticated />;
};
