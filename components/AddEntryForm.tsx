import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  Keyboard,
  Platform
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import Button from './Button';
import { useTheme } from '@/store/settingsStore';

interface AddEntryFormProps {
  onAddEntry: (text: string) => void;
}

export default function AddEntryForm({ onAddEntry }: AddEntryFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useTheme();
  
  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      onAddEntry(text);
      setText('');
      setIsSubmitting(false);
      Keyboard.dismiss();
    }, 300);
  };
  
  return (
    <View style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <TextInput
        style={[
          styles.input,
          isDarkMode ? styles.inputDark : null
        ]}
        placeholder="What positive thing happened today?"
        placeholderTextColor={isDarkMode ? Colors.darkLightText : Colors.lightText}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={Platform.OS === 'ios' ? 0 : 4}
        textAlignVertical="top"
      />
      
      <Button
        title="Add Entry"
        onPress={handleSubmit}
        disabled={text.trim().length === 0}
        loading={isSubmitting}
        icon={<Plus size={18} color={Colors.white} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    minHeight: 120,
    marginBottom: 16,
    lineHeight: 24,
  },
  inputDark: {
    backgroundColor: Colors.darkBackground,
    color: Colors.darkText,
  },
});