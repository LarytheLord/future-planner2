import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) res.status(400).json({ error: error.message })
    else res.status(200).json({ user })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}