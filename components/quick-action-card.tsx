import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  badge: string;
  accent: string;
  onPress?: () => void;
}

export function QuickActionCard({ title, subtitle, badge, accent, onPress }: QuickActionCardProps) {
  const isDark = useColorScheme() === 'dark';
  const text = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#64748b';
  const tint = isDark ? 'dark' : 'light';
  const cardBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.55)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)';

  return (
    <Pressable onPress={onPress}>
      <BlurView intensity={50} tint={tint} style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
        <View style={[styles.iconWrapper, { backgroundColor: `${accent}33` }]}>
          <Text style={[styles.badge, { color: accent }]}>{badge}</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: subtext }]}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={isDark ? '#64748b' : '#94a3b8'} />
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
  },
});
