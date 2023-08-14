'use server'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data =  await(await fetch("https://api.ip.sb/geoip")).json()
  return res.json(data)
}

