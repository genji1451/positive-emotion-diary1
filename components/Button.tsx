import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import { Colors } from '@/constants/colors';
import { useTheme } from '@/store/settingsStore';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle
}: ButtonProps) {
  const { isDarkMode } = useTheme();
  
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    // Add size styles
    if (size === 'small') baseStyle.push(styles.buttonSmall);
    if (size === 'large') baseStyle.push(styles.buttonLarge);
    
    // Add variant styles
    if (variant === 'primary') {
      baseStyle.push(styles.buttonPrimary);
      if (isDarkMode) baseStyle.push(styles.buttonPrimaryDark);
    }
    if (variant === 'secondary') {
      baseStyle.push(styles.buttonSecondary);
      if (isDarkMode) baseStyle.push(styles.buttonSecondaryDark);
    }
    if (variant === 'outline') {
      baseStyle.push(styles.buttonOutline);
      if (isDarkMode) baseStyle.push(styles.buttonOutlineDark);
    }
    
    // Add disabled style
    if (disabled) baseStyle.push(styles.buttonDisabled);
    
    // Add custom style
    if (style) baseStyle.push(style);
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    // Add size styles
    if (size === 'small') baseStyle.push(styles.buttonTextSmall);
    if (size === 'large') baseStyle.push(styles.buttonTextLarge);
    
    // Add variant styles
    if (variant === 'primary') baseStyle.push(styles.buttonTextPrimary);
    if (variant === 'secondary') baseStyle.push(styles.buttonTextSecondary);
    if (variant === 'outline') {
      baseStyle.push(styles.buttonTextOutline);
      if (isDarkMode) baseStyle.push(styles.buttonTextOutlineDark);
    }
    
    // Add disabled style
    if (disabled) baseStyle.push(styles.buttonTextDisabled);
    
    // Add custom style
    if (textStyle) baseStyle.push(textStyle);
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? Colors.accent : Colors.white} 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: Colors.accent,
  },
  buttonPrimaryDark: {
    backgroundColor: Colors.accent,
  },
  buttonSecondary: {
    backgroundColor: Colors.softBlue,
  },
  buttonSecondaryDark: {
    backgroundColor: Colors.darkCard,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  buttonOutlineDark: {
    borderColor: Colors.accent,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
  buttonTextPrimary: {
    color: Colors.white,
  },
  buttonTextSecondary: {
    color: Colors.text,
  },
  buttonTextOutline: {
    color: Colors.accent,
  },
  buttonTextOutlineDark: {
    color: Colors.accent,
  },
  buttonTextDisabled: {
    opacity: 0.7,
  },
});