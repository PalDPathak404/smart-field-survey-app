const fs = require('fs');

const filePath = '/home/nine11/smart-field-survey-app/app/(tabs)/dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add import
content = content.replace(
  "import { useSurvey } from '@/components/survey-context';",
  "import { useSurvey } from '@/components/survey-context';\nimport { useColorScheme } from '@/hooks/use-color-scheme';"
);

// Add isDark and dynamicStyles
content = content.replace(
  "const { surveys, status, photoCount, activeContact, locationLabel, recentEvents, notes } = useSurvey();",
  "const { surveys, status, photoCount, activeContact, locationLabel, recentEvents, notes } = useSurvey();\n  const isDark = useColorScheme() === 'dark';\n  const dynamicStyles = getStyles(isDark);"
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
content = content.replace(/color: '#1e293b'/g, "color: isDark ? '#e2e8f0' : '#1e293b'");
content = content.replace(/color: '#64748b'/g, "color: isDark ? '#94a3b8' : '#64748b'");
content = content.replace(/color="#0f172a"/g, 'color={isDark ? "#f8fafc" : "#0f172a"}');
content = content.replace(/color="#64748b"/g, 'color={isDark ? "#94a3b8" : "#64748b"}');

// Replace BlurView tint="light" with dynamic tint
content = content.replace(/tint="light"/g, 'tint={isDark ? "dark" : "light"}');

fs.writeFileSync(filePath, content);
console.log('patched dashboard');
