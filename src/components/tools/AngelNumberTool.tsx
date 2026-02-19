import { useState } from 'react';

const angel: Record<string,{meaning:string;love:string;action:string}> = {
  '111':{meaning:'New beginnings and manifestation. Your thoughts are becoming reality.',love:'A fresh start in love is coming. Stay positive about romance.',action:'Set clear intentions today. The universe is listening.'},
  '222':{meaning:'Balance, harmony, and trust. You are on the right path.',love:'Partnership energy is strong. Trust the process of your relationship.',action:'Be patient. Everything is aligning perfectly.'},
  '333':{meaning:'Creativity and growth. The ascended masters are near.',love:'Express your feelings openly. Creative romance is favored.',action:'Embrace your creative talents. Share your gifts with the world.'},
  '444':{meaning:'Protection and stability. Angels are surrounding you.',love:'Build a solid foundation in your relationship.',action:'Stay grounded and keep working hard. You are protected.'},
  '555':{meaning:'Major change is coming. Embrace transformation.',love:'A significant shift in your love life is approaching.',action:'Let go of what no longer serves you. Change is good.'},
  '666':{meaning:'Balance material and spiritual needs. Refocus.',love:'Nurture your relationship. Focus on emotional connection.',action:'Realign your priorities. Focus on what truly matters.'},
  '777':{meaning:'Spiritual awakening and divine luck. You are aligned.',love:'A deeply spiritual connection is forming or deepening.',action:'Trust your intuition. Miracles are unfolding.'},
  '888':{meaning:'Abundance and financial prosperity are flowing to you.',love:'An abundant, generous love is entering your life.',action:'Receive with gratitude. Prosperity is your birthright.'},
  '999':{meaning:'Completion and endings. A chapter is closing.',love:'Release old relationship patterns. New love awaits.',action:'Finish what you started. Closure brings new beginnings.'},
  '000':{meaning:'Infinite potential. You are one with the universe.',love:'Unconditional love surrounds you. Open your heart.',action:'Meditate and connect with your higher self.'},
  '1111':{meaning:'Powerful manifestation portal. Make a wish.',love:'Your soulmate energy is activated. Stay open.',action:'Think only positive thoughts. You are creating your reality NOW.'},
  '1212':{meaning:'Stay positive. Your dreams are manifesting.',love:'A divinely guided partnership is forming.',action:'Keep faith. Step out of your comfort zone.'},
  '1234':{meaning:'You are on the right path, step by step.',love:'Your relationship is progressing naturally.',action:'Keep moving forward. Each step matters.'},
  '2222':{meaning:'Double balance. Trust the divine timing.',love:'Harmony in partnerships. Twin flame energy.',action:'Have faith in the process. All is well.'},
  '1010':{meaning:'Personal development and spiritual awakening.',love:'Self-love is the foundation for all love.',action:'Focus on your growth. The universe supports you.'},
};

export default function AngelNumberTool() {
  const [num,setNum]=useState('');
  const [result,setResult]=useState<{key:string;data:{meaning:string;love:string;action:string}}|null>(null);

  const lookup = () => {
    const clean = num.replace(/\D/g,'');
    if(!clean) return;
    const match = angel[clean];
    if(match) { setResult({key:clean,data:match}); return; }
    // Try reducing to 3 digits
    const three = clean.slice(0,3);
    if(angel[three]) { setResult({key:three,data:angel[three]}); return; }
    // Find closest
    const first = clean[0];
    const triple = first+first+first;
    if(angel[triple]) { setResult({key:triple,data:angel[triple]}); return; }
    setResult({key:clean,data:{meaning:'This number carries unique personal significance. Reflect on what was happening when you saw it.',love:'Pay attention to your feelings about love when this number appears.',action:'Journal about this number and the circumstances around seeing it.'}});
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Enter the number you keep seeing:</label>
        <input type="text" value={num} onChange={e=>{setNum(e.target.value);setResult(null);}}
          placeholder="e.g. 111, 444, 1111"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-center text-2xl placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={e=>e.key==='Enter'&&lookup()} />
      </div>
      <button onClick={lookup} disabled={!num.trim()} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">👼 Look Up Meaning</button>

      {result && (
        <div className="p-6 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 rounded-xl border border-sky-500/30">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white tracking-wider">{result.key}</div>
            <p className="text-sm text-sky-400 mt-1">Angel Number</p>
          </div>
          <div className="grid gap-3">
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-sky-400 uppercase font-bold">✨ Meaning</p><p className="text-gray-200 text-sm mt-1">{result.data.meaning}</p></div>
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-pink-400 uppercase font-bold">❤️ Love Message</p><p className="text-gray-200 text-sm mt-1">{result.data.love}</p></div>
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-green-400 uppercase font-bold">🎯 Action Step</p><p className="text-gray-200 text-sm mt-1">{result.data.action}</p></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {Object.keys(angel).slice(0,10).map(k => (
          <button key={k} onClick={()=>{setNum(k);setResult(null);}} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-center text-sm text-gray-400 hover:text-white transition-colors">{k}</button>
        ))}
      </div>
    </div>
  );
}
