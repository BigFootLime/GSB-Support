import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  value: number;
}

export const CustomCard: React.FC<CustomCardProps> = ({ icon, color, title, value }) => {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={32} color={color} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardNumber}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '30%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: '#334155',
    marginTop: 8,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
});