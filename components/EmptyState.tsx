import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/store/settingsStore';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title, 
  message, 
  icon 
}: EmptyStateProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={styles.container}>
      {icon || (
        <View style={[
          styles.iconContainer,
          isDarkMode ? styles.iconContainerDark : null
        ]}>
          <BookOpen 
            size={32} 
            color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
          />
        </View>
      )}
      
      <Text style={[
        styles.title,
        isDarkMode ? styles.titleDark : null
      ]}>
        {title}
      </Text>
      
      <Text style={[
        styles.message,
        isDarkMode ? styles.messageDark : null
      ]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconContainerDark: {
    backgroundColor: Colors.darkCard,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  titleDark: {
    color: Colors.darkText,
  },
  message: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  messageDark: {
    color: Colors.darkLightText,
  },
});