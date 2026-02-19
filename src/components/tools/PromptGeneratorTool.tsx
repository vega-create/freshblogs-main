import { useState } from 'react';

const templates: Record<string,{label:string;template:string;fields:string[]}> = {
  blog:{label:'Blog Post',template:'Write a comprehensive blog post about [TOPIC]. Target audience: [AUDIENCE]. Tone: [TONE]. Include an introduction, 5 key sections with headers, practical examples, and a conclusion with a call-to-action. Length: approximately 1500 words.',fields:['TOPIC','AUDIENCE','TONE']},
  email:{label:'Email',template:'Write a [TYPE] email to [RECIPIENT] about [SUBJECT]. Keep the tone [TONE]. Include a clear subject line, greeting, body with key points, and a professional closing. Keep it concise but complete.',fields:['TYPE','RECIPIENT','SUBJECT','TONE']},
  social:{label:'Social Post',template:'Create a [PLATFORM] post about [TOPIC]. Target audience: [AUDIENCE]. Include relevant hashtags, a hook in the first line, and a call-to-action. Tone should be [TONE]. Keep within platform character limits.',fields:['PLATFORM','TOPIC','AUDIENCE','TONE']},
  product:{label:'Product Description',template:'Write a compelling product description for [PRODUCT]. Key features: [FEATURES]. Target buyer: [AUDIENCE]. Highlight benefits over features. Include a headline, subheadline, body copy, and bullet points. Tone: [TONE].',fields:['PRODUCT','FEATURES','AUDIENCE','TONE']},
  story:{label:'Creative Story',template:'Write a [GENRE] short story about [PREMISE]. Setting: [SETTING]. Main character: [CHARACTER]. Include vivid descriptions, dialogue, and a surprising ending. Length: approximately 1000 words.',fields:['GENRE','PREMISE','SETTING','CHARACTER']},
  resume:{label:'Resume Bullet',template:'Rewrite this job experience into a powerful resume bullet point using the STAR method (Situation, Task, Action, Result). Experience: [EXPERIENCE]. Quantify results where possible. Use strong action verbs.',fields:['EXPERIENCE']},
  explain:{label:'Explain Like I\'m 5',template:'Explain [CONCEPT] in simple terms that a [AGE]-year-old could understand. Use analogies and examples from everyday life. Avoid jargon. Make it fun and memorable.',fields:['CONCEPT','AGE']},
  code:{label:'Code Helper',template:'Write [LANGUAGE] code to [TASK]. Include comments explaining each step. Handle edge cases. Follow best practices for [LANGUAGE]. Add error handling where appropriate.',fields:['LANGUAGE','TASK']},
};

const placeholders: Record<string,string> = {
  TOPIC:'e.g. sustainable living tips',AUDIENCE:'e.g. millennials interested in eco-friendly lifestyle',TONE:'e.g. friendly and informative',
  TYPE:'e.g. follow-up, introduction, proposal',RECIPIENT:'e.g. potential client, hiring manager',SUBJECT:'e.g. project timeline update',
  PLATFORM:'e.g. Instagram, LinkedIn, Twitter',PRODUCT:'e.g. wireless earbuds',FEATURES:'e.g. noise cancellation, 24hr battery',
  GENRE:'e.g. sci-fi, romance, mystery',PREMISE:'e.g. a detective who can read minds',SETTING:'e.g. futuristic Tokyo',CHARACTER:'e.g. a retired astronaut',
  EXPERIENCE:'e.g. Managed team of 5 engineers on mobile app project',CONCEPT:'e.g. blockchain, quantum computing',AGE:'e.g. 5, 10, 15',
  LANGUAGE:'e.g. Python, JavaScript, SQL',TASK:'e.g. sort a list of objects by date',
};

export default function PromptGeneratorTool() {
  const [type,setType]=useState('');
  const [values,setValues]=useState<Record<string,string>>({});
  const [output,setOutput]=useState('');
  const [copied,setCopied]=useState(false);

  const generate = () => {
    const t = templates[type];
    if(!t) return;
    let result = t.template;
    t.fields.forEach(f=>{ result=result.replace(`[${f}]`,values[f]||`[${f}]`); });
    setOutput(result);
  };

  const copy = () => { navigator.clipboard?.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(templates).map(([k,v])=>(
          <button key={k} onClick={()=>{setType(k);setValues({});setOutput('');}}
            className={`p-2 rounded-lg text-xs text-center transition-all ${type===k?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>{v.label}</button>
        ))}
      </div>

      {type && templates[type] && (
        <div className="space-y-3">
          {templates[type].fields.map(f=>(
            <div key={f}>
              <label className="block text-xs text-gray-400 mb-1">{f.replace(/_/g,' ')}</label>
              <input type="text" value={values[f]||''} onChange={e=>setValues({...values,[f]:e.target.value})}
                placeholder={placeholders[f]||''}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"/>
            </div>
          ))}
          <button onClick={generate} className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">✨ Generate Prompt</button>
        </div>
      )}

      {output && (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-500">Generated Prompt:</span>
            <button onClick={copy} className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors">{copied?'✅':'📋 Copy'}</button>
          </div>
          <p className="text-gray-200 text-sm whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </div>
  );
}
