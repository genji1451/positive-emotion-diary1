import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/store/settingsStore';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  subtitle 
}: StatsCardProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <View style={styles.header}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[
          styles.title,
          isDarkMode ? styles.titleDark : null
        ]}>
          {title}
        </Text>
      </View>
      
      <Text style={[
        styles.value,
        isDarkMode ? styles.valueDark : null
      ]}>
        {value}
      </Text>
      
      {subtitle && (
        <Text style={[
          styles.subtitle,
          isDarkMode ? styles.subtitleDark : null
        ]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flex: 1,
    minHeight: 120,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    color: Colors.lightText,
    fontWeight: '500',
  },
  titleDark: {
    color: Colors.darkLightText,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  valueDark: {
    color: Colors.darkText,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.lightText,
  },
  subtitleDark: {
    color: Colors.darkLightText,
  },
});