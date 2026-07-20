import { BlurView } from 'expo-blur';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSurvey } from '@/components/survey-context';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [captureTime, setCaptureTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const { addPhoto, photos, removePhoto, recordPhotoCapture } = useSurvey();

  const handleCapture = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Denied', 'Camera access is required to capture photos.');
        return;
      }
    }

    setLoading(true);
    try {
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo?.uri) {
        const now = new Date();
        const timeStr = now.toLocaleString();
        setPreviewUri(photo.uri);
        setCaptureTime(timeStr);
        addPhoto({ uri: photo.uri, capturedAt: timeStr });
        recordPhotoCapture('Site photo captured');
      }
    } catch {
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setPreviewUri(null);
    setCaptureTime(null);
  };

  const handleDelete = (uri: string) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removePhoto(uri),
        },
      ],
    );
  };

  const toggleCameraType = () => {
    setCameraType((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlashMode = () => {
    setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.statusText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.statusText}>Camera access not granted.</Text>
        <Pressable style={styles.primaryBtn} onPress={requestPermission}>
          <Text style={styles.primaryBtnText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {previewUri ? (
        <View style={styles.previewSection}>
          <Image source={{ uri: previewUri }} style={styles.preview} resizeMode="cover" />
          {captureTime && (
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>Captured: {captureTime}</Text>
            </View>
          )}
          <View style={styles.actionRow}>
            <Pressable style={styles.outlineBtn} onPress={handleRetake}>
              <Text style={styles.outlineBtnText}>Retake</Text>
            </Pressable>
            <Pressable style={styles.dangerBtn} onPress={() => handleDelete(previewUri)}>
              <Text style={styles.dangerBtnText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.cameraSection}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={cameraType}
            enableTorch={flashMode === 'on'}
          />
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.loadingText}>Capturing photo...</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.controlsRow}>
        <Pressable style={styles.controlBtn} onPress={toggleCameraType}>
          <BlurView intensity={40} tint="default" style={styles.glassBtn}>
            <Text style={styles.controlText}>Flip</Text>
          </BlurView>
        </Pressable>
        <Pressable style={styles.controlBtn} onPress={toggleFlashMode}>
          <BlurView intensity={40} tint="default" style={styles.glassBtn}>
            <Text style={styles.controlText}>{flashMode === 'off' ? 'Flash Off' : 'Flash On'}</Text>
          </BlurView>
        </Pressable>
      </View>

      {!previewUri && (
        <Pressable style={[styles.captureBtn, loading && styles.captureBtnDisabled]} onPress={handleCapture} disabled={loading}>
          <View style={styles.captureInner} />
        </Pressable>
      )}

      {photos.length > 0 && (
        <View style={styles.gallerySection}>
          <Text style={styles.galleryTitle}>Captured Photos ({photos.length})</Text>
          <View style={styles.galleryGrid}>
            {photos.map((p) => (
              <View key={p.uri} style={styles.thumbWrap}>
                <Image source={{ uri: p.uri }} style={styles.thumb} />
                <Pressable style={styles.thumbDelete} onPress={() => handleDelete(p.uri)}>
                  <Text style={styles.thumbDeleteText}>x</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', padding: 20, gap: 16 },
  statusText: { fontSize: 15, color: '#64748b', textAlign: 'center' },
  primaryBtn: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 14 },
  primaryBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  cameraSection: { borderRadius: 24, overflow: 'hidden', backgroundColor: '#0f172a', minHeight: 420, justifyContent: 'flex-end', marginBottom: 20 },
  camera: { width: '100%', height: 420 },
  loadingOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  captureBtn: { width: 72, height: 72, borderRadius: 36, borderWidth: 4, borderColor: '#ffffff', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 24, backgroundColor: 'rgba(255,255,255,0.2)' },
  captureBtnDisabled: { opacity: 0.5 },
  captureInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'transparent' },
  previewSection: { borderRadius: 24, overflow: 'hidden', backgroundColor: 'transparent', marginBottom: 20 },
  preview: { width: '100%', height: 400 },
  timeBadge: { backgroundColor: '#0f172a', paddingVertical: 8, paddingHorizontal: 16, alignItems: 'center' },
  timeBadgeText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 12, padding: 16 },
  outlineBtn: { flex: 1, paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  outlineBtnText: { color: '#0f172a', fontWeight: '700', fontSize: 14 },
  dangerBtn: { flex: 1, paddingVertical: 12, borderRadius: 14, backgroundColor: '#fef2f2', alignItems: 'center' },
  dangerBtnText: { color: '#ef4444', fontWeight: '700', fontSize: 14 },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 20 },
  controlBtn: { flex: 1, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  glassBtn: { paddingVertical: 14, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)' },
  controlText: { color: '#0f172a', fontWeight: '700' },
  gallerySection: { marginTop: 8 },
  galleryTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  thumbWrap: { width: '30%', aspectRatio: 1, borderRadius: 12, overflow: 'hidden' },
  thumb: { width: '100%', height: '100%' },
  thumbDelete: { position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(239,68,68,0.9)', justifyContent: 'center', alignItems: 'center' },
  thumbDeleteText: { color: '#ffffff', fontSize: 12, fontWeight: '700' },
});
