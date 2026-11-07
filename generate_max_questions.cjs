const fs = require('fs');
const path = './src/data/questions.json';

let existingData = [];
try {
  existingData = JSON.parse(fs.readFileSync(path, 'utf8'));
} catch (e) {
  console.error(e);
}

// Keep only the real ones (1-45)
const realBio = existingData.filter(q => q.subject === 'biology' && q.number <= 45);
const realChem = existingData.filter(q => q.subject === 'chemistry' && q.number <= 45);

const newData = [...realBio, ...realChem];

const letters = ['A', 'B', 'C', 'D'];

// Generate Bio up to 750
for(let i = 46; i <= 750; i++) {
    const correctCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 correct answers
    const shuffledLetters = [...letters].sort(() => 0.5 - Math.random());
    const correctAnswers = shuffledLetters.slice(0, correctCount).sort();

    newData.push({
        id: `bio-${i}`,
        subject: 'biology',
        number: i,
        text: `[DOPLŇTE Z MATERIÁLOV] Otázka z biológie č. ${i}`,
        options: [
            { id: 'A', text: 'Doplniť možnosť A z materiálov' },
            { id: 'B', text: 'Doplniť možnosť B z materiálov' },
            { id: 'C', text: 'Doplniť možnosť C z materiálov' },
            { id: 'D', text: 'Doplniť možnosť D z materiálov' }
        ],
        correctAnswers: correctAnswers
    });
}

// Generate Chem up to 750
for(let i = 46; i <= 750; i++) {
    const correctCount = Math.floor(Math.random() * 2) + 1;
    const shuffledLetters = [...letters].sort(() => 0.5 - Math.random());
    const correctAnswers = shuffledLetters.slice(0, correctCount).sort();

    newData.push({
        id: `chem-${i}`,
        subject: 'chemistry',
        number: i,
        text: `[DOPLŇTE Z MATERIÁLOV] Otázka z chémie č. ${i}`,
        options: [
            { id: 'A', text: 'Doplniť možnosť A z materiálov' },
            { id: 'B', text: 'Doplniť možnosť B z materiálov' },
            { id: 'C', text: 'Doplniť možnosť C z materiálov' },
            { id: 'D', text: 'Doplniť možnosť D z materiálov' }
        ],
        correctAnswers: correctAnswers
    });
}

fs.writeFileSync(path, JSON.stringify(newData, null, 2));
console.log(`Generated ${newData.length} questions.`);
