import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/store/settingsStore';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search entries..." 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { isDarkMode } = useTheme();
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  
  const handleChangeText = (text: string) => {
    setQuery(text);
    onSearch(text);
  };
  
  return (
    <View style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <Search 
        size={18} 
        color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
        style={styles.searchIcon} 
      />
      
      <TextInput
        style={[
          styles.input,
          isDarkMode ? styles.inputDark : null
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? Colors.darkLightText : Colors.lightText}
        value={query}
        onChangeText={handleChangeText}
      />
      
      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X 
            size={18} 
            color={isDarkMode ? Colors.darkLightText : Colors.lightText} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
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
  containerDark: {
    backgroundColor: Colors.darkCard,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.text,
  },
  inputDark: {
    color: Colors.darkText,
  },
  clearButton: {
    padding: 8,
  },
});