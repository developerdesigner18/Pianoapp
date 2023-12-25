import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import SoundfontProvider from './SoundfontProvider';

const PianoPlay = () => {
  const noteRange = {
    first: MidiNumbers.fromNote('a0'),
    last: MidiNumbers.fromNote('c8'),
  };

  const WHOLE_ROW = [
  { natural: 'q', flat: '0', sharp: '!' },
  { natural: 'w', flat: '2', sharp: '1' },
  { natural: 'e', flat: null, sharp: '2' },
  { natural: 'r', flat: '4', sharp: '3' },
  { natural: 't', flat: '5', sharp: '4' },
  { natural: 'y', flat: null, sharp: '5' },
  { natural: 'u', flat: '7', sharp: '6' },
  { natural: 'i', flat: '8', sharp: '7' },
  { natural: 'o', flat: '9', sharp: '8' },
  { natural: 'p', flat: '-', sharp: '9' },
  { natural: '[', flat: '-', sharp: '0' },
  { natural: ']', flat: "=", sharp: '-' },
  { natural: '\\', flat: null, sharp: '=' },
  { natural: 'a', flat: '`', sharp: '2' },
  { natural: 's', flat: '1', sharp: 'd' },
  { natural: 'd', flat: '3', sharp: '4' },
  { natural: 'f', flat: 'f', sharp: '5' },
  { natural: 'g', flat: '6', sharp: 'h' },
  { natural: 'h', flat: '0', sharp: '7' },
  { natural: 'j', flat: 'j', sharp: '8' },
  { natural: 'k', flat: ',', sharp: '9' },
  { natural: 'l', flat: '=', sharp: ';' },
  { natural: ';', flat: '?', sharp: '-' },
  { natural: '\'', flat: 'q', sharp: '=' },
  { natural: 'z', flat: '/', sharp: 'e' },
  { natural: 'x', flat: '*', sharp: 'r' },
  { natural: 'c', flat: 'r', sharp: 't' },
  { natural: 'v', flat: '-', sharp: 'y' },
  { natural: 'b', flat: '+', sharp: 'u' },
  { natural: 'n', flat: '.', sharp: 'i' },
  { natural: 'm', flat: 'i', sharp: 'o' },
  { natural: 'Tab', flat: 'o', sharp: 'p' },
  { natural: 'Delete', flat: 'p', sharp: '[' },
  { natural: 'End', flat: '[', sharp: ']' },
  { natural: 'Enter', flat: ']', sharp: ';' },
  { natural: 'Home', flat: 'q', sharp: '=' },
  { natural: "Insert", flat: '1', sharp: '2' },
  { natural: 'NumLock', flat: '2', sharp: '3' },
  { natural: 'Alt', flat: '3', sharp: '4' },
  { natural: 'q', flat: '0', sharp: '!' },
  { natural: 'w', flat: '2', sharp: '1' },
  { natural: 'e', flat: '2', sharp: '2' },
  { natural: 'r', flat: '4', sharp: '3' },
  { natural: 't', flat: '5', sharp: '4' },
  { natural: 'y', flat: null, sharp: '5' },
  { natural: 'u', flat: '7', sharp: '6' },
  { natural: 'i', flat: '8', sharp: '7' },
  { natural: 'o', flat: '9', sharp: '8' },
  { natural: 'p', flat: '-', sharp: '9' },
  { natural: '[', flat: '+', sharp: '0' },
  { natural: ']', flat: "=", sharp: '-' },
  { natural: '\\', flat: null, sharp: '=' },
  ];

console.log(noteRange.first, '--', noteRange.last);
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: WHOLE_ROW,
  });

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';
  return (  

    <div >
       <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <Piano
          noteRange={noteRange}
          width={1000}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading}
          keyboardShortcuts={keyboardShortcuts}
        />
      )}
    />
</div>

  );
}

export default PianoPlay;
