import { Text, View, StyleSheet } from 'react-native';

export function Badge({ priority }: { priority: 'low' | 'medium' | 'high' | 'critical' }) {
  const colorMap = {
    low: '#10b981',
    medium: '#facc15',
    high: '#f97316',
    critical: '#ef4444',
  };

  return (
    <View style={[styles.badge, { backgroundColor: colorMap[priority] }]}>
      <Text style={styles.text}>{priority.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
