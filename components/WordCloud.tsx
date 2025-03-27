import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Colors } from '@/constants/colors';
import { WordFrequency } from '@/utils/textAnalysis';
import { useTheme } from '@/store/settingsStore';

interface WordCloudProps {
  words: WordFrequency[];
}

export default function WordCloud({ words }: WordCloudProps) {
  const { isDarkMode } = useTheme();
  
  if (words.length === 0) {
    return null;
  }
  
  // Calculate font sizes based on frequency
  const maxCount = Math.max(...words.map(w => w.count));
  const minCount = Math.min(...words.map(w => w.count));
  const fontSizeRange = 16; // Reduced max font size difference
  
  const calculateFontSize = (count: number) => {
    if (maxCount === minCount) return 14;
    const normalized = (count - minCount) / (maxCount - minCount);
    return 12 + normalized * fontSizeRange;
  };
  
  return (
    <View style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <Text style={[
        styles.title,
        isDarkMode ? styles.titleDark : null
      ]}>
        Common Positive Words
      </Text>
      
      <View style={styles.cloudContainer}>
        {words.map((word, index) => (
          <View 
            key={index}
            style={[
              styles.wordContainer,
              isDarkMode ? styles.wordContainerDark : null
            ]}
          >
            <Text style={[
              styles.word,
              { fontSize: calculateFontSize(word.count) },
              isDarkMode ? styles.wordDark : null
            ]}>
              {word.word}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      }
    }),
  },
  containerDark: {
    backgroundColor: Colors.darkCard,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  titleDark: {
    color: Colors.darkText,
  },
  cloudContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordContainer: {
    backgroundColor: Colors.softBlue,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  wordContainerDark: {
    backgroundColor: Colors.darkBackground,
  },
  word: {
    color: Colors.text,
    fontWeight: '500',
  },
  wordDark: {
    color: Colors.darkText,
  },
});