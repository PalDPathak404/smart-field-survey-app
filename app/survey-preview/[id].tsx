import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSurvey } from '@/components/survey-context';

export default function SurveyPreviewScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { getSurveyById } = useSurvey();
  const survey = typeof params.id === 'string' ? getSurveyById(params.id) : undefined;

  if (!survey) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Survey not found</Text>
        <Text style={styles.emptySubtitle}>Return to history and select a valid survey.</Text>
        <Pressable style={styles.backButton} onPress={() => router.push('/history' as never)}>
          <Text style={styles.backButtonText}>Back to History</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>Survey Preview</Text>
        <Text style={styles.subtitle}>Review the survey details before submitting or updating.</Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Site name</Text>
        <Text style={styles.detailValue}>{survey.siteName}</Text>

        <Text style={styles.detailLabel}>Client</Text>
        <Text style={styles.detailValue}>{survey.clientName}</Text>

        <Text style={styles.detailLabel}>Description</Text>
        <Text style={styles.detailValue}>{survey.description}</Text>

        <Text style={styles.detailLabel}>Priority</Text>
        <Text style={styles.detailValue}>{survey.priority}</Text>

        <Text style={styles.detailLabel}>Date</Text>
        <Text style={styles.detailValue}>{survey.date}</Text>

        <Text style={styles.detailLabel}>Contact</Text>
        <Text style={styles.detailValue}>{survey.contact || 'Not selected'}</Text>

        <Text style={styles.detailLabel}>Location</Text>
        <Text style={styles.detailValue}>{survey.location || 'Not captured yet'}</Text>

        <Text style={styles.detailLabel}>Notes</Text>
        <Text style={styles.detailValue}>{survey.notes || 'No notes added'}</Text>

        <Text style={styles.detailLabel}>Photos</Text>
        <Text style={styles.detailValue}>{survey.photoCount}</Text>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={18} color="#0f172a" />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  headerCard: { backgroundColor: 'transparent', borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { marginTop: 8, color: '#64748b', lineHeight: 20 },
  detailCard: { backgroundColor: 'transparent', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  detailLabel: { marginTop: 12, fontSize: 13, fontWeight: '700', color: '#64748b' },
  detailValue: { marginTop: 6, fontSize: 16, color: '#0f172a', lineHeight: 22 },
  backButton: { marginTop: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#e2e8f0', paddingVertical: 14, borderRadius: 16 },
  backButtonText: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'transparent' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a', marginBottom: 10 },
  emptySubtitle: { textAlign: 'center', color: '#64748b', lineHeight: 20, marginBottom: 16 },
});
