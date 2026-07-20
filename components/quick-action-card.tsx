import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  badge: string;
  accent: string;
  onPress?: () => void;
}

export function QuickActionCard({ title, subtitle, badge, accent, onPress }: QuickActionCardProps) {
  return (
    <Pressable onPress={onPress}>
      <BlurView intensity={40} tint="light" style={styles.card}>
        <View style={[styles.iconWrapper, { backgroundColor: accent }]}>
          <Text style={styles.badge}>{badge}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#64748b" />
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
    color: '#0f172a',
  },
  content: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
  },
});
