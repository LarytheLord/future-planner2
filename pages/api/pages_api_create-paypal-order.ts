import { NextApiRequest, NextApiResponse } from 'next'
import paypal from '@paypal/checkout-server-sdk'

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
const client = new paypal.core.PayPalHttpClient(environment)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const request = new paypal.orders.OrdersCreateRequest()
    request.prefer("return=representation")
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '10.00'
        }
      }]
    })

    try {
      const order = await client.execute(request)
      res.status(200).json({ id: order.result.id })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}