import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Wraps any screen with a solid gradient background so that when
 * it's pushed onto the stack it fully covers the screen beneath it
 * (instead of showing through with a transparent background).
 */
export function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={isDark ? ['#1e1b4b', '#312e81', '#1e1b4b'] : ['#c7d2fe', '#e0e7ff', '#f3e8ff']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
