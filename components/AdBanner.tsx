import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// Real ad unit ID from AdMob console
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5436156863737872/6051633955';

export default function AdBanner() {
  // Don't render on web platform
  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
  },
}); 