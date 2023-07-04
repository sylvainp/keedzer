import React from 'react';
import {NativeStackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackAnimationTypes} from 'react-native-screens';
import {Platform} from 'react-native';
import MainScreen from '../screens/mainScreen/MainScreen';

const Stack = createNativeStackNavigator<NativeStackParamList>();

const stackScreenAnimationOption: StackAnimationTypes | undefined =
  Platform.select({
    android: 'none',
    ios: 'default',
  });

const KDOnlineNavigator = () => (
  <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
    <Stack.Screen
      component={MainScreen}
      name="Main"
      options={{animation: stackScreenAnimationOption}}
    />
  </Stack.Navigator>
);
export default KDOnlineNavigator;
