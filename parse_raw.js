const fs = require('fs');

function parseData(rawData) {
  const questions = [];
  
  // Extract sections
  const bioAnswersMatch = rawData.match(/Správne odpovede - Biológia([\s\S]*?)(?=Správne odpovede - Chémia|Zoznam otázok)/i);
  const chemAnswersMatch = rawData.match(/Správne odpovede - Chémia([\s\S]*?)(?=Zoznam otázok)/i);
  const bioQuestionsMatch = rawData.match(/Zoznam otázok z oblasti: LF - Biológia([\s\S]*?)(?=Zoznam otázok z oblasti: LF - Chémia|$)/i);
  const chemQuestionsMatch = rawData.match(/Zoznam otázok z oblasti: LF - Chémia([\s\S]*?)$/i);

  const bioAnswers = parseAnswers(bioAnswersMatch ? bioAnswersMatch[1] : '');
  const chemAnswers = parseAnswers(chemAnswersMatch ? chemAnswersMatch[1] : '');

  if (bioQuestionsMatch) {
    questions.push(...parseQuestions(bioQuestionsMatch[1], 'biology', bioAnswers));
  }
  if (chemQuestionsMatch) {
    questions.push(...parseQuestions(chemQuestionsMatch[1], 'chemistry', chemAnswers));
  }

  return questions;
}

function parseAnswers(text) {
  const answers = {};
  // Match number followed by letters (e.g., "1 C", "46 AB", "104 ABD")
  const regex = /(\d+)\s+([A-D]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    answers[match[1]] = match[2].split('');
  }
  return answers;
}

function parseQuestions(text, subject, answersMap) {
  const questions = [];
  // Split by question number (e.g., "1. ", "12. ")
  const parts = text.split(/(?=\n\d+\.\s)/);
  
  for (let part of parts) {
    part = part.trim();
    if (!part) continue;
    
    // Extract question number and text
    const qMatch = part.match(/^(\d+)\.\s+([\s\S]*?)(?=\nA\.)/);
    if (!qMatch) continue;
    
    const number = parseInt(qMatch[1]);
    const text = qMatch[2].replace(/\n/g, ' ').trim();
    
    // Extract options
    const options = [];
    const optRegex = /([A-D])\.\s+([\s\S]*?)(?=\n[A-D]\.|$)/g;
    let optMatch;
    while ((optMatch = optRegex.exec(part)) !== null) {
      options.push({
        id: optMatch[1],
        text: optMatch[2].replace(/\n/g, ' ').trim()
      });
    }
    
    if (options.length > 0) {
      questions.push({
        id: `${subject === 'biology' ? 'bio' : 'chem'}-${number}`,
        subject: subject,
        number: number,
        text: text,
        options: options,
        correctAnswers: answersMap[number] || []
      });
    }
  }
  return questions;
}

try {
  if (fs.existsSync('raw_data.txt')) {
    const rawData = fs.readFileSync('raw_data.txt', 'utf8');
    const questions = parseData(rawData);
    if (questions.length > 0) {
      fs.writeFileSync('./src/data/questions.json', JSON.stringify(questions, null, 2));
      console.log(`Successfully parsed and saved ${questions.length} questions!`);
    } else {
      console.log('No questions found. Please check the format of raw_data.txt');
    }
  } else {
    console.log('raw_data.txt not found. Please create it and paste the text.');
  }
} catch (e) {
  console.error('Error parsing data:', e);
}
