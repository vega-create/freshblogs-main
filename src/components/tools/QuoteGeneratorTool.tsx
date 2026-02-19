import { useState } from 'react';

const quotes: Record<string,{text:string;author:string}[]> = {
  'Motivation':[
    {text:'The only way to do great work is to love what you do.',author:'Steve Jobs'},
    {text:'Believe you can and you\'re halfway there.',author:'Theodore Roosevelt'},
    {text:'It does not matter how slowly you go as long as you do not stop.',author:'Confucius'},
    {text:'The future belongs to those who believe in the beauty of their dreams.',author:'Eleanor Roosevelt'},
    {text:'Success is not final, failure is not fatal: it is the courage to continue that counts.',author:'Winston Churchill'},
    {text:'Don\'t watch the clock; do what it does. Keep going.',author:'Sam Levenson'},
    {text:'Everything you\'ve ever wanted is on the other side of fear.',author:'George Addair'},
    {text:'Hardships often prepare ordinary people for an extraordinary destiny.',author:'C.S. Lewis'},
  ],
  'Love':[
    {text:'The best thing to hold onto in life is each other.',author:'Audrey Hepburn'},
    {text:'Where there is love there is life.',author:'Mahatma Gandhi'},
    {text:'Love is composed of a single soul inhabiting two bodies.',author:'Aristotle'},
    {text:'To love and be loved is to feel the sun from both sides.',author:'David Viscott'},
    {text:'The greatest thing you\'ll ever learn is just to love and be loved in return.',author:'Nat King Cole'},
    {text:'Love recognizes no barriers.',author:'Maya Angelou'},
  ],
  'Wisdom':[
    {text:'The only true wisdom is in knowing you know nothing.',author:'Socrates'},
    {text:'In the middle of difficulty lies opportunity.',author:'Albert Einstein'},
    {text:'Life is what happens when you\'re busy making other plans.',author:'John Lennon'},
    {text:'The mind is everything. What you think you become.',author:'Buddha'},
    {text:'An unexamined life is not worth living.',author:'Socrates'},
    {text:'Turn your wounds into wisdom.',author:'Oprah Winfrey'},
  ],
  'Happiness':[
    {text:'Happiness is not something ready-made. It comes from your own actions.',author:'Dalai Lama'},
    {text:'The purpose of our lives is to be happy.',author:'Dalai Lama'},
    {text:'Count your age by friends, not years. Count your life by smiles, not tears.',author:'John Lennon'},
    {text:'Happiness depends upon ourselves.',author:'Aristotle'},
    {text:'The most important thing is to enjoy your life — to be happy. It\'s all that matters.',author:'Audrey Hepburn'},
  ],
  'Courage':[
    {text:'Courage is not the absence of fear, but rather the judgment that something else is more important than fear.',author:'Ambrose Redmoon'},
    {text:'Life shrinks or expands in proportion to one\'s courage.',author:'Anaïs Nin'},
    {text:'You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.',author:'Eleanor Roosevelt'},
    {text:'It takes courage to grow up and become who you really are.',author:'E.E. Cummings'},
  ],
  'Success':[
    {text:'Success usually comes to those who are too busy to be looking for it.',author:'Henry David Thoreau'},
    {text:'Don\'t be afraid to give up the good to go for the great.',author:'John D. Rockefeller'},
    {text:'I find that the harder I work, the more luck I seem to have.',author:'Thomas Jefferson'},
    {text:'The secret of success is to do the common thing uncommonly well.',author:'John D. Rockefeller Jr.'},
    {text:'Success is walking from failure to failure with no loss of enthusiasm.',author:'Winston Churchill'},
  ],
};

export default function QuoteGeneratorTool() {
  const [cat,setCat]=useState('');
  const [quote,setQuote]=useState<{text:string;author:string}|null>(null);
  const [copied,setCopied]=useState(false);

  const generate = (c:string) => {
    setCat(c);
    const qs = quotes[c];
    setQuote(qs[Math.floor(Math.random()*qs.length)]);
    setCopied(false);
  };

  const next = () => { if(cat) generate(cat); };

  const copy = () => {
    if(quote) { navigator.clipboard?.writeText(`"${quote.text}" — ${quote.author}`); setCopied(true); setTimeout(()=>setCopied(false),2000); }
  };

  const daily = () => {
    const all = Object.values(quotes).flat();
    const d = new Date();
    const idx = (d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()) % all.length;
    setQuote(all[idx]); setCat('daily'); setCopied(false);
  };

  return (
    <div className="space-y-6">
      <button onClick={daily} className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-lg font-semibold transition-all">☀️ Quote of the Day</button>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {Object.keys(quotes).map(k=>(
          <button key={k} onClick={()=>generate(k)} className={`p-2 rounded-lg text-xs text-center transition-all ${cat===k?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>{k}</button>
        ))}
      </div>

      {quote && (
        <div className="p-8 bg-white/5 rounded-xl border border-white/10 text-center">
          <p className="text-xl md:text-2xl font-serif text-white italic leading-relaxed">"{quote.text}"</p>
          <p className="text-purple-400 mt-4">— {quote.author}</p>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={next} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">🔄 Next</button>
            <button onClick={copy} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">{copied?'✅ Copied':'📋 Copy'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
