import { useState } from 'react'
import { type Proposal, updateProposalStatus, deleteProposal } from '../api/proposals'

const statusStyles: Record<Proposal['status'], { label: string; color: string }> = {
  new:      { label: 'Ny',           color: 'bg-yellow-100 text-yellow-800' },
  reviewed: { label: 'Gjennomgått', color: 'bg-blue-100 text-blue-800' },
  approved: { label: 'Godkjent',    color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Avslått',     color: 'bg-red-100 text-red-800' },
}

interface Props {
  proposal: Proposal
  onUpdated: (updated: Proposal) => void
  onDeleted: (id: number) => void
}

export default function ProposalCard({ proposal, onUpdated, onDeleted }: Props) {
  const [loading, setLoading] = useState(false)
  const { color } = statusStyles[proposal.status]

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true)
    const updated = await updateProposalStatus(proposal.id, e.target.value as Proposal['status'])
    onUpdated(updated)
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('Vil du slette dette forslaget?')) return
    setLoading(true)
    await deleteProposal(proposal.id)
    onDeleted(proposal.id)
  }

  return (
    <div className={`border rounded-lg p-4 shadow-sm flex flex-col gap-2 ${color}`}>
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-gray-800 text-lg">{proposal.title}</h2>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-gray-400 hover:text-red-500 transition-colors text-lg disabled:opacity-50"
        >
          🗑️
        </button>
      </div>
      {proposal.description && (
        <p className="text-gray-600 text-sm">{proposal.description}</p>
      )}
      <div className="flex justify-between items-center mt-auto pt-2">
        <p className="text-gray-400 text-xs">
          {new Date(proposal.created_at).toLocaleDateString('nb-NO')}
        </p>
        <select
          value={proposal.status}
          onChange={handleStatusChange}
          disabled={loading}
          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          <option value="new">Ny</option>
          <option value="reviewed">Gjennomgått</option>
          <option value="approved">Godkjent</option>
          <option value="rejected">Avslått</option>
        </select>
      </div>
    </div>
  )
}