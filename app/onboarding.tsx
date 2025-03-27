import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingCarousel from '../components/OnboardingCarousel';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <OnboardingCarousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 