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
  const dynamicStyles = getStyles(isDark);
  return (
    <View style={dynamicStyles.container}>
      <Pressable onPress={onMenuPress}>
        <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.menuButton}>
          <Ionicons name="menu-outline" size={24} color={isDark ? "#f8fafc" : "#0f172a"} />
        </BlurView>
      </Pressable>
      <View style={dynamicStyles.textContainer}>
        <Text style={dynamicStyles.title}>{title}</Text>
        <Text style={dynamicStyles.subtitle}>{subtitle}</Text>
      </View>
      <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.badge}>
        <Text style={dynamicStyles.badgeText}>Live</Text>
      </BlurView>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
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
    color: isDark ? '#f8fafc' : '#0f172a',
  },
  subtitle: {
    fontSize: 13,
    color: isDark ? '#94a3b8' : '#64748b',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: isDark ? '#042f2e' : '#ecfeff',
  },
  badgeText: {
    color: isDark ? '#5eead4' : '#0f766e',
    fontSize: 12,
    fontWeight: '700',
  },
});
