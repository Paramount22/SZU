import fs from 'fs';

try {
  const data = fs.readFileSync('./src/data/questions.json', 'utf8');
  const questions = JSON.parse(data);
  console.log('Total questions:', questions.length);
  const bio = questions.filter(q => q.subject === 'biology');
  const chem = questions.filter(q => q.subject === 'chemistry');
  console.log('Biology:', bio.length);
  console.log('Chemistry:', chem.length);
} catch (e) {
  console.error('Error parsing JSON:', e.message);
}
