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

function App(): JSX.Element {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <ConfigContext.Provider value={getConfigContextValue()}>
      <NavigationContainer>
        <KDOfflineNavigator />
      </NavigationContainer>
    </ConfigContext.Provider>
  );
}
export default App;
