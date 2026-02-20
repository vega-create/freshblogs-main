import { useState, useEffect } from 'react';

interface Option { id: string; text: string; scores: Record<string, number> }
interface Question { id: string; text: string; options: Option[] }
interface Result { title: string; description: string; traits: string[]; growth_tip: string; compatible_types: string[] }
interface Test { id: number; slug: string; title: string; description: string; category: string; estimated_minutes: number; questions: Question[]; results: Record<string, Result> }

export default function DynamicQuizTool({ testSlug }: { testSlug: string }) {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ key: string; data: Result; allScores: [string, number][] } | null>(null);

  useEffect(() => {
    fetch('/data/personality-tests.json')
      .then(r => r.json())
      .then(d => {
        const found = (d.tests || []).find((t: Test) => t.slug === testSlug);
        setTest(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [testSlug]);

  const answer = (option: Option) => {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([k, v]) => {
      newScores[k] = (newScores[k] || 0) + v;
    });
    setScores(newScores);

    if (test && current < test.questions.length - 1) {
      setCurrent(c => c + 1);
    } else if (test) {
      // Calculate result
      const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
      const topKey = sorted[0][0];
      const resultData = test.results[topKey];
      setResult({ key: topKey, data: resultData, allScores: sorted.slice(0, 5) });
    }
  };

  const reset = () => { setCurrent(0); setScores({}); setResult(null); };

  if (loading) return <div className="text-center py-8 text-gray-400">Loading quiz...</div>;
  if (!test) return <div className="text-center py-8 text-gray-400">Quiz not found.</div>;

  if (result) {
    const maxScore = result.allScores[0]?.[1] || 1;
    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 text-center">
          <div className="text-4xl mb-2">✨</div>
          <h2 className="text-2xl font-bold text-white">{result.data.title}</h2>
          <p className="text-gray-300 mt-3 leading-relaxed">{result.data.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {result.data.traits.map(t => (
            <span key={t} className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-sm capitalize">{t}</span>
          ))}
        </div>

        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
          <p className="text-xs text-green-400 uppercase font-bold mb-1">🌱 Growth Tip</p>
          <p className="text-gray-300 text-sm">{result.data.growth_tip}</p>
        </div>

        {result.data.compatible_types?.length > 0 && (
          <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
            <p className="text-xs text-pink-400 uppercase font-bold mb-1">💕 Most Compatible</p>
            <p className="text-gray-300 text-sm">{result.data.compatible_types.join(', ')}</p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase font-bold">Score Breakdown</p>
          {result.allScores.map(([key, score]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-28 truncate capitalize">{key.replace(/_/g, ' ')}</span>
              <div className="flex-1 h-2 bg-white/5 rounded-full">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" style={{ width: `${(score / maxScore) * 100}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-6 text-right">{score}</span>
            </div>
          ))}
        </div>

        <button onClick={reset} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">Take Again</button>
      </div>
    );
  }

  const q = test.questions[current];
  const progress = ((current + 1) / test.questions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Question {current + 1} of {test.questions.length}</span>
        <span>~{test.estimated_minutes} min</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full">
        <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <h2 className="text-lg font-bold text-white">{q.text}</h2>

      <div className="grid gap-3">
        {q.options.map(o => (
          <button key={o.id} onClick={() => answer(o)}
            className="text-left p-4 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 rounded-xl transition-all">
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
}
