import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({});
