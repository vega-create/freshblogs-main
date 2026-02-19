import { useState } from 'react';

const themes: Record<string,{keywords:string[];meaning:string;advice:string}> = {
  anxiety:{keywords:['chase','fall','late','exam','naked','lost','trapped','drown'],meaning:'Your dream reflects underlying anxiety or stress. Your subconscious is processing fears about losing control or being unprepared.',advice:'Identify the source of stress in your waking life. Practice grounding exercises before bed.'},
  transformation:{keywords:['death','snake','butterfly','fire','birth','pregnant','fly','wings'],meaning:'Your dream signals a period of transformation and personal growth. Something in your life is ending so something new can begin.',advice:'Embrace change rather than resisting it. This is a positive sign of evolution.'},
  relationships:{keywords:['ex','wedding','kiss','baby','fight','hug','friend','family','love','partner','cheating'],meaning:'Your dream is processing relationship dynamics. Your subconscious is working through feelings about connection, trust, or intimacy.',advice:'Reflect on your current relationships. Is there a conversation you have been avoiding?'},
  success:{keywords:['money','gold','win','fly','mountain','climb','crown','trophy','car','house'],meaning:'Your dream reflects ambition, achievement, or desires for success. You may be manifesting your goals subconsciously.',advice:'Set clear intentions for what you want. Your subconscious is already working toward it.'},
  spiritual:{keywords:['angel','light','god','temple','church','pray','cloud','heaven','spirit','ghost','star'],meaning:'Your dream has spiritual significance. You may be experiencing a period of heightened intuition or seeking deeper meaning.',advice:'Pay attention to synchronicities in your waking life. Meditation may enhance these experiences.'},
  healing:{keywords:['water','ocean','rain','bath','hospital','doctor','medicine','flower','garden','heal'],meaning:'Your dream suggests emotional or physical healing is taking place. Water often represents cleansing and renewal.',advice:'Allow yourself time to rest and recover. Your body and mind are working to restore balance.'},
};

export default function DreamInterpreterTool() {
  const [dream,setDream]=useState('');
  const [result,setResult]=useState<{theme:string;data:{meaning:string;advice:string};symbols:string[]}|null>(null);

  const analyze = () => {
    if(!dream.trim()) return;
    const words = dream.toLowerCase().split(/\s+/);
    let bestTheme = '';
    let bestScore = 0;
    let foundSymbols: string[] = [];

    for(const [theme,info] of Object.entries(themes)){
      let score = 0;
      const matched: string[] = [];
      for(const kw of info.keywords){
        if(words.some(w=>w.includes(kw)||kw.includes(w))){
          score++;
          matched.push(kw);
        }
      }
      if(score>bestScore){bestScore=score;bestTheme=theme;foundSymbols=matched;}
    }

    if(!bestTheme) bestTheme='spiritual';
    setResult({theme:bestTheme,data:themes[bestTheme],symbols:foundSymbols});
  };

  const themeEmoji: Record<string,string>={anxiety:'😰',transformation:'🦋',relationships:'❤️',success:'🏆',spiritual:'✨',healing:'💧'};

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Describe your dream in detail:</label>
        <textarea value={dream} onChange={e=>{setDream(e.target.value);setResult(null);}} rows={4}
          placeholder="I was walking through a dark forest when I saw a bright light..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"/>
      </div>
      <button onClick={analyze} disabled={dream.trim().length<10}
        className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">🔮 Interpret My Dream</button>

      {result && (
        <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-xl border border-indigo-500/30">
          <div className="text-center mb-4">
            <span className="text-4xl">{themeEmoji[result.theme]||'🌙'}</span>
            <h2 className="text-xl font-bold text-white capitalize mt-2">Theme: {result.theme}</h2>
          </div>
          {result.symbols.length>0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {result.symbols.map((s,i)=><span key={i} className="px-2 py-1 bg-white/10 rounded-full text-xs text-purple-300 capitalize">{s}</span>)}
            </div>
          )}
          <div className="grid gap-3">
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-indigo-400 uppercase font-bold">💭 Interpretation</p><p className="text-gray-200 text-sm mt-1">{result.data.meaning}</p></div>
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-green-400 uppercase font-bold">🎯 Advice</p><p className="text-gray-200 text-sm mt-1">{result.data.advice}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
