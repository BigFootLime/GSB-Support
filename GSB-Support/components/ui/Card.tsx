import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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

const CARD_WIDTH = 150;
const CARD_HEIGHT = 120;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 14,
    color: '#334155',
    marginTop: 8,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ab82fd',
    marginTop: 4,
  },
});
