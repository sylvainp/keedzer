import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {MusicSVG} from '../../../assets/icons';
import KDLoginDeezerButton from '../../components/KDLoginDeezerButton';
import KDLoginDeezerView from '../../components/KDLoginDeezerView';
import {setToken} from '../../../store/accessTokenSlice';
import {useAppDispatch} from '../../../store/hooks';
import theme from '../../theme';

const styles = StyleSheet.create({
  root: {backgroundColor: theme.color.backgroundColor},
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
  const dispatch = useAppDispatch();
  const saveAccessToken = (accessToken: string) => {
    dispatch(setToken(accessToken));
  };
  const [isLogging, setIsLogging] = useState(false);
  const [isError, setError] = useState<string | null>(null);
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
            setIsLogging(true);
          }}
          enabled={!isLogging}
        />
      </View>
      <KDLoginDeezerView
        isVisible={isLogging}
        onDissmiss={(accessToken?: string) => {
          setIsLogging(false);
          if (accessToken) {
            saveAccessToken(accessToken);
          } else {
            setError("Impossible de s'authentifier");
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
