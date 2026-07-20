import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  onMenuPress?: () => void;
}

export function DashboardHeader({ title, subtitle, onMenuPress }: DashboardHeaderProps) {
  const isDark = useColorScheme() === 'dark';
  const text = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#475569';
  const tint = isDark ? 'dark' : 'light';
  const btnBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)';
  const btnBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)';
  const badgeBg = isDark ? 'rgba(20,184,166,0.2)' : '#ccfbf1';
  const badgeText = isDark ? '#5eead4' : '#0f766e';

  return (
    <View style={styles.container}>
      <Pressable onPress={onMenuPress}>
        <BlurView intensity={50} tint={tint} style={[styles.menuButton, { backgroundColor: btnBg, borderColor: btnBorder }]}>
          <Ionicons name="menu-outline" size={24} color={text} />
        </BlurView>
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: subtext }]}>{subtitle}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: badgeBg }]}>
        <View style={styles.liveDot} />
        <Text style={[styles.badgeText, { color: badgeText }]}>Live</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
