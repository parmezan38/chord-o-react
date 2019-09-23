import notes from './notes';

function newRandomRoot() {
  const index = Math.round(Math.random() * (notes.length - 1));
  return { note: notes[index], index };
}

function newRandomChord(chords) {
  const usedChords = [];
  chords.forEach(usedChord => {
    if (usedChord.used) usedChords.push(usedChord);
  });
  const randomNumForChord = Math.round(Math.random() * (usedChords.length - 1));
  return usedChords[randomNumForChord];
}

function notesFromChordPositions(newRoot, newChord) {
  const newNotes = { textNotes: [], keyNotes: [] };
  newChord.notes.forEach(pos => {
    const newTextPos = (pos + newRoot.index) % notes.length;
    const newKeyPos = pos + newRoot.index;
    newNotes.textNotes.push({index: newTextPos, name: notes[newTextPos]});
    newNotes.keyNotes.push({index: newKeyPos, name: notes[newKeyPos]});
  });
  return newNotes;
}

function createNotesString(newNotes) {
  let str = '';
  newNotes.textNotes.forEach(note => (str += note.name + ' '));
  return str;
}

export default function(chords) {
  const newRoot = newRandomRoot();
  const newChord = newRandomChord(chords);
  const newNotes = notesFromChordPositions(newRoot, newChord);
  return {
    newNotes,
    chordName: newRoot.note + ' ' + newChord.name,
    chordNotes: createNotesString(newNotes)
  };
}
