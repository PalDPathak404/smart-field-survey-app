import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  onMenuPress?: () => void;
}

export function DashboardHeader({ title, subtitle, onMenuPress }: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onMenuPress}>
        <BlurView intensity={40} tint="light" style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#0f172a" />
        </BlurView>
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <BlurView intensity={40} tint="light" style={styles.badge}>
        <Text style={styles.badgeText}>Live</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ecfeff',
  },
  badgeText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '700',
  },
});
