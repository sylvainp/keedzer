import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: 'red'},
});
const MainScreen: React.FC = () => {
  return <View style={styles.root} />;
};

export default MainScreen;
