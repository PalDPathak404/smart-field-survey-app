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
  { title: 'New Survey', subtitle: 'Create a new field survey', badge: '01', accent: '#dbeafe' },
  { title: 'Capture Site Photo', subtitle: 'Log evidence from the field camera', badge: '02', accent: '#dcfce7' },
  { title: 'Location', subtitle: 'Update current survey location', badge: '03', accent: '#fef3c7' },
  { title: 'Notes', subtitle: 'Edit survey notes in clipboard', badge: '04', accent: '#fce7f3' },
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
  const dynamicStyles = getStyles(isDark);

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
    <View style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.content} showsVerticalScrollIndicator={false}>
        <DashboardHeader title="Welcome back, Aisha" subtitle="Smart field survey student" />

        <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.welcomeCard}>
          <Text style={dynamicStyles.welcomeTitle}>Good morning</Text>
          <Text style={dynamicStyles.welcomeText}>Here is your field survey dashboard for today.</Text>
          <View style={dynamicStyles.summaryRowTop}>
            <View style={dynamicStyles.statBoxTop}>
              <Text style={dynamicStyles.statNumber}>{surveys.length}</Text>
              <Text style={dynamicStyles.statLabel}>Today's Surveys</Text>
            </View>
            <View style={dynamicStyles.statBoxTop}>
              <Text style={dynamicStyles.statNumber}>{photoCount}</Text>
              <Text style={dynamicStyles.statLabel}>Captured Photos</Text>
            </View>
          </View>
          <View style={dynamicStyles.profileRow}>
            <View>
              <Text style={dynamicStyles.profileName}>Dk Kumar</Text>
              <Text style={dynamicStyles.profileMeta}>Student ID: 20240123</Text>
            </View>
            <View style={dynamicStyles.profileTag}>
              <Text style={dynamicStyles.profileTagText}>Field Inspector</Text>
            </View>
          </View>
        </BlurView>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Quick Actions</Text>
          <View style={dynamicStyles.actionsGrid}>
            {actions.map((action) => (
              <QuickActionCard key={action.title} {...action} onPress={() => handleActionPress(action.title)} />
            ))}
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Survey Status</Text>
          <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.statusCard}>
            <View style={dynamicStyles.statusRow}>
              <Text style={dynamicStyles.statusTitle}>Current Status</Text>
              <Text style={dynamicStyles.statusBadge}>{status}</Text>
            </View>
            <Text style={dynamicStyles.statusBody}>Latest note: {notes || 'No note saved yet.'}</Text>
          </BlurView>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Field Summary</Text>
          <View style={dynamicStyles.cardRow}>
            <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.summaryTile}>
              <Ionicons name="person-outline" size={18} color={isDark ? "#f8fafc" : "#0f172a"} />
              <Text style={dynamicStyles.summaryNumber}>{activeContact ? activeContact.split(' · ')[0] : '--'}</Text>
              <Text style={dynamicStyles.summaryLabel}>Contact</Text>
            </BlurView>
            <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.summaryTile}>
              <Ionicons name="location-outline" size={18} color={isDark ? "#f8fafc" : "#0f172a"} />
              <Text style={dynamicStyles.summaryNumber}>{locationLabel || '--'}</Text>
              <Text style={dynamicStyles.summaryLabel}>Location</Text>
            </BlurView>
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Recent Activity</Text>
          {recentEvents.length > 0 ? (
            recentEvents.map((event) => (
              <BlurView intensity={40} tint={isDark ? "dark" : "light"} key={event.id} style={dynamicStyles.eventRow}>
                <View style={dynamicStyles.eventDot} />
                <View style={dynamicStyles.eventText}>
                  <Text style={dynamicStyles.eventTitle}>{event.title}</Text>
                  <Text style={dynamicStyles.eventDetail}>{event.detail}</Text>
                </View>
                <Text style={dynamicStyles.eventTime}>{event.time}</Text>
              </BlurView>
            ))
          ) : (
            <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={dynamicStyles.emptyCard}>
              <Ionicons name="document-text-outline" size={32} color={isDark ? "#94a3b8" : "#64748b"} />
              <Text style={dynamicStyles.emptyText}>No activity yet. Start by creating a survey.</Text>
            </BlurView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
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
  welcomeTitle: { fontSize: 20, fontWeight: '700', color: isDark ? '#f8fafc' : '#0f172a' },
  welcomeText: { marginTop: 8, color: isDark ? '#e2e8f0' : '#1e293b', fontSize: 14, lineHeight: 20 },
  summaryRowTop: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, gap: 12 },
  statBoxTop: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 18, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: '700', color: isDark ? '#f8fafc' : '#0f172a' },
  statLabel: { marginTop: 4, color: isDark ? '#94a3b8' : '#64748b', fontSize: 13 },
  profileRow: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  profileName: { fontSize: 18, fontWeight: '700', color: isDark ? '#f8fafc' : '#0f172a' },
  profileMeta: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 13 },
  profileTag: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#eff6ff' },
  profileTagText: { color: isDark ? '#f8fafc' : '#0f172a', fontWeight: '700' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: isDark ? '#f8fafc' : '#0f172a', marginBottom: 12 },
  actionsGrid: { marginTop: 4 },
  statusCard: { backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusTitle: { fontSize: 16, fontWeight: '700', color: isDark ? '#f8fafc' : '#0f172a' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.6)', color: isDark ? '#f8fafc' : '#0f172a', fontWeight: '700', overflow: 'hidden' },
  statusBody: { color: isDark ? '#e2e8f0' : '#1e293b', fontSize: 14, lineHeight: 20 },
  cardRow: { flexDirection: 'row', gap: 12 },
  summaryTile: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  summaryNumber: { marginTop: 12, fontSize: 16, fontWeight: '700', color: isDark ? '#f8fafc' : '#0f172a' },
  summaryLabel: { marginTop: 4, color: isDark ? '#e2e8f0' : '#1e293b', fontSize: 12 },
  eventRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 18, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  eventDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2563eb', marginRight: 12 },
  eventText: { flex: 1 },
  eventTitle: { color: isDark ? '#f8fafc' : '#0f172a', fontWeight: '700', fontSize: 14 },
  eventDetail: { color: isDark ? '#e2e8f0' : '#1e293b', fontSize: 13, marginTop: 2 },
  eventTime: { color: '#475569', fontSize: 12, fontWeight: '700' },
  emptyCard: { backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 16, padding: 24, alignItems: 'center', gap: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  emptyText: { color: isDark ? '#e2e8f0' : '#1e293b', fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
