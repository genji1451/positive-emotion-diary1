import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Welcome to Positive Emotions Diary',
    description: 'This app will help you focus on the positive moments in life and improve your emotional well-being.',
    icon: 'heart-outline',
  },
  {
    id: 2,
    title: 'Record Positive Moments',
    description: 'Each day, note down events that brought you joy and positive emotions.',
    icon: 'book-outline',
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description: 'Analyze your mood and observe how your happiness level grows day by day.',
    icon: 'trending-up-outline',
  },
];

const OnboardingCarousel = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const currentIndex = Math.round(contentOffset.x / width);
    setCurrentIndex(currentIndex);
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === slides.length - 1) {
      completeOnboarding();
    } else {
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={slide.icon as any} 
                size={120} 
                color={isDark ? Colors.darkText : Colors.accent} 
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={[styles.title, isDark && styles.titleDark]}>{slide.title}</Text>
              <Text style={[styles.description, isDark && styles.descriptionDark]}>
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, isDark && styles.footerDark]}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
                isDark && styles.paginationDotDark,
                index === currentIndex && isDark && styles.paginationDotActiveDark,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex < slides.length - 1 && (
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={skipOnboarding}
            >
              <Text style={[
                styles.buttonText, 
                styles.skipButtonText,
                isDark && styles.skipButtonTextDark
              ]}>
                Skip
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.button, styles.nextButton, isDark && styles.nextButtonDark]}
            onPress={goToNextSlide}
          >
            <Text style={styles.buttonText}>
              {currentIndex === slides.length - 1 ? 'Start' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerDark: {
    backgroundColor: Colors.darkBackground,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    height: height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: width * 0.8,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text,
    textAlign: 'center',
  },
  titleDark: {
    color: Colors.darkText,
  },
  description: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
    lineHeight: 24,
  },
  descriptionDark: {
    color: Colors.darkLightText,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  footerDark: {
    backgroundColor: Colors.darkBackground,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.lightText,
    marginHorizontal: 4,
  },
  paginationDotDark: {
    backgroundColor: Colors.darkLightText,
  },
  paginationDotActive: {
    backgroundColor: Colors.accent,
    width: 24,
  },
  paginationDotActiveDark: {
    backgroundColor: Colors.accent,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    minWidth: 160,
  },
  skipButton: {
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: Colors.accent,
  },
  nextButtonDark: {
    backgroundColor: Colors.accent,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButtonText: {
    color: Colors.lightText,
  },
  skipButtonTextDark: {
    color: Colors.darkLightText,
  },
});

export default OnboardingCarousel;