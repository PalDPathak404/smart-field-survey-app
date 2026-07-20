import { BlurView } from 'expo-blur';
import { ScreenWrapper } from '@/components/screen-wrapper';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
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
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length === 0) {
        Alert.alert('No Contacts', 'No contacts found on this device.');
      } else {
        setContacts(data);
      }
    } catch {
      Alert.alert('Error', 'Unable to load contacts right now.');
    } finally {
      setLoading(false);
    }
  };

  const selectContact = (contact: Contacts.Contact) => {
    const name = contact.name ?? 'Unknown';
    const phone = contact.phoneNumbers?.[0]?.number ?? 'No phone';
    const email = contact.emails?.[0]?.email;
    const nextContact = email
      ? `${name} · ${phone} · ${email}`
      : `${name} · ${phone}`;
    recordContactSelection(nextContact);
    Alert.alert('Contact Selected', nextContact);
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
          contacts.map((c) => (
            <Pressable key={c.id} onPress={() => selectContact(c)} style={{ marginBottom: 12 }}>
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
