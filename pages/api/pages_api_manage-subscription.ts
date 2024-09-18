import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, plan_id, status } = req.body
    const { data, error } = await supabase
      .from('subscriptions')
      .upsert({ user_id, plan_id, status })
    if (error) res.status(500).json({ error: error.message })
    else res.status(200).json(data)
  } else if (req.method === 'GET') {
    const { user_id } = req.query
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id)
    if (error) res.status(500).json({ error: error.message })
    else res.status(200).json(data)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}