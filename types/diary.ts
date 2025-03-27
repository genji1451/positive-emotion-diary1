export interface DiaryEntry {
  id: string;
  text: string;
  createdAt: Date;
}

export interface DiaryState {
  entries: DiaryEntry[];
  addEntry: (text: string) => void;
  deleteEntry: (id: string) => void;
  editEntry: (id: string, text: string) => void;
  getEntriesByDateRange: (startDate: Date, endDate: Date) => DiaryEntry[];
  searchEntries: (query: string) => DiaryEntry[];
}

export interface SettingsState {
  isDarkMode: boolean;
  useSystemTheme: boolean;
  reminderEnabled: boolean;
  reminderTime: string;
  toggleDarkMode: () => void;
  toggleSystemTheme: () => void;
  toggleReminder: () => void;
  setReminderTime: (time: string) => void;
}