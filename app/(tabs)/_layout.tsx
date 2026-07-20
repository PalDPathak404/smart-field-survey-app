import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { useDrawer } from '@/components/drawer-context';
import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

function MenuButton() {
  const { setOpen } = useDrawer();
  return (
    <Pressable onPress={() => setOpen(true)} style={styles.menuBtn}>
      <Ionicons name="menu-outline" size={22} color="#ffffff" />
    </Pressable>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={isDark ? ['#1e1b4b', '#312e81', '#1e1b4b'] : ['#c7d2fe', '#e0e7ff', '#f3e8ff']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Tabs
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerBackground: () => (
            <BlurView tint={isDark ? 'dark' : 'light'} intensity={80} style={StyleSheet.absoluteFill} />
          ),
          headerTintColor: isDark ? '#ffffff' : '#1e1b4b',
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          headerLeft: () => <MenuButton />,
          tabBarStyle: { display: 'none' },
          sceneStyle: { backgroundColor: 'transparent' },
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="create-survey"
          options={{
            title: 'New Survey',
            tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Camera',
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contacts',
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="location"
          options={{
            title: 'Location',
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="clipboard"
          options={{
            title: 'Clipboard',
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  menuBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
});
