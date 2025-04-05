import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar
} from 'react-native';
import { Colors } from '@/constants/colors';
import DiaryEntry from '@/components/DiaryEntry';
import AddEntryForm from '@/components/AddEntryForm';
import EmptyState from '@/components/EmptyState';
import useDiaryStore from '@/store/diaryStore';
import { useTheme } from '@/store/settingsStore';

export default function HomeScreen() {
  const { entries, addEntry, deleteEntry } = useDiaryStore();
  const { isDarkMode } = useTheme();
  const [newEntryId, setNewEntryId] = useState<string | null>(null);
  
  const handleAddEntry = (text: string) => {
    addEntry(text);
    // Get the ID of the newest entry to animate it
    setNewEntryId(Date.now().toString());
    
    // Clear the new entry ID after animation
    setTimeout(() => {
      setNewEntryId(null);
    }, 1000);
  };
  
  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.content}>
          <AddEntryForm onAddEntry={handleAddEntry} />
          
          {entries.length === 0 ? (
            <EmptyState
              title="No entries yet"
              message="Start recording positive moments in your life. What made you smile today?"
            />
          ) : (
            <FlatList
              data={entries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DiaryEntry 
                  entry={item} 
                  onDelete={deleteEntry}
                  isNew={item.id === newEntryId}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});