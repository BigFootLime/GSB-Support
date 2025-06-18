import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomPickerWithBadge } from '@/components/ui/CustomPicker';

interface Props {
  priority: string;
  onPriorityChange: (val: string) => void;
  sortDate: string;
  onSortDateChange: (val: string) => void;
}

const priorityOptions = [
  { label: 'Toutes', value: '' },
  { label: 'Faible', value: 'low' },
  { label: 'Moyenne', value: 'medium' },
  { label: 'Haute', value: 'high' },
  { label: 'Critique', value: 'critical' },
];

const dateSortOptions = [
  { label: 'Plus récents', value: 'desc' },
  { label: 'Plus anciens', value: 'asc' },
];

const badgeColors = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
};

export function TicketFilter({
  priority,
  onPriorityChange,
  sortDate,
  onSortDateChange,
}: Props) {
  return (
    <View style={styles.container}>
      <CustomPickerWithBadge
        label="Filtrer par priorité"
        value={priority}
        options={priorityOptions}
        onChange={onPriorityChange}
        showBadge
        badgeColors={badgeColors}
      />

      <CustomPickerWithBadge
        label="Trier par date"
        value={sortDate}
        options={dateSortOptions}
        onChange={onSortDateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});