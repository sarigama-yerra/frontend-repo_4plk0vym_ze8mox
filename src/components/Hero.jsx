import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import GalaxyBackground from './GalaxyBackground';

export default function Hero({ onSubmit }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <GalaxyBackground />
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.18),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
          AI SEO Audit
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-lg sm:text-2xl text-indigo-100/90">
          Enter a website and let the AI crawl, analyze, and generate actionable SEO insights.
        </motion.p>

        <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 mx-auto max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2 shadow-2xl">
          <input name="url" type="url" required placeholder="https://example.com" className="flex-1 bg-transparent text-white placeholder-indigo-200/70 px-4 py-4 outline-none" />
          <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 transition">
            Start Audit
          </button>
        </motion.form>

        <div className="mt-6 text-indigo-200/80 text-sm">Futuristic. Space. Galaxy. Purple × Blue.</div>
      </div>
    </section>
  );
}
