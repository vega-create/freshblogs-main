import { useState } from 'react';

const symbols: Record<string,{meaning:string;emotion:string;action:string}> = {
  'falling':{meaning:'Loss of control or insecurity in waking life. Fear of failure.',emotion:'Anxiety, vulnerability',action:'Identify what feels unstable and take small steps to regain control.'},
  'flying':{meaning:'Freedom, ambition, rising above problems. Desire for independence.',emotion:'Exhilaration, liberation',action:'Pursue that goal you\'ve been hesitating about. You\'re ready.'},
  'teeth':{meaning:'Anxiety about appearance, communication issues, or loss of power.',emotion:'Embarrassment, powerlessness',action:'Speak up about something you\'ve been holding back.'},
  'water':{meaning:'Emotions and the subconscious. Calm water = peace; rough water = turmoil.',emotion:'Varies with water state',action:'Check in with your emotional state. Are you suppressing feelings?'},
  'snake':{meaning:'Transformation, hidden fears, healing, or betrayal.',emotion:'Fear, fascination',action:'Face a fear you\'ve been avoiding. Transformation awaits.'},
  'death':{meaning:'Endings and new beginnings. Rarely literal — usually symbolic change.',emotion:'Fear, acceptance',action:'Let go of something that has run its course.'},
  'baby':{meaning:'New beginnings, innocence, vulnerability, or a new project.',emotion:'Tenderness, anxiety',action:'Nurture a new idea or relationship that needs your attention.'},
  'house':{meaning:'Your psyche and self. Different rooms = different aspects of yourself.',emotion:'Security or unease',action:'Explore the parts of yourself you\'ve been neglecting.'},
  'chase':{meaning:'Avoidance. Something in waking life you\'re running from.',emotion:'Panic, urgency',action:'Stop running. Face the issue or person you\'ve been avoiding.'},
  'car':{meaning:'Life direction and control. Driving = in control; passenger = passive.',emotion:'Empowerment or helplessness',action:'Take the wheel on a decision you\'ve been putting off.'},
  'dog':{meaning:'Loyalty, friendship, protection. Or instincts and desires.',emotion:'Comfort, companionship',action:'Reach out to a loyal friend or trust your instincts.'},
  'cat':{meaning:'Independence, femininity, intuition, mystery.',emotion:'Curiosity, independence',action:'Trust your intuition more. Embrace your independent side.'},
  'spider':{meaning:'Creativity, patience, feeling trapped, or manipulation.',emotion:'Fear, awe',action:'Weave your plans carefully. Patience will pay off.'},
  'exam':{meaning:'Self-evaluation, fear of judgment, feeling unprepared.',emotion:'Stress, inadequacy',action:'You\'re more prepared than you think. Trust your knowledge.'},
  'money':{meaning:'Self-worth, power, security, or concerns about resources.',emotion:'Anxiety or excitement',action:'Reflect on your relationship with self-worth, not just finances.'},
  'fire':{meaning:'Passion, anger, transformation, or destruction.',emotion:'Intensity',action:'Channel your passion constructively. What lights you up?'},
  'ocean':{meaning:'The vastness of your unconscious mind. Deep emotions.',emotion:'Awe, overwhelm',action:'Explore your deeper feelings through journaling or therapy.'},
  'bird':{meaning:'Freedom, perspective, spiritual messages, ambitions.',emotion:'Hope, aspiration',action:'Gain a higher perspective on your current situation.'},
  'mirror':{meaning:'Self-reflection, identity, how you see yourself.',emotion:'Curiosity, discomfort',action:'Honestly assess how you present yourself vs. who you truly are.'},
  'wedding':{meaning:'Commitment, transition, union of opposites within yourself.',emotion:'Joy or anxiety',action:'Commit fully to something important. No more half-measures.'},
};

const popular = ['falling','flying','teeth','water','snake','death','chase','baby','house','car'];

export default function DreamDictionaryTool() {
  const [search,setSearch]=useState('');
  const [result,setResult]=useState<{key:string;data:{meaning:string;emotion:string;action:string}}|null>(null);

  const lookup = (term?:string) => {
    const q = (term||search).toLowerCase().trim();
    if(!q) return;
    const match = Object.entries(symbols).find(([k])=>k.includes(q)||q.includes(k));
    if(match) setResult({key:match[0],data:match[1]});
    else setResult({key:q,data:{meaning:'This symbol is personal to you. Consider what '+q+' represents in your waking life — memories, feelings, or associations.',emotion:'Reflect on what you felt during the dream',action:'Journal about this symbol and what it connects to in your life.'}});
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input type="text" value={search} onChange={e=>{setSearch(e.target.value);setResult(null);}}
          placeholder="e.g. falling, snake, water..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={e=>e.key==='Enter'&&lookup()} />
        <button onClick={()=>lookup()} disabled={!search.trim()} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">🔍</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {popular.map(p=>(
          <button key={p} onClick={()=>{setSearch(p);lookup(p);}} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-sm text-gray-400 hover:text-white transition-colors capitalize">{p}</button>
        ))}
      </div>

      {result && (
        <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-xl border border-indigo-500/30">
          <h2 className="text-2xl font-bold text-white text-center capitalize mb-4">🌙 {result.key}</h2>
          <div className="grid gap-3">
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-indigo-400 uppercase font-bold">💭 Meaning</p><p className="text-gray-200 text-sm mt-1">{result.data.meaning}</p></div>
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-pink-400 uppercase font-bold">🎭 Emotional Theme</p><p className="text-gray-200 text-sm mt-1">{result.data.emotion}</p></div>
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-green-400 uppercase font-bold">🎯 What To Do</p><p className="text-gray-200 text-sm mt-1">{result.data.action}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
