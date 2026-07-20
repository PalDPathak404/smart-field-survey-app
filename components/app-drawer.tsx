import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useDrawer } from './drawer-context';

const items = [
  { label: 'Dashboard', icon: 'home-outline' as const, path: '/' as const },
  { label: 'New Survey', icon: 'add-circle-outline' as const, path: '/create-survey' as const },
  { label: 'History', icon: 'time-outline' as const, path: '/history' as const },
  { label: 'Profile', icon: 'person-circle-outline' as const, path: '/profile' as const },
  { label: 'Camera', icon: 'camera-outline' as const, path: '/camera' as const },
  { label: 'Contacts', icon: 'people-outline' as const, path: '/contacts' as const },
  { label: 'Location', icon: 'location-outline' as const, path: '/location' as const },
  { label: 'Clipboard', icon: 'clipboard-outline' as const, path: '/clipboard' as const },
  { label: 'Settings', icon: 'settings-outline' as const, path: '/settings' as const },
];

export function AppDrawer() {
  const router = useRouter();
  const { open, setOpen } = useDrawer();

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path as never);
  };

  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
      <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
        <BlurView intensity={60} tint="light" style={styles.panelContainer}>
          <Pressable style={styles.panelInner} onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <Text style={styles.title}>Smart Field Survey</Text>
              <Pressable onPress={() => setOpen(false)} style={styles.closeBtn}>
                <Ionicons name="close-outline" size={22} color="#0f172a" />
              </Pressable>
            </View>
            <View style={styles.divider} />
            {items.map((item) => (
              <Pressable key={item.path} style={styles.item} onPress={() => navigateTo(item.path)}>
                <Ionicons name={item.icon} size={20} color="#0f172a" />
                <Text style={styles.itemText}>{item.label}</Text>
              </Pressable>
            ))}
          </Pressable>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-start',
  },
  panelContainer: {
    width: '78%',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.5)',
  },
  panelInner: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  itemText: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '600',
  },
});
