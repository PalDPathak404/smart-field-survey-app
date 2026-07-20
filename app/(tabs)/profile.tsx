import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSurvey } from '@/components/survey-context';

export default function ProfileScreen() {
  const { surveys, activeContact, locationLabel, notes } = useSurvey();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BlurView intensity={40} tint="light" style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AK</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>Aisha Khan</Text>
          <Text style={styles.role}>Field Survey Student</Text>
        </View>
      </BlurView>

      <BlurView intensity={40} tint="light" style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Profile Summary</Text>
        <Text style={styles.sectionLabel}>Preferred contact</Text>
        <Text style={styles.sectionValue}>{activeContact || 'Not selected yet'}</Text>
        <Text style={styles.sectionLabel}>Last known location</Text>
        <Text style={styles.sectionValue}>{locationLabel || 'No location recorded'}</Text>
        <Text style={styles.sectionLabel}>Draft notes</Text>
        <Text style={styles.sectionValue}>{notes || 'No notes saved'}</Text>
      </BlurView>

      <BlurView intensity={40} tint="light" style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Survey Performance</Text>
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{surveys.length}</Text>
            <Text style={styles.metricLabel}>Surveys created</Text>
          </View>
          <View style={styles.metricBox}> 
            <Text style={styles.metricValue}>{Math.max(0, surveys.length)}</Text>
            <Text style={styles.metricLabel}>Reports tracked</Text>
          </View>
        </View>
      </BlurView>

      <BlurView intensity={40} tint="light" style={styles.sectionCard}> 
        <Text style={styles.sectionTitle}>Tips</Text>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-done-outline" size={18} color="#16a34a" />
          <Text style={styles.tipText}>Keep survey descriptions clear and concise.</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-done-outline" size={18} color="#16a34a" />
          <Text style={styles.tipText}>Use the camera section for field evidence photos.</Text>
        </View>
      </BlurView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  headerCard: { backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', marginBottom: 16, overflow: 'hidden' },
  avatar: { width: 76, height: 76, borderRadius: 24, backgroundColor: 'rgba(199,210,254,0.8)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#312e81', fontSize: 28, fontWeight: '700' },
  headerText: { marginLeft: 16 },
  name: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  role: { marginTop: 4, color: '#1e293b', fontSize: 14 },
  sectionCard: { backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', marginBottom: 16, overflow: 'hidden' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  sectionLabel: { fontSize: 13, color: '#475569', marginTop: 12 },
  sectionValue: { marginTop: 6, fontSize: 15, color: '#0f172a', lineHeight: 22 },
  metricRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  metricBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 18, padding: 16, minWidth: 140 },
  metricValue: { fontSize: 28, fontWeight: '700', color: '#0f172a' },
  metricLabel: { marginTop: 6, color: '#475569', fontSize: 13 },
  tipItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  tipText: { color: '#1e293b', fontSize: 14, lineHeight: 20 },
});
