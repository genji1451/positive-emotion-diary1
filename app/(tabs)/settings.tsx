import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Switch, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { 
  Moon, 
  Bell, 
  Clock, 
  Info, 
  Heart, 
  ChevronRight 
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import useSettingsStore from '@/store/settingsStore';
import { useTheme } from '@/store/settingsStore';
import AdBanner from '@/components/AdBanner';

export default function SettingsScreen() {
  const { 
    useSystemTheme,
    reminderEnabled, 
    reminderTime,
    toggleDarkMode,
    toggleSystemTheme,
    toggleReminder,
    setReminderTime 
  } = useSettingsStore();
  
  const { isDarkMode } = useTheme();
  
  const handleTimeChange = () => {
    const times = ['08:00', '12:00', '16:00', '20:00'];
    const currentIndex = times.indexOf(reminderTime);
    const nextIndex = (currentIndex + 1) % times.length;
    setReminderTime(times[nextIndex]);
  };
  
  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode && styles.containerDark
    ]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darkBackground : Colors.background}
      />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
            Appearance
          </Text>
          <View style={[styles.card, isDarkMode && styles.cardDark]}>
            <View style={styles.option}>
              <Text style={[styles.optionText, isDarkMode && styles.textDark]}>
                Use System Theme
              </Text>
              <Switch
                value={useSystemTheme}
                onValueChange={toggleSystemTheme}
                trackColor={{ false: '#767577', true: Colors.accent }}
                thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
              />
            </View>
            
            {!useSystemTheme && (
              <View style={[styles.option, styles.optionBorder]}>
                <Text style={[styles.optionText, isDarkMode && styles.textDark]}>
                  Dark Mode
                </Text>
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: '#767577', true: Colors.accent }}
                  thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
                />
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
            Notifications
          </Text>
          <View style={[styles.card, isDarkMode && styles.cardDark]}>
            <View style={styles.option}>
              <Text style={[styles.optionText, isDarkMode && styles.textDark]}>
                Daily Reminders
              </Text>
              <Switch
                value={reminderEnabled}
                onValueChange={toggleReminder}
                trackColor={{ false: '#767577', true: Colors.accent }}
                thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
              />
            </View>

            {reminderEnabled && (
              <TouchableOpacity 
                style={[styles.option, styles.optionBorder]} 
                onPress={handleTimeChange}
              >
                <Text style={[styles.optionText, isDarkMode && styles.textDark]}>
                  Reminder Time
                </Text>
                <View style={[
                  styles.timeContainer,
                  isDarkMode && styles.timeContainerDark
                ]}>
                  <Text style={[styles.timeText, isDarkMode && styles.textDark]}>
                    {reminderTime}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            isDarkMode ? styles.sectionTitleDark : null
          ]}>
            About
          </Text>
          
          <TouchableOpacity style={[
            styles.settingItem,
            isDarkMode ? styles.settingItemDark : null
          ]}>
            <View style={styles.settingInfo}>
              <Info 
                size={20} 
                color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
              />
              <Text style={[
                styles.settingLabel,
                isDarkMode ? styles.settingLabelDark : null
              ]}>
                Version
              </Text>
            </View>
            
            <View style={styles.settingAction}>
              <Text style={[
                styles.settingValue,
                isDarkMode ? styles.settingValueDark : null
              ]}>
                1.0.0
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[
            styles.settingItem,
            isDarkMode ? styles.settingItemDark : null
          ]}>
            <View style={styles.settingInfo}>
              <Heart 
                size={20} 
                color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
              />
              <Text style={[
                styles.settingLabel,
                isDarkMode ? styles.settingLabelDark : null
              ]}>
                Made with love
              </Text>
            </View>
            
            <View style={styles.settingAction}>
              <ChevronRight 
                size={18} 
                color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerDark: {
    backgroundColor: Colors.darkBackground,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitleDark: {
    color: Colors.darkText,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardDark: {
    backgroundColor: Colors.darkCard,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionBorder: {
    borderTopWidth: 1,
    borderTopColor: isDarkMode => isDarkMode ? Colors.darkCard : Colors.divider,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  textDark: {
    color: Colors.darkText,
  },
  timeContainer: {
    backgroundColor: Colors.softBlue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  timeContainerDark: {
    backgroundColor: Colors.darkBackground,
    borderColor: Colors.darkCard,
  },
  timeText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      }
    }),
  },
  settingItemDark: {
    backgroundColor: Colors.darkCard,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  settingLabelDark: {
    color: Colors.darkText,
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: Colors.lightText,
  },
  settingValueDark: {
    color: Colors.darkLightText,
  },
});