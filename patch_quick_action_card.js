const fs = require('fs');

const filePath = '/home/nine11/smart-field-survey-app/components/quick-action-card.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add import
content = content.replace(
  "import { Pressable, StyleSheet, Text, View } from 'react-native';",
  "import { Pressable, StyleSheet, Text, View } from 'react-native';\nimport { useColorScheme } from '@/hooks/use-color-scheme';"
);

// Add isDark and dynamicStyles
content = content.replace(
  "export function QuickActionCard({ title, subtitle, badge, accent, onPress }: QuickActionCardProps) {",
  "export function QuickActionCard({ title, subtitle, badge, accent, onPress }: QuickActionCardProps) {\n  const isDark = useColorScheme() === 'dark';\n  const dynamicStyles = getStyles(isDark);"
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
content = content.replace(/color="#64748b"/g, 'color={isDark ? "#94a3b8" : "#64748b"}');
content = content.replace(/tint="light"/g, 'tint={isDark ? "dark" : "light"}');

fs.writeFileSync(filePath, content);
console.log('patched quick action card');
