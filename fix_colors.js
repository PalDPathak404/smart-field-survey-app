const fs = require('fs');
const path = require('path');

// Files that just need the BlurView tint fixed and static bg/color replaced
const filesToPatch = [
  'app/(tabs)/create-survey.tsx',
  'app/(tabs)/camera.tsx',
  'app/(tabs)/location.tsx',
  'app/(tabs)/contacts.tsx',
  'app/(tabs)/clipboard.tsx',
  'app/(tabs)/survey-preview/[id].tsx',
];

const useColorSchemeImport = `import { useColorScheme } from '@/hooks/use-color-scheme';`;

filesToPatch.forEach((relPath) => {
  const filePath = path.join('/home/nine11/smart-field-survey-app', relPath);
  if (!fs.existsSync(filePath)) {
    console.log('SKIP (not found):', relPath);
    return;
  }
  let c = fs.readFileSync(filePath, 'utf8');

  // Add useColorScheme import if not present
  if (!c.includes("use-color-scheme")) {
    c = c.replace(
      `import { useSurvey }`,
      `import { useColorScheme } from '@/hooks/use-color-scheme';\nimport { useSurvey }`
    );
    if (!c.includes("use-color-scheme")) {
      // Try to inject after last import
      c = c.replace(
        /^(import .+;\n)(?!import)/m,
        (match) => match + useColorSchemeImport + '\n'
      );
    }
  }

  // Fix static container backgrounds
  c = c.replace(/backgroundColor: '#f8fafc'/g, "backgroundColor: 'transparent'");
  c = c.replace(/backgroundColor: '#ffffff'/g, "backgroundColor: 'transparent'");
  c = c.replace(/backgroundColor: '#f1f5f9'/g, "backgroundColor: 'transparent'");

  // Fix hardcoded light tint
  c = c.replace(/tint="light"/g, 'tint="default"');

  // Fix hardcoded BlurView bg
  c = c.replace(/backgroundColor: 'rgba\(255,255,255,0\.4\)'/g, "backgroundColor: 'rgba(255,255,255,0.55)'");

  fs.writeFileSync(filePath, c);
  console.log('PATCHED:', relPath);
});
