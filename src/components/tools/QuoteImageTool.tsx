import { useState, useRef } from 'react';

const backgrounds = [
  {name:'Sunset',gradient:'linear-gradient(135deg,#667eea,#764ba2)'},
  {name:'Ocean',gradient:'linear-gradient(135deg,#2193b0,#6dd5ed)'},
  {name:'Forest',gradient:'linear-gradient(135deg,#11998e,#38ef7d)'},
  {name:'Fire',gradient:'linear-gradient(135deg,#f12711,#f5af19)'},
  {name:'Night',gradient:'linear-gradient(135deg,#0f0c29,#302b63,#24243e)'},
  {name:'Rose',gradient:'linear-gradient(135deg,#ee9ca7,#ffdde1)'},
  {name:'Dark',gradient:'linear-gradient(135deg,#1a1a2e,#16213e)'},
  {name:'Gold',gradient:'linear-gradient(135deg,#f7971e,#ffd200)'},
];

export default function QuoteImageTool() {
  const [quote,setQuote]=useState('');
  const [author,setAuthor]=useState('');
  const [bg,setBg]=useState(0);
  const [fontSize,setFontSize]=useState(24);
  const canvasRef=useRef<HTMLCanvasElement>(null);

  const generate = () => {
    const canvas=canvasRef.current;
    if(!canvas||!quote.trim()) return;
    const ctx=canvas.getContext('2d');
    if(!ctx) return;
    canvas.width=1080; canvas.height=1080;

    // Parse gradient
    const bgObj=backgrounds[bg];
    const grd=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    const colors=bgObj.gradient.match(/#[a-f0-9]{6}/gi)||['#667eea','#764ba2'];
    colors.forEach((c,i)=>grd.addColorStop(i/(colors.length-1),c));
    ctx.fillStyle=grd; ctx.fillRect(0,0,1080,1080);

    // Quote text
    ctx.fillStyle='#ffffff'; ctx.textAlign='center'; ctx.textBaseline='middle';
    const scale=fontSize/24;
    ctx.font=`italic ${Math.round(36*scale)}px Georgia, serif`;
    const words=quote.split(' ');
    const lines:string[]=[]; let line='';
    words.forEach(w=>{const test=line?line+' '+w:w; if(ctx.measureText(test).width>900){lines.push(line);line=w;}else line=test;});
    if(line) lines.push(line);

    const lineH=Math.round(48*scale);
    const startY=540-(lines.length*lineH)/2;
    ctx.fillText('"',540,startY-lineH);
    lines.forEach((l,i)=>ctx.fillText(l,540,startY+i*lineH));
    ctx.fillText('"',540,startY+lines.length*lineH);

    // Author
    if(author.trim()){
      ctx.font=`${Math.round(22*scale)}px Arial, sans-serif`;
      ctx.fillStyle='rgba(255,255,255,0.7)';
      ctx.fillText('— '+author,540,startY+lines.length*lineH+lineH+10);
    }

    // Watermark
    ctx.font='14px Arial'; ctx.fillStyle='rgba(255,255,255,0.3)';
    ctx.fillText('freshblogs.cc',540,1050);
  };

  const download = () => {
    const canvas=canvasRef.current; if(!canvas) return;
    const link=document.createElement('a');
    link.download='quote.png'; link.href=canvas.toDataURL(); link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Your quote:</label>
        <textarea value={quote} onChange={e=>setQuote(e.target.value)} rows={3} placeholder="Enter an inspiring quote..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"/>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-sm text-gray-400 mb-1">Author</label>
          <input type="text" value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-sm text-gray-400 mb-1">Font Size</label>
          <input type="range" min={16} max={40} value={fontSize} onChange={e=>setFontSize(Number(e.target.value))} className="w-full mt-2"/></div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-2">Background:</label>
        <div className="grid grid-cols-4 gap-2">
          {backgrounds.map((b,i)=>(
            <button key={i} onClick={()=>setBg(i)}
              className={`h-10 rounded-lg transition-all ${bg===i?'ring-2 ring-white':''}`}
              style={{background:b.gradient}}/>
          ))}
        </div>
      </div>
      <button onClick={generate} disabled={!quote.trim()} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">🖼️ Generate Image</button>
      <div className="flex justify-center">
        <canvas ref={canvasRef} className="max-w-full rounded-xl border border-white/10" style={{maxHeight:400}}/>
      </div>
      <button onClick={download} className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">📥 Download PNG (1080×1080)</button>
    </div>
  );
}
