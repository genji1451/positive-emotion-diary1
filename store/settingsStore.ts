import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { SettingsState } from '@/types/diary';

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      useSystemTheme: true,
      reminderEnabled: false,
      reminderTime: '20:00',
      
      toggleDarkMode: () => set(state => ({ 
        isDarkMode: !state.isDarkMode,
        useSystemTheme: false
      })),

      toggleSystemTheme: () => set(state => ({
        useSystemTheme: !state.useSystemTheme
      })),
      
      toggleReminder: () => set(state => ({ 
        reminderEnabled: !state.reminderEnabled 
      })),
      
      setReminderTime: (time: string) => set({ 
        reminderTime: time 
      })
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export const useTheme = () => {
  const systemTheme = useColorScheme();
  const { isDarkMode, useSystemTheme } = useSettingsStore();
  
  return {
    isDarkMode: useSystemTheme ? systemTheme === 'dark' : isDarkMode
  };
};

export default useSettingsStore;