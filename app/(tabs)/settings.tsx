import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BlurView intensity={40} tint="light" style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your field survey experience and review app details.</Text>
      </BlurView>
      <BlurView intensity={40} tint="light" style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.row}>
          <Ionicons name="color-palette-outline" size={20} color="#0f172a" />
          <Text style={styles.rowText}>Dark mode support is handled by the device theme.</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={20} color="#0f172a" />
          <Text style={styles.rowText}>Survey reminders and notes are saved in session state.</Text>
        </View>
      </BlurView>
      <BlurView intensity={40} tint="light" style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>About this App</Text>
        <Text style={styles.rowText}>Smart Field Survey helps you manage surveys, capture photos, choose contacts, and store location and clipboard details for your field assignment.</Text>
      </BlurView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  card: { backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', overflow: 'hidden' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { marginTop: 8, color: '#1e293b', lineHeight: 20 },
  sectionCard: { backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', overflow: 'hidden' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  rowText: { flex: 1, color: '#1e293b', fontSize: 14, lineHeight: 20 },
});
