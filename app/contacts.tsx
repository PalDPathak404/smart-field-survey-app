import { BlurView } from 'expo-blur';
import { ScreenWrapper } from '../components/screen-wrapper';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { useSurvey } from '@/components/survey-context';

export default function ContactsScreen() {
  const { activeContact, recordContactSelection } = useSurvey();
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Contact access is required to load contacts.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });
      setContacts(data);
    } catch {
      Alert.alert('Error', 'Failed to load contacts.');
    } finally {
      setLoading(false);
    }
  };

  const selectContact = (c: Contacts.Contact) => {
    recordContactSelection(`${c.name || 'Unknown'} · ${c.phoneNumbers?.[0]?.number || ''}`);
  };

  return (
    <ScreenWrapper>
      <BlurView intensity={40} tint="default" style={styles.card}>
        <Text style={styles.title}>Field Contacts</Text>
        <Text style={styles.subtitle}>
          {activeContact || 'No contact selected yet.'}
        </Text>
      </BlurView>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {contacts.length === 0 ? (
          <Pressable style={styles.button} onPress={handleLoad} disabled={loading}>
            {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Load Contacts</Text>}
          </Pressable>
        ) : (
          contacts.map((c, idx) => (
            <Pressable key={c.id || `${idx}`} onPress={() => selectContact(c)} style={{ marginBottom: 12 }}>
              <BlurView intensity={30} tint="default" style={styles.contactItem}>
                <Text style={styles.contactName}>{c.name || 'Unknown'}</Text>
                <Text style={styles.contactDetail}>
                  {c.phoneNumbers?.[0]?.number || 'No phone'}
                </Text>
              </BlurView>
            </Pressable>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { marginTop: 8, color: '#1e293b', lineHeight: 20 },
  list: { flex: 1 },
  listContent: { paddingBottom: 40 },
  button: { backgroundColor: '#0f172a', paddingVertical: 14, borderRadius: 16, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#ffffff', fontWeight: '700' },
  contactItem: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  contactName: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  contactDetail: { fontSize: 14, color: '#1e293b', marginTop: 4 },
});
