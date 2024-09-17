import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import animation from "../teste.json";

export default function NoEthernetScreen() {

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: 300,
          height:300
        }}
        source={animation}
        loop
      />
      <Text style={{fontSize: 18}}>
        Verifique sua ligação à internet.
      </Text>
      </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

