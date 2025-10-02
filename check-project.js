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
};

// Required files and folders
const requiredStructure = {
  'Root Files': [
    'package.json',
    'next.config.js',
    '.env.local',
    'tailwind.config.js',
    'postcss.config.js',
    '.gitignore',
    'README.md'
  ],
  'Public Files': [
    'public/robots.txt',
    'public/sitemap.xml'
  ],
  'Public Images Folder': [
    'public/images'
  ],
  'App Files': [
    'src/app/layout.js',
    'src/app/page.js',
    'src/app/globals.css'
  ],
  'Components - Layout': [
    'src/components/layout/Header.jsx',
    'src/components/layout/Footer.jsx',
    'src/components/layout/FloatingButtons.jsx'
  ],
  'Components - Sections': [
    'src/components/sections/HeroSection.jsx',
    'src/components/sections/ServicesSection.jsx',
    'src/components/sections/CTASection.jsx',
    'src/components/sections/AboutSection.jsx',
    'src/components/sections/ContactSection.jsx'
  ],
  'Components - Shared & SEO': [
    'src/components/shared/Analytics.jsx',
    'src/components/seo/JsonLd.jsx'
  ],
  'Hooks': [
    'src/hooks/useBotProtection.js'
  ],
  'Utils': [
    'src/utils/constants.js',
    'src/utils/analytics.js'
  ]
};

const optionalImages = [
  'public/images/logo.png',
  'public/images/logo-white.png',
  'public/images/favicon.ico',
  'public/images/og-image.jpg',
  'public/images/hero-bg.jpg',
  'public/images/service-1.jpg',
  'public/images/service-2.jpg',
  'public/images/service-3.jpg',
  'public/images/service-4.jpg',
  'public/images/service-5.jpg'
];

function checkExists(filePath) {
  return fs.existsSync(filePath);
}

function isDirectory(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (error) {
    return false;
  }
}

function printHeader(text) {
  console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.blue}${text}${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
}

function printSection(text) {
  console.log(`\n${colors.magenta}${text}${colors.reset}`);
  console.log(`${colors.magenta}${'-'.repeat(text.length)}${colors.reset}`);
}

function checkFiles() {
  let totalFiles = 0;
  let missingFiles = 0;
  let missingFilesList = [];

  printHeader('📁 PROJECT STRUCTURE VERIFICATION');

  for (const [category, files] of Object.entries(requiredStructure)) {
    printSection(category);
    
    files.forEach(file => {
      totalFiles++;
      const exists = checkExists(file);
      const isDir = isDirectory(file);
      
      if (exists) {
        const type = isDir ? '📁' : '📄';
        console.log(`${colors.green}✓${colors.reset} ${type} ${file}`);
      } else {
        missingFiles++;
        missingFilesList.push(file);
        console.log(`${colors.red}✗${colors.reset} 📄 ${file} ${colors.red}(MISSING)${colors.reset}`);
      }
    });
  }

  // Check optional images
  printSection('Images (Optional)');
  let existingImages = 0;
  optionalImages.forEach(img => {
    if (checkExists(img)) {
      existingImages++;
      console.log(`${colors.green}✓${colors.reset} 🖼️  ${img}`);
    } else {
      console.log(`${colors.yellow}○${colors.reset} 🖼️  ${img} ${colors.yellow}(not added yet)${colors.reset}`);
    }
  });

  return { totalFiles, missingFiles, missingFilesList, existingImages };
}

function checkPackageJson() {
  printSection('Package.json Dependencies');
  
  if (!checkExists('package.json')) {
    console.log(`${colors.red}✗ package.json not found${colors.reset}`);
    return false;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = {
      'next': '14.1.0',
      'react': '18.2.0',
      'react-dom': '18.2.0',
      'lucide-react': '^0.316.0'
    };

    const requiredDevDeps = {
      'autoprefixer': '^10.4.17',
      'postcss': '^8.4.33',
      'tailwindcss': '^3.4.1'
    };

    let allDepsOk = true;

    for (const [dep, version] of Object.entries(requiredDeps)) {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        console.log(`${colors.green}✓${colors.reset} ${dep}@${packageJson.dependencies[dep]}`);
      } else {
        console.log(`${colors.red}✗${colors.reset} ${dep} ${colors.red}(MISSING)${colors.reset}`);
        allDepsOk = false;
      }
    }

    for (const [dep, version] of Object.entries(requiredDevDeps)) {
      if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
        console.log(`${colors.green}✓${colors.reset} ${dep}@${packageJson.devDependencies[dep]}`);
      } else {
        console.log(`${colors.red}✗${colors.reset} ${dep} ${colors.red}(MISSING)${colors.reset}`);
        allDepsOk = false;
      }
    }

    return allDepsOk;
  } catch (error) {
    console.log(`${colors.red}✗ Error reading package.json: ${error.message}${colors.reset}`);
    return false;
  }
}

function checkEnvFile() {
  printSection('Environment Variables');
  
  if (!checkExists('.env.local')) {
    console.log(`${colors.red}✗ .env.local not found${colors.reset}`);
    return false;
  }

  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const requiredVars = [
      'NEXT_PUBLIC_GTM_ID',
      'NEXT_PUBLIC_GA_ID',
      'NEXT_PUBLIC_GOOGLE_ADS_ID',
      'NEXT_PUBLIC_PHONE_NUMBER',
      'NEXT_PUBLIC_WHATSAPP_NUMBER',
      'NEXT_PUBLIC_EMAIL'
    ];

    let allVarsOk = true;

    requiredVars.forEach(varName => {
      if (envContent.includes(varName)) {
        const match = envContent.match(new RegExp(`${varName}=(.+)`));
        if (match && match[1] && match[1].trim() !== '') {
          const value = match[1].trim();
          // Mask the value for security
          const maskedValue = value.length > 10 ? value.substring(0, 10) + '...' : value;
          console.log(`${colors.green}✓${colors.reset} ${varName}=${maskedValue}`);
        } else {
          console.log(`${colors.yellow}○${colors.reset} ${varName} ${colors.yellow}(not configured)${colors.reset}`);
        }
      } else {
        console.log(`${colors.red}✗${colors.reset} ${varName} ${colors.red}(MISSING)${colors.reset}`);
        allVarsOk = false;
      }
    });

    return allVarsOk;
  } catch (error) {
    console.log(`${colors.red}✗ Error reading .env.local: ${error.message}${colors.reset}`);
    return false;
  }
}

function printSummary(results) {
  printHeader('📊 SUMMARY');

  const { totalFiles, missingFiles, existingImages } = results;
  const completionPercentage = ((totalFiles - missingFiles) / totalFiles * 100).toFixed(1);

  console.log(`Total Required Files: ${totalFiles}`);
  console.log(`${colors.green}Found: ${totalFiles - missingFiles}${colors.reset}`);
  console.log(`${colors.red}Missing: ${missingFiles}${colors.reset}`);
  console.log(`Images Added: ${existingImages}/${optionalImages.length}`);
  console.log(`\nCompletion: ${completionPercentage}%`);

  if (missingFiles === 0) {
    console.log(`\n${colors.green}✓ All required files are present!${colors.reset}`);
  } else {
    console.log(`\n${colors.red}✗ Some files are missing. See the list above.${colors.reset}`);
  }
}

function printFixInstructions(missingFilesList) {
  if (missingFilesList.length > 0) {
    printHeader('🔧 HOW TO FIX');
    
    console.log('Missing files need to be created. Here are the steps:\n');
    
    // Group by directory
    const byDirectory = {};
    missingFilesList.forEach(file => {
      const dir = path.dirname(file);
      if (!byDirectory[dir]) {
        byDirectory[dir] = [];
      }
      byDirectory[dir].push(path.basename(file));
    });

    console.log('1. Create missing directories:');
    Object.keys(byDirectory).forEach(dir => {
      console.log(`   mkdir -p ${dir}`);
    });

    console.log('\n2. Create missing files:');
    missingFilesList.forEach(file => {
      console.log(`   touch ${file}`);
    });

    console.log(`\n3. Copy the content for each file from the artifacts provided.\n`);
    console.log(`${colors.yellow}Note: Make sure to copy the EXACT content from each artifact file.${colors.reset}\n`);
  }
}

function checkNodeModules() {
  printSection('Node Modules');
  
  if (checkExists('node_modules')) {
    console.log(`${colors.green}✓${colors.reset} node_modules folder exists`);
    
    // Check if key packages are installed
    const keyPackages = ['next', 'react', 'react-dom', 'lucide-react'];
    let allInstalled = true;
    
    keyPackages.forEach(pkg => {
      if (checkExists(`node_modules/${pkg}`)) {
        console.log(`${colors.green}  ✓${colors.reset} ${pkg} installed`);
      } else {
        console.log(`${colors.red}  ✗${colors.reset} ${pkg} not installed`);
        allInstalled = false;
      }
    });
    
    return allInstalled;
  } else {
    console.log(`${colors.red}✗${colors.reset} node_modules folder not found`);
    console.log(`${colors.yellow}  Run: npm install${colors.reset}`);
    return false;
  }
}

// Main execution
console.clear();
const results = checkFiles();
const depsOk = checkPackageJson();
const envOk = checkEnvFile();
const nodeModulesOk = checkNodeModules();

printSummary(results);
printFixInstructions(results.missingFilesList);

printHeader('🚀 NEXT STEPS');

if (results.missingFiles > 0) {
  console.log(`${colors.red}1. Create all missing files listed above${colors.reset}`);
  console.log(`${colors.yellow}2. Copy content from artifacts to each file${colors.reset}`);
}

if (!nodeModulesOk) {
  console.log(`${colors.yellow}3. Run: npm install${colors.reset}`);
}

if (!envOk) {
  console.log(`${colors.yellow}4. Configure .env.local with your actual values${colors.reset}`);
}

if (results.existingImages === 0) {
  console.log(`${colors.yellow}5. Add your images to public/images/ folder${colors.reset}`);
}

if (results.missingFiles === 0 && nodeModulesOk) {
  console.log(`${colors.green}✓ Everything looks good! Run: npm run dev${colors.reset}`);
}

console.log('');

// Exit with appropriate code
process.exit(results.missingFiles > 0 ? 1 : 0);