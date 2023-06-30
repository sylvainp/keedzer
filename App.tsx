/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import KDOfflineNavigator from './src/presentation/navigation/KDOfflineNavigator';
import getConfigContextValue from './src/context/getConfigurationContextValue';
import {ConfigContext} from './src/context/ConfigurationContext';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import KDOnlineNavigator from './src/presentation/navigation/KDOnlineNavigator';
import {accessToken} from './src/store/accessTokenSlice';
import {store} from './src/store/store';
import {useAppSelector} from './src/store/hooks';
import {userId} from './src/store/userSlice';

const AppNavigationContainer = () => {
  const token = useAppSelector(accessToken);
  const userid = useAppSelector(userId);
  console.log('AppNavigationContainer ', {token, userid});
  return (
    <ConfigContext.Provider value={getConfigContextValue(token, userid)}>
      <NavigationContainer>
        {token ? <KDOnlineNavigator /> : <KDOfflineNavigator />}
      </NavigationContainer>
    </ConfigContext.Provider>
  );
};
const App: React.FC = (): JSX.Element => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <Provider store={store}>
      <AppNavigationContainer />
    </Provider>
  );
};
export default App;
