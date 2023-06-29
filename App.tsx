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
import {accessToken} from './src/store/slice';
import {store} from './src/store/store';
import {useAppSelector} from './src/store/hooks';

const AppNavigationContainer = () => {
  const token = useAppSelector(accessToken);
  console.log('****** ', {token});
  return (
    <NavigationContainer>
      {token ? <KDOnlineNavigator /> : <KDOfflineNavigator />}
    </NavigationContainer>
  );
};
const App: React.FC = (): JSX.Element => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <Provider store={store}>
      <ConfigContext.Provider value={getConfigContextValue()} />
      <AppNavigationContainer />
    </Provider>
  );
};
export default App;
