import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  icon,
  textStyle,
  disabled = false,
}) => {
  return (
<TouchableOpacity
  style={[styles.button, style, disabled && styles.disabled]}
  onPress={onPress}
  disabled={disabled}
>
  <View style={styles.content}>
    {icon && <Ionicons name={icon} size={20} color="#fff" style={styles.icon} />}
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </View>
</TouchableOpacity>  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#171639',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // fonctionne avec Expo SDK 50+
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  icon: {
    marginRight: 6, // fallback si `gap` non supporté
  },
  disabled: {
    opacity: 0.5,
  },
});

