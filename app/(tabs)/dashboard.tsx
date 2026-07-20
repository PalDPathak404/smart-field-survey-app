import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/dashboard-header';
import { QuickActionCard } from '@/components/quick-action-card';
import { useSurvey } from '@/components/survey-context';

const actions = [
  { title: 'New Survey', subtitle: 'Create a new field survey', badge: '01', accent: '#dbeafe' },
  { title: 'Capture Site Photo', subtitle: 'Log evidence from the field camera', badge: '02', accent: '#dcfce7' },
  { title: 'Location', subtitle: 'Update current survey location', badge: '03', accent: '#fef3c7' },
  { title: 'Notes', subtitle: 'Edit survey notes in clipboard', badge: '04', accent: '#fce7f3' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { surveys, status, photoCount, activeContact, locationLabel, recentEvents, notes } = useSurvey();

  const handleActionPress = (title: string) => {
    if (title === 'New Survey') {
      router.push('/create-survey' as never);
    } else if (title === 'Capture Site Photo') {
      router.push('/camera' as never);
    } else if (title === 'Location') {
      router.push('/location' as never);
    } else {
      router.push('/clipboard' as never);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DashboardHeader title="Welcome back, Aisha" subtitle="Smart field survey student" />

        <BlurView intensity={40} tint="light" style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Good morning</Text>
          <Text style={styles.welcomeText}>Here is your field survey dashboard for today.</Text>
          <View style={styles.summaryRowTop}>
            <View style={styles.statBoxTop}>
              <Text style={styles.statNumber}>{surveys.length}</Text>
              <Text style={styles.statLabel}>{"Today's Surveys"}</Text>
            </View>
            <View style={styles.statBoxTop}>
              <Text style={styles.statNumber}>{photoCount}</Text>
              <Text style={styles.statLabel}>Captured Photos</Text>
            </View>
          </View>
          <View style={styles.profileRow}>
            <View>
              <Text style={styles.profileName}>Aisha Khan</Text>
              <Text style={styles.profileMeta}>Student ID: 20240123</Text>
            </View>
            <View style={styles.profileTag}>
              <Text style={styles.profileTagText}>Field Inspector</Text>
            </View>
          </View>
        </BlurView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {actions.map((action) => (
              <QuickActionCard key={action.title} {...action} onPress={() => handleActionPress(action.title)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Survey Status</Text>
          <BlurView intensity={40} tint="light" style={styles.statusCard}>
            <View style={styles.statusRow}>
              <Text style={styles.statusTitle}>Current Status</Text>
              <Text style={styles.statusBadge}>{status}</Text>
            </View>
            <Text style={styles.statusBody}>Latest note: {notes || 'No note saved yet.'}</Text>
          </BlurView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Field Summary</Text>
          <View style={styles.cardRow}>
            <BlurView intensity={40} tint="light" style={styles.summaryTile}>
              <Ionicons name="person-outline" size={18} color="#0f172a" />
              <Text style={styles.summaryNumber}>{activeContact ? activeContact.split(' · ')[0] : '--'}</Text>
              <Text style={styles.summaryLabel}>Contact</Text>
            </BlurView>
            <BlurView intensity={40} tint="light" style={styles.summaryTile}>
              <Ionicons name="location-outline" size={18} color="#0f172a" />
              <Text style={styles.summaryNumber}>{locationLabel || '--'}</Text>
              <Text style={styles.summaryLabel}>Location</Text>
            </BlurView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentEvents.length > 0 ? (
            recentEvents.map((event) => (
              <BlurView intensity={40} tint="light" key={event.id} style={styles.eventRow}>
                <View style={styles.eventDot} />
                <View style={styles.eventText}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDetail}>{event.detail}</Text>
                </View>
                <Text style={styles.eventTime}>{event.time}</Text>
              </BlurView>
            ))
          ) : (
            <BlurView intensity={40} tint="light" style={styles.emptyCard}>
              <Ionicons name="document-text-outline" size={32} color="#64748b" />
              <Text style={styles.emptyText}>No activity yet. Start by creating a survey.</Text>
            </BlurView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { paddingHorizontal: 20, paddingTop: 100, paddingBottom: 32 },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  },
  welcomeTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  welcomeText: { marginTop: 8, color: '#1e293b', fontSize: 14, lineHeight: 20 },
  summaryRowTop: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, gap: 12 },
  statBoxTop: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 18, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  statLabel: { marginTop: 4, color: '#64748b', fontSize: 13 },
  profileRow: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  profileMeta: { color: '#64748b', fontSize: 13 },
  profileTag: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#eff6ff' },
  profileTagText: { color: '#0f172a', fontWeight: '700' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  actionsGrid: { marginTop: 4 },
  statusCard: { backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.6)', color: '#0f172a', fontWeight: '700', overflow: 'hidden' },
  statusBody: { color: '#1e293b', fontSize: 14, lineHeight: 20 },
  cardRow: { flexDirection: 'row', gap: 12 },
  summaryTile: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  summaryNumber: { marginTop: 12, fontSize: 16, fontWeight: '700', color: '#0f172a' },
  summaryLabel: { marginTop: 4, color: '#1e293b', fontSize: 12 },
  eventRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 18, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  eventDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2563eb', marginRight: 12 },
  eventText: { flex: 1 },
  eventTitle: { color: '#0f172a', fontWeight: '700', fontSize: 14 },
  eventDetail: { color: '#1e293b', fontSize: 13, marginTop: 2 },
  eventTime: { color: '#475569', fontSize: 12, fontWeight: '700' },
  emptyCard: { backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 16, padding: 24, alignItems: 'center', gap: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  emptyText: { color: '#1e293b', fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
