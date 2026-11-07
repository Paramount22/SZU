const fs = require('fs');
const path = './src/data/questions.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newBio = [
  {
    "id": "bio-41",
    "subject": "biology",
    "number": 41,
    "text": "Pri katabolických dejoch sa energia v bunke:",
    "options": [
      { "id": "A", "text": "stráca" },
      { "id": "B", "text": "premieňa" },
      { "id": "C", "text": "spotrebúva" },
      { "id": "D", "text": "uvoľňuje" }
    ],
    "correctAnswers": ["D"]
  },
  {
    "id": "bio-42",
    "subject": "biology",
    "number": 42,
    "text": "Energia sa pri exergonických reakciách:",
    "options": [
      { "id": "A", "text": "uvoľňuje" },
      { "id": "B", "text": "spotrebúva" },
      { "id": "C", "text": "stráca" },
      { "id": "D", "text": "premieňa" }
    ],
    "correctAnswers": ["A"]
  },
  {
    "id": "bio-43",
    "subject": "biology",
    "number": 43,
    "text": "Energia sa pri endergonických reakciách:",
    "options": [
      { "id": "A", "text": "stráca" },
      { "id": "B", "text": "odbúrava" },
      { "id": "C", "text": "uvoľňuje" },
      { "id": "D", "text": "spotrebúva" }
    ],
    "correctAnswers": ["D"]
  },
  {
    "id": "bio-44",
    "subject": "biology",
    "number": 44,
    "text": "Dýchanie je príkladom na:",
    "options": [
      { "id": "A", "text": "katabolický proces" },
      { "id": "B", "text": "exergonickú reakciu" },
      { "id": "C", "text": "anabolický proces" },
      { "id": "D", "text": "endergonickú reakciu" }
    ],
    "correctAnswers": ["A", "B"]
  },
  {
    "id": "bio-45",
    "subject": "biology",
    "number": 45,
    "text": "Fotosyntéza je príkladom na:",
    "options": [
      { "id": "A", "text": "katabolický proces" },
      { "id": "B", "text": "exergonickú reakciu" },
      { "id": "C", "text": "anabolický proces" },
      { "id": "D", "text": "endergonickú reakciu" }
    ],
    "correctAnswers": ["C", "D"]
  }
];

const newChem = [
  {
    "id": "chem-41",
    "subject": "chemistry",
    "number": 41,
    "text": "V molekule kyseliny dichrómovej je počet atómov kyslíka:",
    "options": [
      { "id": "A", "text": "4" },
      { "id": "B", "text": "5" },
      { "id": "C", "text": "6" },
      { "id": "D", "text": "7" }
    ],
    "correctAnswers": ["D"]
  },
  {
    "id": "chem-42",
    "subject": "chemistry",
    "number": 42,
    "text": "Podľa kvantovo-mechanického modelu atómu:",
    "options": [
      { "id": "A", "text": "elektróny sa pohybujú okolo atómového jadra v určitom priestore, orbitále, s pravdepodobnosťou 95 až 99 %" },
      { "id": "B", "text": "kvantové čísla charakterizujú energiu a veľkosť jadra atómu (energia, stav, orientácia, rotácia)" },
      { "id": "C", "text": "elektróny sa pohybujú po kruhových dráhach ( Bohr, Rutherford )" },
      { "id": "D", "text": "elektróny sa pohybujú po kruhových dráhach s pravdepodobnosťou 95 až 99 % ( Bohr, Rutherford )" }
    ],
    "correctAnswers": ["A"]
  },
  {
    "id": "chem-43",
    "subject": "chemistry",
    "number": 43,
    "text": "Pre hlavné kvantové číslo platí:",
    "options": [
      { "id": "A", "text": "možno použiť na výpočet energie elektrónu v danej energetickej hladine" },
      { "id": "B", "text": "jeho hodnota je celé kladné číslo od 0 po 7" },
      { "id": "C", "text": "označujeme písmenami K, L, M, N, O, P, Q" },
      { "id": "D", "text": "teoreticky môže nadobúdať hodnoty celých kladných čísel od 1 po nekonečno" }
    ],
    "correctAnswers": ["A", "C", "D"]
  },
  {
    "id": "chem-44",
    "subject": "chemistry",
    "number": 44,
    "text": "Pre kvantové čísla platí:",
    "options": [
      { "id": "A", "text": "hlavné súhlasí s číslom hladiny elektrónov" },
      { "id": "B", "text": "hlavné má vplyv na veľkosť, vedľajšie na tvar hraničnej plochy orbitálov" },
      { "id": "C", "text": "vedľajšie určuje počet elektrónových vrstiev v atóme" },
      { "id": "D", "text": "magnetické určuje maximálny počet elektrónov vo valenčnej vrstve" }
    ],
    "correctAnswers": ["A", "B"]
  },
  {
    "id": "chem-45",
    "subject": "chemistry",
    "number": 45,
    "text": "Ak n = 3, potom platí, že:",
    "options": [
      { "id": "A", "text": "l môže mať tiež hodnotu 3" },
      { "id": "B", "text": "maximálny počet elektrónov v elektrónovom obale je 10" },
      { "id": "C", "text": "celkový počet elektrónov je 22" },
      { "id": "D", "text": "vedľajšie kvantové číslo má hodnotu 0, 1, 2" }
    ],
    "correctAnswers": ["D"]
  }
];

data.push(...newBio, ...newChem);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
