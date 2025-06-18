import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  total: number;
  resolved: number;
}

export const DashboardStats = ({ total, resolved }: Props) => {
  const progress = total === 0 ? 0 : resolved / total;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedStroke = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Tickets résolus</Text>
      <Svg width={size} height={size}>
        <Circle
          stroke="#e5e7eb"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke="#10b981"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={animatedStroke}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
  percent: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
  },
});
