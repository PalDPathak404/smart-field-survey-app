import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AppDrawer } from '@/components/app-drawer';
import { DrawerProvider } from '@/components/drawer-context';
import { SurveyProvider } from '@/components/survey-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

function ScreenBackground({ isDark }: { isDark: boolean }) {
  return (
    <LinearGradient
      colors={isDark ? ['#1e1b4b', '#312e81', '#1e1b4b'] : ['#c7d2fe', '#e0e7ff', '#f3e8ff']}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const headerBackground = () => (
    <BlurView tint={isDark ? 'dark' : 'light'} intensity={80} style={StyleSheet.absoluteFill} />
  );

  const commonScreenOptions = {
    headerShown: true,
    headerTransparent: true,
    headerBackground,
    headerTintColor: isDark ? '#ffffff' : '#1e1b4b',
    headerTitleStyle: { fontWeight: '700' as const, fontSize: 18 },
  };

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <SurveyProvider>
        <DrawerProvider>
          <Stack>
            {/* Main tab group */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Secondary screens — rendered as full Stack screens, not tabs */}
            <Stack.Screen
              name="camera"
              options={{
                ...commonScreenOptions,
                title: 'Camera',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="contacts"
              options={{
                ...commonScreenOptions,
                title: 'Contacts',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="location"
              options={{
                ...commonScreenOptions,
                title: 'Location',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="clipboard"
              options={{
                ...commonScreenOptions,
                title: 'Clipboard',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                ...commonScreenOptions,
                title: 'Settings',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="create-survey"
              options={{
                ...commonScreenOptions,
                title: 'New Survey',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="history"
              options={{
                ...commonScreenOptions,
                title: 'History',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="profile"
              options={{
                ...commonScreenOptions,
                title: 'Profile',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <AppDrawer />
        </DrawerProvider>
        <StatusBar style="auto" />
      </SurveyProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});
