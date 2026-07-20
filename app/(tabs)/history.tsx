import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSurvey } from '@/components/survey-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HistoryScreen() {
  const router = useRouter();
  const { surveys, deleteSurvey, submitSurvey } = useSurvey();
  const isDark = useColorScheme() === 'dark';
  const text = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#475569';
  const tint = isDark ? 'dark' : 'light';
  const card = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: text }]}>Survey History</Text>
        {surveys.length === 0 ? (
          <BlurView intensity={50} tint={tint} style={[styles.emptyCard, { backgroundColor: card, borderColor: cardBorder }]}>
            <Ionicons name="document-text-outline" size={40} color={isDark ? '#475569' : '#94a3b8'} />
            <Text style={[styles.emptyText, { color: subtext }]}>No surveys yet. Create your first survey from the Dashboard.</Text>
          </BlurView>
        ) : (
          surveys.map((survey: any) => (
            <BlurView intensity={50} tint={tint} key={survey.id} style={[styles.card, { backgroundColor: card, borderColor: cardBorder }]}>
              <View style={styles.cardHeader}>
                <View style={styles.titleBlock}>
                  <Text style={[styles.siteName, { color: text }]}>{survey.siteName}</Text>
                  <Text style={[styles.clientName, { color: subtext }]}>{survey.clientName}</Text>
                </View>
                <View style={[styles.tag, {
                  backgroundColor: survey.priority === 'high'
                    ? (isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2')
                    : survey.priority === 'medium'
                    ? (isDark ? 'rgba(245,158,11,0.2)' : '#fef3c7')
                    : (isDark ? 'rgba(34,197,94,0.2)' : '#dcfce7')
                }]}>
                  <Text style={[styles.tagText, {
                    color: survey.priority === 'high' ? '#ef4444'
                      : survey.priority === 'medium' ? '#f59e0b'
                      : '#22c55e'
                  }]}>{survey.priority.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={[styles.description, { color: subtext }]} numberOfLines={2}>{survey.description}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={14} color={isDark ? '#64748b' : '#94a3b8'} />
                  <Text style={[styles.metaText, { color: subtext }]}>{survey.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={14} color={isDark ? '#64748b' : '#94a3b8'} />
                  <Text style={[styles.metaText, { color: subtext }]}>{survey.location || 'No location'}</Text>
                </View>
              </View>
              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.actionButton, { backgroundColor: isDark ? 'rgba(99,102,241,0.2)' : '#e0e7ff', borderColor: isDark ? 'rgba(99,102,241,0.4)' : '#c7d2fe' }]}
                  onPress={() => router.push(`/survey-preview/${survey.id}` as never)}>
                  <Text style={[styles.actionLabel, { color: isDark ? '#a5b4fc' : '#4338ca' }]}>Preview</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, { backgroundColor: isDark ? 'rgba(34,197,94,0.2)' : '#dcfce7', borderColor: isDark ? 'rgba(34,197,94,0.4)' : '#86efac' }]}
                  onPress={() => submitSurvey(survey.id)}>
                  <Text style={[styles.actionLabel, { color: '#22c55e' }]}>Submit</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, { backgroundColor: isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2', borderColor: isDark ? 'rgba(239,68,68,0.4)' : '#fecaca' }]}
                  onPress={() => deleteSurvey(survey.id)}>
                  <Text style={[styles.actionLabel, { color: '#ef4444' }]}>Delete</Text>
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
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  emptyCard: { borderRadius: 20, padding: 36, alignItems: 'center', gap: 12, borderWidth: 1, overflow: 'hidden' },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  card: { borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  titleBlock: { flex: 1, paddingRight: 12 },
  siteName: { fontSize: 16, fontWeight: '700' },
  clientName: { fontSize: 13, marginTop: 4 },
  tag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  tagText: { fontWeight: '700', fontSize: 12 },
  description: { fontSize: 13, lineHeight: 20, marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginBottom: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12 },
  actionRow: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1, paddingVertical: 12, borderRadius: 14, borderWidth: 1, alignItems: 'center' },
  actionLabel: { fontWeight: '700', fontSize: 13 },
});
