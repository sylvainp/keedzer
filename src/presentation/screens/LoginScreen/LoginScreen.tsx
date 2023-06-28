import React, {useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {MusicSVG} from '../../../assets/icons';
import KDLoginDeezerButton from '../../components/KDLoginDeezerButton';
import {useConfig} from '../../../context/ConfigurationContext';
import KDLoginDeezerView from '../../components/KDLoginDeezerView';
const styles = StyleSheet.create({
  root: {backgroundColor: '#121216'},
  titleContainer: {height: '50%'},
  image: {alignSelf: 'center'},
  title: {
    color: 'white',
    fontSize: 44,
    textAlign: 'center',
    shadowColor: 'white',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.5,
  },
  container: {
    height: '50%',
    justifyContent: 'center',
  },

  button: {backgroundColor: 'blue', height: 65},
});

const LoginScreen = () => {
  const {loginViewmodel} = useConfig();
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.titleContainer}>
        <MusicSVG style={styles.image} />
        <Text style={styles.title}>Keedzer</Text>
      </View>
      <View style={styles.container}>
        <KDLoginDeezerButton
          onPress={() => {
            loginViewmodel.startLoggingProcess();
            // setIsLogging(true);
          }}
          enabled={!loginViewmodel.state.isLogging}
        />
      </View>
      <KDLoginDeezerView
        isVisible={loginViewmodel.state.isLogging}
        onDissmiss={(accessToken?: string) => {
          if (accessToken) {
            loginViewmodel.onUserLogged(accessToken);
          } else {
            loginViewmodel.onLoggingError("Impossible de s'authentifier");
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
