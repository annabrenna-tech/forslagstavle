import { useEffect, useState } from 'react'
import { getProposals, type Proposal } from './api/proposals'
import ProposalCard from './components/ProposalCard'
import AddProposalForm from './components/AddProposalForm'

export default function App() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProposals().then(data => {
      setProposals(data)
      setLoading(false)
    })
  }, [])

  function handleAdded(proposal: Proposal) {
    setProposals(prev => [proposal, ...prev])
  }

  function handleUpdated(updated: Proposal) {
    setProposals(prev => prev.map(p => p.id === updated.id ? updated : p))
  }

  function handleDeleted(id: number) {
    setProposals(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div style={{ background: '#F5ECD7', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: '#F5ECD7', borderRadius: '16px', padding: '2rem', border: '6px solid #E2D4B7' }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#3D2B1F', marginBottom: '0.25rem' }}>
          IT-Hjelp Forslagstavle
        </h1>
        <p style={{ color: '#8B7355', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Legg inn dine idéer og forslag
        </p>

        <div className="mb-8">
          <AddProposalForm onAdded={handleAdded} />
        </div>

        {loading ? (
          <p style={{ color: '#8B7355' }}>Laster forslag...</p>
        ) : proposals.length === 0 ? (
          <p style={{ color: '#8B7355' }}>Ingen forslag ennå! Legg til det første!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map(proposal => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onUpdated={handleUpdated}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}