const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.css')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replacements
  content = content.replace(/bg-\[\#03070f\]/g, 'bg-white');
  content = content.replace(/bg-\[\#060d1a\]/g, 'bg-slate-50');
  content = content.replace(/bg-\[\#0a1628\]/g, 'bg-slate-100');
  content = content.replace(/bg-\[\#030810\]/g, 'bg-slate-50');
  
  content = content.replace(/text-white/g, 'text-slate-900');
  content = content.replace(/text-gray-300/g, 'text-slate-600');
  content = content.replace(/text-gray-400/g, 'text-slate-500');
  content = content.replace(/text-gray-500/g, 'text-slate-400');
  
  content = content.replace(/border-white\/5/g, 'border-black/5');
  content = content.replace(/border-white\/10/g, 'border-black/10');
  content = content.replace(/bg-white\/5/g, 'bg-black/5');
  content = content.replace(/bg-white\/10/g, 'bg-black/10');
  
  // Specific accent color updates based on logo
  content = content.replace(/cyan-400/g, 'blue-600'); // make primary accents royal blue
  content = content.replace(/cyan-300/g, 'blue-500');
  
  // For Hero
  content = content.replace(/from-\[\#03070f\]\/80 via-\[\#03070f\]\/60 to-\[\#03070f\]/g, 'from-white/90 via-white/70 to-white');
  content = content.replace(/from-\[\#03070f\]\/70 via-transparent to-\[\#03070f\]\/40/g, 'from-white/80 via-transparent to-white/50');
  content = content.replace(/from-\[\#03070f\] via-\[\#060d1a\] to-\[\#03070f\]/g, 'from-white via-slate-50 to-white');

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
console.log("Done replacing colors.");
