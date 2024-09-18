import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('planner_data')
      .select('*')
    if (error) res.status(500).json({ error: error.message })
    else res.status(200).json(data)
  } else if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('planner_data')
      .insert(req.body)
    if (error) res.status(500).json({ error: error.message })
    else res.status(200).json(data)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}