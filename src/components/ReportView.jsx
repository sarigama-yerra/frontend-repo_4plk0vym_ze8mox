import { useEffect, useState } from 'react';

export default function ReportView({ auditId, onClose }) {
  const [data, setData] = useState(null);
  const BASE = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    const load = async () => {
      if (!auditId) return;
      const res = await fetch(`${BASE}/api/audit/report?audit_id=${auditId}`);
      const json = await res.json();
      setData(json);
    };
    load();
  }, [auditId]);

  if (!auditId) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-6 z-50">
      <div className="w-full max-w-3xl bg-gradient-to-b from-slate-900 to-indigo-950 border border-white/10 rounded-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-indigo-100">SEO Report</h3>
          <button onClick={onClose} className="text-indigo-200 hover:text-white">Close</button>
        </div>
        {!data ? (
          <div className="mt-8 text-indigo-200">Loading…</div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="text-indigo-100/90 text-sm truncate">{data.url}</div>
            <div className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">{data.score}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Stat label="Title" value={data.report?.title || 'Missing'} />
              <Stat label="Meta description" value={data.report?.meta_description || 'Missing'} />
              <Stat label="Has H1" value={data.report?.has_h1 ? 'Yes' : 'No'} />
              <Stat label="Images" value={`${data.report?.image_count || 0} (missing alt: ${data.report?.images_missing_alt || 0})`} />
              <Stat label="Word count" value={data.report?.word_count || 0} />
            </div>
            <div>
              <div className="text-indigo-200/80 text-sm">Recommendations</div>
              <ul className="mt-2 space-y-2">
                {(data.report?.recommendations || []).map((r, i) => (
                  <li key={i} className="text-indigo-100/90 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2">{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="text-indigo-200/70 text-xs">{label}</div>
      <div className="text-indigo-100">{value}</div>
    </div>
  )
}
