import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

type Data = {
    from: Date,
    to: Date,
    intensity: Intensity
}

type Intensity = {
    forecast: string,
    actual: string,
    index: string
}

type CarbonData = Data[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const request = await fetch('https://api.carbonintensity.org.uk/intensity/date')
    const { data } = await request.json() as {data:Data}
    res.status(200).send({ ...data })
}