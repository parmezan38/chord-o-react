import { Howl, Howler } from 'howler';

export default function(key, volume) {
  const mp3 = require('../../assets/sounds/piano_' + key + '.mp3');
  const ogg = require('../../assets/sounds/piano_' + key + '.ogg');
  const sound = new Howl({ src: [mp3, ogg] });
  sound.play();
  // Change global volume.
  Howler.volume(volume);
}
