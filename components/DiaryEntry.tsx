import React, { useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { Calendar, MoreVertical, Trash2 } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { formatDate } from '@/utils/dateUtils';
import { DiaryEntry as DiaryEntryType } from '@/types/diary';
import { useTheme } from '@/store/settingsStore';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  isNew?: boolean;
}

export default function DiaryEntry({ 
  entry, 
  onDelete, 
  onEdit,
  isNew = false 
}: DiaryEntryProps) {
  const { isDarkMode } = useTheme();
  const fadeAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;
  const scaleAnim = useRef(new Animated.Value(isNew ? 0.95 : 1)).current;
  
  useEffect(() => {
    if (isNew) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isNew, fadeAnim, scaleAnim]);

  const confirmDelete = () => {
    if (!onDelete) return;

    const doDelete = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onDelete(entry.id);
      });
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this entry?')) {
        doDelete();
      }
    } else {
      Alert.alert(
        'Delete Entry',
        'Are you sure you want to delete this entry?',
        [
          { 
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            onPress: doDelete,
            style: 'destructive'
          }
        ],
        { 
          cancelable: true,
          userInterfaceStyle: isDarkMode ? 'dark' : 'light'
        }
      );
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(entry.id);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        isDarkMode ? styles.containerDark : null,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
      ]}
    >
      <View style={styles.content}>
        <Text style={[
          styles.text,
          isDarkMode ? styles.textDark : null
        ]}>
          {entry.text}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Calendar 
              size={14} 
              color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
            />
            <Text style={[
              styles.date,
              isDarkMode ? styles.dateDark : null
            ]}>
              {formatDate(entry.createdAt)}
            </Text>
          </View>
          
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity 
                onPress={handleEdit}
                style={styles.actionButton}
              >
                <MoreVertical 
                  size={18} 
                  color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
                />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              onPress={confirmDelete}
              style={styles.actionButton}
            >
              <Trash2 
                size={18} 
                color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
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
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  textDark: {
    color: Colors.darkText,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  date: {
    fontSize: 12,
    color: Colors.lightText,
  },
  dateDark: {
    color: Colors.darkLightText,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
});