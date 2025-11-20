import { useEffect, useState } from 'react';

export default function AuditDashboard({ taskId, onOpenReport }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    const tick = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE}/api/audit/list?task_id=${taskId}`);
        const data = await res.json();
        setTasks(data.tasks || []);
      } catch (e) {}
      finally { setLoading(false); }
    };
    tick();
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, [taskId]);

  const statusBadge = (s) => {
    const map = {
      'pending': 'bg-amber-500/20 text-amber-300 border-amber-400/20',
      'in-progress': 'bg-sky-500/20 text-sky-300 border-sky-400/20',
      'complete': 'bg-emerald-500/20 text-emerald-300 border-emerald-400/20',
      'error': 'bg-rose-500/20 text-rose-300 border-rose-400/20'
    };
    return `px-2 py-1 rounded-md border text-xs ${map[s] || ''}`;
  };

  return (
    <section className="bg-gradient-to-b from-slate-900 to-indigo-950 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-indigo-100">Audit tasks</h2>
          <div className="text-indigo-200/70 text-sm">{loading ? 'Refreshing…' : 'Live'}</div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((t) => (
            <div key={t._id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="truncate text-indigo-100/90 text-sm" title={t.url}>{t.url}</div>
                <span className={statusBadge(t.status)}>{t.status}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-indigo-200/80 text-sm">Score: {t.score ?? '—'}</div>
                <button onClick={() => onOpenReport(t._id)} disabled={t.status !== 'complete'}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm disabled:opacity-50">
                  View report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
