import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';
import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSurvey } from '@/components/survey-context';

export default function LocationScreen() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const { recordLocationUpdate } = useSurvey();

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required to get coordinates.');
      return;
    }

    setLoading(true);
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const data = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy,
      };
      setCoords(data);
      const label = `Lat ${data.latitude.toFixed(6)} · Lon ${data.longitude.toFixed(6)}`;
      recordLocationUpdate(label);
    } catch {
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!coords) return;
    const text = `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Location coordinates copied to clipboard.');
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={40} tint="default" style={styles.card}>
        <Text style={styles.title}>Location</Text>
        <Text style={styles.subtitle}>
          {coords
            ? `Lat ${coords.latitude.toFixed(6)}`
            : 'Tap refresh to get current location'}
        </Text>
        <Text style={styles.subtitle}>
          {coords
            ? `Lon ${coords.longitude.toFixed(6)}`
            : ''}
        </Text>
        {coords?.accuracy != null && (
          <Text style={styles.accuracy}>
            Accuracy: ±{Math.round(coords.accuracy)}m
          </Text>
        )}
      </BlurView>

      <Pressable
        style={[styles.refreshBtn, loading && styles.btnDisabled]}
        onPress={fetchLocation}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.refreshBtnText}>Refresh Location</Text>
        )}
      </Pressable>

      {coords && (
        <Pressable style={styles.copyBtn} onPress={handleCopy}>
          <Text style={styles.copyBtnText}>Copy Coordinates</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#0f172a', lineHeight: 24, fontFamily: 'monospace' },
  accuracy: { marginTop: 8, fontSize: 14, color: '#1e293b', fontWeight: '600' },
  refreshBtn: { backgroundColor: '#f59e0b', paddingVertical: 14, borderRadius: 16, alignItems: 'center', marginBottom: 12 },
  refreshBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  copyBtn: { backgroundColor: '#0f172a', paddingVertical: 14, borderRadius: 16, alignItems: 'center' },
  copyBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  btnDisabled: { opacity: 0.6 },
});
