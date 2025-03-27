import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiaryEntry, DiaryState } from '@/types/diary';

const useDiaryStore = create<DiaryState>()(
  persist(
    (set, get) => ({
      entries: [],
      
      addEntry: (text: string) => {
        const newEntry: DiaryEntry = {
          id: Date.now().toString(),
          text,
          createdAt: new Date(),
        };
        
        set(state => ({
          entries: [newEntry, ...state.entries]
        }));
      },
      
      deleteEntry: (id: string) => {
        const currentState = get();
        const entryExists = currentState.entries.some(entry => entry.id === id);
        
        if (!entryExists) {
          console.warn('Attempted to delete non-existent entry:', id);
          return;
        }

        set(state => {
          const newEntries = state.entries.filter(entry => entry.id !== id);
          return { entries: newEntries };
        });

        // Verify deletion
        const newState = get();
        const stillExists = newState.entries.some(entry => entry.id === id);
        
        if (stillExists) {
          console.error('Failed to delete entry:', id);
          // Retry deletion
          set(state => ({
            entries: state.entries.filter(entry => entry.id !== id)
          }));
        }
      },
      
      editEntry: (id: string, text: string) => {
        set(state => ({
          entries: state.entries.map(entry => 
            entry.id === id ? { ...entry, text } : entry
          )
        }));
      },
      
      getEntriesByDateRange: (startDate: Date, endDate: Date) => {
        const { entries } = get();
        return entries.filter(entry => {
          const entryDate = new Date(entry.createdAt);
          return entryDate >= startDate && entryDate <= endDate;
        });
      },
      
      searchEntries: (query: string) => {
        const { entries } = get();
        if (!query.trim()) return entries;
        
        const lowerCaseQuery = query.toLowerCase();
        return entries.filter(entry => 
          entry.text.toLowerCase().includes(lowerCaseQuery)
        );
      }
    }),
    {
      name: 'diary-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ entries: state.entries }),
      onRehydrateStorage: () => (state) => {
        if (state && state.entries) {
          state.entries = state.entries.map(entry => ({
            ...entry,
            createdAt: new Date(entry.createdAt)
          }));
        }
      }
    }
  )
);

export default useDiaryStore;