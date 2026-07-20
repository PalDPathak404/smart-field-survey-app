import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DashboardHeader } from '@/components/dashboard-header';
import { QuickActionCard } from '@/components/quick-action-card';
import type { SurveyPriority } from '@/components/survey-context';
import { useSurvey } from '@/components/survey-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

const actions = [
  { title: 'New Survey', subtitle: 'Create a new field survey', badge: '01', accent: '#4f46e5' },
  { title: 'Capture Site Photo', subtitle: 'Log evidence from the field', badge: '02', accent: '#16a34a' },
  { title: 'Location', subtitle: 'Update current survey location', badge: '03', accent: '#d97706' },
  { title: 'Notes', subtitle: 'Edit survey notes in clipboard', badge: '04', accent: '#db2777' },
];

const priorityColors: Record<SurveyPriority, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

export default function DashboardScreen() {
  const router = useRouter();
  const { surveys, status, photoCount, activeContact, locationLabel, recentEvents, notes } = useSurvey();
  const isDark = useColorScheme() === 'dark';
  const card = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)';
  const text = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#475569';
  const tint = isDark ? 'dark' : 'light';

  const handleActionPress = (title: string) => {
    if (title === 'New Survey') router.push('/create-survey' as never);
    else if (title === 'Capture Site Photo') router.push('/camera' as never);
    else if (title === 'Location') router.push('/location' as never);
    else router.push('/clipboard' as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DashboardHeader title="Welcome back, Dk Kumar" subtitle="Smart field survey student" />

        <BlurView intensity={50} tint={tint} style={[styles.welcomeCard, { backgroundColor: card, borderColor: cardBorder }]}>
          <Text style={[styles.welcomeTitle, { color: text }]}>Good morning 👋</Text>
          <Text style={[styles.welcomeText, { color: subtext }]}>Here is your field survey dashboard for today.</Text>
          <View style={styles.summaryRowTop}>
            <View style={[styles.statBoxTop, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)' }]}>
              <Text style={[styles.statNumber, { color: text }]}>{surveys.length}</Text>
              <Text style={[styles.statLabel, { color: subtext }]}>Today's Surveys</Text>
            </View>
            <View style={[styles.statBoxTop, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)' }]}>
              <Text style={[styles.statNumber, { color: text }]}>{photoCount}</Text>
              <Text style={[styles.statLabel, { color: subtext }]}>Captured Photos</Text>
            </View>
          </View>
          <View style={styles.profileRow}>
            <View>
              <Text style={[styles.profileName, { color: text }]}>Dk Kumar</Text>
              <Text style={[styles.profileMeta, { color: subtext }]}>Student ID: 20240123</Text>
            </View>
            <View style={[styles.profileTag, { backgroundColor: isDark ? 'rgba(99,102,241,0.3)' : '#eff6ff' }]}>
              <Text style={[styles.profileTagText, { color: isDark ? '#a5b4fc' : '#4338ca' }]}>Field Inspector</Text>
            </View>
          </View>
        </BlurView>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {actions.map((action) => (
              <QuickActionCard key={action.title} {...action} onPress={() => handleActionPress(action.title)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text }]}>Survey Status</Text>
          <BlurView intensity={50} tint={tint} style={[styles.statusCard, { backgroundColor: card, borderColor: cardBorder }]}>
            <View style={styles.statusRow}>
              <Text style={[styles.statusTitle, { color: text }]}>Current Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: isDark ? 'rgba(99,102,241,0.3)' : '#e0e7ff' }]}>
                <Text style={{ color: isDark ? '#a5b4fc' : '#4338ca', fontWeight: '700', fontSize: 13 }}>{status}</Text>
              </View>
            </View>
            <Text style={[styles.statusBody, { color: subtext }]}>Latest note: {notes || 'No note saved yet.'}</Text>
          </BlurView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text }]}>Field Summary</Text>
          <View style={styles.cardRow}>
            <BlurView intensity={50} tint={tint} style={[styles.summaryTile, { backgroundColor: card, borderColor: cardBorder }]}>
              <Ionicons name="person-outline" size={18} color={isDark ? '#a5b4fc' : '#4338ca'} />
              <Text style={[styles.summaryNumber, { color: text }]}>{activeContact ? activeContact.split(' · ')[0] : '--'}</Text>
              <Text style={[styles.summaryLabel, { color: subtext }]}>Contact</Text>
            </BlurView>
            <BlurView intensity={50} tint={tint} style={[styles.summaryTile, { backgroundColor: card, borderColor: cardBorder }]}>
              <Ionicons name="location-outline" size={18} color={isDark ? '#34d399' : '#16a34a'} />
              <Text style={[styles.summaryNumber, { color: text }]}>{locationLabel || '--'}</Text>
              <Text style={[styles.summaryLabel, { color: subtext }]}>Location</Text>
            </BlurView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text }]}>Recent Activity</Text>
          {recentEvents.length > 0 ? (
            recentEvents.map((event) => (
              <BlurView intensity={50} tint={tint} key={event.id} style={[styles.eventRow, { backgroundColor: card, borderColor: cardBorder }]}>
                <View style={styles.eventDot} />
                <View style={styles.eventText}>
                  <Text style={[styles.eventTitle, { color: text }]}>{event.title}</Text>
                  <Text style={[styles.eventDetail, { color: subtext }]}>{event.detail}</Text>
                </View>
                <Text style={[styles.eventTime, { color: subtext }]}>{event.time}</Text>
              </BlurView>
            ))
          ) : (
            <BlurView intensity={50} tint={tint} style={[styles.emptyCard, { backgroundColor: card, borderColor: cardBorder }]}>
              <Ionicons name="document-text-outline" size={32} color={isDark ? '#64748b' : '#94a3b8'} />
              <Text style={[styles.emptyText, { color: subtext }]}>No activity yet. Start by creating a survey.</Text>
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
  welcomeCard: { borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, overflow: 'hidden' },
  welcomeTitle: { fontSize: 20, fontWeight: '700' },
  welcomeText: { marginTop: 6, fontSize: 14, lineHeight: 20 },
  summaryRowTop: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, gap: 12 },
  statBoxTop: { flex: 1, borderRadius: 18, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: '700' },
  statLabel: { marginTop: 4, fontSize: 13 },
  profileRow: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileName: { fontSize: 18, fontWeight: '700' },
  profileMeta: { fontSize: 13, marginTop: 2 },
  profileTag: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  profileTagText: { fontWeight: '700', fontSize: 13 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  actionsGrid: { marginTop: 4 },
  statusCard: { borderRadius: 20, padding: 18, borderWidth: 1, overflow: 'hidden' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusTitle: { fontSize: 16, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  statusBody: { fontSize: 14, lineHeight: 20 },
  cardRow: { flexDirection: 'row', gap: 12 },
  summaryTile: { flex: 1, borderRadius: 18, padding: 16, borderWidth: 1, overflow: 'hidden' },
  summaryNumber: { marginTop: 10, fontSize: 15, fontWeight: '700' },
  summaryLabel: { marginTop: 4, fontSize: 12 },
  eventRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 18, padding: 16, marginBottom: 10, borderWidth: 1, overflow: 'hidden' },
  eventDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#6366f1', marginRight: 12 },
  eventText: { flex: 1 },
  eventTitle: { fontWeight: '700', fontSize: 14 },
  eventDetail: { fontSize: 13, marginTop: 2 },
  eventTime: { fontSize: 12, fontWeight: '600' },
  emptyCard: { borderRadius: 16, padding: 24, alignItems: 'center', gap: 10, borderWidth: 1, overflow: 'hidden' },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
