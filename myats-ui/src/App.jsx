import { useState } from 'react'
import UploadPage from './components/UploadPage'
import ResultPage from './components/ResultPage'

/**
 * Mock result — remove and replace with real API response once backend is ready.
 * Shape must match the ResultPage prop contract.
 */
const MOCK_RESULT = {
  company: 'Acme Technologies',
  job_title: 'Senior Software Engineer',
  location: 'New York, NY (Hybrid)',
  salary: '$130,000 – $160,000',
  score: 7,
  should_apply: true,
  apply_reason:
    'Your experience aligns with the core requirements. A few targeted resume updates could push you to a strong match.',
  areas_of_improvement: [
    'Quantify achievements in your work experience — add metrics like "reduced load time by 40%" instead of general descriptions.',
    'Highlight experience with distributed systems and microservices architecture, which the role explicitly requires.',
    'Add a skills section that prominently lists the tech stack in the job posting (Kafka, Kubernetes, Go).',
    'Tailor your summary statement to reflect the seniority and focus area of this specific role.',
    'Include any leadership or mentorship experience — even informal — since the role involves guiding junior engineers.',
  ],
}

export default function App() {
  const [result, setResult] = useState(null)

  // Temporarily show mock result to preview the UI — remove in production
  // setResult(MOCK_RESULT)  ← call onResult(data) from UploadPage once API is wired

  if (result) {
    return <ResultPage result={result} onBack={() => setResult(null)} />
  }

  return <UploadPage onResult={setResult} />
}
