import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { formatShortDate, isSameDay } from '@/utils/dateUtils';
import { useTheme } from '@/store/settingsStore';

interface DateFilterProps {
  dates: Date[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function DateFilter({ 
  dates, 
  selectedDate, 
  onSelectDate 
}: DateFilterProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calendar 
          size={16} 
          color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
        />
        <Text style={[
          styles.headerText,
          isDarkMode ? styles.headerTextDark : null
        ]}>
          Filter by date
        </Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.dateChip,
            selectedDate === null ? styles.selectedChip : null,
            isDarkMode && selectedDate === null ? styles.selectedChipDark : null,
            isDarkMode && selectedDate !== null ? styles.dateChipDark : null
          ]}
          onPress={() => onSelectDate(null as any)}
        >
          <Text style={[
            styles.dateText,
            selectedDate === null ? styles.selectedDateText : null,
            isDarkMode && selectedDate !== null ? styles.dateTextDark : null
          ]}>
            All
          </Text>
        </TouchableOpacity>
        
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateChip,
              selectedDate && isSameDay(date, selectedDate) ? styles.selectedChip : null,
              isDarkMode && selectedDate && isSameDay(date, selectedDate) ? styles.selectedChipDark : null,
              isDarkMode && (!selectedDate || !isSameDay(date, selectedDate)) ? styles.dateChipDark : null
            ]}
            onPress={() => onSelectDate(date)}
          >
            <Text style={[
              styles.dateText,
              selectedDate && isSameDay(date, selectedDate) ? styles.selectedDateText : null,
              isDarkMode && (!selectedDate || !isSameDay(date, selectedDate)) ? styles.dateTextDark : null
            ]}>
              {formatShortDate(date)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
    gap: 6,
  },
  headerText: {
    fontSize: 14,
    color: Colors.lightText,
    fontWeight: '500',
  },
  headerTextDark: {
    color: Colors.darkLightText,
  },
  scrollContent: {
    paddingHorizontal: 4,
    paddingBottom: 8,
    gap: 8,
    flexDirection: 'row',
  },
  dateChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  dateChipDark: {
    backgroundColor: Colors.darkCard,
    borderColor: Colors.darkCard,
  },
  selectedChip: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  selectedChipDark: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  dateText: {
    fontSize: 14,
    color: Colors.text,
  },
  dateTextDark: {
    color: Colors.darkText,
  },
  selectedDateText: {
    color: Colors.white,
    fontWeight: '500',
  },
});