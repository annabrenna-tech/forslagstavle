const BASE_URL = 'http://localhost:8000/api'

export interface Proposal {
  id: number
  title: string
  description: string
  status: 'new' | 'reviewed' | 'approved' | 'rejected'
  created_at: string
}

export async function getProposals(): Promise<Proposal[]> {
  const res = await fetch(`${BASE_URL}/proposals/`)
  return res.json()
}

export async function createProposal(data: { title: string; description: string }): Promise<Proposal> {
  const res = await fetch(`${BASE_URL}/proposals/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateProposalStatus(id: number, status: Proposal['status']): Promise<Proposal> {
  const res = await fetch(`${BASE_URL}/proposals/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  return res.json()
}

export async function deleteProposal(id: number): Promise<void> {
  await fetch(`${BASE_URL}/proposals/${id}/`, {
    method: 'DELETE',
  })
}