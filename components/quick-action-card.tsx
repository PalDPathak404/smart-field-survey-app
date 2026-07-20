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
  const dynamicStyles = getStyles(isDark);
  return (
    <Pressable onPress={onPress}>
      <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.card}>
        <View style={[dynamicStyles.iconWrapper, { backgroundColor: accent }]}>
          <Text style={dynamicStyles.badge}>{badge}</Text>
        </View>
        <View style={dynamicStyles.content}>
          <Text style={dynamicStyles.title}>{title}</Text>
          <Text style={dynamicStyles.subtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={isDark ? "#94a3b8" : "#64748b"} />
      </BlurView>
    </Pressable>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
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
    color: isDark ? '#f8fafc' : '#0f172a',
  },
  content: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: isDark ? '#f8fafc' : '#0f172a',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: isDark ? '#94a3b8' : '#64748b',
  },
});
