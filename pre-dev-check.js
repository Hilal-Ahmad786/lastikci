#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

let errors = [];
let warnings = [];
let passed = 0;
let total = 0;

function test(name, condition, errorMsg, isWarning = false) {
  total++;
  if (condition) {
    passed++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
    return true;
  } else {
    if (isWarning) {
      warnings.push(errorMsg);
      console.log(`${colors.yellow}⚠${colors.reset} ${name} ${colors.yellow}(WARNING)${colors.reset}`);
    } else {
      errors.push(errorMsg);
      console.log(`${colors.red}✗${colors.reset} ${name} ${colors.red}(FAILED)${colors.reset}`);
    }
    return false;
  }
}

function printHeader(text) {
  console.log(`\n${colors.blue}${'='.repeat(70)}${colors.reset}`);
  console.log(`${colors.blue}${text}${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(70)}${colors.reset}\n`);
}

function printSection(text) {
  console.log(`\n${colors.cyan}▶ ${text}${colors.reset}`);
}

function fileHasContent(filePath, requiredStrings = []) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.trim().length === 0) {
      return { hasContent: false, missingStrings: [] };
    }
    
    const missingStrings = requiredStrings.filter(str => !content.includes(str));
    return { hasContent: true, missingStrings };
  } catch (error) {
    return { hasContent: false, missingStrings: requiredStrings };
  }
}

function checkImportPaths(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /import .+ from ['"](@\/[^'"]+)['"]/g;
    const matches = [...content.matchAll(importRegex)];
    
    const brokenImports = [];
    
    for (const match of matches) {
      const importPath = match[1].replace('@/', 'src/');
      // Check both .js, .jsx extensions
      const possiblePaths = [
        `${importPath}.js`,
        `${importPath}.jsx`,
        `${importPath}/index.js`,
        `${importPath}/index.jsx`,
      ];
      
      const exists = possiblePaths.some(p => fs.existsSync(p));
      if (!exists) {
        brokenImports.push(match[1]);
      }
    }
    
    return brokenImports;
  } catch (error) {
    return [];
  }
}

console.clear();
printHeader('🚀 PRE-DEVELOPMENT READINESS CHECK');

// ============================================================
// 1. Check Node.js Version
// ============================================================
printSection('1. Node.js Environment');

const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
test(
  `Node.js version (${nodeVersion})`,
  majorVersion >= 18,
  `Node.js version must be 18 or higher. Current: ${nodeVersion}`
);

// ============================================================
// 2. Check Critical Files Exist and Have Content
// ============================================================
printSection('2. Critical Configuration Files');

const configFiles = [
  { file: 'package.json', required: ['next', 'react', 'react-dom'] },
  { file: 'next.config.js', required: ['nextConfig', 'module.exports'] },
  { file: 'tailwind.config.js', required: ['content', 'theme'] },
  { file: 'postcss.config.js', required: ['tailwindcss', 'autoprefixer'] },
];

configFiles.forEach(({ file, required }) => {
  const { hasContent, missingStrings } = fileHasContent(file, required);
  test(
    `${file} exists and has valid content`,
    hasContent && missingStrings.length === 0,
    `${file} is missing or invalid. Missing: ${missingStrings.join(', ')}`
  );
});

// ============================================================
// 3. Check App Files
// ============================================================
printSection('3. Next.js App Files');

const appFiles = [
  { file: 'src/app/layout.js', required: ['export default function', 'RootLayout'] },
  { file: 'src/app/page.js', required: ['export default function', "'use client'"] },
  { file: 'src/app/globals.css', required: ['@tailwind base', '@tailwind components'] },
];

appFiles.forEach(({ file, required }) => {
  const { hasContent, missingStrings } = fileHasContent(file, required);
  test(
    `${file} is valid`,
    hasContent && missingStrings.length === 0,
    `${file} is missing required content: ${missingStrings.join(', ')}`
  );
});

// ============================================================
// 4. Check Components
// ============================================================
printSection('4. Component Files');

const components = [
  'src/components/layout/Header.jsx',
  'src/components/layout/Footer.jsx',
  'src/components/layout/FloatingButtons.jsx',
  'src/components/sections/HeroSection.jsx',
  'src/components/sections/ServicesSection.jsx',
  'src/components/sections/CTASection.jsx',
  'src/components/sections/AboutSection.jsx',
  'src/components/sections/ContactSection.jsx',
  'src/components/shared/Analytics.jsx',
  'src/components/seo/JsonLd.jsx',
];

components.forEach(file => {
  const { hasContent } = fileHasContent(file, ['export default']);
  test(
    `${file.split('/').pop()}`,
    hasContent,
    `${file} is empty or missing export`
  );
});

// ============================================================
// 5. Check Hooks and Utils
// ============================================================
printSection('5. Hooks and Utilities');

const hooksAndUtils = [
  { file: 'src/hooks/useBotProtection.js', required: ['useEffect', 'export default'] },
  { file: 'src/utils/constants.js', required: ['export const', 'CONTACT_INFO'] },
  { file: 'src/utils/analytics.js', required: ['export', 'gtag'] },
];

hooksAndUtils.forEach(({ file, required }) => {
  const { hasContent, missingStrings } = fileHasContent(file, required);
  test(
    `${file.split('/').pop()}`,
    hasContent && missingStrings.length === 0,
    `${file} is missing: ${missingStrings.join(', ')}`
  );
});

// ============================================================
// 6. Check Import Paths
// ============================================================
printSection('6. Import Path Validation');

const filesToCheckImports = [
  'src/app/page.js',
  'src/app/layout.js',
];

let totalBrokenImports = 0;
filesToCheckImports.forEach(file => {
  const brokenImports = checkImportPaths(file);
  totalBrokenImports += brokenImports.length;
  
  if (brokenImports.length > 0) {
    test(
      `${file} - all imports resolved`,
      false,
      `Broken imports in ${file}: ${brokenImports.join(', ')}`
    );
    console.log(`  ${colors.red}Broken imports:${colors.reset}`);
    brokenImports.forEach(imp => console.log(`    - ${imp}`));
  } else if (fs.existsSync(file)) {
    test(
      `${file} - all imports resolved`,
      true,
      ''
    );
  }
});

// ============================================================
// 7. Check Dependencies
// ============================================================
printSection('7. Node Modules & Dependencies');

const nodeModulesExists = fs.existsSync('node_modules');
test(
  'node_modules folder exists',
  nodeModulesExists,
  'Run: npm install'
);

if (nodeModulesExists) {
  const criticalPackages = ['next', 'react', 'react-dom', 'lucide-react'];
  criticalPackages.forEach(pkg => {
    const exists = fs.existsSync(`node_modules/${pkg}`);
    test(
      `${pkg} installed`,
      exists,
      `Package ${pkg} not installed. Run: npm install`
    );
  });
}

// ============================================================
// 8. Check Environment Variables
// ============================================================
printSection('8. Environment Variables');

if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  
  const criticalVars = [
    'NEXT_PUBLIC_PHONE_NUMBER',
    'NEXT_PUBLIC_EMAIL',
  ];
  
  const optionalVars = [
    'NEXT_PUBLIC_GTM_ID',
    'NEXT_PUBLIC_GA_ID',
    'NEXT_PUBLIC_GOOGLE_ADS_ID',
  ];
  
  criticalVars.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`) && 
                   !envContent.includes(`${varName}=\n`) &&
                   !envContent.includes(`${varName}=$`);
    test(
      `${varName} configured`,
      hasVar,
      `${varName} must be configured in .env.local`
    );
  });
  
  optionalVars.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`) && 
                   !envContent.includes(`${varName}=\n`) &&
                   !envContent.includes(`${varName}=$`);
    test(
      `${varName} configured`,
      hasVar,
      `${varName} should be configured for analytics`,
      true // warning only
    );
  });
} else {
  test(
    '.env.local exists',
    false,
    '.env.local file not found'
  );
}

// ============================================================
// 9. Check Syntax Errors (Basic)
// ============================================================
printSection('9. Basic Syntax Check');

const jsFiles = [
  'src/app/page.js',
  'src/utils/constants.js',
];

jsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      // Basic syntax checks
      const hasUnclosedBrackets = (content.match(/\{/g) || []).length !== (content.match(/\}/g) || []).length;
      const hasUnclosedParens = (content.match(/\(/g) || []).length !== (content.match(/\)/g) || []).length;
      
      test(
        `${file} - no obvious syntax errors`,
        !hasUnclosedBrackets && !hasUnclosedParens,
        `${file} may have unclosed brackets or parentheses`
      );
    } catch (error) {
      test(
        `${file} - readable`,
        false,
        `Cannot read ${file}: ${error.message}`
      );
    }
  }
});

// ============================================================
// 10. Check Public Assets
// ============================================================
printSection('10. Public Assets');

test(
  'public/robots.txt exists',
  fs.existsSync('public/robots.txt'),
  'public/robots.txt not found',
  true
);

test(
  'public/sitemap.xml exists',
  fs.existsSync('public/sitemap.xml'),
  'public/sitemap.xml not found',
  true
);

test(
  'public/images folder exists',
  fs.existsSync('public/images'),
  'public/images folder not found',
  true
);

// ============================================================
// 11. Check .next folder (previous build artifacts)
// ============================================================
printSection('11. Build Cache');

if (fs.existsSync('.next')) {
  console.log(`${colors.yellow}⚠${colors.reset} .next folder exists (previous build cache)`);
  console.log(`  ${colors.cyan}Tip: Delete if you encounter issues: rm -rf .next${colors.reset}`);
}

// ============================================================
// SUMMARY
// ============================================================
printHeader('📊 READINESS SUMMARY');

const percentage = ((passed / total) * 100).toFixed(1);

console.log(`Total Checks: ${total}`);
console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
console.log(`${colors.red}Failed: ${errors.length}${colors.reset}`);
console.log(`${colors.yellow}Warnings: ${warnings.length}${colors.reset}`);
console.log(`\nSuccess Rate: ${percentage}%`);

// ============================================================
// ERRORS & WARNINGS
// ============================================================
if (errors.length > 0) {
  printHeader('❌ ERRORS (Must Fix)');
  errors.forEach((error, index) => {
    console.log(`${colors.red}${index + 1}. ${error}${colors.reset}`);
  });
}

if (warnings.length > 0) {
  printHeader('⚠️  WARNINGS (Should Fix)');
  warnings.forEach((warning, index) => {
    console.log(`${colors.yellow}${index + 1}. ${warning}${colors.reset}`);
  });
}

// ============================================================
// FINAL VERDICT
// ============================================================
printHeader('🎯 FINAL VERDICT');

if (errors.length === 0) {
  console.log(`${colors.green}✓ Your project is ready for development!${colors.reset}\n`);
  console.log(`${colors.cyan}Run the following command to start:${colors.reset}`);
  console.log(`${colors.green}npm run dev${colors.reset}\n`);
  
  if (warnings.length > 0) {
    console.log(`${colors.yellow}Note: There are ${warnings.length} warning(s) that should be addressed.${colors.reset}\n`);
  }
  
  process.exit(0);
} else {
  console.log(`${colors.red}✗ Project is NOT ready. Please fix the errors above.${colors.reset}\n`);
  console.log(`${colors.cyan}Common fixes:${colors.reset}`);
  console.log(`1. Run: npm install`);
  console.log(`2. Ensure all component files have proper exports`);
  console.log(`3. Configure .env.local with required values`);
  console.log(`4. Check that all imports point to existing files\n`);
  
  process.exit(1);
}