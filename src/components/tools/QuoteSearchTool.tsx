import { useState } from 'react';

const allQuotes = [
  {text:'The only way to do great work is to love what you do.',author:'Steve Jobs',tags:['work','passion','motivation']},
  {text:'Believe you can and you\'re halfway there.',author:'Theodore Roosevelt',tags:['confidence','motivation','belief']},
  {text:'In the middle of difficulty lies opportunity.',author:'Albert Einstein',tags:['challenges','wisdom','opportunity']},
  {text:'The best thing to hold onto in life is each other.',author:'Audrey Hepburn',tags:['love','relationships','life']},
  {text:'Happiness is not something ready-made. It comes from your own actions.',author:'Dalai Lama',tags:['happiness','action','wisdom']},
  {text:'Life is what happens when you\'re busy making other plans.',author:'John Lennon',tags:['life','wisdom','present']},
  {text:'The mind is everything. What you think you become.',author:'Buddha',tags:['mindset','wisdom','thoughts']},
  {text:'Turn your wounds into wisdom.',author:'Oprah Winfrey',tags:['growth','wisdom','resilience']},
  {text:'It does not matter how slowly you go as long as you do not stop.',author:'Confucius',tags:['perseverance','motivation','patience']},
  {text:'Everything you\'ve ever wanted is on the other side of fear.',author:'George Addair',tags:['fear','courage','motivation']},
  {text:'Where there is love there is life.',author:'Mahatma Gandhi',tags:['love','life','wisdom']},
  {text:'Success usually comes to those who are too busy to be looking for it.',author:'Henry David Thoreau',tags:['success','work','motivation']},
  {text:'Courage is not the absence of fear, but rather the judgment that something else is more important than fear.',author:'Ambrose Redmoon',tags:['courage','fear','wisdom']},
  {text:'The purpose of our lives is to be happy.',author:'Dalai Lama',tags:['happiness','life','purpose']},
  {text:'An unexamined life is not worth living.',author:'Socrates',tags:['wisdom','reflection','philosophy']},
  {text:'Count your age by friends, not years.',author:'John Lennon',tags:['friendship','life','happiness']},
  {text:'Don\'t watch the clock; do what it does. Keep going.',author:'Sam Levenson',tags:['perseverance','time','motivation']},
  {text:'The future belongs to those who believe in the beauty of their dreams.',author:'Eleanor Roosevelt',tags:['dreams','future','belief']},
  {text:'Hardships often prepare ordinary people for an extraordinary destiny.',author:'C.S. Lewis',tags:['challenges','destiny','growth']},
  {text:'Life shrinks or expands in proportion to one\'s courage.',author:'Anaïs Nin',tags:['courage','life','growth']},
  {text:'Love recognizes no barriers.',author:'Maya Angelou',tags:['love','strength','wisdom']},
  {text:'The only true wisdom is in knowing you know nothing.',author:'Socrates',tags:['wisdom','humility','philosophy']},
  {text:'I find that the harder I work, the more luck I seem to have.',author:'Thomas Jefferson',tags:['work','luck','success']},
  {text:'Success is walking from failure to failure with no loss of enthusiasm.',author:'Winston Churchill',tags:['success','failure','perseverance']},
  {text:'Happiness depends upon ourselves.',author:'Aristotle',tags:['happiness','self','philosophy']},
  {text:'You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.',author:'Eleanor Roosevelt',tags:['courage','strength','growth']},
  {text:'Don\'t be afraid to give up the good to go for the great.',author:'John D. Rockefeller',tags:['ambition','success','courage']},
  {text:'It takes courage to grow up and become who you really are.',author:'E.E. Cummings',tags:['courage','growth','identity']},
];

const popularTags = ['motivation','love','wisdom','courage','happiness','success','life','growth'];

export default function QuoteSearchTool() {
  const [query,setQuery]=useState('');
  const [tag,setTag]=useState('');
  const [results,setResults]=useState<typeof allQuotes>([]);
  const [searched,setSearched]=useState(false);

  const search = (q?:string, t?:string) => {
    const searchQ = (q??query).toLowerCase().trim();
    const searchT = t??tag;
    let filtered = allQuotes;
    if(searchQ) filtered = filtered.filter(q=>q.text.toLowerCase().includes(searchQ)||q.author.toLowerCase().includes(searchQ)||q.tags.some(t=>t.includes(searchQ)));
    if(searchT) filtered = filtered.filter(q=>q.tags.includes(searchT));
    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input type="text" value={query} onChange={e=>{setQuery(e.target.value);setSearched(false);}}
          placeholder="Search by keyword or author..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={e=>e.key==='Enter'&&search()} />
        <button onClick={()=>search()} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">🔍</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {popularTags.map(t=>(
          <button key={t} onClick={()=>{setTag(tag===t?'':t);search(undefined,tag===t?'':t);}}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${tag===t?'bg-purple-600 text-white':'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{t}</button>
        ))}
      </div>

      {searched && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{results.length} quote{results.length!==1?'s':''} found</p>
          {results.map((q,i)=>(
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gray-200 italic">"{q.text}"</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-purple-400">— {q.author}</span>
                <button onClick={()=>navigator.clipboard?.writeText(`"${q.text}" — ${q.author}`)} className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors">📋</button>
              </div>
              <div className="flex gap-1 mt-2">{q.tags.map(t=><span key={t} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-500">{t}</span>)}</div>
            </div>
          ))}
          {results.length===0 && <p className="text-center text-gray-500 py-4">No quotes found. Try a different search term.</p>}
        </div>
      )}
    </div>
  );
}
