// components/dashboard/DashboardStats.tsx
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';

export const DashboardStats = ({ total, resolved }: { total: number; resolved: number }) => {
  const progress = total === 0 ? 0 : resolved / total;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Tickets résolus</Text>
      <ProgressCircle
        style={{ height: 100, width: 100 }}
        progress={progress}
        progressColor={'#10b981'}
        backgroundColor="#e5e7eb"
        strokeWidth={8}
      />
      <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
  percent: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
});
