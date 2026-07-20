import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSurvey } from '@/components/survey-context';

export default function HistoryScreen() {
  const router = useRouter();
  const { surveys, deleteSurvey, submitSurvey } = useSurvey();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Survey History</Text>
        {surveys.length === 0 ? (
          <Text style={styles.emptyText}>No survey history yet.</Text>
        ) : (
          surveys.map((survey: any) => (
            <BlurView intensity={40} tint="light" key={survey.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.titleBlock}>
                  <Text style={styles.siteName}>{survey.siteName}</Text>
                  <Text style={styles.clientName}>{survey.clientName}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{survey.priority.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.description} numberOfLines={2}>{survey.description}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={14} color="#475569" />
                  <Text style={styles.metaText}>{survey.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={14} color="#475569" />
                  <Text style={styles.metaText}>{survey.location || 'No location'}</Text>
                </View>
              </View>
              <View style={styles.actionRow}>
                <Pressable style={styles.actionButton} onPress={() => router.push(`/survey-preview/${survey.id}` as never)}>
                  <Text style={styles.actionLabel}>Preview</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.submitButton]} onPress={() => submitSurvey(survey.id)}>
                  <Text style={[styles.actionLabel, styles.submitLabel]}>Submit</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={() => deleteSurvey(survey.id)}>
                  <Text style={[styles.actionLabel, styles.deleteLabel]}>Delete</Text>
                </Pressable>
              </View>
            </BlurView>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 16 },
  emptyText: { color: '#64748b', fontSize: 16, textAlign: 'center', marginTop: 40 },
  card: { backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  titleBlock: { flex: 1, paddingRight: 12 },
  siteName: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  clientName: { fontSize: 13, color: '#64748b', marginTop: 4 },
  tag: { backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  tagText: { color: '#0369a1', fontWeight: '700', fontSize: 12 },
  description: { color: '#475569', fontSize: 13, lineHeight: 20, marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginBottom: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: '#475569', fontSize: 12 },
  actionRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  actionButton: { flex: 1, minWidth: 100, backgroundColor: '#f8fafc', paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  actionLabel: { fontWeight: '700', color: '#0f172a' },
  submitButton: { backgroundColor: '#dcfce7', borderColor: '#86efac' },
  submitLabel: { color: '#166534' },
  deleteButton: { backgroundColor: '#fee2e2', borderColor: '#fecaca' },
  deleteLabel: { color: '#991b1b' },
  emptyCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  emptyText: { marginTop: 12, color: '#64748b', fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
