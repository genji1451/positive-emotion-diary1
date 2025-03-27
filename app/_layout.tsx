import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/store/settingsStore";
import { Colors } from "@/constants/colors";
import mobileAds from 'react-native-google-mobile-ads';

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    async function checkOnboarding() {
      try {
        await AsyncStorage.removeItem('hasSeenOnboarding'); // Временно удаляем для тестирования
        const value = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(value === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setHasSeenOnboarding(false);
      }
    }
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Initialize AdMob
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete
      });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          statusBarStyle: isDarkMode ? 'light' : 'dark',
          ...(Platform.OS === 'android' && {
            statusBarColor: isDarkMode ? Colors.darkBackground : Colors.background,
          }),
        }}
      >
        {!hasSeenOnboarding && (
          <Stack.Screen
            name="onboarding"
            options={{
              gestureEnabled: false,
              animation: 'none',
            }}
          />
        )}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ErrorBoundary>
  );
}
