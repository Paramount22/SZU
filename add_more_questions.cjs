const fs = require('fs');
const path = './src/data/questions.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newBio = [
  {
    "id": "bio-457",
    "subject": "biology",
    "number": 457,
    "text": "Toto je ukážková otázka s vyšším číslom (457) z Biológie:",
    "options": [
      { "id": "A", "text": "Možnosť A" },
      { "id": "B", "text": "Možnosť B" },
      { "id": "C", "text": "Možnosť C" },
      { "id": "D", "text": "Možnosť D" }
    ],
    "correctAnswers": ["A"]
  },
  {
    "id": "bio-685",
    "subject": "biology",
    "number": 685,
    "text": "Toto je ukážková otázka s vyšším číslom (685) z Biológie:",
    "options": [
      { "id": "A", "text": "Možnosť A" },
      { "id": "B", "text": "Možnosť B" },
      { "id": "C", "text": "Možnosť C" },
      { "id": "D", "text": "Možnosť D" }
    ],
    "correctAnswers": ["B"]
  },
  {
    "id": "bio-1025",
    "subject": "biology",
    "number": 1025,
    "text": "Toto je ukážková otázka s vyšším číslom (1025) z Biológie:",
    "options": [
      { "id": "A", "text": "Možnosť A" },
      { "id": "B", "text": "Možnosť B" },
      { "id": "C", "text": "Možnosť C" },
      { "id": "D", "text": "Možnosť D" }
    ],
    "correctAnswers": ["C"]
  }
];

const newChem = [
  {
    "id": "chem-457",
    "subject": "chemistry",
    "number": 457,
    "text": "Toto je ukážková otázka s vyšším číslom (457) z Chémie:",
    "options": [
      { "id": "A", "text": "Možnosť A" },
      { "id": "B", "text": "Možnosť B" },
      { "id": "C", "text": "Možnosť C" },
      { "id": "D", "text": "Možnosť D" }
    ],
    "correctAnswers": ["A"]
  },
  {
    "id": "chem-685",
    "subject": "chemistry",
    "number": 685,
    "text": "Toto je ukážková otázka s vyšším číslom (685) z Chémie:",
    "options": [
      { "id": "A", "text": "Možnosť A" },
      { "id": "B", "text": "Možnosť B" },
      { "id": "C", "text": "Možnosť C" },
      { "id": "D", "text": "Možnosť D" }
    ],
    "correctAnswers": ["B"]
  },
  {
    "id": "chem-1025",
    "subject": "chemistry",
    "number": 1025,
    "text": "Toto je ukážková otázka s vyšším číslom (1025) z Chémie:",
    "options": [
      { "id": "A", "text": "Možnosť A" },
      { "id": "B", "text": "Možnosť B" },
      { "id": "C", "text": "Možnosť C" },
      { "id": "D", "text": "Možnosť D" }
    ],
    "correctAnswers": ["C"]
  }
];

data.push(...newBio, ...newChem);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
