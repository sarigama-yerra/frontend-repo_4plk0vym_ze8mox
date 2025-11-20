import { motion } from 'framer-motion';

export default function CrawlProgress({ progress = 0, urls = [] }) {
  return (
    <section className="min-h-[60vh] bg-gradient-to-b from-slate-950 to-slate-900 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-100">Crawling your site</h2>
        <p className="text-indigo-200/80 mt-1">Discovering internal links and mapping pages…</p>

        <div className="mt-6 h-3 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: 'easeOut', duration: 0.6 }}
            className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500" />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-3 max-h-[320px] overflow-auto pr-2">
          {urls.map((u, idx) => (
            <div key={idx} className="text-sm text-indigo-100/90 bg-white/5 border border-white/10 rounded-lg px-3 py-2 truncate">
              {u}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
