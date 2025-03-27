import React, { useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { 
  Calendar, 
  TrendingUp, 
  MessageSquareText 
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import StatsCard from '@/components/StatsCard';
import EntryBarChart from '@/components/EntryBarChart';
import WordCloud from '@/components/WordCloud';
import EmptyState from '@/components/EmptyState';
import useDiaryStore from '@/store/diaryStore';
import { getLastNDays, isSameDay } from '@/utils/dateUtils';
import { analyzeTextFrequency } from '@/utils/textAnalysis';
import { useTheme } from '@/store/settingsStore';

export default function StatsScreen() {
  const { entries } = useDiaryStore();
  const { isDarkMode } = useTheme();
  
  // Calculate stats
  const stats = useMemo(() => {
    if (entries.length === 0) return null;
    
    // Total entries
    const totalEntries = entries.length;
    
    // Entries by day (last 7 days)
    const last7Days = getLastNDays(7);
    const entriesByDay = last7Days.map(date => {
      const count = entries.filter(entry => 
        isSameDay(new Date(entry.createdAt), date)
      ).length;
      
      return { date, count };
    });
    
    // Average entries per day
    const daysWithEntries = new Set(
      entries.map(entry => 
        new Date(entry.createdAt).toDateString()
      )
    ).size;
    
    const avgEntriesPerDay = daysWithEntries > 0 ? totalEntries / daysWithEntries : 0;
    
    // Longest streak
    let currentStreak = 0;
    let longestStreak = 0;
    let lastDate: Date | null = null;
    
    // Sort entries by date
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    
    // Get unique dates with entries
    const uniqueDates = sortedEntries.reduce((dates, entry) => {
      const dateStr = new Date(entry.createdAt).toDateString();
      if (!dates.includes(dateStr)) {
        dates.push(dateStr);
      }
      return dates;
    }, [] as string[]);
    
    // Calculate streak
    uniqueDates.forEach(dateStr => {
      const date = new Date(dateStr);
      
      if (!lastDate) {
        currentStreak = 1;
      } else {
        const dayDiff = Math.floor(
          (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      
      lastDate = date;
    });
    
    // Word frequency analysis
    const wordFrequency = analyzeTextFrequency(entries.map(entry => entry.text));
    
    return {
      totalEntries,
      entriesByDay,
      avgEntriesPerDay,
      longestStreak,
      wordFrequency
    };
  }, [entries]);
  
  if (!stats) {
    return (
      <SafeAreaView style={[
        styles.container,
        isDarkMode ? styles.containerDark : null
      ]}>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={isDarkMode ? Colors.darkBackground : Colors.background}
        />
        <EmptyState
          title="No stats available"
          message="Add some entries to see your statistics."
        />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? Colors.darkBackground : Colors.background}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <StatsCard
            title="Total Entries"
            value={stats.totalEntries}
            icon={<MessageSquareText size={20} color={Colors.accent} />}
          />
          
          <StatsCard
            title="Longest Streak"
            value={stats.longestStreak}
            subtitle="days in a row"
            icon={<TrendingUp size={20} color={Colors.accent} />}
          />
        </View>
        
        <EntryBarChart data={stats.entriesByDay} />
        
        <WordCloud words={stats.wordFrequency} />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
});