import JSZip from 'jszip';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createThemePackage() {
  try {
    const zip = new JSZip();
    const themeFolder = zip.folder('voyage-deals');

    // List of theme files to include
    const files = [
      'style.css',
      'functions.php',
      'header.php',
      'footer.php',
      'index.php',
      'js/navigation.js',
      'template-parts/content.php',
      'template-parts/content-none.php'
    ];

    // Add each file to the zip
    for (const file of files) {
      try {
        const content = await readFile(join(__dirname, '../voyage-deals-theme', file), 'utf8');
        themeFolder.file(file, content);
      } catch (err) {
        console.error(`Error reading file ${file}:`, err);
      }
    }

    // Generate zip file
    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
    await writeFile(join(__dirname, '../voyage-deals.zip'), zipContent);

    console.log('Theme package created successfully!');
  } catch (err) {
    console.error('Error creating theme package:', err);
  }
}

createThemePackage();