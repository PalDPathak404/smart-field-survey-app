const fs = require('fs');

const filePath = '/home/nine11/smart-field-survey-app/components/dashboard-header.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add import
content = content.replace(
  "import { Pressable, StyleSheet, Text, View } from 'react-native';",
  "import { Pressable, StyleSheet, Text, View } from 'react-native';\nimport { useColorScheme } from '@/hooks/use-color-scheme';"
);

// Add isDark and dynamicStyles
content = content.replace(
  "export function DashboardHeader({ title, subtitle, onMenuPress }: DashboardHeaderProps) {",
  "export function DashboardHeader({ title, subtitle, onMenuPress }: DashboardHeaderProps) {\n  const isDark = useColorScheme() === 'dark';\n  const dynamicStyles = getStyles(isDark);"
);

// Replace styles. with dynamicStyles.
content = content.replace(/styles\./g, "dynamicStyles.");

// Rename StyleSheet.create to getStyles function
content = content.replace(
  "const styles = StyleSheet.create({",
  "const getStyles = (isDark: boolean) => StyleSheet.create({"
);

// Replace hardcoded colors with ternary
content = content.replace(/color: '#0f172a'/g, "color: isDark ? '#f8fafc' : '#0f172a'");
content = content.replace(/color="#0f172a"/g, 'color={isDark ? "#f8fafc" : "#0f172a"}');
content = content.replace(/color: '#64748b'/g, "color: isDark ? '#94a3b8' : '#64748b'");
content = content.replace(/tint="light"/g, 'tint={isDark ? "dark" : "light"}');
content = content.replace(/backgroundColor: '#ecfeff'/g, "backgroundColor: isDark ? '#042f2e' : '#ecfeff'");
content = content.replace(/color: '#0f766e'/g, "color: isDark ? '#5eead4' : '#0f766e'");

fs.writeFileSync(filePath, content);
console.log('patched dashboard header');
