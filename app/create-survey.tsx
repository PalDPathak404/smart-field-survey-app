import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSurvey } from '@/components/survey-context';

type FieldName = 'siteName' | 'clientName' | 'description' | 'priority' | 'date';

type FormErrors = Partial<Record<FieldName, string>>;

export default function CreateSurveyScreen() {
  const { createSurvey } = useSurvey();
  const [siteName, setSiteName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!siteName.trim()) {
      newErrors.siteName = 'Site name is required';
    }
    if (!clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!priority) {
      newErrors.priority = 'Please select a priority level';
    }
    if (!date.trim()) {
      newErrors.date = 'Date is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      newErrors.date = 'Use YYYY-MM-DD format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const surveyId = createSurvey({
      siteName: siteName.trim(),
      clientName: clientName.trim(),
      description: description.trim(),
      priority: priority as 'low' | 'medium' | 'high',
      date: date.trim(),
    });

    setSiteName('');
    setClientName('');
    setDescription('');
    setPriority('');
    setDate('');
    setErrors({});

    Alert.alert('Survey Created', 'The survey has been created successfully.', [
      { text: 'Preview', onPress: () => router.push(`/survey-preview/${surveyId}` as never) },
      { text: 'Done', style: 'cancel' },
    ]);
  };

  const priorityOptions: { label: string; value: 'low' | 'medium' | 'high' }[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Create Survey</Text>
        <Text style={styles.subheading}>Fill in the details below to create a new field survey.</Text>

        <BlurView intensity={40} tint="default" style={styles.card}>
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Ionicons name="business-outline" size={16} color="#475569" />
              <Text style={styles.label}>Site Name *</Text>
            </View>
            <TextInput
              style={[styles.input, errors.siteName ? styles.inputError : null]}
              value={siteName}
              onChangeText={(t) => { setSiteName(t); if (errors.siteName) setErrors((e) => ({ ...e, siteName: undefined })); }}
              placeholder="e.g. North Field Station"
              placeholderTextColor="#94a3b8"
            />
            {errors.siteName ? <Text style={styles.errorText}>{errors.siteName}</Text> : null}
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Ionicons name="person-outline" size={16} color="#475569" />
              <Text style={styles.label}>Client Name *</Text>
            </View>
            <TextInput
              style={[styles.input, errors.clientName ? styles.inputError : null]}
              value={clientName}
              onChangeText={(t) => { setClientName(t); if (errors.clientName) setErrors((e) => ({ ...e, clientName: undefined })); }}
              placeholder="e.g. Acme Corp"
              placeholderTextColor="#94a3b8"
            />
            {errors.clientName ? <Text style={styles.errorText}>{errors.clientName}</Text> : null}
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Ionicons name="document-text-outline" size={16} color="#475569" />
              <Text style={styles.label}>Description *</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea, errors.description ? styles.inputError : null]}
              value={description}
              onChangeText={(t) => { setDescription(t); if (errors.description) setErrors((e) => ({ ...e, description: undefined })); }}
              placeholder="Describe the survey scope and objectives"
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Ionicons name="flag-outline" size={16} color="#475569" />
              <Text style={styles.label}>Priority *</Text>
            </View>
            <View style={styles.priorityRow}>
              {priorityOptions.map((opt) => (
                <Pressable
                  key={opt.value}
                  style={[
                    styles.priorityChip,
                    priority === opt.value ? styles.priorityChipActive : null,
                  ]}
                  onPress={() => { setPriority(opt.value); if (errors.priority) setErrors((e) => ({ ...e, priority: undefined })); }}
                >
                  <Text
                    style={[
                      styles.priorityChipText,
                      priority === opt.value ? styles.priorityChipTextActive : null,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            {errors.priority ? <Text style={styles.errorText}>{errors.priority}</Text> : null}
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Ionicons name="calendar-outline" size={16} color="#475569" />
              <Text style={styles.label}>Date *</Text>
            </View>
            <TextInput
              style={[styles.input, errors.date ? styles.inputError : null]}
              value={date}
              onChangeText={(t) => { setDate(t); if (errors.date) setErrors((e) => ({ ...e, date: undefined })); }}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94a3b8"
            />
            {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}
          </View>
        </BlurView>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="add-circle-outline" size={20} color="#ffffff" />
          <Text style={styles.submitButtonText}>Create Survey</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  field: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0f172a',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  textArea: {
    minHeight: 100,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
  },
  priorityChipActive: {
    borderColor: '#0f172a',
    backgroundColor: '#0f172a',
  },
  priorityChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  priorityChipTextActive: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
