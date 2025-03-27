import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Colors } from '@/constants/colors';
import DiaryEntry from '@/components/DiaryEntry';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import DateFilter from '@/components/DateFilter';
import useDiaryStore from '@/store/diaryStore';
import { getLastNDays, isSameDay } from '@/utils/dateUtils';
import { useTheme } from '@/store/settingsStore';

export default function HistoryScreen() {
  const { entries, searchEntries, deleteEntry } = useDiaryStore();
  const { isDarkMode } = useTheme();
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Get unique dates from entries for the date filter
  const getUniqueDates = () => {
    const dates = entries.map(entry => new Date(entry.createdAt));
    const uniqueDates: Date[] = [];
    
    dates.forEach(date => {
      if (!uniqueDates.some(d => isSameDay(d, date))) {
        uniqueDates.push(date);
      }
    });
    
    return uniqueDates.sort((a, b) => b.getTime() - a.getTime());
  };
  
  // Filter entries based on search query and selected date
  useEffect(() => {
    let result = searchQuery ? searchEntries(searchQuery) : entries;
    
    if (selectedDate) {
      result = result.filter(entry => 
        isSameDay(new Date(entry.createdAt), selectedDate)
      );
    }
    
    setFilteredEntries(result);
  }, [searchQuery, selectedDate, entries]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleSelectDate = (date: Date | null) => {
    setSelectedDate(date);
  };
  
  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? Colors.darkBackground : Colors.background}
      />
      
      <View style={styles.content}>
        <SearchBar onSearch={handleSearch} />
        
        {entries.length > 0 && (
          <DateFilter
            dates={getUniqueDates()}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        )}
        
        {filteredEntries.length === 0 ? (
          <EmptyState
            title={entries.length === 0 ? "No entries yet" : "No matching entries"}
            message={
              entries.length === 0 
                ? "Start recording positive moments in your life."
                : "Try adjusting your search or filters."
            }
          />
        ) : (
          <FlatList
            data={filteredEntries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DiaryEntry 
                entry={item} 
                onDelete={deleteEntry}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
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
  listContent: {
    paddingBottom: 16,
  },
});