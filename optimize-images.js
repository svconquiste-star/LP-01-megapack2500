const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'img');

const files = fs.readdirSync(imgDir).filter(file => file.endsWith('.png'));

console.log(`Otimizando ${files.length} imagens...`);

files.forEach(file => {
  const inputPath = path.join(imgDir, file);
  const outputPath = path.join(imgDir, file.replace('.png', '.webp'));
  
  sharp(inputPath)
    .resize(1200, 900, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(info => {
      const originalSize = fs.statSync(inputPath).size;
      const newSize = info.size;
      const reduction = ((1 - newSize / originalSize) * 100).toFixed(2);
      console.log(`✓ ${file} → ${file.replace('.png', '.webp')} (${reduction}% menor)`);
    })
    .catch(err => {
      console.error(`✗ Erro ao otimizar ${file}:`, err);
    });
});
