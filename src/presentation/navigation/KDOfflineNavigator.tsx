import React from 'react';
import {NativeStackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackAnimationTypes} from 'react-native-screens';
import {Platform} from 'react-native';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const Stack = createNativeStackNavigator<NativeStackParamList>();

const stackScreenAnimationOption: StackAnimationTypes | undefined =
  Platform.select({
    android: 'none',
    ios: 'default',
  });

const KDOfflineNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen
      component={LoginScreen}
      name="Login"
      options={{animation: stackScreenAnimationOption}}
    />
  </Stack.Navigator>
);
export default KDOfflineNavigator;
