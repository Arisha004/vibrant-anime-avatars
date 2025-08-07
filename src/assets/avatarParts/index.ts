
// Import avatar part images
import hairSpiky from '@/assets/hair-spiky.png';
import hairLong from '@/assets/hair-long.png';
import hairShort from '@/assets/hair-short.png';
import hairTwintails from '@/assets/hair-twintails.png';
import hairPunk from '@/assets/hair-punk.png';
import eyesRound from '@/assets/eyes-round.png';
import eyesCat from '@/assets/eyes-cat.png';
import eyesGentle from '@/assets/eyes-gentle.png';
import mouthSmile from '@/assets/mouth-smile.png';
import mouthConfident from '@/assets/mouth-confident.png';

// Hair Styles
export const hairStyles = [
  {
    id: 'h1',
    name: 'Spiky Anime',
    imageUrl: hairSpiky
  },
  {
    id: 'h2',
    name: 'Long Flowing',
    imageUrl: hairLong
  },
  {
    id: 'h3',
    name: 'Short Messy',
    imageUrl: hairShort
  },
  {
    id: 'h4',
    name: 'Twin Tails',
    imageUrl: hairTwintails
  },
  {
    id: 'h5',
    name: 'Punk Style',
    imageUrl: hairPunk
  }
];

// Eye Styles
export const eyeStyles = [
  {
    id: 'e1',
    name: 'Bright Round',
    imageUrl: eyesRound
  },
  {
    id: 'e2',
    name: 'Sharp Cat',
    imageUrl: eyesCat
  },
  {
    id: 'e3',
    name: 'Gentle',
    imageUrl: eyesGentle
  },
  {
    id: 'e4',
    name: 'Determined',
    imageUrl: eyesRound // Reusing round for now
  },
  {
    id: 'e5',
    name: 'Mysterious',
    imageUrl: eyesCat // Reusing cat for now
  }
];

// Mouth Styles
export const mouthStyles = [
  {
    id: 'm1',
    name: 'Sweet Smile',
    imageUrl: mouthSmile
  },
  {
    id: 'm2',
    name: 'Confident',
    imageUrl: mouthConfident
  },
  {
    id: 'm3',
    name: 'Cheerful',
    imageUrl: mouthSmile // Reusing smile for now
  },
  {
    id: 'm4',
    name: 'Pouty',
    imageUrl: mouthConfident // Reusing confident for now
  },
  {
    id: 'm5',
    name: 'Playful',
    imageUrl: mouthSmile // Reusing smile for now
  }
];

// Skin Tones
export const skinTones = [
  { id: 's1', color: '#FFDBAC', name: 'Light' },
  { id: 's2', color: '#F1C27D', name: 'Medium Light' },
  { id: 's3', color: '#E0AC69', name: 'Medium' },
  { id: 's4', color: '#C68642', name: 'Medium Dark' },
  { id: 's5', color: '#8D5524', name: 'Dark' },
  { id: 's6', color: '#5E3413', name: 'Very Dark' },
];

// Updated Sample Avatars with anime avatar images
export const sampleAvatars = [
  {
    id: 'avatar1',
    name: 'Sakura Spirit',
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/sakura-1.png',
    creator: 'AnimeArtist',
    likes: 342,
    views: 1542,
    comments: 89
  },
  {
    id: 'avatar2',
    name: 'Cyber Ninja',
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/neon-1.png',
    creator: 'DigitalDreamer',
    likes: 289,
    views: 1298,
    comments: 67
  },
  {
    id: 'avatar3',
    name: 'Moon Princess',
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/moon-1.png',
    creator: 'LunarArtist',
    likes: 267,
    views: 987,
    comments: 45
  },
  {
    id: 'avatar4',
    name: 'Dragon Knight',
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/celestial-1.png',
    creator: 'FantasyCreator',
    likes: 198,
    views: 856,
    comments: 34
  }
];
