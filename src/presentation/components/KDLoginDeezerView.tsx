import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {DEEZER_APP_ID, DEEZER_REDIRECT_URL} from 'react-native-dotenv';

interface KDLoginDeezerViewProps {
  isVisible: boolean;
  onDissmiss: (accessToken?: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {flex: 1},
});
const KDLoginDeezerView: React.FC<KDLoginDeezerViewProps> = ({
  isVisible,
  onDissmiss,
}) => {
  const onNavigationStateChange = (navigationState: WebViewNavigation) => {
    const url = navigationState.url;

    // parseURLParams is a pseudo function.
    // Make sure to write your own function or install a package
    if (url.startsWith(DEEZER_REDIRECT_URL)) {
      const accessTokenParams = url.substring(
        url.indexOf('#') + 1,
        url.indexOf('&expires'),
      );
      const accessToken = accessTokenParams.split('=')[1];
      onDissmiss(accessToken);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      onBackdropPress={() => onDissmiss()}>
      <View style={styles.container}>
        <WebView
          source={{
            uri: `https://connect.deezer.com/oauth/auth.php?perms=basic_access,email&response_type=token&app_id=${DEEZER_APP_ID}&redirect_uri=${encodeURIComponent(
              DEEZER_REDIRECT_URL,
            )}`,
          }}
          style={styles.webView}
          onNavigationStateChange={onNavigationStateChange}
          onError={() => {}}
        />
      </View>
    </Modal>
  );
};

export default KDLoginDeezerView;
