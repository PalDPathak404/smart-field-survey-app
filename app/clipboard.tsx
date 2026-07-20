import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useSurvey } from '@/components/survey-context';

export default function ClipboardScreen() {
  const {
    notes,
    activeContact,
    locationLabel,
    clipboardSurveyId,
    saveNote,
    clearClipboard,
    setClipboardSurveyId,
    setClipboardContact,
    setClipboardLocation,
  } = useSurvey();
  const [value, setValue] = useState(notes);

  useEffect(() => {
    setValue(notes);
  }, [notes]);

  const handleCopy = async (text: string, label: string, setter: (value: string) => void) => {
    if (!text) {
      Alert.alert('Nothing to copy', `No ${label.toLowerCase()} is available yet.`);
      return;
    }

    await Clipboard.setStringAsync(text);
    setter(text);
    Alert.alert('Copied', `${label} copied to clipboard.`);
  };

  const handlePasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    setValue(text);
    saveNote(text);
    Alert.alert('Pasted', 'Text pasted into notes.');
  };

  const handleSaveNotes = () => {
    saveNote(value);
    Alert.alert('Saved', 'Notes saved to survey state.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <BlurView intensity={40} tint="default" style={styles.card}>
        <Text style={styles.title}>Clipboard Manager</Text>
        <Text style={styles.subtitle}>Copy survey fields, paste notes, and clear clipboard memory.</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Survey ID</Text>
            <Text style={styles.summaryValue}>{clipboardSurveyId || 'None'}</Text>
          </View>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Contact</Text>
            <Text style={styles.summaryValue}>{activeContact || 'None'}</Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Location</Text>
            <Text style={styles.summaryValue}>{locationLabel || 'None'}</Text>
          </View>
        </View>
      </BlurView>

      <View style={styles.buttonsRow}>
        <Pressable
          style={styles.copyButton}
          onPress={() => handleCopy(clipboardSurveyId, 'Survey ID', setClipboardSurveyId)}
        >
          <Text style={styles.copyButtonText}>Copy Survey ID</Text>
        </Pressable>
        <Pressable
          style={styles.copyButton}
          onPress={() => handleCopy(activeContact.split(' · ')[1] ?? '', 'Contact number', setClipboardContact)}
        >
          <Text style={styles.copyButtonText}>Copy Contact</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.copyButton}
        onPress={() => handleCopy(locationLabel, 'Location', setClipboardLocation)}
      >
        <Text style={styles.copyButtonText}>Copy Location</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Notes</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Paste or type survey notes"
        placeholderTextColor="#94a3b8"
        multiline
        style={styles.input}
      />

      <View style={styles.actionsRow}>
        <Pressable style={styles.primaryButton} onPress={handlePasteNotes}>
          <Text style={styles.primaryText}>Paste Notes</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={handleSaveNotes}>
          <Text style={styles.primaryText}>Save Notes</Text>
        </Pressable>
      </View>
      <Pressable style={styles.clearButton} onPress={clearClipboard}>
        <Text style={styles.clearText}>Clear Clipboard Data</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  card: { backgroundColor: 'rgba(255,255,255,0.55)', borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', overflow: 'hidden' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { marginTop: 8, color: '#1e293b', lineHeight: 20 },
  summaryRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginTop: 16 },
  summaryBlock: { flex: 1, minWidth: 140, backgroundColor: 'rgba(255,255,255,0.5)', padding: 12, borderRadius: 16 },
  summaryLabel: { fontSize: 12, color: '#475569', fontWeight: '700' },
  summaryValue: { marginTop: 6, fontSize: 14, color: '#0f172a' },
  buttonsRow: { flexDirection: 'row', gap: 12, marginBottom: 12, flexWrap: 'wrap' },
  copyButton: { flex: 1, minWidth: 140, backgroundColor: 'rgba(255,255,255,0.6)', paddingVertical: 14, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' },
  copyButtonText: { color: '#0f172a', fontWeight: '700', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 12, marginTop: 10 },
  input: { minHeight: 140, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', padding: 14, textAlignVertical: 'top', color: '#0f172a' },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  primaryButton: { flex: 1, backgroundColor: '#2563eb', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  primaryText: { color: '#ffffff', fontWeight: '700' },
  clearButton: { marginTop: 16, backgroundColor: 'rgba(255,255,255,0.5)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  clearText: { color: '#ef4444', fontWeight: '700' },
});
