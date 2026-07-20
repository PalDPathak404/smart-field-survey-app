import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useDrawer } from './drawer-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
  const isDark = useColorScheme() === 'dark';

  const text = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#475569';
  const tint = isDark ? 'dark' : 'light';
  const panelBg = isDark ? 'rgba(15,15,30,0.96)' : 'rgba(255,255,255,0.95)';
  const dividerColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const itemHoverBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)';

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path as never);
  };

  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
      <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
        <BlurView intensity={80} tint={tint} style={styles.panelContainer}>
          <Pressable style={[styles.panelInner, { backgroundColor: panelBg }]} onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <View>
                <Text style={[styles.title, { color: text }]}>Smart Field Survey</Text>
                <Text style={[styles.subtitle, { color: subtext }]}>Dk Kumar · Field Inspector</Text>
              </View>
              <Pressable onPress={() => setOpen(false)} style={[styles.closeBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', borderColor: dividerColor }]}>
                <Ionicons name="close-outline" size={22} color={text} />
              </Pressable>
            </View>

            <View style={[styles.divider, { backgroundColor: dividerColor }]} />

            {items.map((item) => (
              <Pressable key={item.path} style={({ pressed }) => [styles.item, pressed && { backgroundColor: itemHoverBg }]} onPress={() => navigateTo(item.path)}>
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)' }]}>
                  <Ionicons name={item.icon} size={18} color={isDark ? '#a5b4fc' : '#4338ca'} />
                </View>
                <Text style={[styles.itemText, { color: text }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={14} color={subtext} />
              </Pressable>
            ))}

            <View style={[styles.divider, { backgroundColor: dividerColor, marginTop: 8 }]} />
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: subtext }]}>v1.0.0 · Smart Field Survey App</Text>
            </View>
          </Pressable>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  panelContainer: {
    width: '78%',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  panelInner: {
    flex: 1,
    paddingTop: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  divider: {
    height: 1,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 0,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
  },
});
