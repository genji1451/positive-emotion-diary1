import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { 
  Home, 
  History, 
  ChartBar, 
  Settings as SettingsIcon 
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/store/settingsStore';

export default function TabLayout() {
  const { isDarkMode } = useTheme();
  
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.background;
  const textColor = isDarkMode ? Colors.darkText : Colors.text;
  const tabColor = isDarkMode ? Colors.darkCard : Colors.white;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: isDarkMode ? Colors.darkLightText : Colors.lightText,
        tabBarStyle: {
          backgroundColor: tabColor,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: textColor,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerTitle: "📖 Positive Emotions Diary",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <History size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <ChartBar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <SettingsIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}