import { useState } from 'react';

const signList = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const emojis = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

const colorSets: Record<string, {name:string; hex:string; meaning:string}[]> = {
  Aries: [{name:'Ruby Red',hex:'#E63946',meaning:'passion & courage'},{name:'Burnt Orange',hex:'#F4845F',meaning:'creativity & energy'},{name:'Gold',hex:'#FFD700',meaning:'confidence & success'},{name:'Scarlet',hex:'#FF2400',meaning:'determination'},{name:'Coral',hex:'#FF7F50',meaning:'enthusiasm'},{name:'Crimson',hex:'#DC143C',meaning:'bold action'},{name:'Amber',hex:'#FFBF00',meaning:'warmth'}],
  Taurus: [{name:'Forest Green',hex:'#228B22',meaning:'growth & stability'},{name:'Rose Pink',hex:'#FF007F',meaning:'love & beauty'},{name:'Copper',hex:'#B87333',meaning:'grounding & warmth'},{name:'Sage',hex:'#BCB88A',meaning:'wisdom'},{name:'Dusty Rose',hex:'#DCAE96',meaning:'tenderness'},{name:'Emerald',hex:'#50C878',meaning:'abundance'},{name:'Taupe',hex:'#483C32',meaning:'reliability'}],
  Gemini: [{name:'Bright Yellow',hex:'#FFE135',meaning:'intellect & joy'},{name:'Electric Blue',hex:'#7DF9FF',meaning:'communication'},{name:'Mint',hex:'#98FF98',meaning:'freshness & wit'},{name:'Lavender',hex:'#E6E6FA',meaning:'balance'},{name:'Tangerine',hex:'#FF9966',meaning:'playfulness'},{name:'Sky Blue',hex:'#87CEEB',meaning:'freedom'},{name:'Lime',hex:'#32CD32',meaning:'vitality'}],
  Cancer: [{name:'Silver',hex:'#C0C0C0',meaning:'intuition & reflection'},{name:'Pearl White',hex:'#F0EAD6',meaning:'purity & calm'},{name:'Moonstone Blue',hex:'#73A9C2',meaning:'emotional depth'},{name:'Seafoam',hex:'#93E9BE',meaning:'healing'},{name:'Cream',hex:'#FFFDD0',meaning:'comfort'},{name:'Pale Blue',hex:'#AFEEEE',meaning:'serenity'},{name:'Opal',hex:'#A8C3BC',meaning:'protection'}],
  Leo: [{name:'Sunflower Gold',hex:'#FFDA03',meaning:'royalty & power'},{name:'Orange',hex:'#FF8C00',meaning:'enthusiasm & warmth'},{name:'Purple',hex:'#800080',meaning:'nobility & luxury'},{name:'Marigold',hex:'#EAA221',meaning:'radiance'},{name:'Hot Pink',hex:'#FF69B4',meaning:'glamour'},{name:'Bronze',hex:'#CD7F32',meaning:'strength'},{name:'Champagne',hex:'#F7E7CE',meaning:'celebration'}],
  Virgo: [{name:'Navy',hex:'#000080',meaning:'precision & trust'},{name:'Tan',hex:'#D2B48C',meaning:'practicality'},{name:'Moss Green',hex:'#8A9A5B',meaning:'nature & health'},{name:'Wheat',hex:'#F5DEB3',meaning:'harvest'},{name:'Slate',hex:'#708090',meaning:'focus'},{name:'Olive',hex:'#808000',meaning:'wisdom'},{name:'Camel',hex:'#C19A6B',meaning:'reliability'}],
  Libra: [{name:'Pastel Pink',hex:'#FFD1DC',meaning:'harmony & love'},{name:'Light Blue',hex:'#ADD8E6',meaning:'peace & balance'},{name:'Ivory',hex:'#FFFFF0',meaning:'elegance & purity'},{name:'Peach',hex:'#FFCBA4',meaning:'charm'},{name:'Lilac',hex:'#C8A2C8',meaning:'grace'},{name:'Blush',hex:'#DE5D83',meaning:'romance'},{name:'Powder Blue',hex:'#B0E0E6',meaning:'tranquility'}],
  Scorpio: [{name:'Deep Burgundy',hex:'#800020',meaning:'power & mystery'},{name:'Black',hex:'#1a1a1a',meaning:'depth & transformation'},{name:'Dark Teal',hex:'#008080',meaning:'intuition'},{name:'Maroon',hex:'#800000',meaning:'intensity'},{name:'Plum',hex:'#8E4585',meaning:'transformation'},{name:'Midnight Blue',hex:'#191970',meaning:'secrets'},{name:'Garnet',hex:'#733635',meaning:'passion'}],
  Sagittarius: [{name:'Royal Purple',hex:'#7851A9',meaning:'wisdom & adventure'},{name:'Turquoise',hex:'#40E0D0',meaning:'freedom & travel'},{name:'Cobalt Blue',hex:'#0047AB',meaning:'truth & expansion'},{name:'Magenta',hex:'#FF00FF',meaning:'adventure'},{name:'Indigo',hex:'#4B0082',meaning:'intuition'},{name:'Teal',hex:'#008080',meaning:'exploration'},{name:'Violet',hex:'#8F00FF',meaning:'spirituality'}],
  Capricorn: [{name:'Charcoal',hex:'#36454F',meaning:'authority & discipline'},{name:'Dark Brown',hex:'#654321',meaning:'stability & earth'},{name:'Forest',hex:'#0B6623',meaning:'growth & persistence'},{name:'Steel',hex:'#71797E',meaning:'resilience'},{name:'Espresso',hex:'#3C1414',meaning:'depth'},{name:'Pewter',hex:'#8BA8B7',meaning:'endurance'},{name:'Obsidian',hex:'#3D3635',meaning:'power'}],
  Aquarius: [{name:'Electric Blue',hex:'#0892D0',meaning:'innovation & freedom'},{name:'Violet',hex:'#7F00FF',meaning:'originality'},{name:'Silver',hex:'#AAA9AD',meaning:'futuristic thinking'},{name:'Neon Green',hex:'#39FF14',meaning:'revolution'},{name:'Cyan',hex:'#00FFFF',meaning:'clarity'},{name:'Periwinkle',hex:'#CCCCFF',meaning:'uniqueness'},{name:'Aquamarine',hex:'#7FFFD4',meaning:'vision'}],
  Pisces: [{name:'Sea Green',hex:'#2E8B57',meaning:'dreams & healing'},{name:'Lilac',hex:'#C8A2C8',meaning:'intuition & magic'},{name:'Ocean Blue',hex:'#4F42B5',meaning:'depth & spirituality'},{name:'Mauve',hex:'#E0B0FF',meaning:'sensitivity'},{name:'Aqua',hex:'#00FFFF',meaning:'flow'},{name:'Soft Pink',hex:'#FFB6C1',meaning:'compassion'},{name:'Mist',hex:'#D3D3D3',meaning:'mystery'}],
};

export default function DailyColorTool() {
  const [sign, setSign] = useState('');

  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(),0,0).getTime()) / 86400000);

  const getColor = (s: string) => {
    const colors = colorSets[s];
    return colors[dayOfYear % colors.length];
  };

  const color = sign ? getColor(sign) : null;

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-400">Select your zodiac sign to discover today's lucky color</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {signList.map((s, i) => (
          <button key={s} onClick={() => setSign(s)}
            className={`p-3 rounded-lg text-center transition-all ${sign === s ? 'bg-purple-600 ring-2 ring-purple-400 scale-105' : 'bg-white/5 hover:bg-white/10'}`}>
            <div className="text-2xl">{emojis[i]}</div>
            <div className="text-[10px] mt-1">{s}</div>
          </button>
        ))}
      </div>

      {color && (
        <div className="text-center p-8 rounded-xl border border-white/10" style={{ background: `linear-gradient(135deg, ${color.hex}33, ${color.hex}11)` }}>
          <p className="text-sm text-gray-400 mb-2">{emojis[signList.indexOf(sign)]} {sign} • {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <div className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg" style={{ backgroundColor: color.hex }}></div>
          <h2 className="text-2xl font-bold text-white">{color.name}</h2>
          <p className="text-gray-400 mt-1">Represents <em>{color.meaning}</em></p>
          <p className="text-sm text-gray-500 mt-4">Wear or surround yourself with this color today for positive energy ✨</p>
        </div>
      )}
    </div>
  );
}
