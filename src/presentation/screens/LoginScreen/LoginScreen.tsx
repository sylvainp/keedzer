import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {MusicSVG} from '../../../assets/icons';
import KDLoginDeezerButton from '../../components/KDLoginDeezerButton';
import KDLoginDeezerView from '../../components/KDLoginDeezerView';
import {setToken} from '../../../store/accessTokenSlice';
import {useAppDispatch} from '../../../store/hooks';
import theme from '../../theme';

const styles = StyleSheet.create({
  root: {backgroundColor: theme.color.backgroundColor, flex: 1},

  imageContainer: {flex: 2},
  image: {alignSelf: 'center'},
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 74,
    textAlign: 'center',
    shadowColor: 'white',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.5,
  },
  buttonContainer: {
    flex: 2,

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
      <View style={styles.imageContainer}>
        <MusicSVG style={styles.image} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Keedzer</Text>
      </View>
      <View style={styles.buttonContainer}>
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
          console.log('onDissmiss');
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
