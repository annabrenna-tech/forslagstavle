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
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 Forslagstavle</h1>
        <p className="text-gray-500 mb-8">Legg inn dine idéer og forslag</p>

        <div className="mb-8">
          <AddProposalForm onAdded={handleAdded} />
        </div>

        {loading ? (
          <p className="text-gray-400">Laster forslag...</p>
        ) : proposals.length === 0 ? (
          <p className="text-gray-400">Ingen forslag ennå — legg til det første!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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