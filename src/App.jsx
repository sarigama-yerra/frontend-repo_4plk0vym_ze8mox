import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import CrawlProgress from './components/CrawlProgress'
import AuditDashboard from './components/AuditDashboard'
import ReportView from './components/ReportView'
import Layout from './components/Layout'

function App() {
  const [stage, setStage] = useState('home') // home | crawling | dashboard
  const [taskId, setTaskId] = useState('')
  const [crawl, setCrawl] = useState({ progress: 0, urls: [] })
  const [reportId, setReportId] = useState(null)
  const [error, setError] = useState('')
  const BASE = import.meta.env.VITE_BACKEND_URL || ''

  const handleStart = async (e) => {
    e.preventDefault()
    setError('')
    const url = new FormData(e.currentTarget).get('url')
    try {
      const res = await fetch(`${BASE}/api/crawl/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      if (!res.ok) throw new Error('Failed to start crawl')
      const data = await res.json()
      setTaskId(data.task_id)
      setStage('crawling')
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (stage !== 'crawling' || !taskId) return
    const poll = async () => {
      try {
        const res = await fetch(`${BASE}/api/crawl/status?task_id=${taskId}`)
        const data = await res.json()
        setCrawl({ progress: data.progress || 0, urls: data.urls || [] })
        if ((data.status === 'complete' || data.progress >= 100) && (data.urls || []).length) {
          await fetch(`${BASE}/api/audit/start?task_id=${taskId}`, { method: 'POST' })
          setStage('dashboard')
        }
      } catch (e) {}
    }
    poll()
    const id = setInterval(poll, 2500)
    return () => clearInterval(id)
  }, [stage, taskId])

  return (
    <Layout>
      {stage === 'home' && <Hero onSubmit={handleStart} />}
      {error && <div className="max-w-3xl mx-auto px-6 -mt-8 text-rose-300 text-sm">{error}</div>}
      {stage === 'crawling' && <CrawlProgress progress={crawl.progress} urls={crawl.urls} />}
      {stage === 'dashboard' && <>
        <CrawlProgress progress={100} urls={crawl.urls} />
        <AuditDashboard taskId={taskId} onOpenReport={(id) => setReportId(id)} />
      </>}
      {reportId && <ReportView auditId={reportId} onClose={() => setReportId(null)} />}
    </Layout>
  )
}

export default App
