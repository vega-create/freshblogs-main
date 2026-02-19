import { useState } from 'react';

export default function WordCounterTool() {
  const [text,setText]=useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g,'').length;
  const sentences = text.trim() ? (text.match(/[.!?]+/g)||[]).length || (text.trim()?1:0) : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p=>p.trim()).length : 0;
  const readTime = Math.max(1,Math.ceil(words/200));

  const limits = [
    {name:'Tweet / X Post',max:280,unit:'chars',current:chars},
    {name:'Instagram Caption',max:2200,unit:'chars',current:chars},
    {name:'LinkedIn Post',max:3000,unit:'chars',current:chars},
    {name:'Meta Description',max:160,unit:'chars',current:chars},
    {name:'Blog Post (min)',max:300,unit:'words',current:words},
    {name:'Long-form Article',max:2000,unit:'words',current:words},
  ];

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6}
        placeholder="Paste or type your text here..."
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"/>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {[
          {label:'Words',value:words},
          {label:'Characters',value:chars},
          {label:'No Spaces',value:charsNoSpace},
          {label:'Sentences',value:sentences},
          {label:'Paragraphs',value:paragraphs},
          {label:'Read Time',value:`${readTime}m`},
        ].map((s,i)=>(
          <div key={i} className="p-3 bg-white/5 rounded-lg text-center">
            <div className="text-lg font-bold text-white">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {text.trim() && (
        <div>
          <h3 className="text-sm font-bold text-gray-400 mb-2">📏 Platform Limits</h3>
          <div className="space-y-2">
            {limits.map((l,i)=>{
              const pct=Math.min((l.current/l.max)*100,100);
              const over=l.current>l.max;
              return(
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-36">{l.name}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full">
                    <div className={`h-full rounded-full transition-all ${over?'bg-red-500':'bg-green-500'}`} style={{width:`${pct}%`}}/>
                  </div>
                  <span className={`text-xs w-20 text-right ${over?'text-red-400':'text-gray-500'}`}>{l.current}/{l.max}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
