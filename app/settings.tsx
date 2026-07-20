import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsScreen() {
  const isDark = useColorScheme() === 'dark';
  const text = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#475569';
  const tint = isDark ? 'dark' : 'light';
  const card = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BlurView intensity={50} tint={tint} style={[styles.card, { backgroundColor: card, borderColor: cardBorder }]}>
        <Text style={[styles.title, { color: text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: subtext }]}>Configure your field survey experience and review app details.</Text>
      </BlurView>

      <BlurView intensity={50} tint={tint} style={[styles.sectionCard, { backgroundColor: card, borderColor: cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: text }]}>App Preferences</Text>
        <View style={styles.row}>
          <Ionicons name="color-palette-outline" size={20} color={isDark ? '#a5b4fc' : '#4338ca'} />
          <Text style={[styles.rowText, { color: subtext }]}>Dark mode support is handled by the device theme.</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={20} color={isDark ? '#34d399' : '#16a34a'} />
          <Text style={[styles.rowText, { color: subtext }]}>Survey reminders and notes are saved to local JSON storage.</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="save-outline" size={20} color={isDark ? '#fbbf24' : '#d97706'} />
          <Text style={[styles.rowText, { color: subtext }]}>All surveys are persisted on device and available offline.</Text>
        </View>
      </BlurView>

      <BlurView intensity={50} tint={tint} style={[styles.sectionCard, { backgroundColor: card, borderColor: cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: text }]}>About this App</Text>
        <Text style={[styles.rowText, { color: subtext }]}>Smart Field Survey helps you manage surveys, capture photos, choose contacts, and store location and clipboard details for your field assignment.</Text>
        <View style={[styles.versionBadge, { backgroundColor: isDark ? 'rgba(99,102,241,0.2)' : '#e0e7ff', marginTop: 14 }]}>
          <Text style={{ color: isDark ? '#a5b4fc' : '#4338ca', fontWeight: '700', fontSize: 13 }}>Version 1.0.0</Text>
        </View>
      </BlurView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  card: { borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, overflow: 'hidden' },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { marginTop: 8, lineHeight: 20 },
  sectionCard: { borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, overflow: 'hidden' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  rowText: { flex: 1, fontSize: 14, lineHeight: 20 },
  versionBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
});
