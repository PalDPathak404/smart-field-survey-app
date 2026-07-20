import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSurvey } from '@/components/survey-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const { surveys, activeContact, locationLabel, notes } = useSurvey();
  const isDark = useColorScheme() === 'dark';
  const text = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#475569';
  const label = isDark ? '#64748b' : '#64748b';
  const tint = isDark ? 'dark' : 'light';
  const card = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)';
  const innerBox = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BlurView intensity={50} tint={tint} style={[styles.headerCard, { backgroundColor: card, borderColor: cardBorder }]}>
        <View style={[styles.avatar, { backgroundColor: isDark ? 'rgba(99,102,241,0.3)' : 'rgba(199,210,254,0.8)' }]}>
          <Text style={[styles.avatarText, { color: isDark ? '#a5b4fc' : '#312e81' }]}>DK</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: text }]}>Dk Kumar</Text>
          <Text style={[styles.role, { color: subtext }]}>Field Survey Student</Text>
        </View>
      </BlurView>

      <BlurView intensity={50} tint={tint} style={[styles.sectionCard, { backgroundColor: card, borderColor: cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: text }]}>Profile Summary</Text>
        <Text style={[styles.sectionLabel, { color: label }]}>Preferred contact</Text>
        <Text style={[styles.sectionValue, { color: text }]}>{activeContact || 'Not selected yet'}</Text>
        <Text style={[styles.sectionLabel, { color: label }]}>Last known location</Text>
        <Text style={[styles.sectionValue, { color: text }]}>{locationLabel || 'No location recorded'}</Text>
        <Text style={[styles.sectionLabel, { color: label }]}>Draft notes</Text>
        <Text style={[styles.sectionValue, { color: text }]}>{notes || 'No notes saved'}</Text>
      </BlurView>

      <BlurView intensity={50} tint={tint} style={[styles.sectionCard, { backgroundColor: card, borderColor: cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: text }]}>Survey Performance</Text>
        <View style={styles.metricRow}>
          <View style={[styles.metricBox, { backgroundColor: innerBox }]}>
            <Text style={[styles.metricValue, { color: text }]}>{surveys.length}</Text>
            <Text style={[styles.metricLabel, { color: subtext }]}>Surveys created</Text>
          </View>
          <View style={[styles.metricBox, { backgroundColor: innerBox }]}>
            <Text style={[styles.metricValue, { color: text }]}>{Math.max(0, surveys.length)}</Text>
            <Text style={[styles.metricLabel, { color: subtext }]}>Reports tracked</Text>
          </View>
        </View>
      </BlurView>

      <BlurView intensity={50} tint={tint} style={[styles.sectionCard, { backgroundColor: card, borderColor: cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: text }]}>Tips</Text>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-done-outline" size={18} color="#22c55e" />
          <Text style={[styles.tipText, { color: subtext }]}>Keep survey descriptions clear and concise.</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-done-outline" size={18} color="#22c55e" />
          <Text style={[styles.tipText, { color: subtext }]}>Use the camera section for field evidence photos.</Text>
        </View>
      </BlurView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  headerCard: { borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, marginBottom: 16, overflow: 'hidden' },
  avatar: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 26, fontWeight: '700' },
  headerText: { marginLeft: 16 },
  name: { fontSize: 22, fontWeight: '700' },
  role: { marginTop: 4, fontSize: 14 },
  sectionCard: { borderRadius: 20, padding: 18, borderWidth: 1, marginBottom: 16, overflow: 'hidden' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  sectionLabel: { fontSize: 13, marginTop: 10 },
  sectionValue: { marginTop: 4, fontSize: 15, lineHeight: 22 },
  metricRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  metricBox: { flex: 1, borderRadius: 16, padding: 16, minWidth: 120 },
  metricValue: { fontSize: 28, fontWeight: '700' },
  metricLabel: { marginTop: 6, fontSize: 13 },
  tipItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  tipText: { fontSize: 14, lineHeight: 20, flex: 1 },
});
