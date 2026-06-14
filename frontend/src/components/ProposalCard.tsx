import { useState } from 'react'
import { type Proposal, updateProposalStatus, deleteProposal } from '../api/proposals'

const statusStyles: Record<Proposal['status'], { label: string; bg: string; badge: string; text: string; subtext: string }> = {
  new:      { label: 'Ny',           bg: '#FEF08A', badge: '#FDE047', text: '#3D3000', subtext: '#6B5500' },
  reviewed: { label: 'Gjennomgått', bg: '#93C5FD', badge: '#60A5FA', text: '#1E3A5F', subtext: '#1E40AF' },
  approved: { label: 'Godkjent',    bg: '#86EFAC', badge: '#4ADE80', text: '#14532D', subtext: '#166534' },
  rejected: { label: 'Avslått',     bg: '#FCA5A5', badge: '#F87171', text: '#450A0A', subtext: '#7F1D1D' },
}

const rotations = [-1.5, 1, -0.5, 1.5, -1, 0.8]

interface Props {
  proposal: Proposal
  onUpdated: (updated: Proposal) => void
  onDeleted: (id: number) => void
}

export default function ProposalCard({ proposal, onUpdated, onDeleted }: Props) {
  const [loading, setLoading] = useState(false)
  const style = statusStyles[proposal.status]
  const rotation = rotations[proposal.id % rotations.length]

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
    <div style={{
      background: style.bg,
      borderRadius: '2px 12px 12px 12px',
      padding: '1rem',
      boxShadow: '3px 3px 0 rgba(0,0,0,0.1)',
      transform: `rotate(${rotation}deg)`,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      opacity: loading ? 0.6 : 1,
      transition: 'opacity 0.2s',
    }}>
      {/* Tape */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '28px',
        height: '16px',
        background: 'rgba(0,0,0,0.12)',
        borderRadius: '2px',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ fontWeight: 500, fontSize: '14px', color: style.text, margin: 0, flex: 1 }}>
          {proposal.title}
        </p>
        <button
          onClick={handleDelete}
          disabled={loading}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0 0 0 8px', opacity: 0.5 }}
        >
          🗑️
        </button>
      </div>

      {proposal.description && (
        <p style={{ fontSize: '12px', color: style.subtext, margin: 0 }}>
          {proposal.description}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
        <span style={{ fontSize: '11px', color: style.subtext }}>
          {new Date(proposal.created_at).toLocaleDateString('nb-NO')}
        </span>
        <select
          value={proposal.status}
          onChange={handleStatusChange}
          disabled={loading}
          style={{
            fontSize: '11px',
            background: style.badge,
            color: style.text,
            border: 'none',
            borderRadius: '999px',
            padding: '2px 8px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
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